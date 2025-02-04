import Modal from "../../../../../../components/ReuseComponents/Modal/Modal.jsx";
import { useForm } from "react-hook-form";
import styles from "./OperationsModal.module.css";
import useSuppliersStore from "../../../../../../components/stores/suppliersStore.js";
import { addSupplierTransaction } from "../../../../../../Firebase/Suppliers/SuppliersService.js";
import { toast } from "react-toastify";
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
      advance: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    addSupplierTransactionOperation(data);
    onSave(data);
    reset();
  };

  const addSupplierTransactionOperation = async (data) => {
    await addSupplierTransaction(supplierId, data);
    reset();
    onClose();
    toast.success("Операція успішно додана в 'Операції'");
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
            placeholder="Ціна за мішок (грн)"
            {...register("bagPrice")}
          />
          {errors.bagPrice && (
            <span className={styles.error}>{errors.bagPrice.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="number"
            placeholder="Кількість мішків"
            {...register("bagsQuantity")}
          />
          {errors.bagsQuantity && (
            <span className={styles.error}>{errors.bagsQuantity.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="number"
            placeholder="Кількість мішків для сировини"
            {...register("rawMaterialBagsQuantity")}
          />
          {errors.rawMaterialBagsQuantity && (
            <span className={styles.error}>
              {errors.rawMaterialBagsQuantity.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input type="number" placeholder="Аванс" {...register("advance")} />
          {errors.advance && (
            <span className={styles.error}>{errors.advance.message}</span>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default OperationsModal;
