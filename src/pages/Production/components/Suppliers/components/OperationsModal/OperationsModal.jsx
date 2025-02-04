import Modal from "../../../../../../components/ReuseComponents/Modal/Modal.jsx";
import { useForm } from "react-hook-form";
import styles from "./OperationsModal.module.css";
import useSuppliersStore from "../../../../../../components/stores/suppliersStore.js";

const OperationsModal = ({ isOpen, onClose, onSave, isLoader, supplierId }) => {
  const suppliersData = useSuppliersStore((state) => state.suppliers);

  const supplierName = suppliersData.find(
    (supplier) => supplier.id === supplierId
  )?.name;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      operationDate: new Date().toISOString().split("T")[0],
      bagPrice: "",
      bagsQuantity: "",
      rawMaterialBagsQuantity: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onSave(data);
    reset();
  };

  return (
    <Modal
      title="Додати операцію"
      buttonAcceptTitle="Зберегти"
      loader={isLoader}
      width="400px"
      onClose={() => {
        reset();
        onClose();
      }}
      onSave={handleSubmit(onSubmit)}
    >
      <p className={styles.supplierName}>
        Постачальник:{" "}
        <span className={styles.supplierNameSpan}>{supplierName}</span>
      </p>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="date"
            placeholder="Дата операції*"
            {...register("operationDate", { required: "Це поле обов'язкове" })}
          />
          {errors.operationDate && (
            <span className={styles.error}>{errors.operationDate.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="number"
            step="0.01"
            placeholder="Ціна за мішок (грн)*"
            {...register("bagPrice", {
              required: "Це поле обов'язкове",
              min: { value: 0, message: "Ціна не може бути від'ємною" },
            })}
          />
          {errors.bagPrice && (
            <span className={styles.error}>{errors.bagPrice.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="number"
            placeholder="Кількість мішків*"
            {...register("bagsQuantity", {
              required: "Це поле обов'язкове",
              min: { value: 1, message: "Кількість має бути більше 0" },
            })}
          />
          {errors.bagsQuantity && (
            <span className={styles.error}>{errors.bagsQuantity.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="number"
            placeholder="Кількість мішків для сировини*"
            {...register("rawMaterialBagsQuantity", {
              required: "Це поле обов'язкове",
              min: { value: 1, message: "Кількість має бути більше 0" },
            })}
          />
          {errors.rawMaterialBagsQuantity && (
            <span className={styles.error}>
              {errors.rawMaterialBagsQuantity.message}
            </span>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default OperationsModal;
