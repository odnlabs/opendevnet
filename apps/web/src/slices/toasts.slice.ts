import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Toast } from '@typings/core';

import { RootState } from 'src/store';

const initialState: Toast[] = [];

const history: Toast[] = [];

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      const newToast = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        type: action.payload.type,
        time: action.payload.time,
      };
      state.push(newToast);
      history.push(newToast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      return state.filter((toast) => toast.id !== action.payload);
    },
    getHistory: () => {
      return history;
    },
    deleteHistory: () => {
      history.length = 0;
    },
  },
});

export const { addToast, removeToast } = toastsSlice.actions;

export const toastsState = (state: RootState) => state.toasts;

export default toastsSlice.reducer;
