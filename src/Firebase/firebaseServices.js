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

// Function to add a new product to the "finished-products" collection
export const addProduct = async (product) => {
  try {
    const colRef = collection(db, "finished-products");
    const docRef = await addDoc(colRef, product);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
