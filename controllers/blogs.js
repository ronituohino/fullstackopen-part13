const router = require("express").Router();

const { Op } = require("sequelize");

const { User, Blog } = require("../models");
const { tokenExtractor } = require("../util/token");

router.get("/", async (req, res) => {
  const search = req.query.search || "";

  const blogs = await Blog.findAll({
    include: {
      model: User,
    },
    order: [["likes", "DESC"]],
    where: {
      [Op.or]: {
        title: {
          [Op.substring]: search,
        },
        author: {
          [Op.substring]: search,
        },
      },
    },
  });
  return res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(blog);
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  await Blog.findByPk(req.params.id).then(blog => {
    if (blog.userId === req.decodedToken.id) {
      blog.destroy();
      return res.json(blog);
    } else {
      throw new Error("User did not create this blog");
    }
  });
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
