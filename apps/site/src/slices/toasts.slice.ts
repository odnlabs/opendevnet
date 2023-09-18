import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { IToast } from '@odnlabs/ui';

import { RootState } from 'src/store';

const initialState: IToast[] = [];

const history: IToast[] = [];

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<IToast>) => {
      const newToast = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        type: action.payload.type,
        time: action.payload.time ?? 5000,
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
