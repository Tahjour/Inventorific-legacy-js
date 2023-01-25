import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import styles from "./tile-list.module.css";

function TileList(props) {
    const { items } = props;
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);
    useEffect(() => {
        if (items) {
            setLoadedItems(items);
        }
        setIsLoadingItems(false);
    }, [items]);
    return (
        <Fragment>
            <ul className={styles.tileList}>
                {!isLoadingItems && loadedItems.length !== 0 && loadedItems.map((itemData) => {
                    return <li key={itemData.id} className={styles.itemCard}>
                        <div className={styles.itemImageContainer}>
                            <Image className={styles.itemImage} src={itemData.imageURL} alt={"Item's image"} fill />
                        </div>
                        <div className={styles.itemInfo}>
                            <h3>{itemData.name}</h3>
                            <p>${itemData.price}</p>
                            <div className={styles.operationIcons}>
                                <BiEdit className={styles.editIcon} />
                                <BsTrash className={styles.deleteIcon} />
                            </div>
                            {/* <p>{itemData.description}</p> */}
                        </div>
                    </li>;
                })}
                {!isLoadingItems && loadedItems.length !== 0 && <li className={styles.itemCard}>
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