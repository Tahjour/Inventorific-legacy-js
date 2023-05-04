import styles from "./loader.module.css";
import { motion } from "framer-motion";
const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <motion.div
                animate={{
                    scale: [1, 0.8, 1],
                    rotate: [0, 360],
                }}
                transition={{
                    scale: {
                        duration: 1, // Adjust duration as needed
                        repeat: Infinity,
                        repeatType: "loop", // or 'mirror'
                        ease: "easeInOut", // Optional, for a smoother animation
                    },
                    rotate: {
                        duration: 0.5, // Adjust duration as needed
                        repeat: Infinity,
                        ease: "linear",
                    },
                }}
                className={styles.loader}
            ></motion.div>
            Loading all items...
        </div>
    );
};

export default Loader;