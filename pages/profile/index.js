// pages\profile\index.js
import ProfilePageLayout from "../../components/auth-pages/profile-page";
import { useSession } from "next-auth/react";

function ProfilePage() {
    return <ProfilePageLayout />;
}

export default ProfilePage;