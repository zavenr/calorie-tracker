import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// Get all food logs
app.get("/api/foodlogs", async (req, res) => {
  try {
    const logs = await prisma.foodLog.findMany();
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch food logs" });
  }
});

// Create a new food log (with debug logging)
app.post("/api/foodlogs", async (req, res) => {
  console.log("Received new log:", req.body);

  try {
    const newLog = await prisma.foodLog.create({
      data: req.body,
    });
    res.status(201).json(newLog);
  } catch (err) {
    console.error("❌ Prisma error:", err);
    res.status(500).json({ error: "Failed to create food log" });
  }
});

//Delete all logs
app.delete("/api/foodlogs", async (req, res) => {
  try {
    await prisma.foodLog.deleteMany({});
    res.status(200).json({ message: "All logs deleted" });
  } catch (err) {
    console.error("❌ Failed to delete logs:", err);
    res.status(500).json({ error: "Failed to delete food logs" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
