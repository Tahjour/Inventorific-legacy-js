import { Fragment } from "react";
import LoginForm from "../../components/auth-pages/login-form";
import MainNavigation from "../../components/layout/navigation/main-navigation";
import MainNavigationLayout from "../../components/layout/navigation/main-navigation-layout";

function LoginPage() {
    return (
        <Fragment>
            <MainNavigation />
            <LoginForm />
        </Fragment>
    );
}

export default LoginPage;