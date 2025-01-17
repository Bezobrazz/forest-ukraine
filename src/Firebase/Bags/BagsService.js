import {
  getCollectionData,
  addDocumentToCollection,
  deleteDocumentFromCollection,
  updateDocumentInCollection,
  getSubcollectionData,
  addDocumentToSubcollection,
} from "../FirebaseServices.js";

const COLLECTION_NAME = "bags";
const SUBCOLLECTION_NAME = "operations";

export const getBags = async () => {
  return await getCollectionData(COLLECTION_NAME);
};

export const addBag = async (bag) => {
  return await addDocumentToCollection(COLLECTION_NAME, bag);
};

export const deleteBag = async (bagId) => {
  return await deleteDocumentFromCollection(COLLECTION_NAME, bagId);
};

export const updateBag = async (bagId, updatedData) => {
  return await updateDocumentInCollection(COLLECTION_NAME, bagId, updatedData);
};

export const getBagOperations = async (documentId) => {
  return await getSubcollectionData(
    COLLECTION_NAME,
    documentId,
    SUBCOLLECTION_NAME
  );
};

export const addBagOperation = async (documentId, operation) => {
  return await addDocumentToSubcollection(
    COLLECTION_NAME,
    documentId,
    SUBCOLLECTION_NAME,
    operation
  );
};
