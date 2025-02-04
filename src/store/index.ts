import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/Post';
import projectReducer from './reducers/Project';
import userReducer from './reducers/User';

const store = configureStore({
    reducer: {
        post: postReducer,
        project: projectReducer,
        user: userReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;