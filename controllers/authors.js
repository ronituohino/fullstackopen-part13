const router = require("express").Router();

const { Op } = require("sequelize");

const { Blog } = require("../models");
const { sequelize } = require("../util/db");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("blog")), "blog_amount"],
      [sequelize.fn("SUM", sequelize.col("likes")), "sum_likes"],
    ],
    where: {
      author: {
        [Op.ne]: null,
      },
    },
  });
  return res.json(blogs);
});

module.exports = router;
