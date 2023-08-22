const blogsModel = require("../models/blogs");
const mongoose = require("mongoose");
async function deleteBlogs(req, res) {
  try {
    const { blog_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blog_id)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Blog Id" });
    }
    await blogsModel.findOneAndUpdate(
      { _id: blog_id },
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true }
    );
    res.send({ massage: "Blog Deleted Successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
async function createBlog(req, res) {
  try {
    const { title, content } = req.body;
    const newBlog = new blogsModel({
      title,
      content,
      author: req.user._id,
    });
    await newBlog.save();
    res.send({ massage: "Blog Added Successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function updateBlog(req, res) {
  try {
    const { blog_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blog_id)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Blog Id" });
    }
    const { content } = req.body;

    await blogsModel.findOneAndUpdate(
      { _id: blog_id },
      {
        $set: {
          content: content,
          isApproved: false,
        },
      },
      { new: true }
    );
    res.send({ massage: "Blog Updated Successfully" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
async function approvedBlog(req, res) {
  try {
    const { blog_id } = req.params;
    console.log(blog_id);
    if (!mongoose.Types.ObjectId.isValid(blog_id)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Blog Id" });
    }
    await blogsModel.findOneAndUpdate(
      { _id: blog_id },
      {
        $set: {
          isApproved: true,
        },
      },
      { new: true }
    );
    res.send({ massage: "Blog Approved Successfully" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function getBlogAsPerUser(req, res) {
  try {
    if (req.user.isAdmin) {
      // If user is an admin, fetch all approved blogs

      var blogs = await blogsModel.find({
        isApproved: true,
        isDeleted: false,
      });
      return res.json({ status: "success", data: blogs });
    } else {
      // If user is not an admin, fetch blogs authored by the user
      var blogs = await blogsModel.find({
        author: req.user.id,
        isApproved: true,
        isDeleted: false,
      });
      return res.json({ status: "success", data: blogs });
    }
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
}
async function getAllBlogsForHome(req, res) {
  try {
    var blogs = await blogsModel.find({
      isApproved: true,
      isDeleted: false,
    });
    return res.json({ status: "success", data: blogs });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
}
async function getPendingBlogs(req, res) {
  try {
    if (req.user.isAdmin) {
      var blogs = await blogsModel.find({
        isApproved: false,
        isDeleted: false,
      });
      return res.json({ status: "success", data: blogs });
    } else {
      var blogs = await blogsModel.find({
        author: req.user.id,
        isApproved: false,
        isDeleted: false,
      });
      return res.json({ status: "success", data: blogs });
    }
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
}

module.exports = {
  createBlog,
  updateBlog,
  deleteBlogs,
  approvedBlog,
  getBlogAsPerUser,
  getAllBlogsForHome,
  getPendingBlogs,
};
