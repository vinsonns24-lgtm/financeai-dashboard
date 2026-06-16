import { Router } from "express";
import { goalsService } from "../services/goals.service.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { z } from "zod";

const router = Router();
router.use(requireAuth);

const querySchema = z.object({
  status: z.enum(["active", "paused", "completed"]).optional(),
});

const bodySchema = z.object({
  name: z.string().min(1),
  icon: z.string().optional(),
  targetAmount: z.number().min(0),
  currency: z.string().optional(),
  dueDate: z.string().optional(),
});

const contributeSchema = z.object({
  amount: z.number().positive(),
});

router.get("/", validate({ query: querySchema }), async (req, res, next) => {
  try {
    const data = await goalsService.list(req.user!.id, (req.query as any).status);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", validate({ body: bodySchema }), async (req, res, next) => {
  try {
    const data = await goalsService.create({
      userId: req.user!.id,
      ...req.body,
    });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validate({ body: bodySchema.partial() }), async (req, res, next) => {
  try {
    const data = await goalsService.update(req.user!.id, req.params.id as string, req.body);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/contribute", validate({ body: contributeSchema }), async (req, res, next) => {
  try {
    const data = await goalsService.contribute(req.user!.id, req.params.id as string, req.body.amount);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const success = await goalsService.remove(req.user!.id, req.params.id as string);
    if (!success) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
