import { create } from "zustand";

const useSuppliersStore = create((set) => ({
  suppliers: [],
  setSuppliers: (suppliers) => set({ suppliers }),
}));

export default useSuppliersStore;
