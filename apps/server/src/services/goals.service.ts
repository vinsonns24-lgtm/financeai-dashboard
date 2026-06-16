import { db } from "../db/index.js";
import { goal } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

interface CreateGoalParams {
  userId: string;
  name: string;
  icon?: string;
  targetAmount: number;
  currency?: string;
  dueDate?: string;
}

export const goalsService = {
  /**
   * List all goals.
   */
  async list(userId: string, status?: string) {
    const conditions = [eq(goal.userId, userId)];
    if (status) conditions.push(eq(goal.status, status));

    return db.query.goal.findMany({
      where: and(...conditions),
      orderBy: (g, { asc }) => [asc(g.dueDate)],
    });
  },

  /**
   * Get single goal.
   */
  async getById(userId: string, goalId: string) {
    return db.query.goal.findFirst({
      where: and(eq(goal.id, goalId), eq(goal.userId, userId)),
    });
  },

  /**
   * Create goal.
   */
  async create(params: CreateGoalParams) {
    const [created] = await db
      .insert(goal)
      .values({
        userId: params.userId,
        name: params.name,
        icon: params.icon ?? "savings",
        targetAmount: params.targetAmount,
        currency: params.currency ?? "IDR",
        dueDate: params.dueDate ?? null,
      })
      .returning();
    return created;
  },

  /**
   * Update goal.
   */
  async update(userId: string, goalId: string, data: Partial<CreateGoalParams & { status: string }>) {
    const existing = await db.query.goal.findFirst({
      where: and(eq(goal.id, goalId), eq(goal.userId, userId)),
    });

    if (!existing) return null;

    const [updated] = await db
      .update(goal)
      .set(data)
      .where(and(eq(goal.id, goalId), eq(goal.userId, userId)))
      .returning();
    return updated;
  },

  /**
   * Contribute to a goal.
   */
  async contribute(userId: string, goalId: string, amount: number) {
    const existing = await db.query.goal.findFirst({
      where: and(eq(goal.id, goalId), eq(goal.userId, userId)),
    });

    if (!existing) return null;

    const newAmount = existing.currentAmount + amount;
    const newStatus = newAmount >= existing.targetAmount ? "completed" : existing.status;

    const [updated] = await db
      .update(goal)
      .set({ currentAmount: newAmount, status: newStatus })
      .where(and(eq(goal.id, goalId), eq(goal.userId, userId)))
      .returning();
    return updated;
  },

  /**
   * Delete goal.
   */
  async remove(userId: string, goalId: string) {
    const existing = await db.query.goal.findFirst({
      where: and(eq(goal.id, goalId), eq(goal.userId, userId)),
    });

    if (!existing) return false;

    await db
      .delete(goal)
      .where(and(eq(goal.id, goalId), eq(goal.userId, userId)));
    return true;
  },
};
