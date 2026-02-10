import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { Activity, LayoutDashboard, Zap } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import ProgressMenu from "@/components/ProgressMenu";
import HabitTable from "@/components/HabitTable";
import TableSkeleton from "@/components/TableSkeleton";
import { PROGRESSES } from "@/constants";
import { useHabitsData } from "../context/HabitsDataContext";
import {
  getThisDay,
  getThisYearAndMonth,
  getTimeDifference,
} from "../utils/dateHelper";

const Dashboard = () => {
  const {
    yearAndMonth,
    setYearAndMonth,
    habitsData,
    loading,
    dayColumns,
    addHabit,
    updateHabitLog,
    activities,
    refetchActivities,
  } = useHabitsData();

  const [selectedProgress, setSelectedProgress] = useState(PROGRESSES[0]);

  const changeHabit = (date, habitIndex) => {
    const todayStr = `${getThisYearAndMonth()}-${String(getThisDay()).padStart(2, "0")}`;
    if (date > todayStr) {
      console.warn("Cannot update future dates");
      return;
    }

    const habit = habitsData[habitIndex];
    if (!habit) return;

    const currentLog = habit.logs.find((l) => l.date === date);
    const currentStatus = currentLog ? currentLog.status : "none";

    // Toggle: If clicking same status, set to none. Otherwise, use selected.
    const newStatus =
      currentStatus === selectedProgress ? "none" : selectedProgress;

    updateHabitLog(date, habit.id, newStatus);
    refetchActivities();
  };

  // Calculate velocity graph data from this week's logs
  const miniGraphData = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // Go back to Sunday

    const weekData = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

      // Count all logs for this date where status is not "none"
      let count = 0;
      habitsData.forEach((habit) => {
        const log = habit.logs.find((l) => l.date === dateStr);
        if (log && log.status !== "none") {
          count++;
        }
      });

      weekData.push({ day: i + 1, val: count });
    }

    return weekData;
  }, [habitsData]);

  const activityData = activities.map((activity) => ({
    time: getTimeDifference(activity.created_at),
    action: `${activity.habit?.name} marked ${activity.status}`.toUpperCase(),
  }));

  return (
    <div className="p-6 overflow-y-auto h-full bg-bg-base transition-colors duration-300">
      {/* Controls */}
      <div className="bg-card-base w-full mb-6 retro-border p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <input
          type="month"
          value={yearAndMonth}
          onChange={(e) => setYearAndMonth(e.target.value)}
          className="bg-transparent border-2 border-border-base p-2 text-xs font-bold tracking-widest outline-none cursor-pointer hover:bg-border-base/10 transition-colors uppercase w-full md:w-auto"
        />

        <ProgressMenu
          selectedProgress={selectedProgress}
          setSelectedProgress={setSelectedProgress}
        />
      </div>

      {/* Habit Table Section */}
      {loading ? (
        <TableSkeleton cols={7} rows={5} />
      ) : (
        <HabitTable
          dayColumns={dayColumns}
          habits={habitsData}
          setHabit={changeHabit}
          yearAndMonth={yearAndMonth}
        />
      )}

      <button
        className="w-full retro-border p-4 mt-6 text-xs font-bold tracking-[0.3em] uppercase transition-all hover:bg-accent-base hover:text-bg-base cursor-pointer"
        onClick={() => addHabit()}
      >
        + ADD NEW HABIT
      </button>

      {/* Overview */}
      <div className="flex items-center gap-3 mb-3 mt-3">
        <LayoutDashboard size={24} className="text-accent-base" />
        <h1 className="text-xl font-bold tracking-[0.2em] uppercase">
          SYSTEM OVERVIEW
        </h1>
      </div>

      {/* Top Section: Mini Graph & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simple Progress Graph */}
        <div className="lg:col-span-2 retro-border bg-card-base p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={14} className="text-yellow-500" />
            <h2 className="text-[10px] font-bold tracking-widest uppercase">
              WEEKLY_VELOCITY
            </h2>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={miniGraphData}>
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke="var(--text-color)"
                  fill="var(--text-color)"
                  fillOpacity={0.05}
                  strokeWidth={2}
                />
                <XAxis dataKey="day" hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    fontSize: "10px",
                  }}
                  labelStyle={{ display: "none" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="retro-border bg-card-base p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={14} className="text-green-500" />
            <h2 className="text-[10px] font-bold tracking-widest uppercase">
              RECENT_LOGS
            </h2>
          </div>
          <div className="space-y-3">
            {activityData.map((log, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-[10px] border-b border-border-base/50 pb-2 last:border-0 uppercase tracking-tighter"
              >
                <span className="font-bold">{log.action}</span>
                <span className="opacity-50">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
