import { Fragment } from "react";
import MainBar from "./main-bar";
import MainNavigation from "./main-navigation";
import SideBar from "./side-bar";
import styles from "./main-layout.module.css"

function MainLayout(props) {
    return (
        <Fragment>
            <MainNavigation />
            <div className={styles.bars}>
                <SideBar />
                <MainBar />
            </div>
            <main>
                {props.children}
            </main>
        </Fragment>
    );
}

export default MainLayout;