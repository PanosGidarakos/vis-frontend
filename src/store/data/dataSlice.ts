// import type { PayloadAction } from "@reduxjs/toolkit"
// import { createAppSlice } from "../../app/createAppSlice"
// import type { AppThunk } from "../../app/store"
// import { fetchData } from "./dataAPI"

// export interface DataSliceState {  
//     status: "idle" | "loading" | "failed"
// }

// const initialState: DataSliceState = {
//     status: 'idle'
// }

// // If you are not using async thunks you can use the standalone `createSlice`.
// export const dataSlice = createAppSlice({
//   name: "data",
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: create => ({
//     getData: create.asyncThunk(
//       async (query: any) => {
//         const response = await fetchData(query)
//         // The value we return becomes the `fulfilled` action payload
//         return response.data
//       },
//       {
//         pending: state => {
//           state.status = "loading"
//         },
//         fulfilled: (state, action) => {
//           state.status = "idle"
//         },
//         rejected: state => {
//           state.status = "failed"
//         },
//       },
//     ),
//   }),
//   // You can define your selectors here. These selectors receive the slice
//   // state as their first argument.
//   selectors: {
//     selectStatus: data => data.status,
//   },
// })
// console.log(dataSlice);

// // Action creators are generated for each case reducer function.
// export const { } =
//   dataSlice.actions
// console.log(dataSlice.actions);

// // Selectors returned by `slice.selectors` take the root state as their first argument.
// export const { selectStatus } = dataSlice.selectors
// console.log(selectStatus);



// dataSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./dataAPI";
import { IQuery } from "../../types/query.model";

interface DataSliceState {  
    status: boolean;
    data: any; // Define the type of your data here
    error: string | null; // Define the type of your error here
}

const initialState: DataSliceState = {
    status: false,
    data: null,
    error: null,
}

export const getData = createAsyncThunk(
    'data/getData',
    async ({ feature1, xaitype }: { feature1: string; xaitype: string }) => {
        try {
            const response = await fetchData(feature1,xaitype);
            
            return response.data; // Make sure this matches the structure of your API response
        } catch (error) {
            throw new Error('Failed to fetch data');
        }
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
              state.status = true;
              state.error = null;
            })
            .addCase(getData.fulfilled, (state, action) => {
              state.status = false;
                state.data = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.status = false;
                state.error = action.error.message || null;
            });
    },
});

export default dataSlice.reducer;
