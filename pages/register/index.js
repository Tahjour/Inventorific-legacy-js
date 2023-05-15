import RegisterForm from "../../components/auth-pages/register-form";
import MainNavigation from "../../components/layout/navigation/main-navigation";
import PageTransition from "../../components/ui/page-transition";

function RegisterPage() {
    return (
        <PageTransition>
            <MainNavigation />
            <RegisterForm />
        </PageTransition>
    );
}

export default RegisterPage;