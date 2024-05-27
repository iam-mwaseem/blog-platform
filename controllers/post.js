const db = require("../config/db");
exports.createpost = async (req, res) => {
  try {
    const { title, content, id } = req.body;

    const post = await db.post.create({ title, content, userid: id });
    return res.status(201).json(post.toJSON());
  } catch (error) {
    console.log(error);
  }
};
exports.getAllPost = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //2.Advanced filtering
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    let query = db.post.find(JSON.parse(queryStr));
    if (req.query.sort) {
      const sort = req.query.sort.split(",").join(" ");
      query = query.sort(sort);
    } else {
      query.sort("date");
    }

    //Limiting fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    if (req.query.page && req.query.limit) {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);
    }

    const posts = await query;

    return res.status(200).json({
      message: "Succefull",
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getpost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await db.post.findOne({ where: { id } });
    console.log(post);
    if (post) {
      return res.status(200).json({
        message: "Successfull",
        post: post,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updatepost = async (req, res) => {
  try {
    const post = await db.post.findOne({ where: req.params.id });
    if (post) {
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;
      const updatedpost = await post.save();
      res.json(updatedpost);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deletepost = async (req, res) => {
  try {
    const post = await db.post.findById(req.params.id);
    if (post) {
      await post.deleteOne();
      res.json({ message: "post removed" });
    }
  } catch (error) {
    console.log(error);
  }
};
