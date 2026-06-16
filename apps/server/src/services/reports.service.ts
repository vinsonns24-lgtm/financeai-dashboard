import { db } from "../db/index.js";
import { transaction, category } from "../db/schema.js";
import { eq, and, sql } from "drizzle-orm";

export const reportsService = {
  /**
   * Basic summary metrics.
   */
  async getSummary(userId: string) {
    const incomeResult = await db
      .select({ total: sql<number>`sum(amount)` })
      .from(transaction)
      .where(and(eq(transaction.userId, userId), eq(transaction.type, "income")));

    const expenseResult = await db
      .select({ total: sql<number>`sum(amount)` })
      .from(transaction)
      .where(and(eq(transaction.userId, userId), eq(transaction.type, "expense")));

    const income = Number(incomeResult[0]?.total || 0);
    const expense = Number(expenseResult[0]?.total || 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  },

  /**
   * Spending breakdown by category for charts.
   */
  async getSpendingBreakdown(userId: string) {
    const result = await db
      .select({
        categoryId: transaction.categoryId,
        total: sql<number>`sum(${transaction.amount})`,
        categoryName: category.name,
        color: category.color,
      })
      .from(transaction)
      .leftJoin(category, eq(transaction.categoryId, category.id))
      .where(and(eq(transaction.userId, userId), eq(transaction.type, "expense")))
      .groupBy(transaction.categoryId, category.name, category.color);

    return result.map((r) => ({
      ...r,
      total: Number(r.total),
    }));
  },
};
