import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import styles from "./tile-list.module.css";
import { ItemsContext } from "../../../../context/ItemsContext";

function ListView() {
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
            <ul className={styles.listView}>
                {!isLoadingItems && loadedItems.length !== 0 && loadedItems.map((item) => {
                    return <li key={item.id} className={styles.itemCard}>
                        <div className={styles.itemImageContainer}>
                            <Image className={styles.itemImage} src={item.imageURL} alt={"Item's image"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                        </div>
                        <div className={styles.itemInfo}>
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
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

export default ListView;