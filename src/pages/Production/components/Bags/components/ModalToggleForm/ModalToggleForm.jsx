import { useState } from "react";
import Modal from "../../../../../../components/ReuseComponents/Modal/Modal.jsx";
import Input from "../../../../../../components/ReuseComponents/Input/Input.jsx";
import styles from "./ModalToggleForm.module.css";

const ModalToggleForm = ({ isOpenModal, setIsOpenModal }) => {
  const [formType, setFormType] = useState("add");

  const handleRadioChange = (e) => {
    setFormType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === "add") {
      console.log("Додано!");
    } else {
      console.log("Списано!");
    }
  };

  return (
    <div>
      {isOpenModal && (
        <Modal
          title="Виберіть тип операції:"
          onClose={() => setIsOpenModal(false)}
          width="400px"
        >
          <div className={styles.modalContent}>
            <div className={styles.radioWrapper}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="add"
                  checked={formType === "add"}
                  onChange={handleRadioChange}
                />
                Додати
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="writeOff"
                  checked={formType === "writeOff"}
                  onChange={handleRadioChange}
                />
                Списати
              </label>
            </div>

            <form onSubmit={handleSubmit}>
              {formType === "add" && (
                <div className={styles.inputWrapper}>
                  <h3>Додайте мішки:</h3>
                  <Input type="date" size="small" />
                  <Input
                    type="number"
                    size="small"
                    placeholder="Введіть ціну*"
                  />
                  <Input
                    type="number"
                    size="small"
                    placeholder="Введіть кількість*"
                  />
                  <Input
                    type="number"
                    size="small"
                    placeholder="Введіть вартість доставки"
                  />
                </div>
              )}
              {formType === "writeOff" && (
                <div className={styles.inputWrapper}>
                  <h3>Спишіть мішки:</h3>
                  <Input
                    type="number"
                    size="small"
                    placeholder="Введіть кількість"
                  />
                </div>
              )}
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ModalToggleForm;
