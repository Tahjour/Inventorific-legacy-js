import { Fragment } from "react";
import HomePageContent from "../components/home-page/home-page-content";
import HomePageLayout from "../components/home-page/home-page-layout";
function HomePage() {
    return (
        <Fragment>
            <HomePageLayout>
                <HomePageContent />
            </HomePageLayout>
        </Fragment>
    );
}

export default HomePage;