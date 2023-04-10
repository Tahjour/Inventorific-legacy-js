import { useRouter } from 'next/router';
import ItemDetails from '../../components/layout/app/item-details/item-details';

function ItemDetailsPage() {
    const router = useRouter();
    const { itemID } = router.query;

    return <ItemDetails itemID={itemID} />;
}

export default ItemDetailsPage;
