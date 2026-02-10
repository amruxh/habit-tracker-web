import { getThisDay, getThisYearAndMonth } from "../utils/dateHelper";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useState, useEffect, useMemo, memo } from "react";
import ConfirmBox from "./ConfirmBox";
import { useHabitsData } from "../context/HabitsDataContext";

const HabitTable = ({
  dayColumns,
  habits,
  setHabit,
  yearAndMonth,
}) => {
  const thisYearAndMonth = getThisYearAndMonth();
  const thisDay = getThisDay();
  const todayStr = `${thisYearAndMonth}-${String(thisDay).padStart(2, "0")}`;
  const { deleteHabit, updateHabitName } = useHabitsData();

  // Weekly View State
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  // Delete State
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);

  // Editing State
  const [editingIndex, setEditingIndex] = useState(null);

  // Divide days into weeks (chunks of 7)
  const weeks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < dayColumns.length; i += 7) {
      chunks.push(dayColumns.slice(i, i + 7));
    }
    return chunks;
  }, [dayColumns]);

  // Set default week based on current date or start of month
  useEffect(() => {
    if (yearAndMonth === thisYearAndMonth) {
      const today = thisDay;
      const weekIndex = weeks.findIndex((week) => week.includes(today));
      if (weekIndex !== -1) setCurrentWeekIndex(weekIndex);
    } else {
      setCurrentWeekIndex(0);
    }
  }, [yearAndMonth, weeks, thisYearAndMonth, thisDay]);

  const handlePrevWeek = () => {
    setCurrentWeekIndex((prev) => Math.max(0, prev - 1));
  };
  const handleNextWeek = () => {
    setCurrentWeekIndex((prev) => Math.min(weeks.length - 1, prev + 1));
  };

  const currentWeekDays = weeks[currentWeekIndex] || [];

  const enableEditing = (idx) => setEditingIndex(idx);

  const saveEditing = (e, idx) => {
    const newName = e.target.value.trim();
    const habit = habits[idx];
    if (!newName) {
      setEditingIndex(null);
      return;
    }
    if (habit && habit.id) {
      updateHabitName(habit.id, newName);
    }
    setEditingIndex(null);
  };

  const requestDelete = (index) => {
    setHabitToDelete(index);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (habitToDelete !== null) {
      const habit = habits[habitToDelete];
      if (habit && habit.id) {
        deleteHabit(habit.id);
      }
      setHabitToDelete(null);
      setDeleteOpen(false);
    }
  };

  // Helper to render table content (headers or body) based on view mode
  // We'll duplicate the table structure to keep logic clean between mobile/desktop if needed,
  // or just conditionally render columns.
  // For simplicity and cleaner DOM, we can just filter the columns being mapped.

  return (
    <>
      <ConfirmBox
        open={deleteOpen}
        title="Delete Habit?"
        message="Are you sure you want to delete this habit?"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
      <div className="flex flex-col gap-4">
        {/* Mobile Week Navigation */}
        <div className="md:hidden flex items-center justify-between bg-card-base p-2 border-2 border-border-base">
          <button
            onClick={handlePrevWeek}
            disabled={currentWeekIndex === 0}
            className="p-1 hover:bg-border-base/10 disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-sm uppercase tracking-widest">
            Week {currentWeekIndex + 1}
          </span>
          <button
            onClick={handleNextWeek}
            disabled={currentWeekIndex === weeks.length - 1}
            className="p-1 hover:bg-border-base/10 disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="overflow-x-auto border-2 border-border-base bg-card-base">
          <table className="w-full border-collapse text-text-base text-xs">
            {/* ✅ Table Header */}
            <thead>
              <tr className="border-b-2 border-border-base">
                <th className="px-4 py-3 text-left font-bold tracking-widest border-r-2 border-border-base sticky left-0 bg-card-base z-10 w-32 md:w-auto">
                  HABIT
                </th>

                {/* Desktop: All Days, Mobile: Current Week Days */}
                {dayColumns.map((day, index) => {
                  // Check if this day is in current week
                  const isInCurrentWeek = currentWeekDays.includes(day);
                  return (
                    <th
                      key={day}
                      className={`size-10 font-bold border-r-2 border-border-base text-center transition-colors 
                            ${!isInCurrentWeek ? "hidden md:table-cell" : ""}
                            ${yearAndMonth === thisYearAndMonth && thisDay === day ? "bg-accent-base text-bg-base" : "hover:bg-border-base/10"}
                        `}
                    >
                      {day}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {habits.map((habit, habitIndex) => (
                <HabitRow
                  key={habit.id || habitIndex}
                  habit={habit}
                  habitIndex={habitIndex}
                  isEditing={editingIndex === habitIndex}
                  dayColumns={dayColumns}
                  currentWeekDays={currentWeekDays}
                  yearAndMonth={yearAndMonth}
                  todayStr={todayStr}
                  setHabit={setHabit}
                  enableEditing={enableEditing}
                  saveEditing={saveEditing}
                  requestDelete={requestDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const HabitRow = memo(
  ({
    habit,
    habitIndex,
    isEditing,
    dayColumns,
    currentWeekDays,
    yearAndMonth,
    todayStr,
    setHabit,
    enableEditing,
    saveEditing,
    requestDelete,
  }) => {
    return (
      <tr className="border-b-2 border-border-base last:border-b-0 group">
        {/* Habit Name */}
        <td className="px-4 py-0 border-r-2 border-border-base sticky left-0 bg-card-base z-10 font-medium break-normal whitespace-nowrap min-w-37.5">
          <div className="flex items-center justify-between gap-2 h-full w-full">
            {isEditing ? (
              <input
                type="text"
                defaultValue={habit.name}
                autoFocus
                onBlur={(e) => saveEditing(e, habitIndex)}
                onKeyDown={(e) =>
                  e.key === "Enter" && saveEditing(e, habitIndex)
                }
                className="bg-transparent border-none outline-none w-full uppercase tracking-tighter"
              />
            ) : (
              <div
                className="cursor-text uppercase tracking-tighter flex-1"
                onDoubleClick={() => enableEditing(habitIndex)}
              >
                {habit.name}
              </div>
            )}

            {!isEditing && (
              <button
                onClick={() => requestDelete(habitIndex)}
                className="text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 md:p-1 hover:bg-red-500/10 rounded"
                title="Delete Habit"
              >
                <Trash2 size={16} className="md:w-3.5 md:h-3.5" />
              </button>
            )}
          </div>
        </td>

        {/* Checkboxes */}
        {dayColumns.map((day) => {
          const isInCurrentWeek = currentWeekDays.includes(day);
          const dateStr = `${yearAndMonth}-${String(day).padStart(2, "0")}`;
          const isFuture = dateStr > todayStr;
          const log = habit.logs.find((log) => log.date === dateStr) || {
            status: "none",
          };

          return (
            <td
              key={day}
              className={`min-w-6 h-6 md:h-6 lg:h-8 xl:h-10 border-r-2 border-border-base transition-colors 
                  ${!isInCurrentWeek ? "hidden md:table-cell" : ""}
                  ${isFuture ? "opacity-20 cursor-not-allowed bg-border-base/5" : "cursor-pointer hover:bg-border-base/5"}
              `}
              onClick={() => !isFuture && setHabit(dateStr, habitIndex)}
            >
              <div
                className={`
                  size-full border-2 border-border-base transition-all
                  ${log.status === "none" ? "bg-transparent" : ""}
                  ${log.status === "perfect" ? "bg-(--habit-perfect)" : ""}
                  ${log.status === "good" ? "bg-(--habit-good)" : ""}
                  ${log.status === "average" ? "bg-(--habit-average)" : ""}
                  ${log.status === "bad" ? "bg-(--habit-bad)" : ""}
              `}
              />
            </td>
          );
        })}
      </tr>
    );
  },
);

export default HabitTable;
