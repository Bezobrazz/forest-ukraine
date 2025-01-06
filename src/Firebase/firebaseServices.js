import db from "./FirebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const getCollectionData = async (collectionName) => {
  try {
    console.log("Getting data from collection:", collectionName);
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

export const addDocumentToCollection = async (collectionName, document) => {
  try {
    console.log("Adding document to collection:", collectionName);
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, document);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};
