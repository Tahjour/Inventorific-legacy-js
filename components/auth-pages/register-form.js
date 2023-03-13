import { useRef, useState } from "react";
import styles from "./auth-pages.module.css";
import { FiUser, FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";
import { useFormik } from "formik";
import { registerValidate } from "../../lib/authHelper";
import { headers } from "../../next.config";

function RegisterForm() {
    const [showPassword, setShowPassword] = useState({
        password: false,
        cpassword: false
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: '',
        },
        validate: registerValidate,
        onSubmit: SignUpFormSubmitHandler
    });
    async function SignUpFormSubmitHandler(values) {
        const reqBody = {
            username: values.username,
            email: values.email,
            password: values.password
        };
        await fetch("/api/auth/signup", {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data => console.log(data));
        console.log(values);

    }
    return (
        <section className={styles.formContainer}>
            <div className={styles.formOuterRegister}>
                <h1>Create a New Account</h1>

                <form className={styles.form} onSubmit={formik.handleSubmit}>

                    <div className={styles.inputContainer}>
                        <input className={`${styles.textInput} ${formik.errors.username && formik.touched.username ? styles.errorTextInput : null}`} type="text" id="username" name="username" placeholder="Username" {...formik.getFieldProps('username')} required></input>
                        <FiUser className={styles.inputIcons} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                            className={`${styles.textInput} ${formik.errors.email && formik.touched.email ? styles.errorTextInput : null}`}
                            type="email" id="email" name="email" placeholder={"Email"}
                            {...formik.getFieldProps('email')} required>
                        </input>
                        <MdAlternateEmail className={styles.inputIcons} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                            className={`${styles.textInput} ${formik.errors.password && formik.touched.password ? styles.errorTextInput : null}`}
                            type={showPassword.password ? "text" : "password"} id="password" name="password" placeholder="Password"
                            {...formik.getFieldProps('password')} required>
                        </input>
                        {showPassword.password ?
                            <FiEye className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, password: false }); }} /> :
                            <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, password: true }); }} />
                        }
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                            className={`${styles.textInput} ${formik.errors.cpassword && formik.touched.cpassword ? styles.errorTextInput : null}`}
                            type={showPassword.cpassword ? "text" : "password"}
                            id="cpassword" name="cpassword" placeholder="Confirm Password"
                            {...formik.getFieldProps('cpassword')} required>
                        </input>
                        {showPassword.cpassword ?
                            <FiEye className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, cpassword: false }); }} /> :
                            <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, cpassword: true }); }} />
                        }
                    </div>

                    <button type="submit" className={styles.submitBtn}>
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