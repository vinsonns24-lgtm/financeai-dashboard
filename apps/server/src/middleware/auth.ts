import type { Request, Response, NextFunction } from "express";
import { auth } from "../auth/index.js";
import { fromNodeHeaders } from "better-auth/node";

// Extend Express Request to include user info
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        image?: string | null;
      };
    }
  }
}

/**
 * Middleware that verifies the user's session via Better Auth.
 * Attaches `req.user` with the authenticated user's info.
 * Returns 401 if no valid session is found.
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    req.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
}
