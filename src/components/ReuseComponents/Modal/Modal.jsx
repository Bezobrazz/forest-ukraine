import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";
import s from "./Modal.module.css";
import Loader from "../../Loader/Loader.jsx";
import { Stack } from "@mui/material";

const Modal = ({
  title,
  children,
  onClose,
  onSave,
  width,
  height,
  loader,
  buttonAcceptTitle = "Зберегти",
  buttonCancelTitle = "Скасувати",
}) => {
  return (
    <div className={s.modalBackdrop}>
      <div style={{ width: width, height: height }} className={s.modalContent}>
        <div className={s.modalHeader}>
          <h2 className={s.modalTitle}>{title}</h2>
          <button className={s.closeButton} onClick={onClose}>
            <div className={s.modalHeaderBackground}></div>
            <IoCloseCircleOutline className={s.closeIcon} />
          </button>
        </div>
        <div className={s.modalBody}>{children}</div>

        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="flex-end"
        >
          {loader && <Loader height={30} width={30} />}
          <Button
            variant="outlined"
            title={buttonCancelTitle}
            color="success"
            onClick={onClose}
          />

          <Button
            variant="contained"
            title={buttonAcceptTitle}
            color="success"
            onClick={onSave}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Modal;
