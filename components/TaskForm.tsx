import useTaskFormStore from "@/store/useTaskFormStore";
import useTaskStore from "@/store/useTaskStore";
import { X } from "lucide-react";
import React, { useState } from "react";

const TaskForm = () => {
    const { isActive, data, type, closeTaskForm, updateInput } =
        useTaskFormStore();
    const { createTask, updateTask } = useTaskStore();
    const [error, setError] = useState("");
    const handleSubmit = () => {
        setError("");
        if (data.name == "") return setError("請輸入任務名稱");
        if (data.name.length > 10)
            return setError("任務名稱長度不得超過10個字");
        if (data.description.length > 100)
            return setError("任務描述長度不得超過100個字");

        if (type == "create") {
            createTask({ ...data });
            closeTaskForm();
            return;
        }
        if (data.id == null) return;
        updateTask({ id: data.id, ...data });
        closeTaskForm();
    };

    return (
        <div
            className={`absolute z-20 w-full h-screen duration-200 bg-black/40 flex items-center justify-center ${
                isActive
                    ? " opacity-100 pointer-events-auto"
                    : " opacity-0 pointer-events-none"
            }`}
        >
            <div className="bg-white shadow-md px-8 py-5 rounded-lg flex flex-col gap-y-1.5">
                <div className="text-xl font-bold tracking-wider pb-2">
                    {type == "create" ? "New Task" : "Edit Task"}
                    <X
                        onClick={closeTaskForm}
                        className="w-6 h-6 float-end cursor-pointer duration-150 hover:text-white hover:bg-red-500 rounded p-0.5"
                    />
                </div>
                <div className="flex gap-x-1">
                    任務名稱:
                    <input
                        type="text"
                        className="border border-gray-300 flex-1"
                        value={data.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateInput("name", e.target.value)
                        }
                    />
                </div>
                <div className="flex gap-x-1">
                    任務描述:
                    <input
                        type="text"
                        className="border border-gray-300 flex-1"
                        value={data.description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateInput("description", e.target.value)
                        }
                    />
                </div>
                <div className="text-red-500">{error}</div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 p-1 rounded text-white cursor-pointer"
                >
                    {type == "create" ? "Create" : "Edit"}
                </button>
            </div>
        </div>
    );
};

export default TaskForm;
