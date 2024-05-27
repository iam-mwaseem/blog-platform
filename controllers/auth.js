const db = require("../config/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { generateOtp, sendEmail } = require("../utils/email.js");

const signupWithEmailandPassword = async (req, res) => {
  console.log(req);
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const newUser = await db.user.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    console.log(newUser.toJSON());

    newUser.password = await bcrypt.hash(password, 12);
    newUser.passwordConfirm = undefined;
    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRES_IN,
    // });
    await newUser.save();
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
        // token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    //1.Check if the email already exit in the database

    let user = await db.user.findOne({ where: { email } });

    //2.If there is no user already, then create new with the provided email

    if (!user) {
      user = await User.create({ email });
    }

    //2. Check if user is blocked
    if (user.isblocked) {
      const currentTime = new Date();
      if (currentTime < user.blockUntil) {
        throw new Error("You are blocked!Please try after some time");
      } else {
        user.isblocked = false;
        user.otpAttempts = 0;
      }
    }

    //3. Check for minimum 1 minute gap between otp

    const lastOtpTime = user.otpCreatedTime;
    const currentTime = new Date();

    if (lastOtpTime && currentTime - lastOtpTime < 60000) {
      throw new Error("Minimum 1-minute gap required between otp requests");
    }
    const otp = generateOtp();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    console.log(hashedOtp);
    user.otp = hashedOtp;
    user.otpCreatedTime = currentTime;

    await user.save();

    //3. Send otp with email
    sendEmail({
      email,
      subject: "Your one time password verification code ",
      message: `Your otp is :${otp}`,
    });
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({
    message: "Successfull",
  });
};

const signinWithOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await db.user.findOne({ where: { email } });

    const dcryptOtp = await crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (!user || !dcryptOtp === user.otp) {
      throw new Error("You're otp is incorrect!");
    }
    //Wheter we should send Jwt token to client or not when user successfuuly verified the otp ?

    return res.status(200).json({
      message: "You're logged in with otp",
    });
  } catch (error) {
    console.log(error);
  }
};
const signinWithEmailPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide your email and password");
    }

    const user = await db.user.findOne({ where: { email } });
    console.log(user.password);

    // const correct = user.correctPassword(password, user.password);
    const correct = await bcrypt.compare(password, user.password);
    console.log(correct);

    if (!user || !correct) {
      throw new Error("Email or password is incorrect");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const tokenExpiresin = Date.now() + 5 * 60 * 1000;
  console.log(tokenExpiresin);

  const user = await db.user.findOne({ where: { email } });
  if (!user) {
    throw new Error("Please provide your valid email");
  }

  const resetToken = jwt.sign(
    { email, timeStamp: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: tokenExpiresin }
  );

  // const resetToken = await user.createPasswordResetToken();

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;
  console.log(resetURL);
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  await sendEmail({
    email: user.email,
    subject: "Your password reset token",
    message,
  });

  res.status(200).json({
    status: "success",
    message: "Token sent to email!",
  });
};

const resetPassword = async (req, res) => {
  const resetToken = req.params.resetToken;

  const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
  console.log(decoded);
  const { email, iat, exp } = decoded;

  return res.status(200).json({
    message: "Successfull",
    email,
    iat: iat * 60 * 1000,
    exp: exp * 60,
  });
};

const updatePassword = async (req, res) => {
  try {
    const { email, iat, exp, password } = req.body;

    const user = await db.user.findOne({ where: { email } });

    if (!user) {
      throw new Error("You're email doesnot exist");
    }

    if (iat >= exp) {
      throw new Error("You're token is expired!");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

const signout = async (req, res) => {
  res.status(200).json({
    message: "User logged out successfully",
  });
};
module.exports = {
  signupWithEmailandPassword,
  signinWithEmailPassword,
  signinWithOtp,
  sendOtp,
  forgotPassword,
  resetPassword,
  updatePassword,
  signout,
};
