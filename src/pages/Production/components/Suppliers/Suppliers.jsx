import { BiSort } from "react-icons/bi";
import Button from "../../../../components/Button/Button.jsx";
import SearchInput from "../../../../components/SearchInput/SearchInput.jsx";
import styles from "./Suppliers.module.css";
import Table from "../../../../components/Table/Table.jsx";
import Modal from "../../../../components/ReuseComponents/Modal/Modal.jsx";
import { useState } from "react";
import Input from "../../../../components/ReuseComponents/Input/Input.jsx";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect.jsx";
import { useMediaQuery } from "react-responsive";

export const Suppliers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

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

  const data = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
  ];

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
        >
          Додати постачальника
        </Button>
      </div>
      <Table columns={columns} data={data} />
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
