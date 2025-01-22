import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../../types';

// Function to load tasks from localStorage
const loadTasksFromStorage = (): Task[] => {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    const tasks: Task[] = JSON.parse(stored);
    // Ensure missing properties are initialized
    tasks.forEach((task) => {
      task.steps = task.steps || [];
      task.reminder = task.reminder || '';
      task.dueDate = task.dueDate || '';
      task.repeat = task.repeat || false;
      task.notes = task.notes || '';
      task.isImportant = task.isImportant || false;
      task.createdAt = task.createdAt || new Date().toISOString(); // Ensure createdAt exists
    });
    return tasks;
  }
  return [];
};

// Function to save tasks to localStorage
const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Initial state for the tasks slice
const initialState: TasksState = {
  tasks: loadTasksFromStorage(),
  loading: false,
  error: null,
  filter: 'all',
  searchQuery: '',
};

// Slice for tasks management
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload;
      // Ensure steps and createdAt are initialized
      newTask.steps = newTask.steps || [];
      newTask.createdAt = newTask.createdAt || new Date().toISOString();
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
    },

    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },

    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToStorage(state.tasks);
      }
    },

    toggleImportant: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
        saveTasksToStorage(state.tasks);
      }
    },

    addStep: (state, action: PayloadAction<{ taskId: string; step: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        if (!task.steps) task.steps = [];
        task.steps.push({
          id: Date.now().toString(),
          title: action.payload.step,
          completed: false,
        });
        saveTasksToStorage(state.tasks);
      }
    },

    setDueDate: (state, action: PayloadAction<{ taskId: string; dueDate: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.dueDate = action.payload.dueDate;
        saveTasksToStorage(state.tasks);
      }
    },

    setReminder: (state, action: PayloadAction<{ taskId: string; reminderDate: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.reminder = action.payload.reminderDate;
        saveTasksToStorage(state.tasks);
      }
    },

    setRepeat: (state, action: PayloadAction<{ taskId: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.repeat = !task.repeat;
        saveTasksToStorage(state.tasks);
      }
    },

    updateTaskNotes: (state, action: PayloadAction<{ taskId: string; notes: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.notes = action.payload.notes;
        saveTasksToStorage(state.tasks);
      }
    },

    setFilter: (state, action: PayloadAction<TasksState['filter']>) => {
      state.filter = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

// Export actions and reducer
export const { 
  addTask, 
  removeTask, 
  toggleTask, 
  toggleImportant, 
  addStep,
  setDueDate,
  setReminder,
  setRepeat,
  updateTaskNotes,
  setFilter,
  setSearchQuery 
} = tasksSlice.actions;

// Selector to get filtered tasks
export const selectFilteredTasks = (state: { tasks: TasksState }) => {
  const { tasks, filter, searchQuery } = state.tasks;
  const today = new Date().toISOString().split('T')[0];

  let filteredTasks = tasks;

  // Apply filter
  switch (filter) {
    case 'today':
      filteredTasks = tasks.filter(task => task.createdAt.startsWith(today));
      break;
    case 'important':
      filteredTasks = tasks.filter(task => task.isImportant);
      break;
    case 'planned':
      filteredTasks = tasks.filter(task => !task.completed);
      break;
    case 'assigned':
      filteredTasks = tasks;
      break;
  }

  // Apply search query
  if (searchQuery) {
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filteredTasks;
};

// Export reducer as default
export default tasksSlice.reducer;
