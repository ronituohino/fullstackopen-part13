const Blog = require("./blog");
const User = require("./user");
const ReadingLists = require("./readingLists");
const Session = require("./session");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingLists, as: "reading" });
Blog.belongsToMany(User, { through: ReadingLists, as: "read_by_users" });

module.exports = {
  Blog,
  User,
  ReadingLists,
  Session,
};
