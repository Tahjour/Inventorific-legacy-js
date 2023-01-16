import Image from "next/image";
import { Fragment } from "react";
import { LocalDatabase } from "../../../../db/localDB";
import { BsPlusCircle } from "react-icons/bs";
import styles from "./tile-list.module.css";

function TileList() {
    return (
        <Fragment>
            <ul className={styles.tileList}>
                {LocalDatabase.map((itemData) => {
                    return <li key={itemData.id} className={styles.itemCard}>
                        <div className={styles.itemImageContainer}>
                            <Image className={styles.itemImage} src={itemData.imageURL} alt={"Item's image"} fill />
                        </div>
                        <div className={styles.itemInfo}>
                            <h3>{itemData.title}</h3>
                            <p>${itemData.price}</p>
                            {/* <p>{itemData.description}</p> */}
                        </div>
                    </li>;
                })}
                <li className={styles.itemCard}>
                    <div className={styles.itemInfo}>
                        <h3>Add Item</h3>
                        <BsPlusCircle className={styles.addNewItemIcon} />
                    </div>
                </li>
            </ul>
        </Fragment>
    );
}

export default TileList;