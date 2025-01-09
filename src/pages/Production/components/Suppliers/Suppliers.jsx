import { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { BiSort } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import Button from "../../../../components/Button/Button.jsx";
import SearchInput from "../../../../components/SearchInput/SearchInput.jsx";
import styles from "./Suppliers.module.css";
import Table from "../../../../components/Table/Table.jsx";
import { suppliers } from "../../../../components/State.js";
import {
  addSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplier,
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

export const Suppliers = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const [supplierName, setSupplierName] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierPaymentDetails, setSupplierPaymentDetails] = useState("");
  const [supplierId, setSupplierId] = useState("");

  const [searchValue, setSearchValue] = useState("");

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  const setInitialInputValuesState = () => {
    setSupplierName("");
    setSupplierPhone("");
    setSupplierPaymentDetails("");
  };

  const getSuppliersList = async () => {
    try {
      setIsLoader(true);
      const suppliersData = await getSuppliers();

      if (suppliers.length === 0) {
        console.log("No suppliers found.");
      } else {
        setIsLoader(false);
        suppliers.value = suppliersData;
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      errorNotify("Помилка при завантаженні постачальників!", 2000);
    }
  };

  useEffect(() => {
    getSuppliersList();
  }, []);

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
    const supplierToDelete = suppliers.value.find(
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
    const supplierToUpdate = suppliers.value.find(
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
  const searchedSuppliers = suppliers.value.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const columns = [
    {
      key: "actions",
      title: "",
      render: () => (
        <Button variant="primary" onClick={() => alert("click")}>
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
    { key: "price", title: "Ціна" },
    { key: "bags", title: "Мішки (дебет)" },
    { key: "loan", title: "Борг" },
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

  const data = searchValue ? searchedSuppliers : suppliers.value;

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
      <ToastContainer />
    </div>
  );
};
