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
            <div className={styles.itemImageContainer}>
                <Image
                    className={styles.itemImage}
                    src={item.imageURL}
                    alt={"Item's image"}
                    fill
                />
            </div>
            <div className={styles.itemInfo}>
                <h1>{item.name}</h1>
                <p>${item.price}</p>
                <p>{item.description}</p>
            </div>
        </section>
    );
}

export default ItemDetails;