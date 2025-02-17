import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const dataDir = path.join(__dirname, "../data");
const connectionsPath = path.join(dataDir, "connections.json");


async function ensureConnectionsFile() {
  try {
        
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

        
    try {
      await fs.access(connectionsPath);
    } catch {
      await fs.writeFile(connectionsPath, "[]");
    }
  } catch (error) {
    console.error("Error ensuring connections file exists:", error);
    throw error;
  }
}


router.post("/", async (req, res) => {
  try {
    await ensureConnectionsFile();
    const connections = JSON.parse(await fs.readFile(connectionsPath, "utf8"));
        
    const newConnection = {
      id: connections.length + 1,
      mentorId: req.body.mentorId,
      mentorName: req.body.mentorName,
      requesterName: req.body.requesterName,
      requesterEmail: req.body.requesterEmail,
      requesterProfession: req.body.requesterProfession,
      message: req.body.message,
      goals: req.body.goals,
      status: "pending",
      timestamp: new Date().toISOString()
    };
        
    connections.push(newConnection);
    await fs.writeFile(connectionsPath, JSON.stringify(connections, null, 2));
        
    res.status(201).json({
      success: true,
      message: "Connection request sent successfully"
    });
  } catch (error) {
    console.error("Error saving connection request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send connection request"
    });
  }
});

export default router; 