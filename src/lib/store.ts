import { configureStore } from "@reduxjs/toolkit";
import moistureSensorDataReducer from "./slice/moisturevalue"
import espConnectionReducerReducer from './slice/connected'

export const store = configureStore({
    reducer: {
        moistureSensorData: moistureSensorDataReducer,
        connectionStage: espConnectionReducerReducer
    },
});


export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']