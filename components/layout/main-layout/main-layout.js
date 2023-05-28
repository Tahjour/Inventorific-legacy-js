// components\layout\main-layout\main-layout.js
import { Fragment, useContext, useEffect } from "react";
import { ItemsContext } from "../../../context/ItemsContext";
import NotificationPopUp from "../loading/notification";
import { AnimatePresence } from "framer-motion";
import DeleteConfirmation from "../../app-page/delete-modal-confirmation";
import ModalBackdrop from "../../app-page/modal-form-backdrop";
import { motion } from "framer-motion";
import styles from "./main-layout.module.css";
import { useRouter } from "next/router";

function MainLayout(props) {
    const router = useRouter();
    const itemsContext = useContext(ItemsContext);
    const activeNotification = itemsContext.notification;

    return (
        <motion.section key={router.asPath} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
            pageInitial: {
                opacity: 0
            },
            pageAnimate: {
                opacity: 1,
                transition: {
                    duration: 0.2
                }
            },
            pageExit: {
                opacity: 0
            }
        }} className={styles.mainLayoutContainer}>
            {props.children}

            <AnimatePresence>
                {itemsContext.isDeleteModalOpen && <Fragment>
                    <ModalBackdrop />
                    <DeleteConfirmation key="delete-modal-confirmation" />
                </Fragment>}
                {activeNotification && <NotificationPopUp key="notification-popup" notification={activeNotification} />}
            </AnimatePresence>

        </motion.section>
    );
}

export default MainLayout;
