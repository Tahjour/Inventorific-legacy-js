// components\layout\app\main-bar.js
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./main-bar.module.css";
import TileList from "./item-lists/tile-list";
import MainBarMenu from "./main-bar-menu";
import { BsPlusCircle } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { ItemsContext } from "../../../context/ItemsContext";
import ListView from "./item-lists/list-view";

function MainBar() {
    const itemsContext = useContext(ItemsContext);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);
    const [isLargeScreen, setIsLargeScreen] = useState(window ? window.innerWidth > 1020 : null);

    useEffect(() => {
        if (itemsContext.getItems()) {
            setLoadedItems(itemsContext.getItems());
        }
        setIsLoadingItems(false);
        if (window) {
            function handleResize() {

                setIsLargeScreen(window.innerWidth > 1020);
                !isLargeScreen ? itemsContext.setListMode("tile") : null;
            }
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [loadedItems, isLoadingItems, itemsContext, isLargeScreen]);

    return (
        <section className={styles.mainBar}>
            <MainBarMenu />
            <section className={styles.listBar}>
                <AnimatePresence mode="wait">
                    {itemsContext.initialServerLoadTry && itemsContext.getListMode() === "tile" && !isLoadingItems && loadedItems.length > 0 && <motion.div key={"tile-list"} exit={{
                        opacity: 0
                    }}>
                        <TileList loadedItems={loadedItems} />
                    </motion.div>}

                    {itemsContext.initialServerLoadTry && itemsContext.getListMode() === "list" && !isLoadingItems && loadedItems.length > 0 && <motion.div key={"list-view"} exit={{
                        opacity: 0
                    }}>
                        <ListView loadedItems={loadedItems} />
                    </motion.div>}


                    {itemsContext.initialServerLoadTry && !isLoadingItems && loadedItems.length < 1 && <div className={styles.noItemsContainer} >
                        <motion.div className={styles.noItemsDisplayContainer} animate={{
                            scale: [0, 1],
                        }} exit={{
                            scale: 0
                        }}>
                            <h1>
                                No items to display. Click
                                <span className={styles.iconWrapper}>
                                    <BsPlusCircle size={20} />
                                </span>
                                to add an item.
                            </h1>
                        </motion.div>
                    </div>}
                </AnimatePresence>


            </section>
        </section>
    );
}

export default MainBar;