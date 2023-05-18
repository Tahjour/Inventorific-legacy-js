// main-bar-menu.js
import DropDownMenu from './dropdownmenu';
import { Fragment, useContext, useEffect, useState } from "react";
import { BsGrid, BsPlusCircle, BsSearch, BsFilter, BsCardList } from "react-icons/bs";
import { ItemsContext } from "../../../context/ItemsContext";
import { useSession } from "next-auth/react";
import styles from "./main-bar-menu.module.css";


function MainBarMenu() {
    const { data: session } = useSession();
    const itemsContext = useContext(ItemsContext);
    const [timeoutID, setTimeoutID] = useState(null);
    const [searchTerm, setSearchTerm] = useState(itemsContext.searchTerm);

    function addNewItemHandler() {
        itemsContext.showItemModal();
    }

    function handleSearchTermChange(e) {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        const newTimeoutID = setTimeout(() => {
            itemsContext.searchItems(newSearchTerm);
        }, 200);

        setTimeoutID(newTimeoutID);
    }

    return (
        <Fragment>
            <section className={styles.mainBarMenuContainer}>
                <div className={styles.mainBarMenu}>
                    <div className={styles.mainBarMenuBtns}>
                        <button className={styles.mainBarMenuBtn} onClick={addNewItemHandler}>
                            <BsPlusCircle size={20} />
                        </button>

                        <button className={styles.mainBarMenuBtn}>
                            <BsFilter size={20} />
                        </button>
                    </div>

                    <div className={styles.searchBarContainer}>
                        <input className={styles.searchBar} type="text" placeholder="search..." onChange={handleSearchTermChange} value={searchTerm}></input>
                        <BsSearch className={styles.searchIcon} />
                    </div>

                    <DropDownMenu session={session} />
                </div>
            </section>
        </Fragment>
    );
}

export default MainBarMenu;