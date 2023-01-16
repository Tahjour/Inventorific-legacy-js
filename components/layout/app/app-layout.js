import { Fragment } from "react";
import MainBar from "./main-bar";
import MainNavigation from "../navigation/main-navigation";
import SideBar from "./side-bar";
import styles from "./app-layout.module.css";

function AppLayout(props) {
    return (
        <Fragment>
            <MainNavigation />
            <div className={styles.bars}>
                <SideBar>
                    Categories
                </SideBar>
                <MainBar>
                    {props.children}
                </MainBar>
            </div>
        </Fragment>
    );
}

export default AppLayout;