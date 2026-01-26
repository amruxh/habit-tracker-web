import { useState } from "react";
import { getThisDay, getThisYearAndMonth } from "../utils/dateHelper";

const HabitTable = ({
  dayColumns,
  habits,
  setHabit,
  setHabits,
  yearAndMonth,
  selectedProgress,
}) => {
  const thisYearAndMonth = getThisYearAndMonth();
  const thisDay = getThisDay();

  const enableEditing = (idx) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit, index) =>
        index === idx ? { ...habit, editing: true } : habit,
      ),
    );
  };

  const saveEditing = (e, idx) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit, index) =>
        index === idx
          ? { ...habit, name: e.target.value, editing: false }
          : habit,
      ),
    );
  };

  return (
    <table className=" w-full border-collapse border border-gray-700 text-gray-700 text-sm">
      {/* ✅ Table Header */}
      <thead>
        <tr>
          <th className="border px-3 border-gray-700 text-left">Habit</th>

          {dayColumns.map((day) => (
            <th
              key={day}
              className={`size-8 border border-gray-700 text-center ${yearAndMonth === thisYearAndMonth && thisDay === day && "bg-gray-500/10 text-blue-500"}`}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>

      {/* ✅ Table Body */}
      <tbody>
        {habits.map((habit, habitIndex) => (
          <tr key={habitIndex}>
            {/* Habit Name */}
            <td className="border px-3 border-gray-700">
              {habit.editing ? (
                <input type="text" defaultValue={habit.name} autoFocus onBlur={(e) => saveEditing(e, habitIndex)} />
              ) : (
                <span
                  className="cursor-auto"
                  onDoubleClick={() => enableEditing(habitIndex)}
                >
                  {habit.name}
                </span>
              )}
            </td>

            {/* Checkboxes */}
            {habit.progress.map((progress, dayIndex) => (
              <td
                key={dayIndex}
                className="size-8 border border-gray-700 cursor-pointer"
                onClick={() => setHabit(habitIndex, dayIndex)}
              >
                <div
                  className={`
                      size-4 border m-auto transition rounded-sm
                      ${progress}
                    `}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HabitTable;
