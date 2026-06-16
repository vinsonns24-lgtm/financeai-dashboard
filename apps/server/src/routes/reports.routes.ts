import { Router } from "express";
import { reportsService } from "../services/reports.service.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/summary", async (req, res, next) => {
  try {
    const data = await reportsService.getSummary(req.user!.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/spending-breakdown", async (req, res, next) => {
  try {
    const data = await reportsService.getSpendingBreakdown(req.user!.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
