import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/index.js";

import transactionRoutes from "./routes/transactions.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import budgetRoutes from "./routes/budgets.routes.js";
import goalRoutes from "./routes/goals.routes.js";
import reportRoutes from "./routes/reports.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Auth Route (handled fully by better-auth)
app.all("/api/auth/*splat", toNodeHandler(auth));

// API Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/chat", chatRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
