import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const dataDir = path.join(__dirname, "../data");
const mentorsPath = path.join(dataDir, "mentors.json");

const defaultMentors = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    profession: "Senior Software Engineer",
    location: "San Francisco, CA",
    expertise: ["Technology", "Leadership"],
    experience: "15 years in software development",
    availability: "10 hours/week",
    about: "Passionate about helping women succeed in tech",
    mentorStyle: "Collaborative and goal-oriented",
    email: "sarah.j@example.com"
  },
  {
    id: 2,
    firstName: "Emily",
    lastName: "Chen",
    profession: "Marketing Director",
    location: "New York, NY",
    expertise: ["Marketing", "Business"],
    experience: "12 years in digital marketing",
    availability: "5 hours/week",
    about: "Helping the next generation of marketers thrive",
    mentorStyle: "Results-driven and supportive",
    email: "emily.c@example.com"
  },
  {
    id: 3,
    firstName: "Maria",
    lastName: "Rodriguez",
    profession: "Healthcare Executive",
    location: "Chicago, IL",
    expertise: ["Healthcare", "Leadership"],
    experience: "20 years in healthcare management",
    availability: "8 hours/week",
    about: "Dedicated to advancing women in healthcare leadership",
    mentorStyle: "Nurturing and strategic",
    email: "maria.r@example.com"
  },
  {
    id: 4,
    firstName: "Jessica",
    lastName: "Taylor",
    profession: "Finance Manager",
    location: "Boston, MA",
    expertise: ["Finance", "Business"],
    experience: "10 years in financial services",
    availability: "6 hours/week",
    about: "Helping women build successful careers in finance",
    mentorStyle: "Analytical and methodical",
    email: "jessica.t@example.com"
  }
];

async function ensureMentorsFile() {
  try {
        
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

        
    try {
      await fs.access(mentorsPath);
      const content = await fs.readFile(mentorsPath, "utf8");
      const mentors = JSON.parse(content);
      if (mentors.length === 0) {
        await fs.writeFile(mentorsPath, JSON.stringify(defaultMentors, null, 2));
      }
    } catch {
            
      await fs.writeFile(mentorsPath, JSON.stringify(defaultMentors, null, 2));
    }
  } catch (error) {
    console.error("Error ensuring mentors file exists:", error);
    throw error;
  }
}

router.get("/", async (req, res) => {
  try {
    await ensureMentorsFile();
    const mentors = JSON.parse(await fs.readFile(mentorsPath, "utf8"));
    res.json(mentors);
  } catch (error) {
    console.error("Error getting mentors:", error);
    res.status(500).json({ message: "Failed to get mentors" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await ensureMentorsFile();
    const mentors = JSON.parse(await fs.readFile(mentorsPath, "utf8"));
    const mentorId = parseInt(req.params.id);
    const mentor = mentors.find(m => m.id === mentorId);
        
    if (mentor) {
      res.json(mentor);
    } else {
      res.status(404).json({
        error: "Mentor not found"
      });
    }
  } catch (error) {
    console.error("Error getting mentor:", error);
    res.status(500).json({ message: "Failed to get mentor" });
  }
});

router.post("/", async (req, res) => {
  try {
    await ensureMentorsFile();
    const mentors = JSON.parse(await fs.readFile(mentorsPath, "utf8"));
        
    const newMentor = {
      id: mentors.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profession: req.body.profession,
      location: req.body.location,
      expertise: req.body.expertise,
      experience: req.body.experience,
      availability: req.body.availability,
      email: req.body.email
    };
        
    mentors.push(newMentor);
    await fs.writeFile(mentorsPath, JSON.stringify(mentors, null, 2));
        
    res.status(201).json(newMentor);
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ message: "Failed to add mentor" });
  }
});

export default router; 