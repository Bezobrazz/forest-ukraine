import Modal from "../../../../../../components/ReuseComponents/Modal/Modal.jsx";
import Input from "../../../../../../components/ReuseComponents/Input/Input.jsx";
import styles from "./AddModal.module.css";

export const AddModal = ({
  isOpen,
  onClose,
  onSave,
  supplierName,
  setSupplierName,
  supplierPhone,
  setSupplierPhone,
  supplierPaymentDetails,
  setSupplierPaymentDetails,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      title="Додати постачальника"
      width="400px"
      onClose={onClose}
      onSave={onSave}
    >
      <div className={styles.inputWrapper}>
        <Input
          type="text"
          size="small"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          placeholder="Ім'я, прізвище або назва*"
          required
        />
        <Input
          type="number"
          size="small"
          value={supplierPhone}
          onChange={(e) => setSupplierPhone(e.target.value)}
          placeholder="Телефон"
        />
        <Input
          type="number"
          size="small"
          value={supplierPaymentDetails}
          onChange={(e) => setSupplierPaymentDetails(e.target.value)}
          placeholder="Реквізити для оплати"
        />
      </div>
    </Modal>
  );
};
