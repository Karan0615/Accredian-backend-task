const express = require("express");
const router = express.Router();
const { submitReferral, getAllReferrals } = require("../controllers/referralController");

// Debugging log
router.post("/", (req, res, next) => {
  console.log("🔹 Referral received:", req.body);
  next();
});

// Corrected route (Removed `/submit`, so it matches `/api/referrals`)
router.post("/", submitReferral);

// Get all referrals
router.get("/", getAllReferrals);

module.exports = router;
