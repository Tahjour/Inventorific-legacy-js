// components\layout\app\main-bar.js
import styles from "./main-bar.module.css";
import MainBarMenu from "./main-bar-menu";
import ListBar from "./list-bar";
import Loader from "../loading/loader";
import { ItemsContext } from "../../../context/ItemsContext";
import { useContext } from "react";

function MainBar() {
    const itemsContext = useContext(ItemsContext);

    return (
        <section className={styles.mainBar}>
            {!itemsContext.initialServerLoadTry && <Loader message={"Loading all items..."} />}
            <MainBarMenu />
            <ListBar />
        </section>
    );
}

export default MainBar;