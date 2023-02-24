import RegisterForm from "../../components/auth-pages/register-form";
import MainNavigationLayout from "../../components/layout/navigation/main-navigation-layout";

function LoginPage() {
    return (
        <MainNavigationLayout>
            <RegisterForm />
        </MainNavigationLayout>
    );
}

export default LoginPage;