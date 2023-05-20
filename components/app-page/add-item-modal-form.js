//components/app-page/add-item-modal-form.js
import { Fragment, useContext, useEffect, useRef, useState } from "react";
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

    useEffect(() => {
        function setVhVariable() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            console.log(vh);
        }

        // Run the function when the component mounts
        setVhVariable();

        // Run the function every time the window is resized
        window.addEventListener('resize', setVhVariable);

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener('resize', setVhVariable);
    }, []);

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

        // Create a new Date object for the current date and time
        const currentDate = new Date();
        // Get the day, month, and year
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
        const year = currentDate.getFullYear();
        // Get the hours, minutes, and seconds
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Pad start to always have 2 digits
        const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // Pad start to always have 2 digits
        // Convert hours from 24-hour clock to 12-hour clock format
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        // Format the date and time as a string
        const formattedDate = `${month}/${day}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;
        // const formattedDateTime = `${formattedDate} ${formattedTime}`;



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
                createdDate: itemBeforeEdit.createdDate,
                createdTime: itemBeforeEdit.createdTime,
                modifiedDate: formattedDate,
                modifiedTime: formattedTime,
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
                createdDate: formattedDate,
                createdTime: formattedTime,
                modifiedDate: formattedDate,
                modifiedTime: formattedTime,
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
        <motion.form className={styles.addOrEditForm} animate="visible" exit={"hidden"} variants={{
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
            {/* <div className={styles.formContentsContainer}> */}

            <label className={styles.customImageUploadLabel}>
                <input className={styles.imageFileInput} type={"file"} onChange={imageInputChangeHandler}></input>
                {imageFileURL ? <Image src={imageFileURL} alt={"Selected Image"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw" /> : null}
                <div className={styles.customImageUploadLabelContents}>
                    <div
                        className={`${styles.customImageUploadLabelContentsOptions} ${imageFileURL
                            ? ""
                            : styles.customImageUploadLabelContentsOptionsVisible
                            }`}>
                        <BiImageAdd />
                        {imageFileURL ? <p>Change Image</p> : <p>Upload Image</p>}
                    </div>
                </div>
            </label>

            <div className={styles.itemInfo}>
                {/* <label htmlFor="name">Name</label> */}
                <input className={`${styles.textInput} ${formik.errors.name && formik.touched.name ? styles.errorTextInput : ""}`} type="text" id="name" name="name" placeholder="Name of Item" {...formik.getFieldProps('name')} required>
                </input>

                <input className={`${styles.textInput} ${formik.errors.price && formik.touched.price ? styles.errorTextInput : ""}`} type="text" id="price" name="price" placeholder="Price of Item"  {...formik.getFieldProps('price')} required>
                </input>

                <input className={`${styles.textInput} ${formik.errors.amount && formik.touched.amount ? styles.errorTextInput : ""}`} type="text" id="amount" name="amount" placeholder="Amount of Item"  {...formik.getFieldProps('amount')} required>
                </input>

                <div className={styles.textAreaContainer}>
                    <textarea className={styles.textArea} placeholder="Description of Item" name="description"  {...formik.getFieldProps('description')}>
                    </textarea>
                    <div className={styles.resizeHandle}></div>
                </div>

                <div className={styles.submitAndCancelBtns}>
                    <button type="button" className={styles.cancelBtn} onClick={itemsContext.closeItemModal}>Cancel</button>
                    <button type="submit" className={styles.submitBtn}>{itemBeforeEdit ? "Edit" : "Create"}</button>
                </div>
            </div>
        </motion.form>
    </section>;
}

export default AddItemModalForm;