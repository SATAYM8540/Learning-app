

import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();
const router = express.Router();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// POST /api/chat/ask
router.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // ⭐ UPDATED MODEL
      messages: [
        {
          role: "system",
          content:
            "You are CodingSikho AI Tutor. Help users fix code, explain concepts, debug errors, and teach programming clearly."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ message: reply });
  } catch (err) {
    console.error("GROQ ERROR:", err);
    res.status(500).json({
      error: "Groq chatbot failed",
      details: err.message
    });
  }
});

export default router;
