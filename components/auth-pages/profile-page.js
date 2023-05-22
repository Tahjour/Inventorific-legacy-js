// components\auth-pages\profile-page.js
import { Fragment, useContext, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import styles from "./profile-page.module.css";
import MainNavigation from "../layout/navigation/main-navigation";
import { useSession } from "next-auth/react";
import { ItemsContext } from "../../context/ItemsContext";
import Loader from "../layout/loading/loader";

function ProfilePageLayout() {
    const itemsContext = useContext(ItemsContext);
    const { data: session } = useSession();

    async function deleteUserHandler() {
        const itemToDelete = {
            deleteType: "user",
        };
        itemsContext.showDeleteModal(itemToDelete);
    }

    return (
        <Fragment>
            <MainNavigation />
            {!session && <Loader message="Loading profile..." />}
            <section className={styles.profileContainer}>
                <div className={styles.secondCol}>
                    <div className={styles.imageAndItemsContainer}>
                        <div className={styles.userImage}>
                            {session ? session.user.name[0] : null}
                        </div>
                        <h3>
                            {itemsContext.getItems().length === 1 ? `${itemsContext.getItems().length} item` : `${itemsContext.getItems().length} items`}
                        </h3>
                    </div>

                    <form>
                        <div className={styles.formGroup}>
                            <label>Date joined</label>
                            <input className={styles.textInput} type="text" defaultValue={itemsContext.getUser().createdDate} disabled></input>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email Address</label>
                            <input className={styles.textInput} type="email" defaultValue={session ? session.user.email : null}></input>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Username</label>
                            <input className={styles.textInput} type="text" defaultValue={session ? session.user.name : null}></input>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Display name</label>
                            <input className={styles.textInput} type="text" defaultValue={session ? session.user.name : null}></input>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.deleteAccountBtn} type="button" onClick={deleteUserHandler}>Delete User</button>
                            <button className={styles.updateInfoBtn} type="button">Update Info</button>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>

    );
}

export default ProfilePageLayout;