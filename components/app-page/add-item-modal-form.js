import { Fragment, useContext, useRef, useState } from "react";
import { StatusContext } from "../../context/StatusContext";
import { LocalDatabaseItems } from "../../db/localDB";
import styles from "./add-item-modal-form.module.css";
import ModalBackdrop from "./modal-form-backdrop";
import { BiImageAdd } from "react-icons/bi";
import Image from "next/image";

function AddItemModalForm() {
    const statusContext = useContext(StatusContext);
    const [imageFile, setImageFile] = useState(null);
    const [imageObjectUrl, setImageObjectUrl] = useState("");
    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemDescriptionRef = useRef();

    function addItemSubmitHandler(event) {
        event.preventDefault();
        const enteredItemName = itemNameRef.current.value;
        const enteredItemPrice = itemPriceRef.current.value;
        const enteredItemDescription = itemDescriptionRef.current.value;
        const enteredItemImageURL = imageObjectUrl;
        const newItem = {
            id: enteredItemName,
            name: enteredItemName,
            price: enteredItemPrice,
            description: enteredItemDescription,
            imageURL: enteredItemImageURL,
        };
        statusContext.closeAddItemModal();
        LocalDatabaseItems.push(newItem);
    }

    function imageInputChangeHandler(event) {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setImageFile(img);
            setImageObjectUrl(URL.createObjectURL(img));
            URL.revokeObjectURL(img);
        }
    }

    return <Fragment>
        <ModalBackdrop />
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={addItemSubmitHandler}>
                <h1>Enter Item Data</h1>
                <label className={styles.customImageUpload}>
                    <input type={"file"} onChange={imageInputChangeHandler}></input>
                    {imageFile ? <Image src={imageObjectUrl} alt={"Selected Image"} fill /> : null}
                    <div className={styles.customImageUploadContents}>
                        <BiImageAdd />
                        {imageFile ? null : <p>Upload Image</p>}
                    </div>
                    {/* <Image src={imageObjectUrl} alt={"Selected Image"} fill /> */}
                </label>
                <input type="text" id="itemName" name="itemName" placeholder="Name of Item" ref={itemNameRef}></input>
                <input type="text" id="itemPrice" name="itemPrice" placeholder="Price of Item" ref={itemPriceRef}></input>
                <textarea placeholder="Description of Item" ref={itemDescriptionRef}></textarea>
                <button className={styles.submitBtn}>Submit</button>
            </form>
        </div>
    </Fragment>;
}

export default AddItemModalForm;