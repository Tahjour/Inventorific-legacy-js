// components\layout\main-layout\main-layout.js
import { Fragment, useContext, useEffect } from "react";
import { ItemsContext } from "../../../context/ItemsContext";
import NotificationPopUp from "../loading/notification";
import { AnimatePresence } from "framer-motion";
import DeleteConfirmation from "../../app-page/delete-modal-confirmation";
import ModalBackdrop from "../../app-page/modal-form-backdrop";
import styles from "./main-layout.module.css";

function MainLayout(props) {
    const itemsContext = useContext(ItemsContext);
    const activeNotification = itemsContext.notification;

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

    return (
        <section className={styles.mainLayoutContainer}>
            {props.children}
            <AnimatePresence>
                {itemsContext.isDeleteModalOpen && <Fragment>
                    <ModalBackdrop />
                    <DeleteConfirmation key="delete-modal-confirmation" />
                </Fragment>}
                {activeNotification && <NotificationPopUp key="notification-popup" notification={activeNotification} />}
            </AnimatePresence>
        </section>
    );
}

export default MainLayout;
