const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.post("/password-reset", async (req, res) => {
  const { email } = req.body;

  // Validate the email
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Find the user by email
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a password reset token
  const passwordResetToken = await user.generatePasswordResetToken();
  const passwordResetUrl = `${process.env.BASE_URL}/password-reset/${passwordResetToken}`;
  await sendEmail(email, "Password reset link", passwordResetUrl);

  res.status(200).json({ message: "Password reset link sent" });
});

module.exports = router;
