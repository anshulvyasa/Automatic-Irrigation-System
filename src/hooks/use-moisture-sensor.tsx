import { updateDeviceId, updateMoisture, updateSignal } from "@/lib/slice/moisturevalue";
import { useAppDispatch, useAppSelector } from "./redux-hooks"

export const useMoistureSensor = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector((state) => state.moistureSensorData);

    const MOISTURE_SENSOR_DEVICE_ID = selector.deviceId;
    const MOISTURE_SENSOR_SIGNAL = selector.signal;
    const MOISTURE_SENSOR_READING = selector.moisture;


    function updateDeviceIdFn(id: string) {
        dispatch(updateDeviceId(id))
    }

    function updateDeviceMoistureReadingFn(val: number) {
        dispatch(updateMoisture(val))
    }

    function updateDeviceSignalReadingFn(val: number) {
        dispatch(updateSignal(val))
    }

    return { MOISTURE_SENSOR_DEVICE_ID, MOISTURE_SENSOR_READING, MOISTURE_SENSOR_SIGNAL, updateDeviceIdFn, updateDeviceMoistureReadingFn, updateDeviceSignalReadingFn }
}