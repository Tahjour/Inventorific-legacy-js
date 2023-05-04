
import { useContext } from "react";
import { ItemsContext } from "../../../context/ItemsContext";
import styles from "./notification.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdDoneAll } from "react-icons/io";
import { BiError } from "react-icons/bi";
function NotificationPopUp(props) {
    const itemsContext = useContext(ItemsContext);
    const { message, status } = props.notification;

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = styles.success;
    }

    if (status === 'error') {
        statusClasses = styles.error;
    }

    if (status === "loading" || status === "saving") {
        statusClasses = styles.loading;
    }

    const notificationPopUp = `${styles.notificationPopUp} ${statusClasses}`;

    return (
        <motion.section
            className={styles.notificationPopUpContainer}
            initial="hidden" animate="visible" exit="hidden" variants={{
                hidden: {
                    opacity: 0,
                    bottom: 0,
                },
                visible: {
                    opacity: 1,
                    bottom: 30,
                }
            }}>

            <motion.div className={notificationPopUp} onClick={itemsContext.hideNotification}>
                {status === "saving" ? (
                    <motion.div
                        key="loader"
                        className={styles.notificationLoader}
                        // initial={{ scale: 1 }}
                        animate={{
                            // scale: [1, 0.8, 1],
                            rotate: [0, 360],
                            transition: {
                                // scale: {
                                //     duration: 1, // Adjust duration as needed
                                //     repeat: Infinity,
                                //     repeatType: "loop", // or 'mirror'
                                //     ease: "easeInOut", // Optional, for a smoother animation
                                // },
                                rotate: {
                                    duration: 0.3, // Adjust duration as needed
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            },
                        }}
                    ></motion.div>
                ) :
                    status === "error" ? (
                        <motion.div
                            key="icon"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}>
                            <BiError size={40} />
                        </motion.div>
                    ) :
                        <motion.div
                            key="icon"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}>
                            <IoMdDoneAll size={40} />
                        </motion.div>}
                <h2>{message}</h2>
            </motion.div>


        </motion.section>
    );
}

export default NotificationPopUp;