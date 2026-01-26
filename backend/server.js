/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import inngestRoutes from "./routes/inngestRoutes.js";
import { sendBudgetAlertEmail } from "./lib/inngest/sendEmail.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/budget", budgetRoutes);

const PORT = process.env.PORT || 3000;

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Fintrack backend!");
});

app.use("/api/inngest", inngestRoutes);

app.post("/api/v1/send-budget-alert", async (req, res) => {
  const { to, username, data } = req.body;

  const result = await sendBudgetAlertEmail({ to, username, data });

  if (!result) {
    return res.status(500).json({ message: "Failed to send email" });
  }

  res.status(200).json({ message: "Email sent successfully", result });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
