import { Fragment } from "react";
import MainNavigation from "../layout/navigation/main-navigation";

function HomePageLayout(props) {
    return (
        <Fragment>
            <MainNavigation />
            {props.children}
        </Fragment>
    );
}

export default HomePageLayout;