import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";


interface TaskState {
    draggingTaskId?: string;
    tasks: Record<string, Task> // es lo mismo {[key: string: Task]}

    getTaskStatus: (status: TaskStatus) => Task[];

    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;

}



const storeApi: StateCreator<TaskState> = (set, get) => ({


    draggingTaskId: undefined,

    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'OPEN' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'IN_PROGRESS' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'OPEN' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'OPEN' },
    },


    // actions

    getTaskStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter(task => task.status === status);
    },

    setDraggingTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId })
    },

    removeDraggingTaskId: () => {
        set({ draggingTaskId: undefined });
    },

    changeTaskStatus: (taskId: string, status: TaskStatus) => {

        const task = get().tasks[taskId];
        if (!task) return;
        task.status = status;

        set((state) => ({
            tasks: {
                ...state.tasks,
                [taskId]: task,
            }
        }))
    }
})


export const useTaskStore = create<TaskState>()(
    devtools(
        storeApi
    )

);