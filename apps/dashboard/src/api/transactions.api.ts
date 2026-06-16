import { mockDb } from "../lib/mockData";
import type { Transaction, GetTransactionsParams, PaginatedResponse } from "../types/transaction.types";

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const transactionsApi = {
  list: async (params?: GetTransactionsParams): Promise<PaginatedResponse<Transaction>> => {
    await delay(500); // Simulate network
    
    let filtered = mockDb.getTransactions();

    if (params?.type) {
      filtered = filtered.filter(t => t.type === params.type);
    }
    
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(t => t.merchant.toLowerCase().includes(s));
    }

    if (params?.sort === 'amount') {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (params?.sort === 'oldest') {
      filtered.sort((a, b) => new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime());
    } else {
      // Default to latest
      filtered.sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
    }

    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const startIndex = (page - 1) * limit;
    
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    };
  },

  getRecent: async (): Promise<Transaction[]> => {
    await delay(300);
    return mockDb.getTransactions().slice(0, 5);
  },

  getById: async (id: string): Promise<Transaction> => {
    await delay(300);
    const tx = mockDb.getTransactions().find(t => t.id === id);
    if (!tx) throw new Error("Transaction not found");
    return tx;
  },

  create: async (payload: Partial<Transaction>): Promise<Transaction> => {
    await delay(500);
    const newTx: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: payload.type as "income" | "expense" | "transfer",
      amount: payload.amount || 0,
      currency: payload.currency || "IDR",
      merchant: payload.merchant || "Unknown",
      categoryId: payload.categoryId,
      linkedAccountId: payload.linkedAccountId,
      notes: payload.notes,
      isRecurring: payload.isRecurring || false,
      transactionDate: payload.transactionDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return mockDb.addTransaction(newTx);
  },

  update: async (id: string, payload: Partial<Transaction>): Promise<Transaction> => {
    await delay(500);
    const updated = mockDb.updateTransaction(id, payload);
    if (!updated) throw new Error("Transaction not found");
    return updated;
  },

  remove: async (id: string): Promise<void> => {
    await delay(500);
    mockDb.deleteTransaction(id);
  },
};
