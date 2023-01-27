import { Fragment, useContext, useRef } from "react";
import { StatusContext } from "../../context/StatusContext";
import { LocalDatabase } from "../../db/localDB";
import styles from "./add-item-modal-form.module.css";
import ModalBackdrop from "./modal-form-backdrop";
function AddItemModalForm() {
    const statusContext = useContext(StatusContext);
    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemDescriptionRef = useRef();
    const imageURLRef = useRef();

    function addItemSubmitHandler(e) {
        e.preventDefault();
        const enteredItemName = itemNameRef.current.value;
        const enteredItemPrice = itemPriceRef.current.value;
        const enteredItemDescription = itemDescriptionRef.current.value;
        const enteredItemImageURL = imageURLRef.current.value;
        const newItem = {
            id: enteredItemName,
            name: enteredItemName,
            price: enteredItemPrice,
            description: enteredItemDescription,
            imageURL: enteredItemImageURL,
        };
        statusContext.closeAddItemModal();
        LocalDatabase.push(newItem);
    }

    return <Fragment>
        <ModalBackdrop />
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={addItemSubmitHandler}>
                <h1>Enter Item Data</h1>
                <input type="text" id="itemName" name="itemName" placeholder="Name of Item" ref={itemNameRef}></input>
                <input type="text" id="itemPrice" name="itemPrice" placeholder="Price of Item" ref={itemPriceRef}></input>
                {/* <textarea placeholder="Image of Item(Paste Link)" ref={imageURLRef}></textarea> */}
                <label className={styles.customImageUpload}>
                    <input type={"file"} ></input>Upload Image
                </label>
                <textarea placeholder="Description of Item" ref={itemDescriptionRef}></textarea>
                <button className={styles.submitBtn}>Submit</button>
            </form>
        </div>
    </Fragment>;
}

export default AddItemModalForm;