import { useEffect, useMemo, useState } from "react";
import HabitTable from "../components/HabitTable";
import { getDaysInMonth, getThisYearAndMonth } from "../utils/dateHelper";
import ProgressMenu from "../components/ProgressMenu";

const Dashboard = () => {
  const progress = {
    none: "bg-transparent",
    perfect: "bg-green-300",
    good: "bg-yellow-300",
    average: "bg-orange-300",
    missed: "bg-red-300",
  };

  const [yearAndMonth, setYearAndMonth] = useState(getThisYearAndMonth());
  const [year, month] = yearAndMonth.split("-").map(Number);
  const [selectedProgress, setSelectedProgress] = useState(progress.none);
  const daysInMonth = useMemo(() => {
    return getDaysInMonth(year, month);
  }, [year, month]);

  const dayColumns = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [daysInMonth]);

  const [habits, setHabits] = useState([
    {
      name: "Exercise",
      progress: Array(daysInMonth).fill(progress.none),
    },
    {
      name: "Reading",
      progress: Array(daysInMonth).fill(progress.none),
    },
  ]);

  useEffect(() => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => ({
        ...habit,
        progress: Array(daysInMonth).fill(progress.none),
      })),
    );
  }, [daysInMonth]);

  // ✅ Toggle checkbox
  const changeHabit = (habitIndex, dayIndex) => {
    const updated = [...habits];
    updated[habitIndex].progress[dayIndex] = selectedProgress;
    setHabits(updated);
  };

  const addHabit = () => {
    setHabits((prevHabits) => [
      ...prevHabits,
      {
        name: "New Habit",
        progress: Array(daysInMonth).fill(progress.none),
      },
    ]);
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="bg-white w-full mb-3 border rounded p-5 flex justify-between">
        <input
          type="month"
          value={yearAndMonth}
          onChange={(e) => setYearAndMonth(e.target.value)}
          className="border rounded p-2"
        />

        <ProgressMenu
          progress={progress}
          selectedProgress={selectedProgress}
          setSelectedProgress={setSelectedProgress}
        />
      </div>

      <HabitTable
        dayColumns={dayColumns}
        habits={habits}
        setHabit={changeHabit}
        setHabits={setHabits}
        yearAndMonth={yearAndMonth}
        selectedProgress={selectedProgress}
      />
      <div
        className="w-full border p-3 text-center cursor-pointer inset-0 mt-3"
        onClick={() => addHabit()}
      >
        + Add Habit
      </div>
    </div>
  );
};

export default Dashboard;
