import { TaskType } from "@/types/Task";
import { NextRequest, NextResponse } from "next/server";

export const tasks = [
    {
        id: 10,
        name: "任務名稱",
        description: "任務描述",
        is_completed: false,
        created_at: "2023-01-01T17:00:00.000Z",
        updated_at: "2023-01-01T17:00:00.000Z",
    },
] as Array<TaskType>;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const row = 10;
    const page = searchParams.get("page") ?? "1";
    const type = searchParams.get("type") ?? "all";
    const filterTask = tasks.filter((task) => {
        if (type == "completed") return task.is_completed;
        if (type == "uncompleted") return !task.is_completed;
        return task;
    });

    const start = (+page - 1) * row;
    const end = start + row;

    return NextResponse.json(filterTask.slice(start, end));
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, description, is_completed } = body;

    if (!name || name.length > 10 || (description?.length ?? 0) > 100) {
        return NextResponse.json(
            {
                message:
                    "請輸入任務名稱、任務名稱長度不得超過10個字、任務描述長度不得超過100個字",
            },
            { status: 400 }
        );
    }

    const newTask = {
        id: (tasks.at(-1)?.id ?? 0) + 1,
        name,
        description,
        is_completed,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    tasks.push(newTask);

    return NextResponse.json(newTask);
}
