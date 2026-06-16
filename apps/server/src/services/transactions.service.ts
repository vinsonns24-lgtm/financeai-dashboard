import { db } from "../db/index.js";
import { transaction, category } from "../db/schema.js";
import { eq, and, desc, asc, ilike, gte, lte, sql, count } from "drizzle-orm";

interface ListParams {
  userId: string;
  type?: string;
  categoryId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

interface CreateParams {
  userId: string;
  type: string;
  amount: number;
  currency?: string;
  merchant: string;
  categoryId?: string;
  linkedAccountId?: string;
  notes?: string;
  isRecurring?: boolean;
  transactionDate: string;
}

export const transactionsService = {
  /**
   * List transactions with filtering, search, and pagination.
   */
  async list(params: ListParams) {
    const {
      userId,
      type,
      categoryId,
      search,
      dateFrom,
      dateTo,
      sort = "latest",
      page = 1,
      limit = 20,
    } = params;

    const conditions = [eq(transaction.userId, userId)];

    if (type) {
      conditions.push(eq(transaction.type, type));
    }
    if (categoryId) {
      conditions.push(eq(transaction.categoryId, categoryId));
    }
    if (search) {
      conditions.push(ilike(transaction.merchant, `%${search}%`));
    }
    if (dateFrom) {
      conditions.push(gte(transaction.transactionDate, dateFrom));
    }
    if (dateTo) {
      conditions.push(lte(transaction.transactionDate, dateTo));
    }

    const whereClause = and(...conditions);

    const orderBy =
      sort === "oldest"
        ? [asc(transaction.transactionDate)]
        : sort === "amount"
          ? [desc(transaction.amount)]
          : [desc(transaction.transactionDate)];

    const offset = (page - 1) * limit;

    const [data, totalResult] = await Promise.all([
      db.query.transaction.findMany({
        where: whereClause,
        with: { category: true, linkedAccount: true },
        orderBy: () => orderBy,
        limit,
        offset,
      }),
      db
        .select({ total: count() })
        .from(transaction)
        .where(whereClause),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total: totalResult[0]?.total ?? 0,
        totalPages: Math.ceil((totalResult[0]?.total ?? 0) / limit),
      },
    };
  },

  /**
   * Get recent transactions for dashboard widget.
   */
  async getRecent(userId: string, limit = 5) {
    return db.query.transaction.findMany({
      where: eq(transaction.userId, userId),
      with: { category: true },
      orderBy: (tx, { desc: d }) => [d(tx.transactionDate), d(tx.createdAt)],
      limit,
    });
  },

  /**
   * Get a single transaction by ID.
   */
  async getById(userId: string, transactionId: string) {
    return db.query.transaction.findFirst({
      where: and(
        eq(transaction.id, transactionId),
        eq(transaction.userId, userId)
      ),
      with: { category: true, linkedAccount: true },
    });
  },

  /**
   * Create a new transaction.
   */
  async create(params: CreateParams) {
    const [created] = await db
      .insert(transaction)
      .values({
        userId: params.userId,
        type: params.type,
        amount: params.amount,
        currency: params.currency ?? "IDR",
        merchant: params.merchant,
        categoryId: params.categoryId ?? null,
        linkedAccountId: params.linkedAccountId ?? null,
        notes: params.notes ?? null,
        isRecurring: params.isRecurring ?? false,
        transactionDate: params.transactionDate,
      })
      .returning();

    return db.query.transaction.findFirst({
      where: eq(transaction.id, created.id),
      with: { category: true, linkedAccount: true },
    });
  },

  /**
   * Update a transaction.
   */
  async update(
    userId: string,
    transactionId: string,
    data: Partial<CreateParams>
  ) {
    const existing = await db.query.transaction.findFirst({
      where: and(
        eq(transaction.id, transactionId),
        eq(transaction.userId, userId)
      ),
    });

    if (!existing) return null;

    const updateData: Record<string, unknown> = {};
    if (data.type !== undefined) updateData.type = data.type;
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.currency !== undefined) updateData.currency = data.currency;
    if (data.merchant !== undefined) updateData.merchant = data.merchant;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.linkedAccountId !== undefined)
      updateData.linkedAccountId = data.linkedAccountId;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.isRecurring !== undefined) updateData.isRecurring = data.isRecurring;
    if (data.transactionDate !== undefined)
      updateData.transactionDate = data.transactionDate;

    await db
      .update(transaction)
      .set(updateData)
      .where(
        and(
          eq(transaction.id, transactionId),
          eq(transaction.userId, userId)
        )
      );

    return db.query.transaction.findFirst({
      where: eq(transaction.id, transactionId),
      with: { category: true, linkedAccount: true },
    });
  },

  /**
   * Delete a transaction.
   */
  async remove(userId: string, transactionId: string) {
    const existing = await db.query.transaction.findFirst({
      where: and(
        eq(transaction.id, transactionId),
        eq(transaction.userId, userId)
      ),
    });

    if (!existing) return false;

    await db
      .delete(transaction)
      .where(
        and(
          eq(transaction.id, transactionId),
          eq(transaction.userId, userId)
        )
      );
    return true;
  },
};
