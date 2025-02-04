import { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { BiSort } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import Button from "../../../../components/Button/Button.jsx";
import SearchInput from "../../../../components/SearchInput/SearchInput.jsx";
import styles from "./Suppliers.module.css";
import Table from "../../../../components/Table/Table.jsx";
import {
  addSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplier,
  getSupplierTransactions,
} from "../../../../Firebase/Suppliers/SuppliersService.js";
import {
  errorNotify,
  infoNotify,
  successNotify,
} from "../../../../components/Notifications/Notifications.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverTimestamp } from "firebase/firestore";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect.jsx";
import { AddModal } from "./components/AddModal/AddModal.jsx";
import { UpdateModal } from "./components/UpdateModal/UpdateModal.jsx";
import useSuppliersStore from "../../../../components/stores/suppliersStore.js";
import OperationsModal from "./components/OperationsModal/OperationsModal.jsx";
export const Suppliers = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openOperationsModal, setOpenOperationsModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const [supplierName, setSupplierName] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierPaymentDetails, setSupplierPaymentDetails] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const suppliersData = useSuppliersStore((state) => state.suppliers);
  const setSuppliersData = useSuppliersStore((state) => state.setSuppliers);

  const transactionsData = useSuppliersStore((state) => state.transactions);
  const setTransactionsData = useSuppliersStore(
    (state) => state.setTransactions
  );
  console.log("transactionsData", transactionsData);

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  console.log("suppliers", suppliersData);

  const setInitialInputValuesState = () => {
    setSupplierName("");
    setSupplierPhone("");
    setSupplierPaymentDetails("");
  };

  const getSuppliersList = async () => {
    try {
      setIsLoader(true);
      const suppliersDataList = await getSuppliers();

      if (suppliersDataList.length === 0) {
        console.log("No suppliers found.");
      } else {
        setIsLoader(false);
        setSuppliersData(suppliersDataList);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      errorNotify("Помилка при завантаженні постачальників!", 2000);
    }
  };

  useEffect(() => {
    getSuppliersList();
  }, []);

  const getSupplierTransactionsList = async () => {
    try {
      setIsLoader(true);
      const allTransactions = [];

      for (const supplier of suppliersData) {
        const supplierTransactions = await getSupplierTransactions(supplier.id);
        if (supplierTransactions.length > 0) {
          const transactionsWithSupplier = supplierTransactions.map(
            (transaction) => ({
              ...transaction,
              supplierName: supplier.name,
              supplierId: supplier.id,
            })
          );
          allTransactions.push(...transactionsWithSupplier);
        }
      }

      if (allTransactions.length === 0) {
        console.log("No transactions found");
      } else {
        setTransactionsData(allTransactions);
        setIsLoader(false);
        console.log("All transactions:", allTransactions);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      errorNotify("Помилка при завантаженні транзакцій!", 2000);
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (suppliersData.length > 0) {
      getSupplierTransactionsList();
    }
  }, [suppliersData]);

  const addNewSupplier = async () => {
    if (!supplierName) {
      infoNotify("Будь ласка, введіть ім'я постачальника!", 2000);
      return;
    }
    setIsLoader(true);
    try {
      const newSupplier = {
        name: supplierName,
        phone: supplierPhone,
        paymentDetails: supplierPaymentDetails,
        createdAt: serverTimestamp(),
      };
      await addSupplier(newSupplier);
      getSuppliersList();
      successNotify("Постачальник успішно доданий!", 1000);
      setOpenAddModal(false);
      setInitialInputValuesState();
    } catch (error) {
      console.error("Error adding supplier:", error);
      errorNotify("Помилка при додаванні постачальника!", 2000);
    }
  };

  const deleteChoosedSupplier = async (id) => {
    const supplierToDelete = suppliersData.find(
      (supplier) => supplier.id === id
    );
    if (!supplierToDelete) {
      errorNotify("Постачальник із заданим ID не знайдено!", 2000);
      return;
    }
    const isConfirmed = window.confirm(
      `Ви впевнені, що хочете видалити постачальника "${supplierToDelete.name}"?`
    );
    if (!isConfirmed) return;

    try {
      await deleteSupplier(id);
      successNotify("Постачальник успішно видалений!", 1000);
      getSuppliersList();
    } catch (error) {
      console.error("Error deleting supplier:", error);
      errorNotify("Помилка при видаленні постачальника!", 2000);
    }
  };

  const updateChoosedSupplier = async (id) => {
    if (!supplierName) {
      infoNotify("Будь ласка, введіть ім'я постачальника!", 2000);
      return;
    }
    setIsLoader(true);
    try {
      await updateSupplier(id, {
        name: supplierName,
        phone: supplierPhone,
        paymentDetails: supplierPaymentDetails,
      });
      successNotify("Постачальник успішно відредагований!", 1000);
      getSuppliersList();
      setOpenUpdateModal(false);
      setInitialInputValuesState();
      setIsLoader(false);
    } catch (error) {
      console.error("Error editing supplier:", error);
      errorNotify("Помилка при редагуванні постачальника!", 2000);
    }
  };

  const handleOpenUpdateModal = (id) => {
    const supplierToUpdate = suppliersData.find(
      (supplier) => supplier.id === id
    );
    if (!supplierToUpdate) {
      errorNotify("Постачальник із заданим ID не знайдено!", 2000);
      return;
    }
    setSupplierName(supplierToUpdate.name);
    setSupplierPhone(supplierToUpdate.phone);
    setSupplierPaymentDetails(supplierToUpdate.paymentDetails);
    setSupplierId(id);
    setOpenUpdateModal(true);
  };

  const handleOpenAddModal = () => {
    setInitialInputValuesState();
    setOpenAddModal(true);
  };

  const searchSupplier = (value) => {
    setSearchValue(value);
  };
  const searchedSuppliers = suppliersData.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const columns = [
    {
      key: "actions",
      title: "",
      render: (text, record) => (
        <Button
          variant="primary"
          onClick={() => {
            setSelectedSupplierId(record.id);
            setOpenOperationsModal(true);
          }}
        >
          +
        </Button>
      ),
    },
    {
      key: "name",
      title: "Постачальник",
      render: (text, record) => (
        <button
          className={styles.supplierEditButton}
          onClick={() => handleOpenUpdateModal(record.id)}
        >
          {text}
        </button>
      ),
    },
    {
      key: "price",
      title: "Ціна (грн)",
      render: (text, record) => {
        const supplierTransactions = transactionsData.filter(
          (t) => t.supplierId === record.id
        );
        const lastTransaction = supplierTransactions[0];
        return lastTransaction?.bagPrice || "—";
      },
    },
    {
      key: "bags",
      title: "Мішки (дебет)",
      render: (text, record) => {
        const supplierTransactions = transactionsData.filter(
          (t) => t.supplierId === record.id
        );
        const totalBags = supplierTransactions.reduce((sum, t) => {
          const rawBags = parseInt(t.rawMaterialBagsQuantity) || 0;
          const usedBags = parseInt(t.bagsQuantity) || 0;
          return sum + (rawBags - usedBags);
        }, 0);

        return totalBags || "—";
      },
    },
    {
      key: "loan",
      title: "Аванс",
      render: (text, record) => {
        const supplierTransactions = transactionsData.filter(
          (t) => t.supplierId === record.id
        );
        const totalAdvance = supplierTransactions.reduce(
          (sum, t) => sum + (parseFloat(t.advance) || 0),
          0
        );
        return totalAdvance ? `${totalAdvance} грн` : "—";
      },
    },
    {
      key: "action",
      title: "",
      render: (text, record) => (
        <button
          className={styles.trashButton}
          onClick={() => deleteChoosedSupplier(record.id)}
        >
          <BsFillTrashFill />
        </button>
      ),
    },
  ];

  const data = searchValue ? searchedSuppliers : suppliersData;

  const selectOptions = [
    { value: "price", label: "По ціні" },
    { value: "bags", label: "По мішкам" },
    { value: "loan", label: "По боргам" },
  ];

  return (
    <div>
      <div className={styles.topBar}>
        <div className={styles.searchWrapper}>
          <SearchInput
            placeholder="Пошук постачальників..."
            value={searchValue}
            onSearch={searchSupplier}
          />
          <CustomSelect
            minWidth={150}
            fullWidth={isMobile ? true : false}
            placeholder={isMobile ? "Сортувати" : <BiSort />}
            value={selectedOption}
            options={selectOptions}
            onChange={(value) => setSelectedOption(value)}
          />
        </div>
        <Button
          variant="primary"
          width={isMobile ? "100%" : "230px"}
          onClick={handleOpenAddModal}
        >
          Додати постачальника
        </Button>
      </div>
      <Table
        columns={columns}
        data={data}
        isLoader={isLoader}
        sortBy="createdAt"
      />
      <AddModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSave={addNewSupplier}
        supplierName={supplierName}
        setSupplierName={setSupplierName}
        supplierPhone={supplierPhone}
        setSupplierPhone={setSupplierPhone}
        supplierPaymentDetails={supplierPaymentDetails}
        setSupplierPaymentDetails={setSupplierPaymentDetails}
      />
      <UpdateModal
        isOpen={openUpdateModal}
        isLoader={isLoader}
        onClose={() => setOpenUpdateModal(false)}
        onSave={() => updateChoosedSupplier(supplierId)}
        supplierName={supplierName}
        setSupplierName={setSupplierName}
        supplierPhone={supplierPhone}
        setSupplierPhone={setSupplierPhone}
        supplierPaymentDetails={supplierPaymentDetails}
        setSupplierPaymentDetails={setSupplierPaymentDetails}
      />
      <OperationsModal
        isOpen={openOperationsModal}
        onClose={() => setOpenOperationsModal(false)}
        isLoader={isLoader}
        supplierId={selectedSupplierId}
        getSupplierTransactionsList={getSupplierTransactionsList}
      />
      <ToastContainer />
    </div>
  );
};
