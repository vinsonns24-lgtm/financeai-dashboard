export interface Transaction {
  id: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  currency: string;
  merchant: string;
  categoryId?: string;
  linkedAccountId?: string;
  notes?: string;
  isRecurring: boolean;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetTransactionsParams {
  type?: "income" | "expense" | "transfer";
  categoryId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: "latest" | "oldest" | "amount";
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
