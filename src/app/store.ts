// import type { Action, ThunkAction } from "@reduxjs/toolkit"
// import { combineSlices, configureStore } from "@reduxjs/toolkit"
// import { setupListeners } from "@reduxjs/toolkit/query"
// import { dataSlice } from "../store/data/dataSlice"

// // `combineSlices` automatically combines the reducers using
// // their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// const rootReducer = combineSlices(dataSlice)
// // Infer the `RootState` type from the root reducer
// export type RootState = ReturnType<typeof rootReducer>

// // The store setup is wrapped in `makeStore` to allow reuse
// // when setting up tests that need the same store config
// export const makeStore = (preloadedState?: Partial<RootState>) => {
//   const store = configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   })
//   // configure listeners using the provided defaults
//   // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
//   setupListeners(store.dispatch)
//   return store
// }

// export const store = makeStore()

// // Infer the type of `store`
// export type AppStore = typeof store
// // Infer the `AppDispatch` type from the store itself
// export type AppDispatch = AppStore["dispatch"]
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   RootState,
//   unknown,
//   Action
// >

import { combineReducers} from "@reduxjs/toolkit";


import { Action, ThunkAction, combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {CounterFactSlice} from "../store/data/CounterFactSlice";
import { aleModelReducer, alePipelineReducer, counterfactualsPipelineReducer, dataReducer,pdp2DPipelineReducer,pdpModelReducer,pdpPipelineReducer} from "../store/data/dataSlice";

const rootReducer = combineReducers({
  data: dataReducer,
  pdppipeline: pdpPipelineReducer,
  pdpmodel:pdpModelReducer,
  alepipeline:alePipelineReducer,
  alemodel:aleModelReducer,
  pdp2dpipeline:pdp2DPipelineReducer,
  counterfactualspipeline:counterfactualsPipelineReducer,
  // counterFact:CounterFactSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;