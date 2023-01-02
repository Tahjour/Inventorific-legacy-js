import styles from "./side-bar.module.css";

function SideBar(props) {
    return (
        <section className={styles.sideBar}>
            {props.children}
        </section>
    );
}

export default SideBar;