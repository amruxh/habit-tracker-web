import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useHabitsData } from "../context/HabitsDataContext";

const Analytics = () => {
  const { habitsData, loading } = useHabitsData();

  // Calculate consistency trend (last 7 days)
  const consistencyData = useMemo(() => {
    if (!habitsData.length) return [];

    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });

      let completed = 0;
      habitsData.forEach((habit) => {
        const log = habit.logs.find((l) => l.date === dateStr);
        if (log && log.status !== "none") {
          completed++;
        }
      });

      weekData.push({
        name: dayName,
        completed,
        total: habitsData.length,
      });
    }
    return weekData;
  }, [habitsData]);

  // Calculate distribution across ALL logs
  const distributionData = useMemo(() => {
    const counts = {
      perfect: 0,
      good: 0,
      average: 0,
      missed: 0,
    };

    habitsData.forEach((habit) => {
      habit.logs.forEach((log) => {
        if (counts[log.status] !== undefined) {
          counts[log.status]++;
        }
      });
    });

    return [
      { name: "Perfect", value: counts.perfect, color: "var(--habit-perfect)" },
      { name: "Good", value: counts.good, color: "var(--habit-good)" },
      { name: "Average", value: counts.average, color: "var(--habit-average)" },
      { name: "Missed", value: counts.missed, color: "var(--habit-missed)" },
    ];
  }, [habitsData]);

  // Calculate Summary Stats
  const stats = useMemo(() => {
    let totalCheckIns = 0;
    let totalPossible = 0;
    let totalStreaks = 0;

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    habitsData.forEach((habit) => {
      // Total check-ins
      const logs = habit.logs.filter((l) => l.status !== "none");
      totalCheckIns += logs.length;

      // Completion calculation (relative to all logged days or last 30 days)
      // Here we'll just use total logs vs total possible in history for simplicity
      // A better way might be last 30 days
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

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto h-full flex items-center justify-center">
        <div className="text-xs font-bold tracking-widest animate-pulse">
          LOADING_ANALYTICS...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      <div className="p-8 max-w-6xl mx-auto h-full">
        <h1 className="text-2xl font-bold tracking-widest mb-8 uppercase">
          ANALYTICS REPORT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Consistency Graph */}
          <div className="retro-border bg-card-base p-6">
            <h2 className="text-xs font-bold tracking-widest mb-6 uppercase">
              CONSISTENCY_TREND (LAST 7 DAYS)
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={consistencyData}>
                  <defs>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--text-color)"
                        stopOpacity={0.1}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--text-color)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-color)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--text-color)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--text-color)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card-bg)",
                      border: "2px solid var(--border-color)",
                      fontSize: "10px",
                      fontFamily: "monospace",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="var(--text-color)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorComp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="retro-border bg-card-base p-6">
            <h2 className="text-xs font-bold tracking-widest mb-6 uppercase">
              HABIT_DISTRIBUTION (ALL TIME)
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={distributionData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-color)"
                    horizontal={false}
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="var(--text-color)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--border-color)", opacity: 0.1 }}
                    contentStyle={{
                      backgroundColor: "var(--card-bg)",
                      border: "2px solid var(--border-color)",
                      fontSize: "10px",
                      fontFamily: "monospace",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {distributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="var(--border-color)"
                        strokeWidth={1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Grid */}
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
      </div>
    </div>
  );
};

export default Analytics;
