import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import styles from "./tile-list.module.css";
import { StatusContext } from "../../../../context/StatusContext";
import { deleteItem, LocalDatabaseItems } from "../../../../db/localDB";

function TileList() {
    const statusContext = useContext(StatusContext);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);

    useEffect(() => {
        if (LocalDatabaseItems) {
            setLoadedItems(LocalDatabaseItems);
        }
        setIsLoadingItems(false);
    }, [loadedItems, isLoadingItems]);

    function addNewItemHandler() {
        statusContext.showItemModal();
    }

    function editItemHandler(itemIndex) {
        const item = {
            data: LocalDatabaseItems[itemIndex],
            index: itemIndex
        };
        statusContext.showItemModal(item);
    }

    function deleteItemHandler(itemIndex) {
        deleteItem(itemIndex);
        setLoadedItems(LocalDatabaseItems);
        setIsLoadingItems(true);
    }

    return (
        <Fragment>
            <ul className={styles.tileList}>
                {!isLoadingItems && loadedItems.length !== 0 && loadedItems.map((item, itemIndex) => {
                    return <li key={item.id} className={styles.itemCard}>
                        <div className={styles.itemImageContainer}>
                            <Image className={styles.itemImage} src={item.imagePath} alt={"Item's image"} fill />
                        </div>
                        <div className={styles.itemInfo}>
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <div className={styles.operationIcons}>
                                <BiEdit className={styles.editIcon} onClick={() => {
                                    editItemHandler(itemIndex);
                                }} />
                                <BsTrash className={styles.deleteIcon} onClick={() => {
                                    deleteItemHandler(itemIndex);
                                }} />
                            </div>
                            {/* <p>{item.description}</p> */}
                        </div>
                    </li>;
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