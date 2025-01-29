import { create } from "zustand";

const useBagsStore = create((set) => ({
  bagsOperations: [],
  totalBagsInStock: 0,
  totalBagsUtilized: 0,
  setBagsOperationsState: (operations) =>
    set(() => ({ bagsOperations: operations })),

  setTotalBagsInStock: (totalBagsInStock) =>
    set(() => ({ totalBagsInStock: totalBagsInStock })),

  setTotalBagsUtilized: (totalBagsUtilized) =>
    set(() => ({ totalBagsUtilized: totalBagsUtilized })),

  // addBagOperationState: (operation) =>
  //   set((state) => ({
  //     bagsOperations: [...state.bagsOperations, operation],
  //   })),

  // deleteBagOperationState: (id) =>
  //   set((state) => ({
  //     bagsOperations: state.bagsOperations.filter(
  //       (operation) => operation.id !== id
  //     ),
  //   })),
}));

export default useBagsStore;
