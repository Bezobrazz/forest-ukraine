import Modal from "../../../../../../components/ReuseComponents/Modal/Modal.jsx";
import { useForm } from "react-hook-form";
import styles from "./OperationsModal.module.css";
import useSuppliersStore from "../../../../../../components/stores/suppliersStore.js";
import { addSupplierTransaction } from "../../../../../../Firebase/Suppliers/SuppliersService.js";
import { toast } from "react-toastify";
import { useEffect } from "react";

const OperationsModal = ({
  isOpen,
  onClose,
  isLoader,
  supplierId,
  getSupplierTransactionsList,
}) => {
  const suppliersData = useSuppliersStore((state) => state.suppliers);

  const supplierName = suppliersData.find(
    (supplier) => supplier.id === supplierId
  )?.name;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      operationDate: new Date().toISOString().split("T")[0],
      bagPrice: "",
      readyBagsQuantity: "",
      rawBagsQuantity: "",
      totalSum: "",
      advance: "",
    },
  });

  const bagPrice = watch("bagPrice");
  const readyBagsQuantity = watch("readyBagsQuantity");

  useEffect(() => {
    const price = parseFloat(bagPrice) || 0;
    const quantity = parseInt(readyBagsQuantity) || 0;
    const total = price * quantity;
    setValue("totalSum", total);
  }, [bagPrice, readyBagsQuantity, setValue]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    addSupplierTransactionOperation(data);
    reset();
  };

  const addSupplierTransactionOperation = async (data) => {
    await addSupplierTransaction(supplierId, data);
    getSupplierTransactionsList();
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
            placeholder="Кількість готових мішків"
            {...register("readyBagsQuantity")}
          />
          {errors.readyBagsQuantity && (
            <span className={styles.error}>
              {errors.readyBagsQuantity.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="number"
            placeholder="Загальна сума"
            {...register("totalSum")}
            disabled
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="number"
            placeholder="Кількість мішків для сировини"
            {...register("rawBagsQuantity")}
          />
          {errors.rawBagsQuantity && (
            <span className={styles.error}>
              {errors.rawBagsQuantity.message}
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
