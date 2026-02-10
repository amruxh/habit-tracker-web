import { createContext, useContext, useMemo, useState } from "react";
import { getDaysInMonth, getThisYearAndMonth } from "../utils/dateHelper";
import { useHabitsQuery, useHabitMutations } from "../hooks/useHabits";
import { useActivityQuery } from "../hooks/useActivity";

const HabitsDataContext = createContext();

export const useHabitsData = () => {
  return useContext(HabitsDataContext);
};

export const HabitsDataProvider = ({ children }) => {
  // UI State
  const [yearAndMonth, setYearAndMonth] = useState(getThisYearAndMonth());
  const [year, month] = yearAndMonth.split("-").map(Number);

  // Data State via React Query
  const {
    data: habitsData = [],
    isLoading: loading,
    refetch: refreshHabits,
  } = useHabitsQuery();
  const { data: activities = [], refetch: refetchActivities } =
    useActivityQuery();

  const { addHabit, deleteHabit, updateHabitName, updateHabitLog } =
    useHabitMutations();

  const daysInMonth = useMemo(() => {
    return getDaysInMonth(year, month);
  }, [year, month]);

  const dayColumns = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [daysInMonth]);

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
      // Expose mutation functions (mutate) directly as the context API
      addHabit: (name) => addHabit.mutate(name),
      deleteHabit: (id) => deleteHabit.mutate(id),
      updateHabitName: (id, name) => updateHabitName.mutate({ id, name }),
      updateHabitLog: (date, id, status) =>
        updateHabitLog.mutate({ id, date, status }),
      refreshHabits,
      refetchActivities,
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
      addHabit,
      deleteHabit,
      updateHabitName,
      updateHabitLog,
      refreshHabits,
      refetchActivities,
      activities,
    ],
  );

  return (
    <HabitsDataContext.Provider value={value}>
      {children}
    </HabitsDataContext.Provider>
  );
};
