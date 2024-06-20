import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import s from "./Modal.module.css";

const Modal = ({ title, children, onClose, onSave, width, height }) => {
  return (
    <div className={s.modalBackdrop}>
      <div style={{ width: width, height: height }} className={s.modalContent}>
        <div className={s.modalHeader}>
          <h2 style={{ fontSize: "24px" }}>{title}</h2>
          <button className={s.closeButton} onClick={onClose}>
            <div className={s.modaHeaderBackground}></div>
            <IoCloseCircleOutline className={s.closeIcon} />
          </button>
        </div>
        <div className={s.modalBody}>{children}</div>
        {/* <div className={s.modalFooter}></div> */}
      </div>
    </div>
  );
};

export default Modal;
