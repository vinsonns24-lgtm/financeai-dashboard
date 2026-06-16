import { Router } from "express";
import { profileService } from "../services/profile.service.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const data = await profileService.getProfile(req.user!.id);
    res.json({
      ...req.user,
      profile: data,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const data = await profileService.updateProfile(req.user!.id, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/linked-accounts", async (req, res, next) => {
  try {
    const data = await profileService.getLinkedAccounts(req.user!.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/linked-accounts", async (req, res, next) => {
  try {
    const data = await profileService.addLinkedAccount(req.user!.id, req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/linked-accounts/:id", async (req, res, next) => {
  try {
    await profileService.removeLinkedAccount(req.user!.id, req.params.id as string);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
