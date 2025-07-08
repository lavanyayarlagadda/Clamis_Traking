import { configureStore } from '@reduxjs/toolkit';
import claimStatusReducer from './apis/slices/claimStatusSlice'


export const store = configureStore({
    reducer: {
        claimStatus : claimStatusReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
