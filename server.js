require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");
const referralRoutes = require("./routes/referralRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB()
  .then(() => console.log("✅ Database connection established!"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Use Routes
app.use("/api/referrals", referralRoutes);

const PORT = process.env.PORT || 5000;

// Start the server only after ensuring DB is connected
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);

  // Sync models with database safely
  try {
    await sequelize.authenticate();
    console.log("✅ Database authenticated successfully!");

    await sequelize.sync(); // Add { force: true } only for dev (resets DB)
    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
});

