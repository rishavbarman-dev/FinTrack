import express from "express";
import { serve } from "inngest/express";
import { inngest } from "../lib/inngest/client.js";
import {
  checkBudgetAlert,
  generateMonthlyReports,
} from "../lib/inngest/function.js";

// eslint-disable-next-line no-unused-vars
const router = express.Router();

// Serve your Inngest functions here
export default serve({
  client: inngest,
  functions: [checkBudgetAlert, generateMonthlyReports],
});
