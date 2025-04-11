import { priorityMap, statusMap } from '@/api/static/common';
import { Task } from '@/types/task';
import { create } from 'zustand';

interface TaskStore {
  teamId: string;
  tasks: Record<string, Task>;
  tasksArray: Task[];
  tasksGrouped: Record<string, string[]>;
  tasksByStatus: Record<string, string[]>;
  tasksByPriority: Record<string, string[]>;
  groupOption: string;
  sortedList: string[];
  sortOption: { key: keyof Task; direction: 1 | -1 };

  setTasks: (tasks: Task[]) => void;
  getTaskById: (id: string) => Task | null;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addTask: (task: Task) => void;
  groupTasks: () => void;
  groupBy: (groupBy: string) => void;
  calculateSortedList: () => void;
  setSortOption: (key: keyof Task, direction: 1 | -1) => void;
}

const useTaskStore = create<TaskStore>((set, get) => ({
  teamId: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
  tasks: {} as Record<string, Task>,
  tasksArray: [] as Task[],
  tasksGrouped: {} as Record<string, string[]>,
  tasksByStatus: {} as Record<string, string[]>,
  tasksByPriority: {} as Record<string, string[]>,
  groupOption: 'status',
  sortedList: [] as string[], // Array of task IDs sorted based on the current criteria
  sortOption: { key: 'number', direction: 1 }, // Default sorting option

  setTasks: async (tasksList: Task[]) => {
    if (
      !tasksList ||
      tasksList.length === 0 ||
      tasksList.length === get().tasksArray.length
    )
      return;
    set({
      tasksArray: tasksList,
      tasks: Object.fromEntries(tasksList.map((task) => [task.id, task])),
    });
    get().groupTasks();
    get().groupBy('status');
    get().calculateSortedList();
  },
  getTaskById: (id: string) => get().tasks[id] || null,
  updateTask: (task: Task) => {
    set((state) => ({
      tasksArray: state.tasksArray.map((t) => (t.id === task.id ? task : t)),
      tasks: {
        ...state.tasks,
        [task.id]: task,
      },
    }));
    get().calculateSortedList();
  },
  deleteTask: (id: string) =>
    set((state) => {
      const { [id]: deleted, ...rest } = state.tasks; // eslint-disable-line @typescript-eslint/no-unused-vars
      const tasksArray = state.tasksArray.filter((task) => task.id !== id);
      const restSorted = state.sortedList.filter((tId) => tId !== id);
      return { tasks: rest, tasksArray, sortedList: restSorted };
    }),
  addTask: (task: Task) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [task.number]: task,
      },
      tasksArray: [...state.tasksArray, task],
    }));
    get().calculateSortedList();
  },
  groupTasks: () =>
    set({
      tasksByStatus: Object.fromEntries(
        Object.keys(statusMap).map((element) => {
          const value = get()
            .tasksArray.filter((task) => task.status === parseInt(element))
            .map((task) => task.id);
          return [element, value];
        })
      ),
      tasksByPriority: Object.fromEntries(
        Object.keys(priorityMap).map((element) => {
          const value = get()
            .tasksArray.filter((task) => task.priority === parseInt(element))
            .map((task) => task.id);
          return [element, value];
        })
      ),
      tasksGrouped:
        get().groupOption === 'status'
          ? Object.fromEntries(
              Object.keys(statusMap).map((element) => {
                const value = get()
                  .tasksArray.filter(
                    (task) => task.status === parseInt(element)
                  )
                  .map((task) => task.id);
                return [element, value];
              })
            )
          : Object.fromEntries(
              Object.keys(priorityMap).map((element) => {
                const value = get()
                  .tasksArray.filter(
                    (task) => task.priority === parseInt(element)
                  )
                  .map((task) => task.id);
                return [element, value];
              })
            ),
    }),
  groupBy: (groupBy: string) =>
    set({
      groupOption: groupBy,
      tasksGrouped:
        groupBy === 'status' ? get().tasksByStatus : get().tasksByPriority,
    }),
  calculateSortedList: () => {
    const { tasksArray, sortOption } = get();
    const sorted = [...tasksArray].sort((a, b) => {
      const key = sortOption.key as keyof Task;
      const direction = sortOption.direction;
      if ((a[key] ?? 0) < (b[key] ?? 0)) return -1 * direction;
      if ((a[key] ?? 0) > (b[key] ?? 0)) return 1 * direction;
      return 0;
    });
    set({ sortedList: sorted.map((task) => task.id) });
  },

  // Update the sort option and recalculate the sorted list
  setSortOption: (key: keyof Task, direction: 1 | -1) => {
    set({ sortOption: { key, direction } });
    get().calculateSortedList();
  },
}));

export default useTaskStore;
