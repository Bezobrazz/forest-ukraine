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

export const Suppliers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  const SuppliersList = async () => {
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
    }
  };

  useEffect(() => {
    SuppliersList();
  }, []);

  // const addNewSupplier = async () => {
  //   try {
  //     const newSupplier = {
  //       name: "New Supplier",
  //       phone: "0934567788",
  //       bagspaymentDetails: 8273642876348,
  //     };
  //     const supplierId = await addSupplier(newSupplier);
  //   } catch (error) {
  //     console.error("Error adding supplier:", error);
  //   }
  // };

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

  const data = suppliers.value;

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
            onSearch={() => {}}
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
          // onClick={addNewSupplier}
        >
          Додати постачальника
        </Button>
      </div>
      <Table columns={columns} data={data} isLoader={isLoader} />
      {openModal && (
        <Modal
          title="Додати постачальника"
          width="400px"
          onClose={() => {
            setOpenModal(false);
          }}
          onSave={() => {}}
        >
          <form>
            <div className={styles.inputWrapper}>
              <Input
                type="text"
                size={"small"}
                placeholder="Ім'я, прізвище або назва*"
              />
              <Input type="number" size={"small"} placeholder="Телефон" />
              <Input
                type="number"
                size={"small"}
                placeholder="Реквізити для оплати"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
