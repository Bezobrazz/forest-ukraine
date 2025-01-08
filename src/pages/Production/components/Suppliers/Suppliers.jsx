import { BiSort } from "react-icons/bi";
import Button from "../../../../components/Button/Button.jsx";
import SearchInput from "../../../../components/SearchInput/SearchInput.jsx";
import styles from "./Suppliers.module.css";
import Table from "../../../../components/Table/Table.jsx";
import Modal from "../../../../components/ReuseComponents/Modal/Modal.jsx";
import { suppliers } from "../../../../components/State.js";
import { useEffect, useState } from "react";
import Input from "../../../../components/ReuseComponents/Input/Input.jsx";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect.jsx";
import { useMediaQuery } from "react-responsive";
import {
  addSupplier,
  getSuppliers,
} from "../../../../Firebase/Suppliers/SuppliersService.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  errorNotify,
  infoNotify,
  successNotify,
} from "../../../../components/Notifications/Notifications.js";
import { serverTimestamp } from "firebase/firestore";

export const Suppliers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const [supplierName, setSupplierName] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierPaymentDetails, setSupplierPaymentDetails] = useState("");

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
        suppliers.value = suppliersData; // added suppliers to the global state from signals
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
    try {
      const newSupplier = {
        name: supplierName,
        phone: supplierPhone,
        paymentDetails: supplierPaymentDetails,
        createdAt: serverTimestamp(),
      };
      await addSupplier(newSupplier);
      successNotify("Постачальник успішно доданий!", 1000);
      setOpenModal(false);
      getSuppliersList();
      setInitialInputValuesState();
    } catch (error) {
      console.error("Error adding supplier:", error);
      errorNotify("Помилка при додаванні постачальника!", 2000);
    }
  };

  const searchSupplier = (value) => {
    setSearchValue(value);
  };
  const searchedSuppliers = suppliers.value.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

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
          onClick={() => alert(`Editing ${record.name}`)}
        >
          {text}
        </button>
      ),
    },
    { key: "price", title: "Ціна" },
    { key: "bags", title: "Мішки (дебет)" },
    { key: "loan", title: "Борг" },
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
          onClick={handleOpenModal}
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
      {openModal && (
        <Modal
          title="Додати постачальника"
          width="400px"
          onClose={() => {
            setOpenModal(false);
          }}
          onSave={addNewSupplier}
        >
          <form>
            <div className={styles.inputWrapper}>
              <Input
                type="text"
                size={"small"}
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="Ім'я, прізвище або назва*"
                required
              />
              <Input
                type="number"
                size={"small"}
                value={supplierPhone}
                onChange={(e) => setSupplierPhone(e.target.value)}
                placeholder="Телефон"
              />
              <Input
                type="number"
                size={"small"}
                value={supplierPaymentDetails}
                onChange={(e) => setSupplierPaymentDetails(e.target.value)}
                placeholder="Реквізити для оплати"
              />
            </div>
          </form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};
