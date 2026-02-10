import { Trophy, Flame, Target } from "lucide-react";
import AchievementCard from "../AchievementCard";
import { useNavigate } from "react-router-dom";

const ProfileAchievements = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default ProfileAchievements;
