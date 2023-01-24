import { Fragment } from "react";
import ModalBackdrop from "./modal-form-backdrop";
import styles from "./modal-form.module.css";
function AddItemModalForm() {
    function addItemSubmitHandler(e) {
        e.preventDefault();
    }
    return <Fragment>
        <ModalBackdrop />
        <form className={styles.form}>
            <h1>Enter Item Data</h1>
            <input type="text" id="itemName" name="itemName" placeholder="Name of Item"></input>
            <input type="text" id="itemPrice" name="itemPrice" placeholder="Price of Item"></input>
            <button className={styles.submitBtn} onClick={addItemSubmitHandler}>Submit</button>
        </form>
    </Fragment>;
}

export default AddItemModalForm;