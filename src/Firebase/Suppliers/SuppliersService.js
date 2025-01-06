import {
  getCollectionData,
  addDocumentToCollection,
} from "../FirebaseServices.js";

const COLLECTION_NAME = "suppliers";

export const getSuppliers = async () => {
  return await getCollectionData(COLLECTION_NAME);
};

export const addSupplier = async (supplier) => {
  return await addDocumentToCollection(COLLECTION_NAME, supplier);
};
