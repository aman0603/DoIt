import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../../types';

const initialState: ThemeState = {
  isDark: localStorage.getItem('theme') === 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;