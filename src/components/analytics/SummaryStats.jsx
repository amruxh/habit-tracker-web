import { useMemo } from "react";

const SummaryStats = ({ habitsData }) => {
  // Calculate Summary Stats
  const stats = useMemo(() => {
    if (!habitsData) return [];

    let totalCheckIns = 0;
    let totalPossible = 0;
    let totalStreaks = 0;

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    habitsData.forEach((habit) => {
      // Total check-ins
      const logs = habit.logs.filter((l) => l.status !== "none");
      totalCheckIns += logs.length;

      // Completion calculation (relative to all logged days or last 30 days)
      totalPossible += habit.logs.length;

      // Streak calculation (current streak)
      let streak = 0;
      let checkDate = new Date(today);

      // If not marked today, check starting from yesterday
      const markedToday = habit.logs.find(
        (l) => l.date === todayStr && l.status !== "none",
      );
      if (!markedToday) {
        checkDate.setDate(checkDate.getDate() - 1);
      }

      while (true) {
        const dStr = checkDate.toISOString().split("T")[0];
        const log = habit.logs.find(
          (l) => l.date === dStr && l.status !== "none",
        );
        if (log) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
      totalStreaks += streak;
    });

    const avgStreak = habitsData.length
      ? Math.round(totalStreaks / habitsData.length)
      : 0;
    const completionRate = totalPossible
      ? Math.round((totalCheckIns / totalPossible) * 100)
      : 0;

    return [
      { label: "AVG_STREAK", value: `${avgStreak} DAYS` },
      { label: "COMPLETION", value: `${completionRate}%` },
      {
        label: "ACTIVE_HABITS",
        value: String(habitsData.length).padStart(2, "0"),
      },
      { label: "TOTAL_CHECK_INS", value: String(totalCheckIns) },
    ];
  }, [habitsData]);

  if (!stats.length) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="retro-border bg-card-base p-4 text-center h-20 animate-pulse dark:bg-gray-800"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {stats.map((stat, i) => (
        <div key={i} className="retro-border bg-card-base p-4 text-center">
          <div className="text-[10px] font-bold tracking-widest text-text-base/60 mb-1">
            {stat.label}
          </div>
          <div className="text-lg font-bold">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;
