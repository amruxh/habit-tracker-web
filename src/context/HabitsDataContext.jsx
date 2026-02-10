import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { getDaysInMonth, getThisYearAndMonth } from "../utils/dateHelper";
import * as habitsApi from "../api/habits";
import { useCallback } from "react";

const HabitsDataContext = createContext();

export const useHabitsData = () => {
  return useContext(HabitsDataContext);
};

export const HabitsDataProvider = ({ children }) => {
  const [yearAndMonth, setYearAndMonth] = useState(getThisYearAndMonth());
  const [year, month] = yearAndMonth.split("-").map(Number);
  const [habitsData, setHabitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  const daysInMonth = useMemo(() => {
    return getDaysInMonth(year, month);
  }, [year, month]);

  const dayColumns = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [daysInMonth]);

  const fetchHabitsData = useCallback(async () => {
    setLoading(true);
    try {
      const habits = await habitsApi.fetchHabits();
      setHabitsData(habits);
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabitsData();
  }, [fetchHabitsData]);

  // No longer need to reset logs based on daysInMonth since we use date-based logs

  const addHabit = async (name = "NEW HABIT") => {
    const tempId = Date.now();
    const tempHabit = { id: tempId, name, logs: [], isOptimistic: true };

    // Optimistic Update
    setHabitsData((prev) => [...prev, tempHabit]);

    try {
      const newHabit = await habitsApi.addHabit(name);
      setHabitsData((prev) =>
        prev.map((h) => (h.id === tempId ? { ...newHabit, logs: [] } : h)),
      );
    } catch (error) {
      console.error("Error adding habit:", error);
      setHabitsData((prev) => prev.filter((h) => h.id !== tempId));
    }
  };

  const deleteHabit = async (habitId) => {
    const previousHabits = [...habitsData];

    // Optimistic Update
    setHabitsData((prev) => prev.filter((h) => h.id !== habitId));

    try {
      await habitsApi.deleteHabit(habitId);
    } catch (error) {
      console.error("Error deleting habit:", error);
      setHabitsData(previousHabits);
    }
  };

  const updateHabitName = async (habitId, name) => {
    const previousHabits = [...habitsData];

    // Optimistic Update
    setHabitsData((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, name, editing: false } : h)),
    );

    try {
      const updatedHabit = await habitsApi.updateHabit(habitId, name);
      setHabitsData((prev) =>
        prev.map((h) =>
          h.id === habitId ? { ...h, name: updatedHabit.name } : h,
        ),
      );
    } catch (error) {
      console.error("Error updating habit:", error);
      setHabitsData(previousHabits);
    }
  };

  const updateHabitLog = async (date, habitId, status) => {
    // We'll use this to track the previous status for this specific entry to allow precise rollback
    let previousStatus = null;

    // Optimistic Update
    setHabitsData((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;

        const existingLogIndex = habit.logs.findIndex((l) => l.date === date);
        previousStatus =
          existingLogIndex !== -1
            ? habit.logs[existingLogIndex].status
            : "none";
        let newLogs = [...habit.logs];

        if (status === "none") {
          if (existingLogIndex !== -1) {
            newLogs.splice(existingLogIndex, 1);
          }
        } else {
          if (existingLogIndex !== -1) {
            newLogs[existingLogIndex] = {
              ...newLogs[existingLogIndex],
              status,
            };
          } else {
            newLogs.push({ date, status });
          }
        }

        return { ...habit, logs: newLogs };
      }),
    );

    try {
      await habitsApi.updateHabitLog(habitId, date, status);
    } catch (error) {
      console.error("Error updating habit log:", error);

      // Rollback only the specific change if it fails
      setHabitsData((prev) =>
        prev.map((habit) => {
          if (habit.id !== habitId) return habit;

          const existingLogIndex = habit.logs.findIndex((l) => l.date === date);
          let newLogs = [...habit.logs];

          if (previousStatus === "none") {
            if (existingLogIndex !== -1) {
              newLogs.splice(existingLogIndex, 1);
            }
          } else {
            if (existingLogIndex !== -1) {
              newLogs[existingLogIndex] = {
                ...newLogs[existingLogIndex],
                status: previousStatus,
              };
            } else {
              newLogs.push({ date, status: previousStatus });
            }
          }

          return { ...habit, logs: newLogs };
        }),
      );
    }
  };

  const getActivity = useCallback(async () => {
    try {
      const activities = await habitsApi.fetchActivityReport();
      setActivities(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    }
  }, []);

  useEffect(() => {
    getActivity();
  }, [getActivity]);

  const value = useMemo(
    () => ({
      yearAndMonth,
      setYearAndMonth,
      year,
      month,
      daysInMonth,
      habitsData,
      loading,
      dayColumns,
      addHabit,
      deleteHabit,
      updateHabitName,
      updateHabitLog,
      refreshHabits: fetchHabitsData,
      refetchActivities: getActivity,
      activities,
    }),
    [
      yearAndMonth,
      year,
      month,
      daysInMonth,
      habitsData,
      loading,
      dayColumns,
      fetchHabitsData,
      getActivity,
      activities,
    ],
  );

  return (
    <HabitsDataContext.Provider value={value}>
      {children}
    </HabitsDataContext.Provider>
  );
};
