import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type moistureSensorProps = {
    deviceId: string | null;
    moisture: number;
    signal: number;
}


const initialState: moistureSensorProps = {
    deviceId: null,
    moisture: 0,
    signal: 0
}

const moistureSignalSlice = createSlice({
    name: "moisture",
    initialState,
    reducers: {
        updateDeviceId(state, action: PayloadAction<string>) {
            state.deviceId = action.payload;
        },
        updateMoisture(state, action: PayloadAction<number>) {
            state.moisture = action.payload;
        },
        updateSignal(state, action: PayloadAction<number>) {
            state.signal = action.payload
        }
    }
})


export const { updateDeviceId, updateMoisture, updateSignal } = moistureSignalSlice.actions;
export default moistureSignalSlice.reducer;