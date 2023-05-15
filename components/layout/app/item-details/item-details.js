import Image from 'next/image';
import styles from './item-details.module.css';
import { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../../../../context/ItemsContext';

function ItemDetails({ itemID }) {
    const itemsContext = useContext(ItemsContext);
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (itemID) {
            const fetchedItem = itemsContext.getItem(itemID);
            setItem(fetchedItem);
        }
    }, [itemID, itemsContext]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <section className={styles.itemDetailsContainer}>
            <div className={styles.itemDetailsSubContainer}>
                <div className={styles.itemImageContainer}>
                    <Image
                        className={styles.itemImage}
                        src={item.imageURL}
                        alt={"Item's image"}
                        sizes="(max-width: 640px) 25vw, (max-width: 1024px) 50vw, 100vw"
                        fill
                    />
                </div>
                <div className={styles.itemInfo}>
                    <div className={styles.itemInfoSub}>
                        <div className={styles.itemInfoCol1}>
                            <h1>Name: {item.name}</h1>
                            <p>Price: ${item.price}</p>
                            <p>Amount: {item.amount}</p>
                        </div>
                        <div className={styles.itemInfoCol1}>
                            <p>Created On: {item.createdDate} {item.createdTime}</p>
                            <p>Last Modified: {item.modifiedDate} {item.modifiedTime}</p>
                        </div>
                    </div>

                    <p className={styles.itemDescription}>{item.description}</p>
                </div>
            </div>

        </section>
    );
}

export default ItemDetails;
