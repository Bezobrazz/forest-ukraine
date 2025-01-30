import { create } from "zustand";

const useBagsStore = create((set) => ({
  bagsOperations: [],
  totalBagsInStock: 0,
  totalBagsUtilized: 0,

  setBagsOperationsState: (operations) => {
    set({ bagsOperations: operations });

    const totalBags = operations.reduce(
      (acc, item) => acc + parseInt(item.quantity),
      0
    );

    const totalUtilizedBags = operations
      .filter((item) => item.type === "Списано")
      .reduce((acc, item) => acc + parseInt(item.quantity), 0);

    set({
      totalBagsInStock: totalBags,
      totalBagsUtilized: totalUtilizedBags,
    });
  },

  setTotalBagsInStock: (total) => set({ totalBagsInStock: total }),
  setTotalBagsUtilized: (total) => set({ totalBagsUtilized: total }),
}));

export default useBagsStore;
