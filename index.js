require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Blog extends Model {}
Blog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.TEXT },
    url: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "blog" }
);

const main = async () => {
  try {
    const blogs = await Blog.findAll();
    for (let i = 0; i < blogs.length; i++) {
      const blog = blogs[i];

      const authorString = blog.author != null ? `${blog.author}: ` : "";
      console.log(`${authorString}${blog.title}, ${blog.likes} likes`);
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();