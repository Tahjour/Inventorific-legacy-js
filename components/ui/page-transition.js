// components\ui\page-transitions.js
import { motion } from 'framer-motion';
import styles from "./page-transition.module.css";


function PageTransition(props) {
    if (!motion) {
        return <p>Motion Not Loaded</p>;
    }
    return (
        <motion.section initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
            pageInitial: {
                opacity: 0
            },
            pageAnimate: {
                opacity: 1,
                transition: {
                    duration: 0.2
                }
            },
            pageExit: {
                opacity: 0
            }
        }} className={styles.pageTransitionsContainer}>
            {props.children}
        </motion.section>
    );
}

export default PageTransition;