import { useContext, useEffect, useState } from "react";
import styles from "./app-layout.module.css";
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
                {itemsContext.initialServerLoadTry && !isLoadingItems && loadedItems.length > 0 && <TileList loadedItems={loadedItems} />}
                
                {itemsContext.initialServerLoadTry && !isLoadingItems && loadedItems.length < 1 && <div className={styles.noItemsContainer} >
                    <motion.div className={styles.noItemsDisplayContainer} animate={{
                        scale: [0, 1],
                        transition: {
                            duration: 0.2
                        }
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

                
            </section>
        </section>
    );
}

export default MainBar;