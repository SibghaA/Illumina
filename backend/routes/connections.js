import express from "express";
import { connectToDatabase } from "../db/mongodb.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const connections = db.collection("connections");

    const newConnection = {
      mentorId: req.body.mentorId,
      mentorName: req.body.mentorName,
      requesterName: req.body.requesterName,
      requesterEmail: req.body.requesterEmail,
      requesterProfession: req.body.requesterProfession,
      message: req.body.message,
      goals: req.body.goals,
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    const result = await connections.insertOne(newConnection);

    res.status(201).json({
      success: true,
      message: "Connection request sent successfully",
      connectionId: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving connection request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send connection request",
    });
  }
});

export default router;
