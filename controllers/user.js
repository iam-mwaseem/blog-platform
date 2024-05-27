const db = require("../config/db");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.user.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  const user = await db.user.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.editProfile = async (req, res) => {
  try {
    const user = await db.user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadFile = async (req, res) => {
  return res.status(200).json({
    message: "Files are uploaded successfully",
    files: req.files,
  });
};
