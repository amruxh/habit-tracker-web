import {
  Calendar1Icon,
  Flame,
  Medal,
  Target,
  Trophy,
  Zap,
  Award,
} from "lucide-react";
import AchievementCard from "../components/AchievementCard";

const Achievements = () => {
  const achievements = [
    {
      title: "3 Day Streak",
      description: "You achieved a 3-day streak by maintaining consistency!",
      icon: <Calendar1Icon className="size-10 text-blue-500" />,
      isAchived: true,
    },
    {
      title: "Week Warrior",
      description: "Completed all planned habits for 7 consecutive days.",
      icon: <Flame className="size-10 text-orange-500" />,
      isAchived: true,
    },
    {
      title: "Early Bird",
      description: "Checked off a habit before 8:00 AM.",
      icon: <Zap className="size-10 text-yellow-400" />,
      isAchived: true,
    },
    {
      title: "Goal Crusher",
      description: "Completed 50 habits in total.",
      icon: <Target className="size-10 text-red-500" />,
      isAchived: false,
    },
    {
      title: "Month Master",
      description: "Perfect streak for a whole month!",
      icon: <Medal className="size-10 text-purple-500" />,
      isAchived: false,
    },
    {
      title: "Zen Master",
      description: "Completed a 'Meditation' habit 10 times.",
      icon: <Award className="size-10 text-green-500" />,
      isAchived: false,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.isAchived).length;
  const progressPercentage = Math.round(
    (unlockedCount / achievements.length) * 100,
  );

  return (
    <div className="relative overflow-hidden h-full">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-bg-base/40 backdrop-blur-md">
        <div className="retro-border bg-card-base p-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)]">
          <h2 className="text-4xl font-black tracking-[0.3em] uppercase italic bg-clip-text text-transparent bg-linear-to-r from-accent-base to-text-base animate-pulse">
            COMING_SOON
          </h2>
          <div className="mt-4 h-1 w-full bg-accent-base/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent-base animate-[progress_2s_infinite_linear]"></div>
          </div>
          <p className="text-[10px] font-bold tracking-widest mt-6 opacity-60 text-center uppercase">
            Systems are currently under development.
          </p>
        </div>
      </div>

      <div className="overflow-y-auto h-full grayscale-[0.8] opacity-50 blur-[2px] pointer-events-none">
        <div className="p-8 max-w-6xl mx-auto h-full transition-colors duration-300">
          <h1 className="text-2xl font-bold tracking-widest mb-8 uppercase text-text-base">
            ACHIEVEMENTS
          </h1>

          {/* HERO / PROGRESS SECTION */}
          <div className="bg-card-base p-8 retro-border mb-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="size-24 rounded-full bg-accent-base/10 flex items-center justify-center border-4 border-accent-base">
                <Trophy className="size-12 text-accent-base" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">Level 3 Unlocked</h2>
                <p className="text-text-base/70">
                  Keep going! You're doing great.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="flex justify-between mb-2 font-bold text-sm uppercase">
                <span>Progress</span>
                <span>
                  {unlockedCount} / {achievements.length}
                </span>
              </div>
              <div className="w-full h-4 bg-border-base/30 rounded-full overflow-hidden border border-border-base">
                <div
                  className="h-full bg-accent-base transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* ACHIEVEMENTS GRID */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-wide opacity-80">
              All Trophies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-300 ${!achievement.isAchived ? "opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0" : "hover:-translate-y-1"}`}
                >
                  <AchievementCard {...achievement} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
