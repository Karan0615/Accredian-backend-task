const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");
const referralRoutes = require("./routes/referralRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Use Routes
app.use("/api/referrals", referralRoutes);

const PORT = 5000;
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);

  // Sync models with database
  try {
    await sequelize.sync(); // Use { force: true } only for development (resets DB)
    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
});
