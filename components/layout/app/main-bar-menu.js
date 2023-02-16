import { Fragment, useContext, useState } from "react";
import { BsGrid, BsPlusCircle, BsSearch, BsSun } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { StatusContext } from "../../../context/StatusContext";
import styles from "./main-bar-menu.module.css";

function MainBarMenu() {
    const statusContext = useContext(StatusContext);
    const [listStyle, setListStyle] = useState("tile");
    function changeListStyle() {
        listStyle === "tile" ? setListStyle("list") : setListStyle("tile");
    }
    function addNewItemHandler() {
        statusContext.showItemModal();
    }
    return (
        <Fragment>
            <section className={styles.mainBarMenu}>
                <div className={styles.mainBarMenuBtns}>
                    <button className={styles.mainBarMenuBtn} onClick={addNewItemHandler}>
                        <BsPlusCircle className={styles.mainBarMenuAddNewIcon} />
                    </button>
                    <button className={styles.mainBarMenuBtn} onClick={changeListStyle}>
                        {listStyle === "tile" ? <FaList className={styles.listStyleIcon} /> : <BsGrid className={styles.listStyleIcon} />}
                    </button>
                </div>

                <div className={styles.searchBarContainer}>
                    <input className={styles.searchBar} type="text" placeholder="search..."></input>
                    <BsSearch className={styles.searchIcon} />
                </div>
                <BsSun className={styles.themeIcon} />
            </section>
        </Fragment>
    );
}

export default MainBarMenu;