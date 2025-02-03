import Modal from "../../../../../../components/ReuseComponents/Modal/Modal.jsx";

const OperationsModal = ({ isOpen, onClose, onSave, isLoader }) => {
  if (!isOpen) return null;

  // const [operationDate, setOperationDate] = useState(
  //   new Date().toISOString().split("T")[0]
  // );
  // const [bagPrice, setBagPrice] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [deliveryCost, setDeliveryCost] = useState("");

  // const setInitialInputValuesState = () => {
  //   setOperationDate(new Date().toISOString().split("T")[0]);
  //   setBagPrice("");
  //   setQuantity("");
  //   setDeliveryCost("");
  // };

  return (
    <Modal
      title="Додати операцію"
      buttonAcceptTitle="Зберегти"
      loader={isLoader}
      width="400px"
      onClose={onClose}
      onSave={onSave}
    ></Modal>
  );
};

export default OperationsModal;
