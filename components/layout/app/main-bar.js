import styles from "./main-bar.module.css";

function MainBar(props) {
    return (
        <section className={styles.mainBar}>
            {props.children}
        </section>
    );
}

export default MainBar;