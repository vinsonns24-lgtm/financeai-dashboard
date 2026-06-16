import { db } from "../db/index.js";
import { category } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

// Default categories to seed for new users
const DEFAULT_CATEGORIES = [
  { name: "Food & Dining", icon: "restaurant", color: "#ffb4ab" },
  { name: "Transport", icon: "directions_car", color: "#4fdbc8" },
  { name: "Shopping", icon: "shopping_bag", color: "#4edea3" },
  { name: "Entertainment", icon: "movie", color: "#d0bcff" },
  { name: "Bills & Utilities", icon: "receipt", color: "#d0bcff" },
  { name: "Income", icon: "payments", color: "#4edea3" },
  { name: "Transfer", icon: "sync_alt", color: "#d0bcff" },
  { name: "Software", icon: "cloud", color: "#90a4ae" },
  { name: "Health", icon: "health_and_safety", color: "#ef9a9a" },
  { name: "Housing", icon: "home", color: "#4fdbc8" },
];

export const categoriesService = {
  /**
   * List all categories for a user (defaults + custom).
   */
  async list(userId: string) {
    return db.query.category.findMany({
      where: eq(category.userId, userId),
      orderBy: (cat, { asc }) => [asc(cat.name)],
    });
  },

  /**
   * Get a single category by ID (scoped to user).
   */
  async getById(userId: string, categoryId: string) {
    return db.query.category.findFirst({
      where: and(eq(category.id, categoryId), eq(category.userId, userId)),
    });
  },

  /**
   * Create a custom category.
   */
  async create(
    userId: string,
    data: { name: string; icon?: string; color?: string }
  ) {
    const [created] = await db
      .insert(category)
      .values({
        userId,
        name: data.name,
        icon: data.icon ?? "category",
        color: data.color ?? "#4fdbc8",
        isDefault: false,
      })
      .returning();
    return created;
  },

  /**
   * Update a custom category (cannot update default categories).
   */
  async update(
    userId: string,
    categoryId: string,
    data: { name?: string; icon?: string; color?: string }
  ) {
    const existing = await db.query.category.findFirst({
      where: and(eq(category.id, categoryId), eq(category.userId, userId)),
    });

    if (!existing) return null;

    const [updated] = await db
      .update(category)
      .set(data)
      .where(and(eq(category.id, categoryId), eq(category.userId, userId)))
      .returning();
    return updated;
  },

  /**
   * Delete a custom category (not system defaults).
   */
  async remove(userId: string, categoryId: string) {
    const existing = await db.query.category.findFirst({
      where: and(
        eq(category.id, categoryId),
        eq(category.userId, userId),
        eq(category.isDefault, false)
      ),
    });

    if (!existing) return false;

    await db
      .delete(category)
      .where(and(eq(category.id, categoryId), eq(category.userId, userId)));
    return true;
  },

  /**
   * Seed default categories for a new user.
   */
  async seedDefaults(userId: string) {
    const existing = await db.query.category.findFirst({
      where: eq(category.userId, userId),
    });

    // Only seed if user has no categories yet
    if (existing) return;

    await db.insert(category).values(
      DEFAULT_CATEGORIES.map((cat) => ({
        userId,
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
        isDefault: true,
      }))
    );
  },
};
