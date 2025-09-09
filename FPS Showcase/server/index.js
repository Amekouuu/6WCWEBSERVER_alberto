// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const items = [
  { id: 1, name: "Valorant", genre: "Tactical Shooter" },
  { id: 2, name: "CS:GO", genre: "Competitive FPS" },
  { id: 3, name: "Overwatch", genre: "Hero Shooter" }
];

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.get("/", (req, res) => {
  res.send(`Visit  http://localhost:${PORT}/api/items`);
});

app.listen(PORT, () => {
  console.log(`✅ Express server running at http://localhost:${PORT}`);
});
