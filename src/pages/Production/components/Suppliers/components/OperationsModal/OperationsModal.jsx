import Modal from "../../../../../../components/ReuseComponents/Modal/Modal.jsx";
import { useForm } from "react-hook-form";
import styles from "./OperationsModal.module.css";
import useSuppliersStore from "../../../../../../components/stores/suppliersStore.js";
import {
  addSupplierTransaction,
  updateSupplier,
} from "../../../../../../Firebase/Suppliers/SuppliersService.js";
import {
  errorNotify,
  successNotify,
} from "../../../../../../components/Notifications/Notifications.js";
import { useEffect } from "react";
const OperationsModal = ({
  isOpen,
  onClose,
  isLoader,
  setIsLoader,
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
    setIsLoader(true);
    try {
      const newDataForSupplier = {};

      const currentSupplier = suppliersData.find((s) => s.id === supplierId);

      if (data.advance) {
        newDataForSupplier.advance = parseFloat(data.advance);
      }

      if (data.bagPrice) {
        newDataForSupplier.readyBagsPrice = parseFloat(data.bagPrice);
      }

      if (data.readyBagsQuantity) {
        const currentRawBags = currentSupplier?.rawBagsQuantity || 0;
        const readyBags = parseInt(data.readyBagsQuantity);
        newDataForSupplier.rawBagsQuantity = currentRawBags - readyBags;
      } else if (data.rawBagsQuantity) {
        const currentRawBags = currentSupplier?.rawBagsQuantity || 0;
        newDataForSupplier.rawBagsQuantity =
          currentRawBags + parseInt(data.rawBagsQuantity);
      }

      if (data.totalSum && currentSupplier?.advance) {
        const currentAdvance = currentSupplier.advance;
        const newAdvance = currentAdvance - parseFloat(data.totalSum);
        newDataForSupplier.advance = Math.max(0, newAdvance);
      } else if (data.totalSum) {
        newDataForSupplier.advance = 0;
      }

      await addSupplierTransaction(supplierId, data);

      if (Object.keys(newDataForSupplier).length > 0) {
        await updateSupplier(supplierId, newDataForSupplier);
      }

      getSupplierTransactionsList();
      reset();
      onClose();
      successNotify("Операція успішно додана в 'Операції'");
      setIsLoader(false);
    } catch (error) {
      console.error("Error adding supplier transaction:", error);
      errorNotify("Помилка при додаванні операції!", 2000);
      setIsLoader(false);
    }
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
