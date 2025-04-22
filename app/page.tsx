"use client";
import Task from "@/components/Task";
import React, { useEffect, useState } from "react";
import { Plus, CheckCheck } from "lucide-react";
import { TaskType } from "@/types/Task";
import TaskForm from "@/components/TaskForm";

const Home = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([]);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useEffect(() => {
        fetch(`/api/task?${isCompleted ? "type=completed" : ""}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                setTasks(data);
            });
    }, [isCompleted]);

    const handleToggleCompleted = () => {
        setIsCompleted((pre) => !pre);
    };

    const handleDeleteTask = (id: number) => {
        console.log("id", id);
    };
    const handleEditTask = (id: number) => {
        console.log("id", id);
    };
    const handleToggleCompletedTask = (id: number) => {
        console.log("id", id);
    };

    return (
        <>
            <TaskForm />
            <main className="p-4 md:p-10 h-full relative">
                <header className="font-extrabold text-3xl tracking-wider text-blue-600">
                    Task
                </header>
                <div className="flex flex-wrap gap-2 pt-3">
                    <button className="flex gap-x-1 items-center px-3 py-1.5 font-bold tracking-wider text-sm rounded-md bg-blue-500 text-white">
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
                </div>
                <main className="flex mt-3 flex-wrap gap-2 h-full">
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
        </>
    );
};

export default Home;
