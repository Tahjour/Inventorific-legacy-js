// tile-list.js
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import styles from "./tile-list.module.css";
import { ItemsContext } from "../../../../context/ItemsContext";
import Link from "next/link";

function TileList() {
    const itemsContext = useContext(ItemsContext);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);

    useEffect(() => {
        if (itemsContext.getItems()) {
            setLoadedItems(itemsContext.getItems());
        }
        setIsLoadingItems(false);
    }, [loadedItems, isLoadingItems, itemsContext]);

    function addNewItemHandler() {
        itemsContext.showItemModal();
    }

    function editItemHandler(item) {
        itemsContext.showItemModal(item);
    }

    function deleteItemHandler(item) {
        itemsContext.deleteItem(item);
        setLoadedItems(itemsContext.getItems());
        setIsLoadingItems(true);
    }

    return (
        <Fragment>
            <ul className={styles.tileList}>
                {!isLoadingItems && loadedItems.length !== 0 && loadedItems.map((item) => {
                    return (
                        <li key={item.id} className={styles.itemCard}>
                            <Link href={`items/${item.id}`} className={styles.itemCardLink}>
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
                                        <BsTrash className={styles.deleteIcon} onClick={(e) => {
                                            e.preventDefault(); 
                                            e.stopPropagation();
                                            deleteItemHandler(item);
                                        }} />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
                {/* ... existing code for the "Add Item" card */}
                {!isLoadingItems && <li className={styles.itemCard} onClick={addNewItemHandler}>
                    <div className={styles.itemInfo}>
                        <h3>Add Item</h3>
                        <BsPlusCircle className={styles.addNewItemIcon} />
                    </div>
                </li>}
            </ul>
        </Fragment>
    );
    return (
        <Fragment>
            <ul className={styles.tileList}>
                {!isLoadingItems && loadedItems.length !== 0 && loadedItems.map((item) => {
                    return <Link key={item.id} href={`items/${item.id}`} className={styles.itemCardLink}>
                        <li key={item.id} className={styles.itemCard}>
                            <div className={styles.itemImageContainer}>
                                <Image className={styles.itemImage} src={item.imageURL} alt={"Item's image"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                            </div>
                            <div className={styles.itemInfo}>
                                <h3>{item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name}</h3>
                                <p>{item.price.length > 15 ? `$${item.price.slice(0, 12)}...` : `$${item.price}`}</p>
                                <div className={styles.operationIcons}>
                                    <BiEdit className={styles.editIcon} onClick={() => {
                                        editItemHandler(item);
                                    }} />
                                    <BsTrash className={styles.deleteIcon} onClick={() => {
                                        deleteItemHandler(item);
                                    }} />
                                </div>
                                {/* <p>{item.description}</p> */}
                            </div>
                        </li>;
                    </Link>;
                })}
                {!isLoadingItems && <li className={styles.itemCard} onClick={addNewItemHandler}>
                    <div className={styles.itemInfo}>
                        <h3>Add Item</h3>
                        <BsPlusCircle className={styles.addNewItemIcon} />
                    </div>
                </li>}
            </ul>
        </Fragment>
    );
}

export default TileList;