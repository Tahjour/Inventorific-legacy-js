import { useState } from "react";
import styles from "./login-form.module.css";
import { FiUser, FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";

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

                    {isLogin ? null : <div className={styles.inputContainer}>
                        <input className={styles.textInput} type="text" id="username" name="username" placeholder="Username"></input>
                        <FiUser className={styles.inputIcons} />
                    </div>}

                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type="text" id="email" name="email" placeholder={isLogin ? "Email or Username" : "Email"}></input>
                        <MdAlternateEmail className={styles.inputIcons} />
                    </div>
                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type="password" id="password" name="password" placeholder="Password"></input>
                        <FiEyeOff className={styles.inputIcons} />
                    </div>

                    {isLogin ? null : <div className={styles.inputContainer}>
                        <input className={styles.textInput} type="password" id="cpassword" name="cpassword" placeholder="Confirm Password"></input>
                        <FiEyeOff className={styles.inputIcons} />
                    </div>}



                    <button className={styles.submitBtn} onClick={LoginFormHandler}>
                        {isLogin ? "Login" : "Sign Up"}
                    </button>

                    {isLogin ? <button className={styles.googleBtn}>
                        <FcGoogle /> Google
                    </button> : null}


                    <div className={styles.loginOrSignUpPart}>
                        {isLogin ? "Don't have an account?" : "Have an account? "}
                        <button className={styles.toggleBtn} onClick={toggleIsLogin}>
                            {isLogin ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default LoginForm;