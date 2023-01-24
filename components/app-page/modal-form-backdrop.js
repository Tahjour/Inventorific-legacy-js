import { useContext } from "react";
import { StatusContext } from "../../context/StatusContext";
import styles from "./modal-form.module.css";
function ModalBackdrop() {
    const statusContext = useContext(StatusContext);
    return <div className={styles.modalBackdrop} onClick={statusContext.closeAddItemModal}></div>;
}
export default ModalBackdrop;