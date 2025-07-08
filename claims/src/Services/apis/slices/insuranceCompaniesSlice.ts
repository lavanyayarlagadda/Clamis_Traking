import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface insuranceCompany {
    insuranceId: number,
    insuranceName: string,
    insuranceType: string,
    createdAt: string
};

interface insuranceCompaniesList {
    data: insuranceCompany[];
}

const initialState: insuranceCompaniesList = {
    data: [],
}

export const insuranceCompaniesSlice = createSlice({
    name: 'insuranceCompany',
    initialState,
    reducers: {
        setInsurancesCompaniesList: (state, action: PayloadAction<insuranceCompany[]>) => {
            state.data = action.payload
        }
    }
});

export const {setInsurancesCompaniesList} = insuranceCompaniesSlice.actions;
export default insuranceCompaniesSlice.reducer;