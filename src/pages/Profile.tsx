
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";

const Profile = () => {
  return (
    <>
      <Navbar />
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground mb-6">
          Manage your profile, events and account settings
        </p>
        
        <UserProfile isCurrentUser={true} />
      </main>
    </>
  );
};

export default Profile;
