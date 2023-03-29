import { Fragment, useContext, useRef, useState } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import styles from "./add-item-modal-form.module.css";
import ModalBackdrop from "./modal-form-backdrop";
import { BiImageAdd } from "react-icons/bi";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

function AddItemModalForm() {
    const itemsContext = useContext(ItemsContext);
    const itemToEdit = itemsContext.getItemToEdit();
    const itemBeforeEdit = itemToEdit;
    const [imageFilePathURL, setImageFilePathURL] = useState(itemToEdit ? itemToEdit.imageURL : null);
    const [imageFile, setImageFile] = useState(itemToEdit ? itemToEdit.imageFile : null);
    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemDescriptionRef = useRef();

    async function itemSubmitHandler(event) {
        event.preventDefault();

        const enteredItemName = itemNameRef.current.value;
        const enteredItemPrice = itemPriceRef.current.value;
        const enteredItemDescription = itemDescriptionRef.current.value;
        const enteredImageFilePathURL = imageFilePathURL;

        if (itemToEdit) {
            const editedItem = {
                id: itemToEdit.id,
                name: enteredItemName,
                price: enteredItemPrice,
                description: enteredItemDescription,
                imageURL: enteredImageFilePathURL,
                imageFile: imageFile
            };
            itemsContext.saveEditedItem(editedItem, itemBeforeEdit);
        } else {
            const newItem = {
                id: uuidv4(),
                name: enteredItemName,
                price: enteredItemPrice,
                description: enteredItemDescription,
                imageURL: enteredImageFilePathURL,
                imageFile: imageFile
            };
            //Add new item to local storage
            //Then add new item to cloud storage and update image url to cloud host when it's done loading
            itemsContext.addItem(newItem);
        }

        itemsContext.closeItemModal();
    }

    function imageInputChangeHandler(event) {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setImageFile(img);
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
                <input type="text" id="itemName" name="itemName" placeholder="Name of Item" ref={itemNameRef} defaultValue={itemToEdit ? itemToEdit.name : ""} required>

                </input>
                <input type="text" id="itemPrice" name="itemPrice" placeholder="Price of Item" ref={itemPriceRef}
                    defaultValue={itemToEdit ? itemToEdit.price : ""} required>
                </input>
                <textarea placeholder="Description of Item" ref={itemDescriptionRef} defaultValue={itemToEdit ? itemToEdit.description : ""}></textarea>
                <div className={styles.submitAndCancelBtns}>
                    <button type="button" className={styles.cancelBtn} onClick={itemsContext.closeItemModal}>Cancel</button>
                    <button type="submit" className={styles.submitBtn} >Submit</button>
                </div>
            </form>
        </div>
    </Fragment>;
}

export default AddItemModalForm;