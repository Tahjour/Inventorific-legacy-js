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
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    function LoginFormHandler(event) {
        event.preventDefault();
        
    }
    return (
        <section className={styles.formContainer}>
            <div className={styles.formOuter}>
                <h1>Create a New Account</h1>

                <form className={styles.form} onSubmit={LoginFormHandler}>

                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type="text" id="username" name="username" placeholder="Username" onChange={(e) => { setUsername(e.target.value); }}></input>
                        <FiUser className={styles.inputIcons} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type="email" id="email" name="email" placeholder={"Email"} onChange={(e) => { setEmail(e.target.value); }}></input>
                        <MdAlternateEmail className={styles.inputIcons} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type={showPassword.password ? "text" : "password"} id="password" name="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }}></input>
                        {showPassword.password ? <FiEye className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, password: false }); }} /> : <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, password: true }); }} />}
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={styles.textInput} type={showPassword.cpassword ? "text" : "password"} id="cpassword" name="cpassword" placeholder="Confirm Password" onChange={(e) => { setCpassword(e.target.value); }}></input>
                        {showPassword.cpassword ? <FiEye className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, cpassword: false }); }} /> : <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, cpassword: true }); }} />}
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