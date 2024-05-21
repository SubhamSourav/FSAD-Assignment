// server.js
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { read, write } = require("./readWrite");
const { authenticateToken, verifyRole } = require("./middlewares");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Assignment 2 Sever is live" });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let users = read();

  const user = users.some((user) => user.username === username);

  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role: users.length ? "user" : "admin",
  };

  users.push(newUser);
  write(users);

  const token = jwt.sign({ userId: newUser.id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  newUser.password = undefined;
  res.json({
    success: "true",
    message: "New User Added Successfully",
    token,
    user: newUser,
  });
});

// Login route
app.post("/login", async (req, res) => {
  // Mocked authentication logic
  const { username, password } = req.body;
  const users = read();
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValidatedPassword = await bcrypt.compare(password, user.password);

  if (!isValidatedPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ success: "true", message: "Logged In", token });
});

// Dummy protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

app.get("/user", authenticateToken, (req, res) => {
  res.json({ message: "It can be accessed by everyone" });
});

app.get("/admin", authenticateToken, verifyRole("admin"), (req, res) => {
  res.json({ message: "It can be accessed by Admin only" });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
