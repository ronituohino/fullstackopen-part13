const router = require("express").Router();

const { tokenExtractor } = require("../util/token");

const { Session } = require("../models");

router.delete("/", tokenExtractor, async (req, res) => {
  Session.destroy({ where: { userId: req.decodedToken.id } });
  return res.json({ logout: "successful" });
});

module.exports = router;
