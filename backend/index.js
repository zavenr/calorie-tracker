/**
 * CalorieTracker Backend API
 *
 * A simple Express.js API for tracking food calories and nutrition data.
 * Uses PostgreSQL with Prisma ORM for data persistence.
 */

// Import required dependencies
import express from "express"; // Web framework for Node.js
import cors from "cors"; // Enable Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Load environment variables from .env file
import { PrismaClient } from "@prisma/client"; // Database ORM client

// Load environment variables from .env file
dotenv.config();

// Configuration object - centralized app settings
const config = {
  port: process.env.PORT || 3001, // Server port (default: 3001)
  isDevelopment: process.env.NODE_ENV !== "production", // Environment check
};

// logging utility - better than console.log
const logger = {
  // Log general information (always shown)
  info: (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`, data || "");
  },
  // Log errors (always shown)
  error: (message, error = null) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`, error || "");
  },
  // Log debug info (only shown in development)
  debug: (message, data = null) => {
    if (config.isDevelopment) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] DEBUG: ${message}`, data || "");
    }
  },
};

// Initialize Express app and database client
const app = express(); // Create Express application
const prisma = new PrismaClient(); // Create Prisma database client

// Middleware setup
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies

// === ROUTES ===

// Health check endpoint - confirms API is running
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// GET /api/foodlogs - Retrieve all food log entries
app.get("/api/foodlogs", async (req, res) => {
  try {
    logger.debug("Fetching all food logs");

    // Query database for all food log records
    const logs = await prisma.foodLog.findMany();

    logger.info(`Retrieved ${logs.length} food logs`);
    res.json(logs); // Return logs as JSON
  } catch (err) {
    // Handle database or other errors
    logger.error("Failed to fetch food logs", err.message);
    res.status(500).json({ error: "Failed to fetch food logs" });
  }
});

// POST /api/foodlogs - Create a new food log entry
app.post("/api/foodlogs", async (req, res) => {
  logger.debug("Received new food log", req.body);

  // Extract required fields from request body
  const { food_name, calories, protein, carbs, fats } = req.body;
  // Basic input validation - ensure all required fields are present
  if (
    !food_name ||
    calories === undefined ||
    protein === undefined ||
    carbs === undefined ||
    fats === undefined
  ) {
    logger.error("Missing required fields in food log creation");
    return res.status(400).json({
      // 400 = Bad Request
      error:
        "All fields (food_name, calories, protein, carbs, fats) are required",
    });
  }

  try {
    // Create new food log record in database
    const newLog = await prisma.foodLog.create({
      data: req.body, // Prisma will handle the data mapping
    });

    logger.info(`Created new food log: ${food_name} (${calories} cal)`);
    res.status(201).json(newLog); // 201 = Created
  } catch (err) {
    // Handle database errors (duplicate entries, constraint violations, etc.)
    logger.error("Failed to create food log", err.message);
    res.status(500).json({ error: "Failed to create food log" });
  }
});

// DELETE /api/foodlogs - Remove all food logs (development only)
app.delete("/api/foodlogs", async (req, res) => {
  // Security check - only allow this dangerous operation in development
  if (!config.isDevelopment) {
    logger.error("Attempted to delete all logs in production");
    return res
      .status(403) // 403 = Forbidden
      .json({ error: "This operation is only allowed in development" });
  }

  try {
    // Delete all records from the food_logs table
    const result = await prisma.foodLog.deleteMany({});

    logger.info(`Deleted ${result.count} food logs`);
    res.status(200).json({ message: `Deleted ${result.count} logs` });
  } catch (err) {
    // Handle database errors
    logger.error("Failed to delete food logs", err.message);
    res.status(500).json({ error: "Failed to delete food logs" });
  }
});

// === SERVER STARTUP ===

// Start the Express server
app.listen(config.port, () => {
  logger.info(
    `CalorieTracker API server started on http://localhost:${config.port}`
  );
  logger.info(
    `Environment: ${config.isDevelopment ? "Development" : "Production"}`
  );
});
