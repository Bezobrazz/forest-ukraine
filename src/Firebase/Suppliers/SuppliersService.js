console.log("Шлях до поточного файлу:", import.meta.url);

import {
  getCollectionData,
  addDocumentToCollection,
  deleteDocumentFromCollection,
  updateDocumentInCollection,
} from "../FirebaseServices.js";

const COLLECTION_NAME = "suppliers";

export const getSuppliers = async () => {
  return await getCollectionData(COLLECTION_NAME);
};

export const addSupplier = async (supplier) => {
  return await addDocumentToCollection(COLLECTION_NAME, supplier);
};

export const deleteSupplier = async (supplierId) => {
  return await deleteDocumentFromCollection(COLLECTION_NAME, supplierId);
};

export const updateSupplier = async (supplierId, updatedData) => {
  return await updateDocumentInCollection(
    COLLECTION_NAME,
    supplierId,
    updatedData
  );
};
