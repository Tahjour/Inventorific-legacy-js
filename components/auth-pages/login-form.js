import { useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./auth-pages.module.css";
import { FiUser, FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";
import { useFormik } from 'formik';
import { loginValidate } from "../../lib/authHelper";
import { useRouter } from "next/router";


function LoginForm() {
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
        // await signOut();
        console.log("reached here!!!");
        const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
        });
        console.log("reached here too!!!");
        if (result.ok) {
            router.push('/app');
        }
    }

    async function googleSignInHandler() {
        try {
            await signIn("google", { callbackUrl: "http://localhost:3000/app" });
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
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