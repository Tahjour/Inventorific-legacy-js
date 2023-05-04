import { Fragment, useContext } from "react";
import ModalBackdrop from "./modal-form-backdrop";
import styles from "./modal-form.module.css";
import { motion } from "framer-motion";
import { AiOutlineWarning } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { ItemsContext } from "../../context/ItemsContext";

function DeleteConfirmation() {
    const itemsContext = useContext(ItemsContext);
    const itemToDelete = itemsContext.getItemToDelete();

    async function deleteConfirmation(e) {
        e.preventDefault();
        if (!itemToDelete) {
            console.error("No item set to delete");
            return;
        }
        itemsContext.closeDeleteModal();

        if (itemToDelete.deleteType === "item" && itemToDelete.data) {
            itemsContext.showNotification({
                status: "saving",
                message: "Deleting Item...",
            });
            itemsContext.deleteItem();

        } else if (itemToDelete.deleteType === "user") {
            itemsContext.showNotification({
                status: "saving",
                message: "Deleting User Data...",
            });

            const response = await fetch("/api/delete-user", {
                method: "DELETE",
            });

            const data = await response.json();
            if (data) {
                console.log(data);
                itemsContext.showNotification({
                    status: "success",
                    message: "User Deleted"
                });
                await signOut();
            }
        }
    }
    return <section className={styles.formContainer}>
        <motion.form className={styles.deleteForm} animate="visible" exit={"hidden"} variants={{
            hidden: {
                scale: 0,
                transition: { duration: 0.2 }
            },
            visible: {
                scale: [0, 1.0],
                transition: {
                    duration: 0.2
                }
            },
        }}>
            <AiOutlineWarning size={100} color="red" />
            <h1>{itemToDelete.deleteType === "user" ? "Deleting a user is permanent. Are you sure?" : "Are you sure you want to delete this item?"}</h1>
            <div className={styles.submitAndCancelBtns}>
                <button type="button" className={styles.cancelBtn} onClick={itemsContext.closeDeleteModal}>Cancel</button>
                <button type="submit" className={styles.submitBtn} onClick={deleteConfirmation}>{"Delete"}</button>
            </div>
        </motion.form>
    </section>;
}

export default DeleteConfirmation;