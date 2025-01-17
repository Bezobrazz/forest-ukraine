import { useState } from "react";
import Modal from "../../../../../../components/ReuseComponents/Modal/Modal.jsx";
import Input from "../../../../../../components/ReuseComponents/Input/Input.jsx";
import styles from "./ModalToggleForm.module.css";

const ModalToggleForm = ({
  operationDate,
  setOperationDate,
  setOperationType,
  bagPrice,
  setBagPrice,
  quantity,
  setQuantity,
  deliveryCost,
  setDeliveryCost,
  isOpenModal,
  setIsOpenModal,
  addNewBagsOperation,
}) => {
  const [formType, setFormType] = useState("Додано");

  const handleRadioChange = (e) => {
    setFormType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "Додано") {
      console.log("Додано!");
      setOperationType("Додано");
    } else {
      console.log("Списано!");
      setOperationType("Списано");
    }
    addNewBagsOperation();
    console.log("submitted");
  };

  return (
    <div>
      {isOpenModal && (
        <Modal
          title="Виберіть тип операції:"
          onClose={() => setIsOpenModal(false)}
          onSave={handleSubmit}
          width="400px"
        >
          <div className={styles.modalContent}>
            <div className={styles.radioWrapper}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="Додано"
                  checked={formType === "Додано"}
                  onChange={handleRadioChange}
                />
                Додати
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="Списано"
                  checked={formType === "Списано"}
                  onChange={handleRadioChange}
                />
                Списати
              </label>
            </div>

            {formType === "Додано" && (
              <div className={styles.inputWrapper}>
                <h3>Додайте мішки:</h3>
                <Input
                  type="date"
                  size="small"
                  value={operationDate}
                  onChange={(e) =>
                    setOperationDate(e.target.value).toLocaleDateString()
                  }
                />
                <Input
                  type="number"
                  size="small"
                  value={bagPrice}
                  onChange={(e) => setBagPrice(e.target.value)}
                  placeholder="Введіть ціну*"
                />
                <Input
                  type="number"
                  size="small"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Введіть кількість*"
                />
                <Input
                  type="number"
                  size="small"
                  value={deliveryCost}
                  onChange={(e) => setDeliveryCost(e.target.value)}
                  placeholder="Введіть вартість доставки"
                />
              </div>
            )}
            {formType === "Списано" && (
              <div className={styles.inputWrapper}>
                <h3>Спишіть мішки:</h3>
                <Input
                  type="number"
                  size="small"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Введіть кількість"
                />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ModalToggleForm;
