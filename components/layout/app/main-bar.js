import styles from "./app-layout.module.css";
import TileList from "./item-lists/tile-list";
import MainBarMenu from "./main-bar-menu";

function MainBar() {
    return (
        <section className={styles.mainBar}>
            <MainBarMenu />
            <section className={styles.listBar}>
                <TileList />
            </section>
        </section>
    );
}

export default MainBar;