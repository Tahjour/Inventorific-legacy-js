
import { BsPlusCircle } from "react-icons/bs";
import TileList from "./item-lists/tile-list";
import styles from "./list-bar.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { ItemsContext } from "../../../context/ItemsContext";
import Loader from "../loading/loader";
import { useContext, useEffect, useState } from "react";

function ListBar() {
    const itemsContext = useContext(ItemsContext);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);

    useEffect(() => {
        if (itemsContext.getItems()) {
            setLoadedItems(itemsContext.getItems());
        }
        setIsLoadingItems(false);
    }, [loadedItems, isLoadingItems, itemsContext]);

    return <section className={styles.listBar}>
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


    </section>;
}

export default ListBar;