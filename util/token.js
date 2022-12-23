const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { User, Session } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      req.decodedToken = jwt.verify(token, SECRET);

      await Session.findOne({ where: { token } }).then(async session => {
        if (!session) {
          throw new Error("Token not in sessions");
        }
        console.log("sessions found!", session);
        const user = await User.findOne({ where: { id: session.userId } });
        console.log("user found!", user);
        if (user.disabled) {
          throw new Error("User is disabled");
        }
      });
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = { tokenExtractor };
