import { Fragment } from "react";
import HomePageContent from "../components/home-page/home-page-content";
import MainNavigation from "../components/layout/navigation/main-navigation";
function HomePage() {
    return (
        <Fragment>
            <MainNavigation />
            <HomePageContent />
        </Fragment>
    );
}

export default HomePage;