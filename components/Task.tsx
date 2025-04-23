import { TaskType } from "@/types/Task";
import { Pencil, Trash, SquareCheckBig, Square } from "lucide-react";

import React from "react";

type TaskProps = TaskType & {
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onCompleted: (id: number) => void;
};

const Task: React.FC<TaskProps> = ({
    id,
    name,
    description,
    is_completed,
    updated_at,
    onDelete,
    onEdit,
    onCompleted,
}) => {
    return (
        <div className="px-6 pr-10 p-1 rounded-md bg-white relative min-w-0 w-full overflow-hidden">
            <div
                className={`absolute top-1.5 left-1.5 w-1.5 h-[calc(100%-0.75rem)] rounded-xl ${
                    is_completed ? "bg-green-400" : "bg-blue-500"
                }`}
            ></div>
            <div className="font-bold text-lg tracking-wide">{name}</div>
            <div className="text-black/80 whitespace-pre-line">{description}</div>
            <div className="text-sm text-gray-300">{updated_at}</div>
            <div className="absolute right-1 top-0 w-8 py-1 h-full flex flex-col gap-y-0.5 items-center">
                {is_completed ? (
                    <SquareCheckBig
                        onClick={() => onCompleted(id)}
                        className="cursor-pointer w-5 h-5 stroke-green-500 hover:stroke-gray-500 duration-300"
                    />
                ) : (
                    <Square
                        onClick={() => onCompleted(id)}
                        className="cursor-pointer w-5 h-5 stroke-gray-500 hover:stroke-green-500 duration-300"
                    />
                )}
                <Pencil
                    onClick={() => onEdit(id)}
                    className="cursor-pointer w-5 h-5 stroke-gray-500 hover:stroke-blue-500 duration-300"
                />
                <Trash
                    onClick={() => onDelete(id)}
                    className="cursor-pointer w-5 h-5 stroke-gray-500 hover:stroke-red-500 duration-300"
                />
            </div>
        </div>
    );
};

export default Task;
