const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { SECRET } = require("../util/config");
const User = require("../models/user");

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userToken, SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
