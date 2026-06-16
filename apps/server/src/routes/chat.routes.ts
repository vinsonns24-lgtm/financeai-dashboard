import { Router } from "express";
import { chatService } from "../services/chat.service.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.post("/message", async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const data = await chatService.processMessage(req.user!.id, message);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/insights", async (req, res, next) => {
  try {
    const data = await chatService.getDashboardInsights(req.user!.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
