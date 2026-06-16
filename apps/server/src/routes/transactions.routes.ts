import { Router } from "express";
import { transactionsService } from "../services/transactions.service.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { z } from "zod";

const router = Router();
router.use(requireAuth);

const listSchema = z.object({
  type: z.enum(["income", "expense", "transfer"]).optional(),
  categoryId: z.string().uuid().optional(),
  search: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sort: z.enum(["latest", "oldest", "amount"]).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

const createSchema = z.object({
  type: z.enum(["income", "expense", "transfer"]),
  amount: z.number().min(0),
  currency: z.string().optional(),
  merchant: z.string().min(1),
  categoryId: z.string().uuid().optional(),
  linkedAccountId: z.string().uuid().optional(),
  notes: z.string().optional(),
  isRecurring: z.boolean().optional(),
  transactionDate: z.string(), // YYYY-MM-DD
});

const updateSchema = createSchema.partial();

router.get("/", validate({ query: listSchema }), async (req, res, next) => {
  try {
    const data = await transactionsService.list({
      userId: req.user!.id,
      ...req.query as any,
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/recent", async (req, res, next) => {
  try {
    const data = await transactionsService.getRecent(req.user!.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await transactionsService.getById(req.user!.id, req.params.id as string);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", validate({ body: createSchema }), async (req, res, next) => {
  try {
    const data = await transactionsService.create({
      userId: req.user!.id,
      ...req.body,
    });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validate({ body: updateSchema }), async (req, res, next) => {
  try {
    const data = await transactionsService.update(req.user!.id, req.params.id as string, req.body);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const success = await transactionsService.remove(req.user!.id, req.params.id as string);
    if (!success) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
