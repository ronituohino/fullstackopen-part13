const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
      },
    ],
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const readFilter = req.query.read;
  const readFilterValid = readFilter === "true" || readFilter === "false";

  const user = await User.findOne({
    with: { id: req.params.id },
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
        through: {
          attributes: ["id", "read"],
          where: readFilterValid
            ? {
                read: readFilter,
              }
            : {},
        },
      },
    ],
  });
  res.json(user);
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
