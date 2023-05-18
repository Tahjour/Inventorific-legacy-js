// components\layout\app\main-bar.js
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./main-bar.module.css";
import TileList from "./item-lists/tile-list";
import MainBarMenu from "./main-bar-menu";
import { BsPlusCircle } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { ItemsContext } from "../../../context/ItemsContext";

function MainBar() {
    const itemsContext = useContext(ItemsContext);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);

    useEffect(() => {
        if (itemsContext.getItems()) {
            setLoadedItems(itemsContext.getItems());
        }
        setIsLoadingItems(false);
    }, [loadedItems, isLoadingItems, itemsContext]);

    return (
        <section className={styles.mainBar}>
            <MainBarMenu />
            <section className={styles.listBar}>
                <AnimatePresence mode="wait">
                    {itemsContext.initialServerLoadTry && !isLoadingItems && loadedItems.length > 0 && <motion.div key={"tile-list"} exit={{
                        opacity: 0
                    }}>
                        <TileList loadedItems={loadedItems} />
                    </motion.div>}

                    {itemsContext.initialServerLoadTry && !isLoadingItems && loadedItems.length < 1 &&
                        <motion.div key={"no-items"} className={styles.noItemsDisplayContainer}>
                            <motion.h1 animate={{
                                scale: [0, 1],
                            }} exit={{
                                scale: 0
                            }}>
                                No items to display. Click
                                <span className={styles.iconWrapper}>
                                    <BsPlusCircle size={20} />
                                </span>
                                to add an item.
                            </motion.h1>
                        </motion.div>
                    }
                </AnimatePresence>


            </section>
        </section>
    );
}

export default MainBar;