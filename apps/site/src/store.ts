import { configureStore } from '@reduxjs/toolkit';

import { IToast } from '@odnlabs/ui';
import toastsSlice from './slices/toasts.slice';

export const store = configureStore({
  reducer: {
    toasts: toastsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { addToast, removeToast } = toastsSlice.actions;
export const toastsState = (state: RootState): IToast[] => state.toasts;
