const router = require("express").Router();

const { ReadingLists } = require("../models");

const { tokenExtractor } = require("../util/token");

router.post("/", async (req, res) => {
  await ReadingLists.create(req.body);
  return res.json(req.body);
});

router.post("/:id", tokenExtractor, async (req, res) => {
  await ReadingLists.findOne({ with: { id: req.params.id } }).then(
    reading_mark => {
      if (reading_mark.userId == req.decodedToken.id) {
        reading_mark.update(req.body);
      } else {
        throw new Error("No permission to mark read state");
      }
    }
  );
  return res.json(req.body);
});

module.exports = router;
