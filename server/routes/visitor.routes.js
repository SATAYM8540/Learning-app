import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, mobile, study, city, message } = req.body;

  if (!name || !email || !mobile || !study || !city) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "satyamkumar00049@gmail.com",
      subject: "New Visitor Registered",
      html: `
        <h2>New Visitor Details</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Study:</b> ${study}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Message:</b> ${message || "None"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Details sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Email send failed" });
  }
});

export default router;
