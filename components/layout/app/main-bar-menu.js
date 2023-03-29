import { Fragment, useContext, useState } from "react";
import { BsGrid, BsPlusCircle, BsSearch, BsSun } from "react-icons/bs";
import { IoListSharp } from "react-icons/io5";
import { ItemsContext } from "../../../context/ItemsContext";
import styles from "./main-bar-menu.module.css";

function MainBarMenu() {
    const itemsContext = useContext(ItemsContext);
    const [listStyle, setListStyle] = useState("tile");
    function changeListStyle() {
        listStyle === "tile" ? setListStyle("list") : setListStyle("tile");
    }
    function addNewItemHandler() {
        itemsContext.showItemModal();
    }
    return (
        <Fragment>
            <section className={styles.mainBarMenuContainer}>
                <div className={styles.mainBarMenu}>
                    <div className={styles.mainBarMenuBtns}>
                        <button className={styles.mainBarMenuBtn} onClick={addNewItemHandler}>
                            <BsPlusCircle size={20} />
                        </button>
                        <button className={styles.mainBarMenuBtn} onClick={changeListStyle}>
                            {listStyle === "tile" ? <IoListSharp size={20} /> : <BsGrid size={20} />}
                        </button>
                        <button className={styles.mainBarMenuBtn}>
                            <BsSun size={20} />
                        </button>
                    </div>

                    <div className={styles.searchBarContainer}>
                        <input className={styles.searchBar} type="text" placeholder="search..."></input>
                        <BsSearch className={styles.searchIcon} />
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default MainBarMenu;