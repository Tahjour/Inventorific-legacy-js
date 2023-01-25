import styles from "./app-layout.module.css";
import MainBarMenu from "./main-bar-menu";
import { StatusContext } from "../../../context/StatusContext";
import { useContext } from "react";
import AddItemModalForm from "../../app-page/add-item-modal-form";

function MainBar(props) {
    const statusContext = useContext(StatusContext);
    return (
        <section className={styles.mainBar}>
            <MainBarMenu />
            {statusContext.isAddItemModalOpen && <AddItemModalForm />}
            {props.children}
        </section>
    );
}

export default MainBar;