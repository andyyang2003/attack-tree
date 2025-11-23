import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Jiu-Jitsu Attack Tree API is running");
});

// sample move route
app.get("/move", (req, res) => {
  res.json({
    id: 1,
    name: "Armbar from Guard",
    position: "Closed Guard",
    category: "Submission",
    grips: ["cross-grip", "collar-sleeve"],
    attackPath: ["Triangle", "Omoplata"]
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
