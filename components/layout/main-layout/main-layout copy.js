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
