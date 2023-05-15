// tile-list.js
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import styles from "./list-view.module.css";
import { ItemsContext } from "../../../../context/ItemsContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence, LayoutGroup, useAnimate } from "framer-motion";
import Loader from "../../loading/loader";

function ListView(props) {
    const { loadedItems } = props;
    const itemsContext = useContext(ItemsContext);

    function editItemHandler(item) {
        itemsContext.showItemModal(item);
    }

    function deleteItemHandler(item) {
        const itemToDelete = {
            deleteType: "item",
            data: item
        };
        itemsContext.showDeleteModal(itemToDelete);
    }

    return (
        <section className={styles.listView}>
            <AnimatePresence mode="popLayout">
                {loadedItems.map((item, index) => {
                    return (
                        <motion.div
                            className={styles.itemSlabContainer}
                            key={item.id}
                            layout
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
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
                        >
                            <Link href={`items/${item.id}`} className={styles.itemSlab}>
                                {/* Testing */}
                                <div className={styles.itemImageContainer}>
                                    <Image className={styles.itemImage} src={item.imageURL} alt={"Item's image"} fill sizes="(max-width: 640px) 25vw, (max-width: 1024px) 50vw, 100vw" />
                                </div>
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemInfoBits}>
                                        <strong>Name</strong>
                                        {item.name.length > 12 ? `${item.name.slice(0, 12)}...` : item.name}
                                    </div>
                                    <div className={styles.itemInfoBits}>
                                        <strong>Price</strong>
                                        {item.price.length > 11 ? `$${item.price.slice(0, 11)}...` : `$${item.price}`}
                                    </div>
                                    <div className={styles.itemInfoBits}>
                                        <strong>QTY</strong>
                                        {item.amount.length > 11 ? `${item.amount.slice(0, 11)}...` : `${item.amount}`}
                                    </div>

                                    <div className={styles.itemInfoBits}>
                                        <strong>Created</strong>
                                        <p style={{ margin: 0 }}>{item.createdDate}</p>
                                        <p style={{ margin: 0 }}>{item.createdTime}</p>
                                    </div>


                                    <div className={styles.itemInfoBits}>
                                        <strong>Modified</strong>
                                        <p style={{ margin: 0 }}>{item.modifiedDate}</p>
                                        <p style={{ margin: 0 }}>{item.modifiedTime}</p>
                                    </div>


                                    <div className={styles.operationIcons}>
                                        <BiEdit className={styles.editIcon} size={30} onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            editItemHandler(item);
                                        }} />
                                        <BsTrash className={styles.deleteIcon} size={30} onClick={async (e) => {
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

        </section>
    );
}

export default ListView;