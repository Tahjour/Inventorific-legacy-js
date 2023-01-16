import { Fragment } from "react";
import MainNavigation from "./main-navigation";

function MainNavigationLayout(props) {
    return (
        <Fragment>
            <MainNavigation />
            {props.children}
        </Fragment>
    );
}

export default MainNavigationLayout;