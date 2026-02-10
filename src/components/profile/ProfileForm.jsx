import InputBox from "../InputBox";

const ProfileForm = ({
  profile,
  setProfile,
  edit,
  cancelChanges,
  saveChanges,
}) => {
  return (
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
  );
};

export default ProfileForm;
