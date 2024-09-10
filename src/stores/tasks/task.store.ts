import { create, StateCreator } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { devtools, persist } from "zustand/middleware";
// import { produce } from "immer";

import { Task, TaskStatus } from "../../interfaces";
import { immer } from "zustand/middleware/immer";



interface TaskState {
    draggingTaskId?: string;
    tasks: Record<string, Task> // es lo mismo {[key: string: Task]}

    getTaskStatus: (status: TaskStatus) => Task[];
    addTask: (title: string, status: TaskStatus) => void;

    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;

}



const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({


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

    addTask: (title: string, status: TaskStatus) => {

        const newTask = {id: uuidv4(), title, status}


        // con immer middleware
        set(state => {
            state.tasks[newTask.id] = newTask
        });

        // requiere npm i immer
        // set(produce( (state: TaskState) => {
        //     state.tasks[newTask.id] = newTask;
        // }))

        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [newTask.id]: newTask
        //     }
        // }))
    },

    setDraggingTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId })
    },

    removeDraggingTaskId: () => {
        set({ draggingTaskId: undefined });
    },

    changeTaskStatus: (taskId: string, status: TaskStatus) => {

        // const task = get().tasks[taskId];
        // if (!task) return;
        // task.status = status;

        // con immer middleware
        set(state => {
            state.tasks[taskId] = {
                ...state.tasks[taskId],
                status
            }
        })

        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [taskId]: task,
        //     }
        // }))
    },

    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if (!taskId) return;

        get().changeTaskStatus(taskId, status);
        get().removeDraggingTaskId();
    }
})


export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer(
                storeApi
            ), 
            { name: 'task-storage' }
        )
    )

);