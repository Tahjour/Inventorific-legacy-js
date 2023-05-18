import { useContext } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import styles from "./modal-form.module.css";
function ModalBackdrop() {
    const itemsContext = useContext(ItemsContext);
    function handleModalClose() {
        if (itemsContext.isItemModalOpen) {
            itemsContext.closeItemModal();
        }
        if (itemsContext.isDeleteModalOpen) {
            itemsContext.closeDeleteModal();
        }
    }
    return <div className={styles.modalBackdrop} onClick={handleModalClose}></div>;
}
export default ModalBackdrop;