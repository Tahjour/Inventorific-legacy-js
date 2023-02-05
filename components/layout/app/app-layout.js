import { Fragment, useContext } from "react";
import MainBar from "./main-bar";
import MainNavigation from "../navigation/main-navigation";
import SideBar from "./side-bar";
import styles from "./app-layout.module.css";
import AddItemModalForm from "../../app-page/add-item-modal-form";
import { StatusContext } from "../../../context/StatusContext";

function AppLayout(props) {
    const statusContext = useContext(StatusContext);
    return (
        <Fragment>
            {statusContext.isItemModalOpen && <AddItemModalForm />}
            <MainNavigation />
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