import {
  getCollectionData,
  addDocumentToCollection,
  deleteDocumentFromCollection,
  updateDocumentInCollection,
  getSubcollectionData,
  addDocumentToSubcollection,
  deleteSubcollectionDocument,
} from "../FirebaseServices.js";

const COLLECTION_NAME = "suppliers";
const SUBCOLLECTION_NAME = "transactions";

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

export const getSupplierTransactions = async (supplierId) => {
  return await getSubcollectionData(
    COLLECTION_NAME,
    supplierId,
    SUBCOLLECTION_NAME
  );
};

export const addSupplierTransaction = async (supplierId, transaction) => {
  return await addDocumentToSubcollection(
    COLLECTION_NAME,
    supplierId,
    SUBCOLLECTION_NAME,
    transaction
  );
};

export const getAllTransactions = async () => {
  const suppliers = await getSuppliers();
  const allTransactions = [];

  for (const supplier of suppliers) {
    const transactions = await getSubcollectionData(
      COLLECTION_NAME,
      supplier.id,
      SUBCOLLECTION_NAME
    );
    allTransactions.push(
      ...transactions.map((t) => ({
        ...t,
        supplierId: supplier.id,
        supplierName: supplier.name,
      }))
    );
  }

  return allTransactions;
};

export const deleteTransaction = async (supplierId, transactionId) => {
  return await deleteSubcollectionDocument(
    COLLECTION_NAME,
    supplierId,
    SUBCOLLECTION_NAME,
    transactionId
  );
};
