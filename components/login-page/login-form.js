import { useState } from "react";
import MainNavigationLayout from "../layout/navigation/main-navigation-layout";
import styles from "./login-form.module.css";

function LoginForm() {
    const [isLogin, setIsLogin] = useState(true);

    function LoginFormHandler(event) {
        event.preventDefault();
    }
    function toggleIsLogin(event) {
        event.preventDefault();
        setIsLogin(!isLogin);
    }
    return (
        <section className={styles.formContainer}>
            <div className={styles.formOuter}>
                {isLogin ? <h1>Login to Your Account</h1> : <h1>Create a New Account</h1>}

                <form className={styles.form}>
                    <input type="text" id="email" name="email" placeholder="Your email"></input>
                    <input type="password" id="password" name="password" placeholder="Your password"></input>
                    <button className={styles.submitBtn} onClick={LoginFormHandler}>
                        {isLogin ? "Login" : "Sign up"}
                    </button>
                    <button className={styles.toggleBtn} onClick={toggleIsLogin}>
                        {isLogin ? "Create a New Account" : "Login with Existing Account"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default LoginForm;