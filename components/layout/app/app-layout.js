import { Fragment, useContext } from "react";
import MainBar from "./main-bar";
import MainNavigation from "../navigation/main-navigation";
import SideBar from "./side-bar";
import styles from "./app-layout.module.css";
import AddItemModalForm from "../../app-page/add-item-modal-form";
import { ItemsContext } from "../../../context/ItemsContext";

function AppLayout(props) {
    const itemsContext = useContext(ItemsContext);
    return (
        <Fragment>
            {itemsContext.isItemModalOpen && <AddItemModalForm />}
            {/* <MainNavigation /> */}
            <div className={styles.bars}>
                <SideBar>

                </SideBar>
                <MainBar>
                    {props.children}
                </MainBar>
            </div>
        </Fragment>
    );
}

export default AppLayout;