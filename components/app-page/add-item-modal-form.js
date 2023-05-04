//components/app-page/add-item-modal-form.js
import { Fragment, useContext, useRef, useState } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import styles from "./modal-form.module.css";
import { BiImageAdd } from "react-icons/bi";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from "formik";
import { itemValidate } from "../../lib/authHelper";
import { motion } from "framer-motion";

function AddItemModalForm() {
    const itemsContext = useContext(ItemsContext);
    const itemBeforeEdit = itemsContext.getItemBeforeEdit();
    const [imageFileURL, setImageFileURL] = useState(itemBeforeEdit ? itemBeforeEdit.imageURL : null);
    const [imageFile, setImageFile] = useState(itemBeforeEdit ? itemBeforeEdit.imageFile : null);
    const defaultImagePath = "/default_image.png";

    const formik = useFormik({
        initialValues: {
            name: itemBeforeEdit ? itemBeforeEdit.name : '',
            price: itemBeforeEdit ? itemBeforeEdit.price : '',
            amount: itemBeforeEdit ? itemBeforeEdit.amount : '',
            description: itemBeforeEdit ? itemBeforeEdit.description : ''
        },
        validate: itemValidate,
        onSubmit: itemSubmitHandler
    });

    async function itemSubmitHandler(values) {

        const enteredImageFileURL = imageFileURL || defaultImagePath;

        itemsContext.showNotification({
            title: "Saving",
            status: "saving",
            message: "Saving...",
        });
        if (itemBeforeEdit) {
            const itemAfterEdit = {
                id: itemBeforeEdit.id,
                name: values.name,
                price: values.price,
                amount: values.amount,
                description: values.description,
                imageURL: enteredImageFileURL,
                imageFile: imageFile
            };

            itemsContext.saveItemAfterEdit(itemBeforeEdit, itemAfterEdit);
        } else {
            const newItem = {
                id: uuidv4(),
                name: values.name,
                price: values.price,
                amount: values.amount,
                description: values.description,
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

    return <section className={styles.formContainer}>
        <motion.form className={styles.form} animate="visible" exit={"hidden"} variants={{
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
        }} onSubmit={formik.handleSubmit}>
            <div className={styles.formContentsContainer}>
                <div className={styles.formContentsContainerCol}>
                    <label className={styles.customImageUploadLabel}>
                        <input className={styles.imageFileInput} type={"file"} onChange={imageInputChangeHandler}></input>
                        {imageFileURL ? <Image src={imageFileURL} alt={"Selected Image"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw" /> : null}
                        <div className={styles.customImageUploadLabelContents}>
                            <div
                                className={`${styles.customImageUploadLabelContentsOptions} ${imageFileURL
                                        ? ""
                                        : styles.customImageUploadLabelContentsOptionsVisible
                                    }`}
                            >
                                <BiImageAdd />
                                {imageFileURL ? <p>Change Image</p> : <p>Upload Image</p>}
                            </div>
                        </div>
                    </label>
                </div>
                <div className={styles.formContentsContainerCol}>
                    <input className={`${styles.textInput} ${formik.errors.name && formik.touched.name ? styles.errorTextInput : ""}`} type="text" id="name" name="name" placeholder="Name of Item" {...formik.getFieldProps('name')} required>
                    </input>

                    <input className={`${styles.textInput} ${formik.errors.price && formik.touched.price ? styles.errorTextInput : ""}`} type="text" id="price" name="price" placeholder="Price of Item"  {...formik.getFieldProps('price')} required>
                    </input>

                    <input className={`${styles.textInput} ${formik.errors.amount && formik.touched.amount ? styles.errorTextInput : ""}`} type="text" id="amount" name="amount" placeholder="Amount of Item"  {...formik.getFieldProps('amount')} required>
                    </input>

                    <textarea className={styles.textArea} placeholder="Description of Item" name="description"  {...formik.getFieldProps('description')}>
                    </textarea>

                    <div className={styles.submitAndCancelBtns}>
                        <button type="button" className={styles.cancelBtn} onClick={itemsContext.closeItemModal}>Cancel</button>
                        <button type="submit" className={styles.submitBtn}>{itemBeforeEdit ? "Edit Item" : "Add Item"}</button>
                    </div>
                </div>
            </div>
        </motion.form>
    </section>;
}

export default AddItemModalForm;