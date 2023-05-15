
import { Fragment } from "react";
import HomePageContent from "../components/home-page/home-page-content";
import MainNavigation from "../components/layout/navigation/main-navigation";
import PageTransition from "../components/ui/page-transition";
function HomePage() {
    return (
        <Fragment>
            <MainNavigation />
            <PageTransition>
                <HomePageContent />
            </PageTransition>
        </Fragment>

    );
}

export default HomePage;