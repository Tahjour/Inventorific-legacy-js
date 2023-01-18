import { useState } from "react";
import { BsGrid, BsPlusCircle } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import styles from "./main-bar-menu.module.css";

function MainBarMenu() {
    const [listStyle, setListStyle] = useState("tile");
    function changeListStyle() {
        listStyle === "tile" ? setListStyle("list") : setListStyle("tile");
    }
    return (
        <section className={styles.mainBarMenu}>
            <button className={styles.mainBarMenuAddNewBtn}>
                <BsPlusCircle className={styles.mainBarMenuAddNewIcon} />
            </button>
            <button className={styles.mainBarMenuAddNewBtn} onClick={changeListStyle}>
                {listStyle === "tile" ? <FaList className={styles.listStyleIcon} /> : <BsGrid className={styles.listStyleIcon} />}
            </button>
        </section>
    );
}

export default MainBarMenu;