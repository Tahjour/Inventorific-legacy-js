import { useRef, useState } from "react";
import styles from "./auth-pages.module.css";
import { FiUser, FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";

function RegisterForm() {
    const [showPassword, setShowPassword] = useState({
        password: false,
        cpassword: false
    });
    const usernameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const cpasswordRef = useRef("");

    function LoginFormHandler(event) {
        event.preventDefault();
    }
    function toggleIsLogin(event) {
        usernameRef.current = "";
        emailRef.current = "";
        passwordRef.current = "";
        cpasswordRef.current = "";
        setIsLogin(!isLogin);
    }
    return (
        <section className={styles.formContainer}>
            <div className={styles.formOuter}>
                <h1>Create a New Account</h1>

                <form className={styles.form} onSubmit={LoginFormHandler}>

                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type="text" id="username" name="username" placeholder="Username" ref={usernameRef}></input>
                        <FiUser className={styles.inputIcons} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type="text" id="email" name="email" placeholder={"Email"} ref={emailRef}></input>
                        <MdAlternateEmail className={styles.inputIcons} />
                    </div>
                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type={showPassword.password ? "text" : "password"} id="password" name="password" placeholder="Password" ref={passwordRef}></input>
                        <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, password: !showPassword.password }); }} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type={showPassword.cpassword ? "text" : "password"} id="cpassword" name="cpassword" placeholder="Confirm Password" ref={cpasswordRef}></input>
                        <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, cpassword: !showPassword.cpassword }); }} />
                    </div>



                    <button className={styles.submitBtn}>
                        {"Sign Up"}
                    </button>

                    <div className={styles.loginOrSignUpPart}>
                        {"Have an account?"}
                        <Link href={"/login"}>
                            <button type="button" className={styles.toggleBtn}>
                                {"Sign In"}
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default RegisterForm;