import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./explainabilityAPI";

interface DataSliceState {  
    status: boolean;
    data: any;
    error: string | null;
}

const initialState: DataSliceState = {
    status: false,
    data: null, 
    error: null,
};

// Create a function to generate async thunk for fetching data
const createFetchDataThunk = (sliceName: string, xaitype: string): any => {
    return createAsyncThunk(
        `${sliceName}/fetchData`,
        async ({ feature1, method,feature2 }: { feature1: string; method: string; feature2: string; }) => {
            try {
                const response = await fetchData(feature1, xaitype, method,feature2);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch data');
            }
        }
    );
};

// Create separate thunks for each slice
export const fetchDataForDataSlice = createFetchDataThunk('data', 'pipeline');
export const fetchDataForPdpPipelineSlice = createFetchDataThunk('pdppipeline', 'pipeline');
export const fetchDataForPdpModelSlice = createFetchDataThunk('pdpmodel', 'model');
export const fetchDataForAlePipelineSlice = createFetchDataThunk('alepipeline', 'pipeline');
export const fetchDataForAleModelSlice = createFetchDataThunk('alemodel', 'model');
export const fetchDataForPdp2DPipelineSlice = createFetchDataThunk('pdp2dpipeline', 'pipeline');
export const fetchDataForCounterfactualsPipelineSlice = createFetchDataThunk('counterfactualspipeline', 'pipeline');

// Create a generic extra reducers function
const createExtraReducers = (thunk: any) => (builder: any) => {
    builder
        .addCase(thunk.pending, (state: DataSliceState) => {
            state.status = true;
            state.error = null;
        })
        .addCase(thunk.fulfilled, (state: DataSliceState, action: any) => {
            state.status = false;
            state.data = action.payload;
        })
        .addCase(thunk.rejected, (state: DataSliceState, action: any) => {
            state.status = false;
            state.error = action.error.message || null;
        });
};

// Create slices using the generic extra reducers function
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: createExtraReducers(fetchDataForDataSlice),
});

export const pdpPipelineSlice = createSlice({
    name: 'pdppipeline',
    initialState,
    reducers: {},
    extraReducers: createExtraReducers(fetchDataForPdpPipelineSlice),
});

export const pdpModelSlice = createSlice({
    name: 'pdpmodel',
    initialState,
    reducers: {},
    extraReducers: createExtraReducers(fetchDataForPdpModelSlice),
});

export const alePipelineSlice = createSlice({
    name: 'alepipeline',
    initialState,
    reducers: {},
    extraReducers: createExtraReducers(fetchDataForAlePipelineSlice),
});

export const aleModelSlice = createSlice({
    name: 'alemodel',
    initialState,
    reducers: {},
    extraReducers: createExtraReducers(fetchDataForAleModelSlice),
});

export const pdp2DPipelineSlice = createSlice({
    name: 'pdp2dpipeline',
    initialState,
    reducers: {},
    extraReducers: createExtraReducers(fetchDataForPdp2DPipelineSlice),
});

export const counterfactualsPipelineSlice = createSlice({
    name: 'counterfactualspipeline',
    initialState,
    reducers: {},
    extraReducers: createExtraReducers(fetchDataForCounterfactualsPipelineSlice),
});

// Export reducers
export const dataReducer = dataSlice.reducer;
export const pdpPipelineReducer = pdpPipelineSlice.reducer;
export const pdpModelReducer = pdpModelSlice.reducer;
export const alePipelineReducer = alePipelineSlice.reducer;
export const aleModelReducer = aleModelSlice.reducer;
export const pdp2DPipelineReducer = pdp2DPipelineSlice.reducer;
export const counterfactualsPipelineReducer = counterfactualsPipelineSlice.reducer;
