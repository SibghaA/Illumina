import express from "express";
const router = express.Router();

const users = [];

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      token: "mock-jwt-token",
      user: userWithoutPassword,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/api/mentors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error("Failed to create mentor profile");
    }

    const mentor = await response.json();
    res.status(201).json({
      success: true,
      message: "Mentor registered successfully",
      mentor,
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register mentor",
    });
  }
});

export default router;
