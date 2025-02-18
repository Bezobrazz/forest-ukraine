import { useState } from "react";
import Modal from "../../../../../../components/ReuseComponents/Modal/Modal.jsx";
import Input from "../../../../../../components/ReuseComponents/Input/Input.jsx";
import styles from "./ModalToggleForm.module.css";

const ModalToggleForm = ({
  isOpenModal,
  setIsOpenModal,
  addNewBagsOperation,
}) => {
  const [operationDate, setOperationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [operationType, setOperationType] = useState("Додано");
  const [bagPrice, setBagPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryCost, setDeliveryCost] = useState("");

  const setInitialInputValuesState = () => {
    setOperationDate(new Date().toISOString().split("T")[0]);
    setBagPrice("");
    setQuantity("");
    setDeliveryCost("");
  };

  const handleRadioChange = (e) => {
    setOperationType(e.target.value);
    setInitialInputValuesState();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (operationType === "Додано") {
      addNewBagsOperation(
        operationDate,
        operationType,
        bagPrice,
        quantity,
        deliveryCost
      );
    } else {
      addNewBagsOperation(
        operationDate,
        operationType,
        bagPrice || 0,
        quantity || 0,
        deliveryCost || 0
      );
    }

    setInitialInputValuesState();
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
                  checked={operationType === "Додано"}
                  onChange={handleRadioChange}
                />
                Додати
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="Списано"
                  checked={operationType === "Списано"}
                  onChange={handleRadioChange}
                />
                Списати
              </label>
            </div>

            {operationType === "Додано" && (
              <div className={styles.inputWrapper}>
                <h3>Додайте мішки:</h3>
                <Input
                  type="date"
                  size="small"
                  value={operationDate}
                  onChange={(e) => setOperationDate(e.target.value)}
                />
                <Input
                  type="number"
                  size="small"
                  value={bagPrice}
                  onChange={(e) => setBagPrice(e.target.value)}
                  placeholder="Введіть ціну*"
                  required={operationType === "Додано"}
                />
                <Input
                  type="number"
                  size="small"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Введіть кількість*"
                  required={operationType === "Додано"}
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
            {operationType === "Списано" && (
              <div className={styles.inputWrapper}>
                <h3>Спишіть мішки:</h3>
                <Input
                  type="date"
                  size="small"
                  value={operationDate}
                  onChange={(e) => setOperationDate(e.target.value)}
                />
                <Input
                  type="number"
                  size="small"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Введіть кількість"
                  required={operationType === "Списано"}
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
