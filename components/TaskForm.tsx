import { X } from "lucide-react";
import React, { useState } from "react";

const TaskForm = () => {
    const [data, setData] = useState<{ name: string; description: string }>({
        name: "",
        description: "",
    });

    const handleUpdateInput = (key: "name" | "description", value: string) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="absolute z-20 w-full h-screen duration-200 bg-black/40 flex items-center justify-center">
            <div className="bg-white shadow-md px-8 py-5 rounded-lg flex flex-col gap-y-1.5">
                <div className="text-xl font-bold tracking-wider pb-2">
                    New Task
                    <X className="w-6 h-6 float-end cursor-pointer duration-150 hover:text-white hover:bg-red-500 rounded p-0.5" />
                </div>
                <div className="flex gap-x-1">
                    任務名稱:
                    <input
                        type="text"
                        className="border border-gray-300 flex-1"
                        value={data.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleUpdateInput("name", e.target.value)
                        }
                    />
                </div>
                <div className="flex gap-x-1">
                    任務描述:
                    <textarea
                        className="border border-gray-300 flex-1"
                        rows={5}
                        cols={33}
                        value={data.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            handleUpdateInput("description", e.target.value)
                        }
                    ></textarea>
                </div>
                <button className="w-full bg-blue-500 p-1 rounded text-white cursor-pointer">
                    Create
                </button>
            </div>
        </div>
    );
};

export default TaskForm;
