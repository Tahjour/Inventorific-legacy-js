import { Fragment, useContext, useRef, useState } from "react";
import { StatusContext } from "../../context/StatusContext";
import { LocalDatabaseItems } from "../../lib/localDB";
import styles from "./add-item-modal-form.module.css";
import ModalBackdrop from "./modal-form-backdrop";
import { BiImageAdd } from "react-icons/bi";
import Image from "next/image";

function AddItemModalForm() {
    const statusContext = useContext(StatusContext);
    const itemToEdit = statusContext.itemToEdit;
    const [imageFilePathURL, setImageFilePathURL] = useState(itemToEdit ? itemToEdit.data.imagePath : null);
    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemDescriptionRef = useRef();

    function itemSubmitHandler(event) {
        event.preventDefault();

        const enteredItemName = itemToEdit ? itemToEdit.data.name : itemNameRef.current.value;
        const enteredItemPrice = itemToEdit ? itemToEdit.data.price : itemPriceRef.current.value;
        const enteredItemDescription = itemToEdit ? itemToEdit.data.description : itemDescriptionRef.current.value;
        const enteredItemImagePathURL = imageFilePathURL;

        const newItem = {
            id: enteredItemName,
            name: enteredItemName,
            price: enteredItemPrice,
            description: enteredItemDescription,
            imagePath: enteredItemImagePathURL,
        };
        itemToEdit ? LocalDatabaseItems[itemToEdit.index] = newItem : LocalDatabaseItems.push(newItem);
        statusContext.closeItemModal();
    }

    function imageInputChangeHandler(event) {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setImageFilePathURL(URL.createObjectURL(img));
        }
    }

    return <Fragment>
        <ModalBackdrop />
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={itemSubmitHandler}>
                <h1>{itemToEdit ? "Edit Item Data" : "Enter Item Data"}</h1>
                <label className={styles.customImageUpload}>
                    <input type={"file"} onChange={imageInputChangeHandler}></input>
                    {imageFilePathURL ? <Image src={imageFilePathURL} alt={"Selected Image"} fill /> : null}
                    <div className={styles.customImageUploadContents}>
                        <BiImageAdd />
                        {imageFilePathURL ? null : <p>Upload Image</p>}
                    </div>
                </label>
                <input type="text" id="itemName" name="itemName" placeholder="Name of Item" ref={itemNameRef} defaultValue={itemToEdit ? itemToEdit.data.name : ""} required>

                </input>
                <input type="text" id="itemPrice" name="itemPrice" placeholder="Price of Item" ref={itemPriceRef}
                    defaultValue={itemToEdit ? itemToEdit.data.price : null} required>
                </input>
                <textarea placeholder="Description of Item" ref={itemDescriptionRef} defaultValue={itemToEdit ? itemToEdit.data.description : ""}></textarea>
                <button className={styles.submitBtn}>Submit</button>
            </form>
        </div>
    </Fragment>;
}

export default AddItemModalForm;