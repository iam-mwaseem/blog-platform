module.exports = (sequelize, DataTypes, Model) => {
  class Post extends Model {}

  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.UUID,
      },
      comments: {
        type: [DataTypes.TEXT],
        defaultValue: [],
      },

      likes: {
        type: [DataTypes.TEXT],
        defaultValue: [],
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "Post", // We need to choose the model name
    }
  );

  return Post;
};
// Post.sync({ alter: true });

// module.exports = Post;
