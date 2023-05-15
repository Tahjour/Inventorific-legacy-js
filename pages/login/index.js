import { Fragment } from "react";
import LoginForm from "../../components/auth-pages/login-form";
import MainNavigation from "../../components/layout/navigation/main-navigation";
import PageTransition from "../../components/ui/page-transition";

function LoginPage() {
    return (
        <Fragment>
            <MainNavigation />
            <PageTransition>
                <LoginForm />
            </PageTransition>
        </Fragment>

    );
}

export default LoginPage;


// import { Fragment, forwardRef } from "react";
// import LoginForm from "../../components/auth-pages/login-form";
// import MainNavigation from "../../components/layout/navigation/main-navigation";
// import MainNavigationLayout from "../../components/layout/navigation/main-navigation-layout";
// import PageTransitions from "../../components/ui/page-transitions";

// function LoginPage(props, ref) {
//     return (
//         <PageTransitions ref={ref}>
//             <MainNavigation />
//             <LoginForm />
//         </PageTransitions>
//     );
// }

// export default forwardRef(LoginPage);