// pages\items\index.js
import AppLayout from "../../components/layout/app/app-layout";
import PageTransition from "../../components/ui/page-transition";
import HomeBackground from "../../components/ui/home-background";

function ItemsPage() {
    return <PageTransition>
        <HomeBackground>
            <AppLayout />
        </HomeBackground>
    </PageTransition>;
}

export default ItemsPage;