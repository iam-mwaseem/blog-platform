const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize(
  // "blogplatform",
  // "root",
  // "Ws87796488@$sh",

  `${process.env.MYSQL_DATABASE}`,
  `${process.env.MYSQL_USERNAME}`,
  `${process.env.MYSQL_PASSWORD}`,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./../models/user")(sequelize, DataTypes, Model);
db.post = require("./../models/post")(sequelize, DataTypes, Model);

//Relations

db.user.hasMany(db.post, {
  // key: "id",
  as: "posts",
  // foreignKey: "userId",
  // foriegnKey: "userId",
});
db.post.belongsTo(db.user, {
  foriengKey: {
    name: "userId",
  },
  // as: "user",
});

db.sequelize.sync({ alter: true });

module.exports = db;
