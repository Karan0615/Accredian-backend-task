const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a new Sequelize instance using DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Render
    },
  },
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
