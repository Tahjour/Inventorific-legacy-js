import { useContext } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import styles from "./add-item-modal-form.module.css";
function ModalBackdrop() {
    const itemsContext = useContext(ItemsContext);
    return <div className={styles.modalBackdrop} onClick={itemsContext.closeItemModal}></div>;
}
export default ModalBackdrop;