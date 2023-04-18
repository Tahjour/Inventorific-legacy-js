//user-type.js
import { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserTypeSelect from "../../components/auth-pages/user-type";
import { ItemsContext } from "../../context/ItemsContext";
import MainNavigation from "../../components/layout/navigation/main-navigation";

function UserTypePage() {
    const router = useRouter();
    const itemsContext = useContext(ItemsContext);
    const { loginMode } = itemsContext;

    return (
        <Fragment>
            <MainNavigation />
            <UserTypeSelect />
        </Fragment>
    );
}

export default UserTypePage;
