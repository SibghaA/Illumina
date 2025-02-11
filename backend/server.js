const express = require("express");
const cors = require("cors");
const path = require("path");
const mentorRoutes = require("./routes/mentors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const contactRoutes = require("./routes/contact");
const connectionsRoutes = require("./routes/connections");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use("/", express.static(path.join(__dirname, "../frontend")));
app.use("/frontend", express.static(path.join(__dirname, "../frontend")));
app.use("/frontend/css", express.static(path.join(__dirname, "../frontend/css")));
app.use("/frontend/js", express.static(path.join(__dirname, "../frontend/js")));
app.use("/images", express.static(path.join(__dirname, "../images")));


app.use("/api/mentors", mentorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/connections", connectionsRoutes);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/signup.html"));
});

app.get("/mentors", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/mentors.html"));
});

app.get("/mentorprofile", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/mentorprofile.html"));
});

app.get("/signup-mentor", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/signup-mentor.html"));
});

app.get("/signup-mentee", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/signup-mentee.html"));
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 