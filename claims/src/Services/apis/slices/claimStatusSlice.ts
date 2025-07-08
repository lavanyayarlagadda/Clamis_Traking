import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface claimsStatus {
    claimStatusId: number,
    statusName: string
}

interface claimStatusState {
    data: claimsStatus[];
}

const initialState: claimStatusState = {
    data: [],
}

export const claimStatusSlice = createSlice({
    name: 'claimStatus',
    initialState,
    reducers: {
        setClaimStatuses: (state, action: PayloadAction<claimsStatus[]>) => {
            state.data = action.payload
        },
    },
});

export const {setClaimStatuses} = claimStatusSlice.actions;
export default claimStatusSlice.reducer;