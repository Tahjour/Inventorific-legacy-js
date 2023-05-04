import { useContext, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./auth-pages.module.css";
import { FiUser, FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";
import { useFormik } from 'formik';
import { loginValidate } from "../../lib/authHelper";
import { useRouter } from "next/router";
import { ItemsContext } from "../../context/ItemsContext";


function LoginForm() {
    const itemsContext = useContext(ItemsContext);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: loginValidate,
        onSubmit: LoginFormSubmitHandler
    });

    async function LoginFormSubmitHandler(values) {
        itemsContext.showNotification({
            status: 'saving',
            message: "Logging in..."
        });

        const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        if (result.ok) {
            itemsContext.setDidServerItemsLoad(false);
            itemsContext.setInitialServerLoadTry(false);
            itemsContext.showNotification({
                status: 'success',
                message: "Logged In"
            });
            if (itemsContext.initialServerLoadTry) {
                router.push('/items');
            }
        } else {
            itemsContext.showNotification({
                status: 'error',
                message: "Username or password incorrect"
            });
        }
    }

    async function googleSignInHandler() {
        itemsContext.showNotification({
            status: 'saving',
            message: "Logging in..."
        });
        await signIn("google", { callbackUrl: "/items" }).catch(e => {
            console.error(e);
        });
        itemsContext.setDidServerItemsLoad(false);
        itemsContext.setInitialServerLoadTry(false);
    }
    return (
        <section className={styles.formContainer}>
            <div className={styles.formOuter}>
                <h1>Login to Your Account</h1>

                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <div className={styles.inputContainer}>
                        <input className={`${styles.textInput} ${formik.errors.email && formik.touched.email ? styles.errorTextInput : null}`} type="text" id="email" name="email" placeholder={"Email"} {...formik.getFieldProps('email')}></input>
                        <MdAlternateEmail className={styles.inputIcons} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input className={`${styles.textInput} ${formik.errors.password && formik.touched.password ? styles.errorTextInput : null}`} type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password" {...formik.getFieldProps('password')}></input>
                        {showPassword ? <FiEye className={styles.inputIcons} onClick={() => { setShowPassword(false); }} /> : <FiEyeOff className={styles.inputIcons} onClick={() => { setShowPassword(true); }} />}
                    </div>

                    <button type="submit" className={styles.submitBtn}>
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
            </div >
        </section >
    );
}

export default LoginForm;