import { useContext, useRef, useState } from "react";
import styles from "./auth-pages.module.css";
import { FiUser, FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";
import { useFormik } from "formik";
import { registerValidate } from "../../lib/authHelper";
import { headers } from "../../next.config";
import { useRouter } from "next/router";
import { ItemsContext } from "../../context/ItemsContext";
import { AnimatePresence, motion } from "framer-motion";

function RegisterForm() {
    const itemsContext = useContext(ItemsContext);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState({
        password: false,
        cpassword: false
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            cpassword: '',
        },
        validate: registerValidate,
        onSubmit: SignUpFormSubmitHandler
    });
    async function SignUpFormSubmitHandler(values) {
        const reqBody = {
            name: values.name,
            email: values.email,
            password: values.password
        };
        itemsContext.showNotification({
            status: "saving",
            message: "Creating user..."
        });
        await fetch("/api/auth/signup", {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(async data => {
            console.log(data);
            await router.push("/login");
            itemsContext.showNotification({
                status: "success",
                message: "User created!"
            });
        });
    }
    return (
        <section className={styles.formContainer}>
            <div className={styles.formOuterRegister}>
                <h1>Create a New Account</h1>

                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputSubContainer}>
                            <input className={`${styles.textInput} ${formik.errors.name && formik.touched.name ? styles.errorTextInput : null}`} type="text" id="name" name="name" {...formik.getFieldProps('name')} required></input>

                            <label className={`${styles.inputLabel} ${formik.values.name && styles.inputActive} ${formik.errors.name && formik.touched.name ? styles.errorLabel : null}`}>
                                Username
                            </label>

                            <FiUser className={styles.inputIcons} />
                        </div>
                        <AnimatePresence>
                            {formik.errors.name && formik.touched.name && (
                                <motion.span
                                    className={styles.errorMessage}
                                    key="errorMessage"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {formik.errors.name}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.inputSubContainer}>
                            <input
                                className={`${styles.textInput} ${formik.errors.email && formik.touched.email ? styles.errorTextInput : null}`}
                                type="email" id="email" name="email"
                                {...formik.getFieldProps('email')} required>
                            </input>
                            <label className={`${styles.inputLabel} ${formik.values.email && styles.inputActive} ${formik.errors.email && formik.touched.email ? styles.errorLabel : null}`}>
                                Email
                            </label>
                            <MdAlternateEmail className={styles.inputIcons} />
                        </div>
                        <AnimatePresence>
                            {formik.errors.email && formik.touched.email && (
                                <motion.span
                                    className={styles.errorMessage}
                                    key="errorMessage"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {formik.errors.email}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.inputSubContainer}>
                            <input
                                className={`${styles.textInput} ${formik.errors.password && formik.touched.password ? styles.errorTextInput : null}`}
                                type={showPassword.password ? "text" : "password"} id="password" name="password"
                                {...formik.getFieldProps('password')} required>
                            </input>
                            <label className={`${styles.inputLabel} ${formik.values.password && styles.inputActive} ${formik.errors.password && formik.touched.password ? styles.errorLabel : null}`}>
                                Password
                            </label>
                            {showPassword.password ?
                                <FiEye className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, password: false }); }} /> :
                                <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, password: true }); }} />
                            }
                        </div>
                        <AnimatePresence>
                            {formik.errors.password && formik.touched.password && (
                                <motion.span
                                    className={styles.errorMessage}
                                    key="errorMessage"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {formik.errors.password}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={styles.inputContainer}>

                        <div className={styles.inputSubContainer}>
                            <input
                                className={`${styles.textInput} ${formik.errors.cpassword && formik.touched.cpassword ? styles.errorTextInput : null}`}
                                type={showPassword.cpassword ? "text" : "password"}
                                id="cpassword" name="cpassword"
                                {...formik.getFieldProps('cpassword')} required>
                            </input>
                            <label className={`${styles.inputLabel} ${formik.values.cpassword && styles.inputActive} ${formik.errors.cpassword && formik.touched.cpassword ? styles.errorLabel : null}`}>
                                Confirm Password
                            </label>
                            {showPassword.cpassword ?
                                <FiEye className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, cpassword: false }); }} /> :
                                <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword({ ...showPassword, cpassword: true }); }} />
                            }
                        </div>
                        <AnimatePresence>
                            {formik.errors.cpassword && formik.touched.cpassword && (
                                <motion.span
                                    className={styles.errorMessage}
                                    key="errorMessage"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {formik.errors.cpassword}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {"Sign Up"}
                    </button>

                    <div className={styles.loginOrSignUpPart}>
                        {"Have an account? "}
                        <Link href={"/login"} className={styles.toggleBtn}>
                            {"Sign In"}
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default RegisterForm;