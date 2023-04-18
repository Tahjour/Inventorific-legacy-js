// tile-list.js
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import styles from "./tile-list.module.css";
import { ItemsContext } from "../../../../context/ItemsContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

function TileList() {
    const itemsContext = useContext(ItemsContext);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (itemsContext.getItems()) {
            setLoadedItems(itemsContext.getItems());
        }
        setIsLoadingItems(false);
    }, [loadedItems, isLoadingItems, itemsContext]);

    function editItemHandler(item) {
        itemsContext.showItemModal(item);
    }

    function deleteItemHandler(item) {
        itemsContext.deleteItem(item);
        setIsLoadingItems(true);
    }

    return (
        <section className={styles.tileList}>
            <AnimatePresence mode="popLayout">
                {!isLoadingItems && loadedItems.length !== 0 && loadedItems.map((item) => {
                    return (
                        <motion.div
                            key={item.id}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            layoutId={item.id}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    scale: 0,
                                    // transition: { duration: 0.2 },
                                },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: { duration: 0.2 },
                                },
                            }}
                        // tabIndex={0}
                        // role="button"
                        >
                            <Link href={`items/${item.id}`} className={styles.itemCard}>
                                <div className={styles.itemImageContainer}>
                                    <Image className={styles.itemImage} src={item.imageURL} alt={"Item's image"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                                </div>
                                <div className={styles.itemInfo}>
                                    <h3>{item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name}</h3>
                                    <p>{item.price.length > 15 ? `$${item.price.slice(0, 12)}...` : `$${item.price}`}</p>
                                    <div className={styles.operationIcons}>
                                        <BiEdit className={styles.editIcon} onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            editItemHandler(item);
                                        }} />
                                        <BsTrash className={styles.deleteIcon} onClick={async (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            deleteItemHandler(item);
                                        }} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </AnimatePresence>


            {/* {!isLoadingItems && (
                <motion.div
                    className={styles.itemCard}
                    onClick={addNewItemHandler}
                    tabIndex={"0"}
                    role="button"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addNewItemHandler();
                        }
                    }}
                    whileHover={{
                        rotate: [0, 10, -10, 0],
                    }}
                    whileFocus={{
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <div className={styles.itemInfo}>
                        <h3>Add Item</h3>
                        <BsPlusCircle className={styles.addNewItemIcon} />
                    </div>
                </motion.div>
            )} */}

        </section>
    );
}

export default TileList;