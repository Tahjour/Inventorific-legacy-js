// pages\profile\index.js
import ProfilePageLayout from "../../components/auth-pages/profile-page";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import PageTransition from "../../components/ui/page-transition";

function ProfilePage() {
    return <>
        <ProfilePageLayout />
    </>;
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/login", // Redirect to the login page or any other page you want
                permanent: false,
            },
        };
    }

    return {
        props: {}, // Will be passed to the page component as props
    };
}
export default ProfilePage;