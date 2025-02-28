const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Set to true for debugging queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Render-hosted PostgreSQL
    },
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { sequelize, connectDB };
