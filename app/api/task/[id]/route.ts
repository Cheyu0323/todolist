import { NextRequest, NextResponse } from "next/server";
import { tasks } from "../route";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const body = await req.json();
    const { name, description } = body;

    if (!name || name.length > 10 || (description?.length ?? 0) > 100) {
        return NextResponse.json(
            {
                message:
                    "請輸入任務名稱、任務名稱長度不得超過10個字、任務描述長度不得超過100個字",
            },
            { status: 400 }
        );
    }
    const findTask = tasks.findIndex((task) => task.id == +id);
    if (findTask == -1)
        return NextResponse.json(
            {
                message: "任務不存在",
            },
            { status: 404 }
        );

    const updateTask = {
        ...tasks[findTask],
        name,
        description,
        updated_at: new Date().toISOString(),
    };

    tasks[findTask] = updateTask;
    console.log("updateTask", updateTask);
    return NextResponse.json(updateTask);
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const findTask = tasks.findIndex((task) => task.id == +id);
    if (findTask == -1)
        return NextResponse.json(
            {
                message: "任務不存在",
            },
            { status: 404 }
        );

    const updateTask = {
        ...tasks[findTask],
        is_completed: !tasks[findTask].is_completed,
        updated_at: new Date().toISOString(),
    };

    tasks[findTask] = updateTask;

    return NextResponse.json(updateTask);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const findTask = tasks.findIndex((task) => task.id == +id);
    if (findTask == -1)
        return NextResponse.json(
            {
                message: "任務不存在",
            },
            { status: 404 }
        );

    tasks.splice(findTask, 1);
    return new NextResponse(null, { status: 204 });
}
