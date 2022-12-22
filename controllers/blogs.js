const router = require("express").Router();

const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  return res.json(blogs);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
  return res.json(blog);
});

router.delete("/:id", async (req, res) => {
  const blog = await Blog.destroy({ where: { id: req.params.id } });
  return res.json(blog);
});

router.put("/:id", async (req, res) => {
  let newLikes = 0;
  await Blog.findByPk(req.params.id).then(blog => {
    newLikes = blog.likes + 1;
    blog.update({ likes: newLikes });
  });
  return res.json({ likes: newLikes });
});

module.exports = router;
