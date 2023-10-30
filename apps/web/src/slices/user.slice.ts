import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from '@odnlabs/api-client';

const initialState: { user: IUser | undefined } = { user: undefined };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | undefined>) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
  },
});

export default userSlice;
