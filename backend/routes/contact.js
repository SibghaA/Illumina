import express from "express";
import { connectToDatabase } from "../db/mongodb.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const messages = await db.collection("messages").find({}).toArray();
    res.json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: "Failed to get messages" });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { name, email, message } = req.body;

    const newMessage = {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };

    await db.collection("messages").insertOne(newMessage);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

export default router;
