import { LayoutDashboard } from "lucide-react";
import { useState } from "react";
import ProgressMenu from "@/components/ProgressMenu";
import HabitTable from "@/components/HabitTable";
import TableSkeleton from "@/components/TableSkeleton";
import { PROGRESSES } from "@/constants";
import { useHabitsData } from "../context/HabitsDataContext";
import { getThisDay, getThisYearAndMonth } from "../utils/dateHelper";
import VelocityGraph from "../components/dashboard/VelocityGraph";
import RecentActivity from "../components/dashboard/RecentActivity";

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
        <VelocityGraph habitsData={habitsData} />
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;
