const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a new Sequelize instance with explicit parameters
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306, // Default MySQL port
  dialect: "mysql",
  logging: false, // Set to true for debugging queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { sequelize, connectDB };
