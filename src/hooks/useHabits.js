import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchHabits,
  addHabit as addHabitApi,
  deleteHabit as deleteHabitApi,
  updateHabit as updateHabitApi,
  updateHabitLog as updateHabitLogApi,
} from "../api/habits";

export const useHabitsQuery = () => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabits,
  });
};

export const useHabitMutations = () => {
  const queryClient = useQueryClient();

  const addHabit = useMutation({
    mutationFn: addHabitApi,
    onMutate: async (newHabitName) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });
      const previousHabits = queryClient.getQueryData(["habits"]);

      const tempId = Date.now();
      const optimisitcHabit = {
        id: tempId,
        name: newHabitName || "NEW HABIT",
        logs: [],
        isOptimistic: true,
      };

      queryClient.setQueryData(["habits"], (old) => [
        ...(old || []),
        optimisitcHabit,
      ]);

      return { previousHabits };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["habits"], context.previousHabits);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  const deleteHabit = useMutation({
    mutationFn: deleteHabitApi,
    onMutate: async (habitId) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });
      const previousHabits = queryClient.getQueryData(["habits"]);

      queryClient.setQueryData(["habits"], (old) =>
        old.filter((h) => h.id !== habitId),
      );

      return { previousHabits };
    },
    onError: (err, habitId, context) => {
      queryClient.setQueryData(["habits"], context.previousHabits);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  const updateHabitName = useMutation({
    mutationFn: ({ id, name }) => updateHabitApi(id, name),
    onMutate: async ({ id, name }) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });
      const previousHabits = queryClient.getQueryData(["habits"]);

      queryClient.setQueryData(["habits"], (old) =>
        old.map((h) => (h.id === id ? { ...h, name } : h)),
      );

      return { previousHabits };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["habits"], context.previousHabits);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  const updateHabitLog = useMutation({
    mutationFn: ({ id, date, status }) => updateHabitLogApi(id, date, status),
    onMutate: async ({ id, date, status }) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });
      const previousHabits = queryClient.getQueryData(["habits"]);

      // Update Local State for optimsed look
      queryClient.setQueryData(["habits"], (old) =>
        old.map((habit) => {
          if (habit.id !== id) return habit;

          const existingLogIndex = habit.logs.findIndex((l) => l.date === date);
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

      return { previousHabits };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["habits"], context.previousHabits);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] }); // Also refresh activity feed
    },
  });

  return { addHabit, deleteHabit, updateHabitName, updateHabitLog };
};
