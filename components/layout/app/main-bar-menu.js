import { Fragment, useContext, useState } from "react";
import { BsGrid, BsPlusCircle, BsSearch } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { StatusContext } from "../../../context/StatusContext";
import AddItemModalForm from "../../app-page/add-item-modal-form";
import styles from "./main-bar-menu.module.css";

function MainBarMenu() {
    const statusContext = useContext(StatusContext);
    const [listStyle, setListStyle] = useState("tile");
    function changeListStyle() {
        listStyle === "tile" ? setListStyle("list") : setListStyle("tile");
    }
    function addNewItemHandler() {
        statusContext.showAddItemModal();
    }
    return (
        <Fragment>
            <section className={styles.mainBarMenu}>
                <button className={styles.mainBarMenuAddNewBtn} onClick={addNewItemHandler}>
                    <BsPlusCircle className={styles.mainBarMenuAddNewIcon} />
                </button>
                <button className={styles.mainBarMenuAddNewBtn} onClick={changeListStyle}>
                    {listStyle === "tile" ? <FaList className={styles.listStyleIcon} /> : <BsGrid className={styles.listStyleIcon} />}
                </button>
                <div className={styles.searchBarContainer}>
                    <input className={styles.searchBar} type="text" placeholder="search..."></input>
                    <BsSearch className={styles.searchIcon} />
                </div>
                {/* !work on turning this modal into context instead */}
            </section>
        </Fragment>
    );
}

export default MainBarMenu;