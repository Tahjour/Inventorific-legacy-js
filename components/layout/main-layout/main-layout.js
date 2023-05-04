import { Fragment, useContext } from "react";
import { ItemsContext } from "../../../context/ItemsContext";
import NotificationPopUp from "../loading/notification";
import { AnimatePresence } from "framer-motion";
import DeleteConfirmation from "../../app-page/delete-modal-confirmation";
import ModalBackdrop from "../../app-page/modal-form-backdrop";

function MainLayout(props) {
    const itemsContext = useContext(ItemsContext);
    const activeNotification = itemsContext.notification;
    return (
        <Fragment>
            <main>{props.children}</main>
            <AnimatePresence>
                {itemsContext.isDeleteModalOpen && <Fragment>
                    <ModalBackdrop />
                    <DeleteConfirmation key="delete-modal-confirmation" />
                </Fragment>}
                {activeNotification && <NotificationPopUp notification={activeNotification} />}
            </AnimatePresence>
        </Fragment>
    );
}

export default MainLayout;
