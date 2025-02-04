import { create } from "zustand";

const useSuppliersStore = create((set) => ({
  suppliers: [],
  setSuppliers: (suppliers) => set({ suppliers }),
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
}));

export default useSuppliersStore;
