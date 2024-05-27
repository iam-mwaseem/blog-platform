// const sequelize = require("../config/db");
// const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}
  User.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      passwordConfirm: {
        type: DataTypes.STRING,
      },
      otp: {
        type: DataTypes.STRING,
      },
      otpCreatedTime: {
        type: DataTypes.DATE,
      },
      otpAttempts: {
        type: DataTypes.INTEGER,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
      },
      blockUntil: {
        type: DataTypes.DATE,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
      },
      passwordResetExpires: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name}
    }
  );
  return User;
};
// User.sync({ alter: true });

/*
const User = sequelize.define("User", {
  userid: {
    type: DataTypes.UUID,
    autoIncrement: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  passwordConfirm: {
    type: DataTypes.NUMBER,
  },
  otp: {
    type: DataTypes.STRING,
  },
  otpCreatedTime: {
    type: DataTypes.DATE,
  },
  otpAttempts: {
    type: DataTypes.NUMBER,
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
  },
  blockUntil: {
    type: DataTypes.DATE,
  },
  passwordResetToken: {
    type: DataTypes.STRING,
  },
  passwordResetExpires: {
    type: DataTypes.STRING,
  },
});
*/
// console.log(sequelize.models.Post);
// console.log("POST", Post);
// User.hasOne(Post);
// module.exports = User;
