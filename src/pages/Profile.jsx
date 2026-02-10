import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import ConfirmBox from "../components/ConfirmBox";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileForm from "../components/profile/ProfileForm";
import ProfileAchievements from "../components/profile/ProfileAchievements";

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const [edit, setEdit] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    dob: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user?.user?.user_metadata?.full_name || "",
        email: user?.user?.user_metadata?.email || "",
        dob: user?.user?.user_metadata?.dob || "",
      });
    }
  }, [user]);

  if (loading && !user) {
    return (
      <div className="p-8 max-w-6xl mx-auto h-full space-y-8">
        <Skeleton variant="text" className="w-48 h-10 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-80 w-full" />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cancelChanges = () => {
    setProfile({
      full_name: user?.user?.user_metadata?.full_name || "",
      email: user?.user?.user_metadata?.email || "",
      dob: user?.user?.user_metadata?.dob || "",
    });
    setEdit(false);
  };

  const saveChanges = () => {
    setEdit(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <ConfirmBox
        open={logoutOpen}
        title="Logout?"
        message="Are you sure you want to log out?"
        onCancel={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
      <div className="overflow-y-auto h-full">
        <div className="p-8 max-w-6xl mx-auto h-full transition-colors duration-300">
          <h1 className="text-2xl font-bold tracking-widest mb-8 uppercase text-text-base">
            PROFILE
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN - USER INFO */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileHeader
                user={user}
                profile={profile}
                edit={edit}
                setEdit={setEdit}
                setLogoutOpen={setLogoutOpen}
              />

              {/* ACHIEVEMENTS PREVIEW MOBILE / SMALL SCREENS ONLY could go here if needed, but keeping clean */}
            </div>

            {/* RIGHT COLUMN - EDIT FORM & STATS */}
            <div className="lg:col-span-2 space-y-8">
              {/* INPUTS SECTION */}
              <ProfileForm
                profile={profile}
                setProfile={setProfile}
                edit={edit}
                cancelChanges={cancelChanges}
                saveChanges={saveChanges}
              />

              {/* PREVIEW STATS / ACHIEVEMENTS */}
              <ProfileAchievements />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
