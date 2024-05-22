import db from "./FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const getCollectionData = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return docs;
  } catch (error) {
    console.error(
      `Error getting data from ${collectionName} collection:`,
      error
    );
    throw error;
  }
};

export const getProducts = async () => {
  return await getCollectionData("finished-products");
};
