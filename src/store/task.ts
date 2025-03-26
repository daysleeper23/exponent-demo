import { priorityMap, statusMap } from '@/api/static/common';
import { Task } from '@/types/task';
import { create } from 'zustand'

interface TaskStore {
  tasks: Record<string, Task>;
  tasksArray: Task[];
  tasksGrouped: Record<string, string[]>;
  tasksByStatus: Record<string, string[]>;
  tasksByPriority: Record<string, string[]>;
  groupOption: string;
  setTasks: (tasks: Task[]) => void;
  getTaskById: (id: string) => Task | null;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addTask: (task: Task) => void;
  groupTasks: () => void;
  groupBy: (groupBy: string) => void;
}

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: {} as Record<string, Task>,
  tasksArray: [] as Task[],
  tasksGrouped: {} as Record<string, string[]>,
  tasksByStatus: {} as Record<string, string[]>,
  tasksByPriority: {} as Record<string, string[]>,
  groupOption: 'status',
  setTasks: (tasksList: Task[]) => {
    
    if (!tasksList || tasksList.length === 0 || tasksList.length === get().tasksArray.length) return;
    set({ 
      tasksArray: tasksList,
      tasks: Object.fromEntries(tasksList.map((task) => [task.id, task]))
    })
  },
  getTaskById: (id: string) => get().tasks[id] || null,
  updateTask: (task: Task) => set((state) => ({
    tasksArray: state.tasksArray.map((t) => (t.number === task.number ? task : t)),
    tasks: {
      ...state.tasks,
      [task.number]: task,
    },
  })),
  deleteTask: (id: string) => set((state) => {
    const { [id]: deleted, ...rest } = state.tasks;
    const tasksArray = state.tasksArray.filter((task) => task.id !== id);
    return { tasks: rest, tasksArray };
  }),
  addTask: (task: Task) => set((state) => ({
    tasks: {
      ...state.tasks,
      [task.number]: task,
    },
    tasksArray: [...state.tasksArray, task],
  })),
  groupTasks: () => set({
    tasksByStatus: Object.fromEntries(Object.keys(statusMap).map((element) => {
        const value = get().tasksArray
          .filter((task) => task.status === parseInt(element))
          .map((task) => task.id);
        return [element, value];
      })),
    tasksByPriority: Object.fromEntries(Object.keys(priorityMap).map((element) => {
        const value = get().tasksArray
          .filter((task) => task.priority === parseInt(element))
          .map((task) => task.id);
        return [element, value];
      })),
    tasksGrouped: get().groupOption === 'status' 
      ? Object.fromEntries(Object.keys(statusMap).map((element) => {
          const value = get().tasksArray
            .filter((task) => task.status === parseInt(element))
            .map((task) => task.id);
          return [element, value];
        }))
      : Object.fromEntries(Object.keys(priorityMap).map((element) => {
          const value = get().tasksArray
            .filter((task) => task.priority === parseInt(element))
            .map((task) => task.id);
          return [element, value];
        }))
  }),
  groupBy: (groupBy: string) => set({
    groupOption: groupBy,
    tasksGrouped: groupBy === 'status' ? get().tasksByStatus : get().tasksByPriority,
  }),
}))

export default useTaskStore;