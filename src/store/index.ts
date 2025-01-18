import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './reducers/items';
import userReducer from './reducers/User';

const store = configureStore({
    reducer: {
        robots: itemsReducer,
        user: userReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;