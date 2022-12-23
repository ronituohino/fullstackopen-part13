const router = require("express").Router();

const { User, Blog, ReadingLists } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
      },
      {
        model: Blog,
        as: "reading",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId", "likes"],
        },
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Change username
router.put("/:username", async (req, res) => {
  await User.findOne({ username: req.params.username }).then(user => {
    user.update({ username: req.body.username });
  });
  return res.json({ username: req.body.username });
});

module.exports = router;
