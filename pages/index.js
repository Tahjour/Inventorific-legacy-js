// pages\index.js
import { Fragment } from "react";
import HomePageContent from "../components/home-page/home-page-content";
import MainNavigation from "../components/layout/navigation/main-navigation";
import PageTransition from "../components/ui/page-transition";
function HomePage({ routePath }) {
    return (
        <Fragment>
            <MainNavigation />
            <PageTransition key={routePath}>
                <HomePageContent />
            </PageTransition>
        </Fragment>

    );
}

export default HomePage;