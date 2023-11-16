import { IUser } from '@odnlabs/api-client';
import { IToast } from '@odnlabs/ui';
import { configureStore } from '@reduxjs/toolkit';

import toastsSlice from '@slices/toasts.slice';
import userSlice from '@slices/user.slice';

export const store = configureStore({
  reducer: {
    toasts: toastsSlice.reducer,
    user: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const { addToast, removeToast } = toastsSlice.actions;
export const toastsState = (state: RootState): IToast[] => state.toasts;

export const { setUser } = userSlice.actions;
export const userState = (state: RootState): IUser | undefined => state.user.user;
