const { Router } = require("express");
const router = Router();

const verifyToken = require("../middlewares/verifyAuthToken");

const {
  createBlog,
  updateBlog,
  deleteBlogs,
  approvedBlog,
  getBlogAsPerUser,
  getAllBlogsForHome,
  getPendingBlogs,
} = require("../controllers/blogsControllers");
const {
  createBlogsValidation,
  updateBlogsValidation,
} = require("../middlewares/blogValidation");

router.post("/blogs/create", verifyToken, createBlogsValidation, createBlog);
router.put(
  "/blogs/update/:blog_id",
  verifyToken,
  updateBlogsValidation,
  updateBlog
);
router.put("/blogs/approvedBlog/:blog_id", verifyToken, approvedBlog);
router.get("/blogs/getAllBlogsForHome", getAllBlogsForHome);
router.get("/blogs/getBlogAsPerUser", verifyToken, getBlogAsPerUser);
router.get("/blogs/getPendingBlogs", verifyToken, getPendingBlogs);
router.delete("/blogs/delete/:blog_id", verifyToken, deleteBlogs);

module.exports = router;
