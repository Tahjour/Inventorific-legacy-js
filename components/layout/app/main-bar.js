import styles from "./app-layout.module.css";
import MainBarMenu from "./main-bar-menu";

function MainBar(props) {
    return (
        <section className={styles.mainBar}>
            <MainBarMenu />
            {props.children}
        </section>
    );
}

export default MainBar;