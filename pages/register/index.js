import { Fragment } from "react";
import RegisterForm from "../../components/auth-pages/register-form";
import MainNavigation from "../../components/layout/navigation/main-navigation";

function RegisterPage() {
    return (
        <Fragment>
            <MainNavigation />
            <RegisterForm />
        </Fragment>
    );
}

export default RegisterPage;