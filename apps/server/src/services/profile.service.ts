import { db } from "../db/index.js";
import { userProfile, userSettings, linkedAccount } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

export const profileService = {
  /**
   * Get user profile.
   */
  async getProfile(userId: string) {
    return db.query.userProfile.findFirst({
      where: eq(userProfile.userId, userId),
    });
  },

  /**
   * Update or create profile.
   */
  async updateProfile(userId: string, data: any) {
    const existing = await db.query.userProfile.findFirst({
      where: eq(userProfile.userId, userId),
    });

    if (existing) {
      const [updated] = await db
        .update(userProfile)
        .set(data)
        .where(eq(userProfile.userId, userId))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userProfile)
        .values({ userId, ...data })
        .returning();
      return created;
    }
  },

  /**
   * Get user settings.
   */
  async getSettings(userId: string) {
    return db.query.userSettings.findFirst({
      where: eq(userSettings.userId, userId),
    });
  },

  /**
   * Update user settings.
   */
  async updateSettings(userId: string, data: any) {
    const existing = await db.query.userSettings.findFirst({
      where: eq(userSettings.userId, userId),
    });

    if (existing) {
      const [updated] = await db
        .update(userSettings)
        .set(data)
        .where(eq(userSettings.userId, userId))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userSettings)
        .values({ userId, ...data })
        .returning();
      return created;
    }
  },

  // Linked Accounts
  async getLinkedAccounts(userId: string) {
    return db.query.linkedAccount.findMany({
      where: eq(linkedAccount.userId, userId),
    });
  },

  async addLinkedAccount(userId: string, data: any) {
    const [created] = await db
      .insert(linkedAccount)
      .values({ userId, ...data })
      .returning();
    return created;
  },

  async removeLinkedAccount(userId: string, accountId: string) {
    await db
      .delete(linkedAccount)
      .where(and(eq(linkedAccount.id, accountId), eq(linkedAccount.userId, userId)));
    return true;
  },
};
