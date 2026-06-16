import { Router } from "express";
import { categoriesService } from "../services/categories.service.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { z } from "zod";

const router = Router();
router.use(requireAuth);

const categorySchema = z.object({
  name: z.string().min(1).max(64),
  icon: z.string().optional(),
  color: z.string().optional(),
});

router.get("/", async (req, res, next) => {
  try {
    await categoriesService.seedDefaults(req.user!.id);
    const data = await categoriesService.list(req.user!.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", validate({ body: categorySchema }), async (req, res, next) => {
  try {
    const data = await categoriesService.create(req.user!.id, req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validate({ body: categorySchema.partial() }), async (req, res, next) => {
  try {
    const data = await categoriesService.update(req.user!.id, req.params.id as string, req.body);
    if (!data) return res.status(404).json({ error: "Not found or cannot edit default category" });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const success = await categoriesService.remove(req.user!.id, req.params.id as string);
    if (!success) return res.status(404).json({ error: "Not found or cannot delete default category" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
