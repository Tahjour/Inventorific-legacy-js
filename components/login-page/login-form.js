import { useState } from "react";
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
                {isLogin ? <h1>Login</h1> : <h1>Sign Up</h1>}

                <form className={styles.form}>
                    <input type="text" id="email" name="email" placeholder="Your email"></input>
                    <input type="password" id="password" name="password" placeholder="Your password"></input>
                    <button className={styles.submitBtn} onClick={LoginFormHandler}>
                        {isLogin ? "Login" : "Sign Up"}
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