import { apiClient } from "./base";

export const fetchHabits = () => {
    return apiClient("/habits");
}

export const updateHabitLog = (habit_id, date, status) => {
    return apiClient("/habits/check", {
        method: "PATCH",
        body: JSON.stringify({ habit_id, date, status }),
    });
}

export const addHabit = (name) => {
    return apiClient("/habits", {
        method: "POST",
        body: JSON.stringify({ name }),
    });
}

export const deleteHabit = (habit_id) => {
    return apiClient(`/habits?id=${habit_id}`, {
        method: "DELETE",
    });
}

export const updateHabit = (habit_id, name) => {
    return apiClient(`/habits`, {
        method: "PATCH",
        body: JSON.stringify({ id: habit_id, name }),
    });
}

export const fetchActivityReport = () => {
    return apiClient('/activity');
} 