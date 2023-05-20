// components\layout\app\app-layout.js
import { Fragment, useContext } from "react";
import MainBar from "./main-bar";
import MainNavigation from "../navigation/main-navigation";
import SideBar from "./side-bar";
import styles from "./app-layout.module.css";
import AddItemModalForm from "../../app-page/add-item-modal-form";
import { ItemsContext } from "../../../context/ItemsContext";
import ModalBackdrop from "../../app-page/modal-form-backdrop";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../loading/loader";
import NotificationPopUp from "../loading/notification";
import DeleteConfirmation from "../../app-page/delete-modal-confirmation";

function AppLayout(props) {
    const itemsContext = useContext(ItemsContext);
    return (
        <Fragment>
            
            <AnimatePresence mode="wait">
                {itemsContext.isItemModalOpen && <Fragment>
                    <ModalBackdrop />
                    <AddItemModalForm key="add-item-modal-form" />
                </Fragment>}
            </AnimatePresence>


            <div className={styles.bars}>
                {/* <SideBar /> */}
                <MainBar />
            </div>
        </Fragment>
    );
}

export default AppLayout;