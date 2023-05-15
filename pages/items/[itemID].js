import { useRouter } from 'next/router';
import ItemDetails from '../../components/layout/app/item-details/item-details';
import { forwardRef } from 'react';
import PageTransition from '../../components/ui/page-transition';

function ItemDetailsPage(props) {
    const router = useRouter();
    const { itemID } = router.query;

    return <PageTransition>
        <ItemDetails itemID={itemID} />;
    </PageTransition>;
}

export default ItemDetailsPage;
