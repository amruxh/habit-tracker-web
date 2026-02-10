import { useState } from "react";
import SettingsCard from "../components/SettingsCard";
import ToggleButton from "../components/ToggleButton";
import { useTheme } from "../context/ThemeContext";
import ConfirmBox from "../components/ConfirmBox";

const Settings = () => {
  const { setTheme, isDarkMode } = useTheme();
  const [toggleState, setToggleState] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConfirmBox
        open={open}
        title="Delete account?"
        message="This action cannot be undone."
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
        }}
      />

      <div className="overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto h-full bg-bg-base transition-colors duration-300">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold tracking-widest mb-6 uppercase">
              Settings
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <SettingsCard
              title="Notifications"
              description="Customize your notifications."
            >
              <ToggleButton value={toggleState} onChange={setToggleState} />
            </SettingsCard>

            <SettingsCard title="Theme" description="Choose your theme">
              <select
                name="theme"
                id="theme"
                className="retro-border bg-card-base p-2"
                value={isDarkMode ? "dark" : "light"}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </SettingsCard>

            <SettingsCard title="Timezone" description="Choose your timezone">
              <select
                name="timezone"
                id="timezone"
                className="retro-border bg-card-base p-2"
              >
                <option value="in">Indian Standard Time</option>
                <option value="us">US Eastern Time</option>
              </select>
            </SettingsCard>

            <SettingsCard
              title="Manage Account"
              description="Manage your account"
            >
              <button
                className="retro-border p-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 text-sm font-medium"
                onClick={() => setOpen(true)}
              >
                Delete Account
              </button>
            </SettingsCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
