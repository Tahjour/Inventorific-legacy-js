import LoginForm from "../../components/auth-pages/login-form";
import MainNavigationLayout from "../../components/layout/navigation/main-navigation-layout";

function LoginPage() {
    return (
        <MainNavigationLayout>
            <LoginForm />
        </MainNavigationLayout>
    );
}

export default LoginPage;