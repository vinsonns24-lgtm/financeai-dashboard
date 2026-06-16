import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  bigint,
  integer,
  date,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================
// Better Auth Managed Tables
// These mirror what Better Auth creates — we define them so
// Drizzle is aware and can reference user.id in relations.
// ============================================================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================
// Application Tables
// ============================================================

// --- User Profile ---
export const userProfile = pgTable("user_profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  phone: varchar("phone", { length: 32 }),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  currency: varchar("currency", { length: 8 }).notNull().default("IDR"),
  language: varchar("language", { length: 8 }).notNull().default("en"),
  timezone: varchar("timezone", { length: 64 })
    .notNull()
    .default("Asia/Jakarta"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// --- User Settings ---
export const userSettings = pgTable("user_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  darkMode: boolean("dark_mode").notNull().default(true),
  defaultView: varchar("default_view", { length: 32 })
    .notNull()
    .default("overview"),
  notifyBudgetAlerts: boolean("notify_budget_alerts").notNull().default(true),
  notifyWeeklyReports: boolean("notify_weekly_reports").notNull().default(true),
  notifyEmailUpdates: boolean("notify_email_updates").notNull().default(false),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// --- Categories ---
export const category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 64 }).notNull(),
  icon: varchar("icon", { length: 64 }).notNull().default("category"),
  color: varchar("color", { length: 32 }).notNull().default("#4fdbc8"),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// --- Transactions ---
export const transaction = pgTable("transaction", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").references(() => category.id, {
    onDelete: "set null",
  }),
  linkedAccountId: uuid("linked_account_id").references(
    () => linkedAccount.id,
    { onDelete: "set null" }
  ),
  type: varchar("type", { length: 16 }).notNull(), // 'income' | 'expense' | 'transfer'
  amount: bigint("amount", { mode: "number" }).notNull(), // in smallest currency unit
  currency: varchar("currency", { length: 8 }).notNull().default("IDR"),
  merchant: varchar("merchant", { length: 128 }).notNull(),
  notes: text("notes"),
  isRecurring: boolean("is_recurring").notNull().default(false),
  transactionDate: date("transaction_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// --- Budgets ---
export const budget = pgTable("budget", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  allocatedAmount: bigint("allocated_amount", { mode: "number" }).notNull(),
  currency: varchar("currency", { length: 8 }).notNull().default("IDR"),
  month: integer("month").notNull(), // 1-12
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// --- Goals ---
export const goal = pgTable("goal", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 128 }).notNull(),
  icon: varchar("icon", { length: 64 }).notNull().default("savings"),
  targetAmount: bigint("target_amount", { mode: "number" }).notNull(),
  currentAmount: bigint("current_amount", { mode: "number" })
    .notNull()
    .default(0),
  currency: varchar("currency", { length: 8 }).notNull().default("IDR"),
  dueDate: date("due_date"),
  status: varchar("status", { length: 16 }).notNull().default("active"), // 'active' | 'paused' | 'completed'
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// --- Linked Accounts (Bank / Credit cards) ---
export const linkedAccount = pgTable("linked_account", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  institutionName: varchar("institution_name", { length: 128 }).notNull(),
  accountType: varchar("account_type", { length: 32 }).notNull(), // 'checking' | 'savings' | 'credit'
  lastFour: varchar("last_four", { length: 4 }).notNull(),
  balance: bigint("balance", { mode: "number" }).notNull().default(0),
  currency: varchar("currency", { length: 8 }).notNull().default("IDR"),
  status: varchar("status", { length: 16 }).notNull().default("active"), // 'active' | 'inactive'
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// ============================================================
// Relations (for Drizzle relational queries)
// ============================================================

export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(userProfile, {
    fields: [user.id],
    references: [userProfile.userId],
  }),
  settings: one(userSettings, {
    fields: [user.id],
    references: [userSettings.userId],
  }),
  categories: many(category),
  transactions: many(transaction),
  budgets: many(budget),
  goals: many(goal),
  linkedAccounts: many(linkedAccount),
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, { fields: [userProfile.userId], references: [user.id] }),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(user, { fields: [userSettings.userId], references: [user.id] }),
}));

export const categoryRelations = relations(category, ({ one, many }) => ({
  user: one(user, { fields: [category.userId], references: [user.id] }),
  transactions: many(transaction),
  budgets: many(budget),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
  user: one(user, { fields: [transaction.userId], references: [user.id] }),
  category: one(category, {
    fields: [transaction.categoryId],
    references: [category.id],
  }),
  linkedAccount: one(linkedAccount, {
    fields: [transaction.linkedAccountId],
    references: [linkedAccount.id],
  }),
}));

export const budgetRelations = relations(budget, ({ one }) => ({
  user: one(user, { fields: [budget.userId], references: [user.id] }),
  category: one(category, {
    fields: [budget.categoryId],
    references: [category.id],
  }),
}));

export const goalRelations = relations(goal, ({ one }) => ({
  user: one(user, { fields: [goal.userId], references: [user.id] }),
}));

export const linkedAccountRelations = relations(
  linkedAccount,
  ({ one, many }) => ({
    user: one(user, {
      fields: [linkedAccount.userId],
      references: [user.id],
    }),
    transactions: many(transaction),
  })
);
