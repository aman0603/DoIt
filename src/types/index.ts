import { ThunkAction, Action } from '@reduxjs/toolkit';

export interface TaskStep {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  isImportant: boolean;
  isOutdoor?: boolean;
  steps?: TaskStep[];
  dueDate?: string;
  reminder?: string;
  repeat?: boolean;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
}

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'today' | 'important' | 'planned' | 'assigned';
  searchQuery: string;
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export interface ThemeState {
  isDark: boolean;
}

export interface RootState {
  auth: AuthState;
  tasks: TasksState;
  weather: WeatherState;
  theme: ThemeState;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;