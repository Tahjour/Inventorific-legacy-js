import { useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./auth-pages.module.css";
import { FiUser, FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";

function LoginForm() {
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

    async function googleSignInHandler() {
        await signIn("google", { callbackUrl: "http://localhost:3000/app" });
    }
    return (
        <section className={styles.formContainer}>
            <div className={styles.formOuter}>
                <h1>Login to Your Account</h1>

                <form className={styles.form} onSubmit={LoginFormHandler}>

                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type="text" id="email" name="email" placeholder={"Email or Username"} ref={emailRef}></input>
                        <FiUser className={styles.inputIcons} />
                    </div>
                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type={showPassword.password ? "text" : "password"} id="password" name="password" placeholder="Password" ref={passwordRef}></input>
                        {showPassword.password ? <FiEye className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, password: false }); }} /> : <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, password: true }); }} />}
                    </div>

                    <button className={styles.submitBtn}>
                        {"Login"}
                    </button>

                    <div className={styles.separatorLine}>
                        <span>or</span>
                    </div>
                    <button type="button" className={styles.googleBtn} onClick={googleSignInHandler}>
                        <FcGoogle size={25} /> {"Login with Google"}
                    </button>


                    <div className={styles.loginOrSignUpPart}>
                        {"Don't have an account?"}
                        <Link href={"/register"}>
                            <button type="button" className={styles.toggleBtn}>
                                {"Sign Up"}
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default LoginForm;