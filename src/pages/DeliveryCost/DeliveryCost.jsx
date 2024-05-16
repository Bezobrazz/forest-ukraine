import DeliveryCostCalculator from "../../components/DeliveryCostCalculator/DeliveryCostCalculator.jsx";
import s from "./DeliveryCost.module.css";

const DeliveryCost = () => {
  return (
    <>
      <h2>Розрахувати вартість доставки для клієнта</h2>
      <div className={s.deliveryCostContainer}>
        <form className={s.form}>
          <div className={s.formInputsWrapper}>
            <div className={s.formInputWrapper}>
              <label htmlFor="">Загальна відстань</label>
              <input className={s.formInput} type="number" />
            </div>

            <div className={s.formInputWrapper}>
              <label htmlFor="">Вартість доставки</label>
              <input className={s.formInput} type="number" />
            </div>

            <div className={s.formInputWrapper}>
              <label htmlFor="">Кількість мішків</label>
              <input className={s.formInput} type="number" />
            </div>

            {/* <div className={s.formInputWrapper}>
              <label htmlFor="">Вартість за кілометр</label>
              <input className={s.formInput} type="number" />
            </div> */}
          </div>

          <button type="submit">Розрахувати</button>
        </form>
      </div>
      <DeliveryCostCalculator />
    </>
  );
};

export default DeliveryCost;
