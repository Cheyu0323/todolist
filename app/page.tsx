"use client";
import Task from "@/components/Task";
import React, { Suspense, useEffect, useState } from "react";
import { Plus, CheckCheck, ChevronLeft, ChevronRight } from "lucide-react";
import TaskForm, { TaskFormInput } from "@/components/TaskForm";
import useTaskStore from "@/store/useTaskStore";
import { TaskType } from "@/types/Task";

const Home = () => {
    const {
        tasks,
        fetchTasks,
        updateTask,
        createTask,
        deleteTask,
        toggleTaskComplete,
    } = useTaskStore();
    const [isCompleted, setIsCompleted] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const [isTaskFormOpen, setIsTaskFormOpen] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<null | TaskType>(null);

    useEffect(() => {
        if (isCompleted) {
            fetchTasks("all", page);
            return;
        }
        fetchTasks("uncompleted", page);
    }, [fetchTasks, isCompleted, page]);

    const handleToggleCompleted = async () => {
        setIsCompleted((pre) => !pre);
    };

    const handleDeleteTask = (id: number) => {
        deleteTask(id);
    };
    const handleEditTask = (id: number) => {
        const findIndex = tasks.findIndex((task) => task.id == id);
        setEditTask(tasks[findIndex]);
        setIsTaskFormOpen(true);
    };
    const handleToggleCompletedTask = (id: number) => {
        toggleTaskComplete(id);
    };
    const handleCreateNewTask = () => {
        setEditTask(null);
        setIsTaskFormOpen(true);
    };
    const handleSwitchPage = (type: "prev" | "next") => {
        if (type == "prev") {
            setPage((pre) => Math.max(pre - 1, 1));
            return;
        }
        setPage((pre) => pre + 1);
    };
    
    const handleSubmit = (data: TaskFormInput) => {
        if (editTask) {
            updateTask({ id: editTask.id, ...data });
        } else {
            createTask(data);
        }
        setEditTask(null);
        setIsTaskFormOpen(false);
    };
    const handleCloseTaskForm = () => {
        setIsTaskFormOpen(false);
    };

    return (
        <Suspense fallback={<>LOADING...</>}>
            {isTaskFormOpen && (
                <TaskForm
                    defaultValue={editTask || undefined}
                    onClose={handleCloseTaskForm}
                    onSubmit={handleSubmit}
                />
            )}
            <main className="p-4 md:p-10 h-full relative">
                <header className="font-extrabold text-3xl tracking-wider text-blue-600">
                    Task
                </header>
                <div className="flex flex-wrap gap-2 pt-3">
                    <button
                        onClick={handleCreateNewTask}
                        className="cursor-pointer flex gap-x-1 items-center px-3 py-1.5 font-bold tracking-wider text-sm rounded-md bg-blue-500 text-white"
                    >
                        <Plus className="w-4 h-4 stroke-3 text-white" />
                        New Task
                    </button>
                    <button
                        onClick={handleToggleCompleted}
                        className={`cursor-pointer flex gap-x-1 items-center px-3 py-1.5 font-bold tracking-wider text-sm rounded-md text-white ${
                            isCompleted ? "bg-blue-500" : "bg-gray-300"
                        }`}
                    >
                        <CheckCheck className="w-4 h-4 stroke-3 text-white" />
                        Completed
                    </button>
                    <div className="ml-auto flex items-center gap-x-1">
                        <button
                            className="p-1.5 rounded bg-blue-500 text-white"
                            onClick={() => handleSwitchPage("prev")}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        {page}
                        <button
                            className="p-1.5 rounded bg-blue-500 text-white"
                            onClick={() => handleSwitchPage("next")}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <main className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-4">
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            {...task}
                            onCompleted={handleToggleCompletedTask}
                            onDelete={handleDeleteTask}
                            onEdit={handleEditTask}
                        />
                    ))}
                </main>
            </main>
        </Suspense>
    );
};

export default Home;
