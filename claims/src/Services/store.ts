import { configureStore } from '@reduxjs/toolkit';
import claimStatusReducer from './apis/slices/claimStatusSlice';
import insuranceCompanyReducer from './apis/slices/insuranceCompaniesSlice';


export const store = configureStore({
    reducer: {
        claimStatus : claimStatusReducer,
        insuranceCompany : insuranceCompanyReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
