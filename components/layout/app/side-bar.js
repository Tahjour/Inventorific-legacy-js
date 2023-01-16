import styles from "./app-layout.module.css";

function SideBar(props) {
    return (
        <section className={styles.sideBar}>
            {props.children}
        </section>
    );
}

export default SideBar;