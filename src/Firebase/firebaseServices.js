import db from "./FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

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

export const deleteDocumentFromCollection = async (
  collectionName,
  documentId
) => {
  try {
    console.log(
      `Deleting document with ID: ${documentId} from collection: ${collectionName}`
    );
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log(`Document with ID: ${documentId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocumentInCollection = async (
  collectionName,
  documentId,
  updatedData
) => {
  try {
    console.log(
      `Updating document with ID: ${documentId} in collection: ${collectionName}`
    );
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, updatedData);
    console.log(`Document with ID: ${documentId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

export const getSubcollectionData = async (
  collectionName,
  documentId,
  subcollectionName
) => {
  try {
    console.log(
      `Getting data from subcollection: ${subcollectionName} of document: ${documentId} in collection: ${collectionName}`
    );
    const colRef = collection(
      db,
      `${collectionName}/${documentId}/${subcollectionName}`
    );
    const snapshot = await getDocs(colRef);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return docs;
  } catch (error) {
    console.error(
      `Error getting data from ${subcollectionName} in ${collectionName}/${documentId}:`,
      error
    );
    throw error;
  }
};

export const addDocumentToSubcollection = async (
  collectionName,
  documentId,
  subcollectionName,
  newDocument
) => {
  try {
    console.log(
      `Adding document to subcollection: ${subcollectionName} of document: ${documentId} in collection: ${collectionName}`
    );
    const colRef = collection(
      db,
      `${collectionName}/${documentId}/${subcollectionName}`
    );
    const docRef = await addDoc(colRef, newDocument);
    console.log(`Document added with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error(
      `Error adding document to ${subcollectionName} in ${collectionName}/${documentId}:`,
      error
    );
    throw error;
  }
};

export const deleteSubcollectionDocument = async (
  collectionName,
  documentId,
  subcollectionName,
  subDocumentId
) => {
  try {
    console.log(
      `Deleting document with ID: ${subDocumentId} from subcollection: ${subcollectionName} of document: ${documentId} in collection: ${collectionName}`
    );
    const docRef = doc(
      db,
      `${collectionName}/${documentId}/${subcollectionName}`,
      subDocumentId
    );
    await deleteDoc(docRef);
    console.log(`Document with ID: ${subDocumentId} deleted successfully.`);
  } catch (error) {
    console.error(
      `Error deleting document from ${subcollectionName} in ${collectionName}/${documentId}:`,
      error
    );
    throw error;
  }
};

export const updateSubcollectionDocument = async (
  collectionName,
  documentId,
  subcollectionName,
  subDocumentId,
  updatedData
) => {
  try {
    console.log(
      `Updating document with ID: ${subDocumentId} in subcollection: ${subcollectionName} of document: ${documentId} in collection: ${collectionName}`
    );
    const docRef = doc(
      db,
      `${collectionName}/${documentId}/${subcollectionName}`,
      subDocumentId
    );
    await updateDoc(docRef, updatedData);
    console.log(`Document with ID: ${subDocumentId} updated successfully.`);
  } catch (error) {
    console.error(
      `Error updating document in ${subcollectionName} of ${collectionName}/${documentId}:`,
      error
    );
    throw error;
  }
};
