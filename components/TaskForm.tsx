import { X } from "lucide-react";
import React, { useState } from "react";

export type TaskFormInput = { name: string; description: string };

type TaskFormProps = {
    defaultValue?: TaskFormInput;
    onClose: () => void;
    onSubmit: ({ name, description }: TaskFormInput) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({
    defaultValue,
    onClose,
    onSubmit,
}) => {
    const [data, setData] = useState<TaskFormInput>(
        defaultValue ?? { name: "", description: "" }
    );
    console.log("defaultValue", defaultValue, data);
    const [error, setError] = useState("");

    const handleUpdateInput = (key: "name" | "description", value: string) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        setError("");
        if (data.name == "") return setError("請輸入任務名稱");
        if (data.name.length > 10)
            return setError("任務名稱長度不得超過10個字");
        if (data.description.length > 100)
            return setError("任務描述長度不得超過100個字");

        onSubmit(data);
    };

    return (
        <div
            className={`absolute z-20 w-full h-screen duration-200 bg-black/40 flex items-center justify-center`}
        >
            <div className="bg-white shadow-md px-8 py-5 rounded-lg flex flex-col gap-y-1.5">
                <div className="text-xl font-bold tracking-wider pb-2">
                    {defaultValue == null ? "New Task" : "Edit Task"}
                    <X
                        onClick={onClose}
                        className="w-6 h-6 float-end cursor-pointer duration-150 hover:text-white hover:bg-red-500 rounded p-0.5"
                    />
                </div>
                <div className="flex gap-x-1 items-center">
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
                        value={data.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            handleUpdateInput("description", e.target.value)
                        }
                    />
                </div>
                <div className="text-red-500">{error}</div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 p-1 rounded text-white cursor-pointer"
                >
                    {defaultValue == null ? "Create" : "Edit"}
                </button>
            </div>
        </div>
    );
};

export default TaskForm;
