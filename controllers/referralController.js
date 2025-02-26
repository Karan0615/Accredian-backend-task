const { Referral } = require("../models/Referral");

// @desc    Submit referral form
// @route   POST /api/referrals/submit
// @access  Public
const submitReferral = async (req, res) => {
  try {
    const { name, email, friendEmail, message } = req.body;

    // Validate required fields
    if (!name || !email || !friendEmail) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    // Create a new referral entry
    const newReferral = await Referral.create({
      name,
      email,
      friendEmail,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Referral submitted successfully!",
      data: newReferral,
    });
  } catch (error) {
    console.error("❌ Error submitting referral:", error);
    return res.status(500).json({ error: "Failed to submit referral. Please try again." });
  }
};

// @desc    Get all referrals
// @route   GET /api/referrals
// @access  Public
const getAllReferrals = async (req, res) => {
  try {
    const referrals = await Referral.findAll();
    return res.status(200).json({ success: true, data: referrals });
  } catch (error) {
    console.error("❌ Error fetching referrals:", error);
    return res.status(500).json({ error: "Failed to fetch referrals." });
  }
};

module.exports = {
  submitReferral,
  getAllReferrals,
};  