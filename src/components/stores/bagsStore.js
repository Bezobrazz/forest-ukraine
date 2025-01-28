import { create } from "zustand";

const useBagsStore = create((set) => ({
  bagsOperations: [],

  setBagsOperationsState: (operations) =>
    set(() => ({ bagsOperations: operations })),

  addBagOperationState: (operation) =>
    set((state) => ({
      bagsOperations: [...state.bagsOperations, operation],
    })),

  deleteBagOperationState: (id) =>
    set((state) => ({
      bagsOperations: state.bagsOperations.filter(
        (operation) => operation.id !== id
      ),
    })),
}));

export default useBagsStore;
