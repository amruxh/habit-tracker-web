import { Edit, LogOut } from "lucide-react";

const ProfileHeader = ({ user, profile, edit, setEdit, setLogoutOpen }) => {
  return (
    <div className="bg-card-base p-6 retro-border relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-primary-base/20 to-accent-base/20 -z-10 group-hover:scale-105 transition-transform duration-500"></div>

      <div className="flex flex-col items-center relative z-10 pt-8">
        <div className="size-24 rounded-2xl bg-accent-base flex items-center justify-center text-bg-base mb-4 shadow-lg ring-4 ring-bg-base">
          <span className="text-5xl font-bold">
            {user?.user?.user_metadata?.full_name?.charAt(0).toUpperCase() ||
              "?"}
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
  );
};

export default ProfileHeader;
