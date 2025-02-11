const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");


const dataDir = path.join(__dirname, "../data");
const messagesPath = path.join(dataDir, "messages.json");


async function ensureMessagesFile() {
  try {
        
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

        
    try {
      await fs.access(messagesPath);
    } catch {
      await fs.writeFile(messagesPath, "[]");
    }
  } catch (error) {
    console.error("Error ensuring messages file exists:", error);
    throw error;
  }
}


router.get("/", async (req, res) => {
  await ensureMessagesFile();
  const messages = await fs.readFile(messagesPath, "utf8");
  res.json(JSON.parse(messages));
});


router.post("/", async (req, res) => {
  try {
    await ensureMessagesFile();
    const { name, email, message } = req.body;
        
        
    const messages = JSON.parse(await fs.readFile(messagesPath, "utf8"));
        
        
    const newMessage = {
      id: messages.length + 1,
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };
        
    messages.push(newMessage);
        
        
    await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2));
        
    res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
});

module.exports = router; 