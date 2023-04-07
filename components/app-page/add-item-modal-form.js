import { Fragment, useContext, useRef, useState } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import styles from "./add-item-modal-form.module.css";
import ModalBackdrop from "./modal-form-backdrop";
import { BiImageAdd } from "react-icons/bi";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

function AddItemModalForm() {
    const itemsContext = useContext(ItemsContext);
    const itemBeforeEdit = itemsContext.getItemBeforeEdit();
    const [imageFileURL, setImageFileURL] = useState(itemBeforeEdit ? itemBeforeEdit.imageURL : null);
    const [imageFile, setImageFile] = useState(itemBeforeEdit ? itemBeforeEdit.imageFile : null);
    const defaultImagePath = "/default_image.png";
    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemDescriptionRef = useRef();

    async function itemSubmitHandler(event) {
        event.preventDefault();

        const enteredItemName = itemNameRef.current.value;
        const enteredItemPrice = itemPriceRef.current.value;
        const enteredItemDescription = itemDescriptionRef.current.value;
        const enteredImageFileURL = imageFileURL || defaultImagePath;

        if (itemBeforeEdit) {
            const itemAfterEdit = {
                id: itemBeforeEdit.id,
                name: enteredItemName,
                price: enteredItemPrice,
                description: enteredItemDescription,
                imageURL: enteredImageFileURL,
                imageFile: imageFile
            };
            itemsContext.saveItemAfterEdit(itemBeforeEdit, itemAfterEdit);
        } else {
            const newItem = {
                id: uuidv4(),
                name: enteredItemName,
                price: enteredItemPrice,
                description: enteredItemDescription,
                imageURL: enteredImageFileURL,
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
            setImageFileURL(URL.createObjectURL(img));
        }
    }

    return <Fragment>
        <ModalBackdrop />
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={itemSubmitHandler}>
                <h1>{itemBeforeEdit ? "Edit Item Data" : "Enter Item Data"}</h1>
                <label className={styles.customImageUpload}>
                    <input type={"file"} onChange={imageInputChangeHandler}></input>
                    {imageFileURL ? <Image src={imageFileURL} alt={"Selected Image"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" /> : null}
                    <div className={styles.customImageUploadContents}>
                        <BiImageAdd />
                        {imageFileURL ? null : <p>Upload Image</p>}
                    </div>
                </label>
                <input type="text" id="itemName" name="itemName" placeholder="Name of Item" ref={itemNameRef} defaultValue={itemBeforeEdit ? itemBeforeEdit.name : ""} required>

                </input>
                <input type="text" id="itemPrice" name="itemPrice" placeholder="Price of Item" ref={itemPriceRef}
                    defaultValue={itemBeforeEdit ? itemBeforeEdit.price : ""} required>
                </input>
                <textarea placeholder="Description of Item" ref={itemDescriptionRef} defaultValue={itemBeforeEdit ? itemBeforeEdit.description : ""}></textarea>
                <div className={styles.submitAndCancelBtns}>
                    <button type="button" className={styles.cancelBtn} onClick={itemsContext.closeItemModal}>Cancel</button>
                    <button type="submit" className={styles.submitBtn} >Submit</button>
                </div>
            </form>
        </div>
    </Fragment>;
}

export default AddItemModalForm;