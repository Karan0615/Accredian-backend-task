const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

// Load OAuth credentials
const credentialsPath = path.join(__dirname, "credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

// Extract OAuth details
const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Refresh Token (You need to generate this manually)
const REFRESH_TOKEN = "YOUR_REFRESH_TOKEN"; // Replace with your refresh token

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Function to send email
async function sendReferralEmail(toEmail, referrerName, refereeName) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    // Configure Nodemailer
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "karansinghipg2009@gmail.com", // Your Gmail address
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Email details
    const mailOptions = {
      from: `"${referrerName}" <karansinghipg2009@gmail.com>`, 
      to: toEmail,
      subject: "You've been referred!",
      text: `Hey ${refereeName},\n\n${referrerName} has referred you to our platform!`,
      html: `<p>Hey <b>${refereeName}</b>,</p><p>${referrerName} has referred you to our platform!</p>`,
    };

    // Send email
    const result = await transport.sendMail(mailOptions);
    console.log("✅ Email sent:", result.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

module.exports = sendReferralEmail;
