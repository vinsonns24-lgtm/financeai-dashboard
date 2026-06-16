import { Router } from "express";
import { budgetsService } from "../services/budgets.service.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { z } from "zod";

const router = Router();
router.use(requireAuth);

const querySchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2000),
});

const bodySchema = z.object({
  categoryId: z.string().uuid(),
  allocatedAmount: z.number().min(0),
  currency: z.string().optional(),
  month: z.number().min(1).max(12),
  year: z.number().min(2000),
});

router.get("/", validate({ query: querySchema }), async (req, res, next) => {
  try {
    const { month, year } = req.query as any;
    const data = await budgetsService.getByMonth(req.user!.id, month, year);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/summary", validate({ query: querySchema }), async (req, res, next) => {
  try {
    const { month, year } = req.query as any;
    const data = await budgetsService.getSummary(req.user!.id, month, year);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", validate({ body: bodySchema }), async (req, res, next) => {
  try {
    const data = await budgetsService.createOrUpdate({
      userId: req.user!.id,
      ...req.body,
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const success = await budgetsService.remove(req.user!.id, req.params.id as string);
    if (!success) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
