import { Fragment } from "react";
import RegisterForm from "../../components/auth-pages/register-form";
import MainNavigation from "../../components/layout/navigation/main-navigation";
import MainNavigationLayout from "../../components/layout/navigation/main-navigation-layout";

function LoginPage() {
    return (
        <Fragment>
            <MainNavigation />
            <RegisterForm />
        </Fragment>
    );
}

export default LoginPage;