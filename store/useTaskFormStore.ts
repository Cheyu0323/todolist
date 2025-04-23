import { create } from "zustand";

type OpenTaskFormType =
    | { type: "create" }
    | { type: "edit"; data: { id: number; name: string; description: string } };

type TaskFormStoreType = {
    isActive: boolean;
    type: "create" | "edit";
    data: { id?: number; name: string; description: string };
    updateInput: (key: "name" | "description", value: string) => void;
    openTaskForm: (form: OpenTaskFormType) => void;
    closeTaskForm: () => void;
};

const useTaskFormStore = create<TaskFormStoreType>((set) => ({
    isActive: false,
    type: "create",
    data: { name: "", description: "" },
    updateInput: (key: "name" | "description", value: string) =>
        set((state) => {
            return { ...state, data: { ...state.data, [key]: value } };
        }),
    openTaskForm: (form: OpenTaskFormType) => {
        if (form.type == "edit") {
            set((state) => ({
                ...state,
                type: "edit",
                isActive: true,
                data: { ...form.data },
            }));
            return;
        }
        set((state) => ({
            ...state,
            type: "create",
            isActive: true,
            data: { name: "", description: "" },
        }));
    },

    closeTaskForm: () =>
        set((state) => {
            return { ...state, isActive: false };
        }),
}));

export default useTaskFormStore;
