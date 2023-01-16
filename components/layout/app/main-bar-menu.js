import { BsPlusCircle } from "react-icons/bs";
import styles from "./main-bar-menu.module.css";

function MainBarMenu() {
    return (
        <section className={styles.mainBarMenu}>
            <button className={styles.mainBarAddNewBtn}>
                <BsPlusCircle className={styles.mainBarAddNewIcon} />
                Add Item
            </button>
        </section>
    );

}

export default MainBarMenu;