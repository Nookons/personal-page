import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IUser} from "../../types/User";

type ItemsState = {
    user: IUser | null;
    loading: boolean;
    error: string | undefined;
};

const initialState: ItemsState = {
    user: null,
    loading: false,
    error: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userEnter: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        userLeave: (state) => {
            state.user = null; // Correct way
        },
    },
});

// Export actions
export const { userEnter, userLeave } = userSlice.actions;
export default userSlice.reducer;
