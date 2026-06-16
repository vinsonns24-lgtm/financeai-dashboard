import { Router } from "express";
import { profileService } from "../services/profile.service.js";
import { requireAuth } from "../middleware/auth.js";
import { db } from "../db/index.js";
import { transaction, budget, goal, linkedAccount } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const data = await profileService.getSettings(req.user!.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const data = await profileService.updateSettings(req.user!.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/reset-data", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    // Delete all user data except profile and settings
    await db.delete(transaction).where(eq(transaction.userId, userId));
    await db.delete(budget).where(eq(budget.userId, userId));
    await db.delete(goal).where(eq(goal.userId, userId));
    await db.delete(linkedAccount).where(eq(linkedAccount.userId, userId));
    
    res.json({ success: true, message: "Data reset successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
