import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsApi } from "../api/transactions.api";
import type { GetTransactionsParams, Transaction } from "../types/transaction.types";

export const transactionKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionKeys.all, "list"] as const,
  list: (filters: GetTransactionsParams) => [...transactionKeys.lists(), filters] as const,
  recents: () => [...transactionKeys.all, "recent"] as const,
  details: () => [...transactionKeys.all, "detail"] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
};

export function useTransactions(params?: GetTransactionsParams) {
  return useQuery({
    queryKey: transactionKeys.list(params || {}),
    queryFn: () => transactionsApi.list(params),
  });
}

export function useRecentTransactions() {
  return useQuery({
    queryKey: transactionKeys.recents(),
    queryFn: () => transactionsApi.getRecent(),
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: () => transactionsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newTx: Partial<Transaction>) => transactionsApi.create(newTx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.recents() });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & Partial<Transaction>) => 
      transactionsApi.update(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.recents() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.detail(variables.id) });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => transactionsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.recents() });
    },
  });
}
