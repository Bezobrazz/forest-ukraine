import { create } from "zustand";

const useBagsStore = create((set) => ({
  bagsOperations: [],
  totalBagsInStock: 0,
  totalBagsUtilized: 0,

  setBagsOperationsState: (operations) => {
    set({ bagsOperations: operations });

    const totalBags = operations.reduce((acc, item) => {
      console.log("itemType:", item.type);
      console.log("quantity:", item.quantity);
      console.log("current acc:", acc);

      // Якщо операція "Списано" - віднімаємо кількість
      if (item.type === "Списано") {
        const newAcc = acc - parseInt(item.quantity);
        console.log("after subtraction:", newAcc);
        return newAcc;
      }
      // Якщо операція "Додано" - додаємо кількість
      const newAcc = acc + parseInt(item.quantity);
      console.log("after addition:", newAcc);
      return newAcc;
    }, 0);

    console.log("final totalBags:", totalBags);

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
