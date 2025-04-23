import { TaskType } from "@/types/Task";
import { create } from "zustand";

type TaskStore = {
    tasks: TaskType[];
    fetchTasks: (
        type?: "all" | "completed" | "uncompleted",
        page?: number
    ) => Promise<void>;
    createTask: (task: { name: string; description: string }) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    updateTask: (task: {
        id: number;
        name: string;
        description: string;
    }) => Promise<void>;
    toggleTaskComplete: (id: number) => Promise<void>;
};

const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    fetchTasks: async (type = "all", page = 1) => {
        try {
            const res = await fetch(`/api/task?type=${type}&page=${page}`);
            if (res.status !== 200) throw new Error("查詢失敗");
            const data = await res.json();
            set({ tasks: data });
        } catch (err) {
            console.error(err);
        }
    },
    createTask: async (taskData) => {
        try {
            const res = await fetch("/api/task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...taskData,
                }),
            });

            if (res.status !== 200) throw new Error("新增失敗");

            const newTask = await res.json();
            const tasks = get().tasks;
            set({ tasks: [...tasks, newTask] });
        } catch (err) {
            console.error(err);
        }
    },
    deleteTask: async (id) => {
        try {
            const res = await fetch(`/api/task/${id}`, { method: "DELETE" });
            if (res.status !== 204) throw new Error("刪除失敗");
            const tasks = get().tasks.filter((task) => task.id !== id);
            set({ tasks });
        } catch (err) {
            console.error(err);
        }
    },
    updateTask: async (taskData) => {
        try {
            const res = await fetch(`/api/task/${taskData.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...taskData,
                }),
            });
            if (res.status !== 200) throw new Error("更新失敗");
            const updated = await res.json();
            const tasks = get().tasks.map((t) =>
                t.id === taskData.id ? updated : t
            );
            set({ tasks });
        } catch (err) {
            console.error(err);
        }
    },
    toggleTaskComplete: async (id) => {
        try {
            const res = await fetch(`/api/task/${id}`, {
                method: "PATCH",
            });
            if (res.status !== 200) throw new Error("失敗");

            const updated = await res.json();
            const tasks = get().tasks.map((t) => (t.id === id ? updated : t));
            set({ tasks });
        } catch (err) {
            console.error(err);
        }
    },
}));

export default useTaskStore;
