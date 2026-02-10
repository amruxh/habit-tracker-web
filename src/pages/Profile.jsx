import { Edit, Trophy, Flame, Target, LogOut } from "lucide-react";
import InputBox from "../components/InputBox";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import AchievementCard from "../components/AchievementCard";
import ConfirmBox from "../components/ConfirmBox";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

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
              <div className="bg-card-base p-6 retro-border relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-primary-base/20 to-accent-base/20 -z-10 group-hover:scale-105 transition-transform duration-500"></div>

                <div className="flex flex-col items-center relative z-10 pt-8">
                  <div className="size-24 rounded-2xl bg-accent-base flex items-center justify-center text-bg-base mb-4 shadow-lg ring-4 ring-bg-base">
                    <span className="text-5xl font-bold">
                      {user?.user?.user_metadata?.full_name
                        ?.charAt(0)
                        .toUpperCase() || "?"}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-2">
                    {user?.user?.user_metadata?.full_name}
                  </h2>
                  <p className="text-text-base/60 font-medium opacity-80">
                    {profile?.email}
                  </p>

                  <button
                    onClick={() => setEdit(!edit)}
                    className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 border-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${edit ? "bg-text-base text-bg-base border-text-base" : "border-border-base hover:bg-border-base/10"}`}
                  >
                    <Edit size={16} />
                    {edit ? "Editing..." : "Edit Profile"}
                  </button>

                  <button
                    onClick={() => setLogoutOpen(true)}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white text-sm font-bold uppercase tracking-wider transition-all duration-200"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>

              {/* ACHIEVEMENTS PREVIEW MOBILE / SMALL SCREENS ONLY could go here if needed, but keeping clean */}
            </div>

            {/* RIGHT COLUMN - EDIT FORM & STATS */}
            <div className="lg:col-span-2 space-y-8">
              {/* INPUTS SECTION */}
              <div
                className={`bg-card-base p-8 retro-border transition-all duration-300 ${edit ? "ring-2 ring-primary-base shadow-xl" : ""}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    Personal Details
                  </h3>
                  {edit && (
                    <span className="text-xs font-mono text-primary-base animate-pulse">
                      EDIT MODE ACTIVE
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputBox
                    label="Full Name"
                    type="text"
                    id="fullName"
                    value={profile.full_name}
                    onChange={(event) =>
                      setProfile({ ...profile, full_name: event.target.value })
                    }
                    placeholder="Enter your full name"
                    className="w-full"
                    disabled={!edit}
                  />

                  <InputBox
                    label="Email"
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={(event) =>
                      setProfile({ ...profile, email: event.target.value })
                    }
                    placeholder="Enter your email"
                    className="w-full md:col-span-2"
                    disabled={!edit}
                  />
                  <InputBox
                    label="Date of Birth"
                    type="date"
                    id="dob"
                    value={profile.dob}
                    onChange={(event) =>
                      setProfile({ ...profile, dob: event.target.value })
                    }
                    placeholder="Enter your dob"
                    className="w-full md:col-span-2"
                    disabled={!edit}
                  />
                </div>

                {edit && (
                  <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-border-base/50">
                    <button
                      className="px-6 py-2 hover:bg-red-500/10 text-red-500 border border-red-500/50 rounded hover:border-red-500 font-bold tracking-wide transition-colors"
                      onClick={cancelChanges}
                    >
                      CANCEL
                    </button>
                    <button
                      className="bg-accent-base text-bg-base px-8 py-2 hover:bg-accent-base/90 font-bold tracking-wide shadow-lg hover:shadow-primary-base/20 transition-all transform hover:-translate-y-0.5"
                      onClick={saveChanges}
                    >
                      SAVE CHANGES
                    </button>
                  </div>
                )}
              </div>

              {/* PREVIEW STATS / ACHIEVEMENTS */}
              <div className="relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    Achievements
                  </h3>
                  <button
                    onClick={() => navigate("/achievements")}
                    className="text-[10px] font-bold tracking-widest text-accent-base/60 hover:text-accent-base transition-colors uppercase border-b border-accent-base/20 hover:border-accent-base"
                  >
                    VIEW ALL
                  </button>
                </div>

                <div className="relative">
                  {/* Coming Soon Overlay for Section */}
                  <div className="absolute inset-x-0 inset-y-0 z-40 flex flex-col items-center justify-center bg-bg-base/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="retro-border bg-card-base p-4 rotate-2 shadow-lg">
                      <span className="text-xs font-black tracking-widest uppercase italic">
                        COMING_SOON
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 blur-[1px] opacity-60 pointer-events-none">
                    <AchievementCard
                      title="Early Bird"
                      description="Completed 5 habits before 9 AM"
                      icon={<Flame className="text-orange-500" />}
                      isAchived={true}
                    />
                    <AchievementCard
                      title="Steak Master"
                      description="Maintained a 7-day streak"
                      icon={<Trophy className="text-yellow-500" />}
                      isAchived={true}
                    />
                    <AchievementCard
                      title="Goal Crusher"
                      description="Completed all daily goals"
                      icon={<Target className="text-blue-500" />}
                      isAchived={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
