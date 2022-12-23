const router = require("express").Router();

const { ReadingLists } = require("../models");

router.post("/", async (req, res) => {
  await ReadingLists.create(req.body);
  return res.json(req.body);
});

module.exports = router;
