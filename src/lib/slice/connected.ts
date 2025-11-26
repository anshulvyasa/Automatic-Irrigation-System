import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ConnectionProps = {
    stage: "connected" | "connecting" | "disconnected"
}

const initialState: ConnectionProps = {
    stage: "connecting"
}

const connectionSlice = createSlice({
    name: "connection_slice",
    initialState,
    reducers: {
        updateStage(state, action: PayloadAction<ConnectionProps>) {
            state.stage = action.payload.stage;
        }
    }
})


export const { updateStage } = connectionSlice.actions;
export default connectionSlice.reducer;


