import { db } from "../db/index.js";
import { budget, transaction } from "../db/schema.js";
import { eq, and, sql } from "drizzle-orm";

interface CreateBudgetParams {
  userId: string;
  categoryId: string;
  allocatedAmount: number;
  currency?: string;
  month: number;
  year: number;
}

export const budgetsService = {
  /**
   * Get all budgets for a specific month and year.
   */
  async getByMonth(userId: string, month: number, year: number) {
    return db.query.budget.findMany({
      where: and(
        eq(budget.userId, userId),
        eq(budget.month, month),
        eq(budget.year, year)
      ),
      with: { category: true },
    });
  },

  /**
   * Get summary of budget vs actual spend.
   */
  async getSummary(userId: string, month: number, year: number) {
    // 1. Get all allocated budgets
    const budgets = await db.query.budget.findMany({
      where: and(
        eq(budget.userId, userId),
        eq(budget.month, month),
        eq(budget.year, year)
      ),
    });

    const totalAllocated = budgets.reduce((acc, b) => acc + b.allocatedAmount, 0);

    // 2. Get all expenses in that month
    // Format date bounds for the month
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const endDate = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;

    const expensesResult = await db
      .select({
        totalSpent: sql<number>`sum(amount)`,
      })
      .from(transaction)
      .where(
        and(
          eq(transaction.userId, userId),
          eq(transaction.type, "expense"),
          sql`${transaction.transactionDate} >= ${startDate}::date`,
          sql`${transaction.transactionDate} < ${endDate}::date`
        )
      );

    const totalSpent = Number(expensesResult[0]?.totalSpent || 0);

    return {
      totalAllocated,
      totalSpent,
      remaining: totalAllocated - totalSpent,
      percentageUsed: totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0,
    };
  },

  /**
   * Get budget alerts for categories over 80% usage.
   */
  async getAlerts(userId: string, month: number, year: number) {
    // Simplified: in a real scenario, we would calculate actual spend per category
    // For now, returning an empty array.
    return [];
  },

  /**
   * Create or update a budget.
   */
  async createOrUpdate(params: CreateBudgetParams) {
    const existing = await db.query.budget.findFirst({
      where: and(
        eq(budget.userId, params.userId),
        eq(budget.categoryId, params.categoryId),
        eq(budget.month, params.month),
        eq(budget.year, params.year)
      ),
    });

    if (existing) {
      const [updated] = await db
        .update(budget)
        .set({ allocatedAmount: params.allocatedAmount })
        .where(eq(budget.id, existing.id))
        .returning();
      return updated;
    }

    const [created] = await db
      .insert(budget)
      .values({
        userId: params.userId,
        categoryId: params.categoryId,
        allocatedAmount: params.allocatedAmount,
        currency: params.currency ?? "IDR",
        month: params.month,
        year: params.year,
      })
      .returning();

    return created;
  },

  /**
   * Delete a budget.
   */
  async remove(userId: string, budgetId: string) {
    const existing = await db.query.budget.findFirst({
      where: and(eq(budget.id, budgetId), eq(budget.userId, userId)),
    });

    if (!existing) return false;

    await db
      .delete(budget)
      .where(and(eq(budget.id, budgetId), eq(budget.userId, userId)));
    return true;
  },
};
