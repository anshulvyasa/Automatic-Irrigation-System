import { ConnectionProps, updateStage } from "@/lib/slice/connected";
import { useAppDispatch, useAppSelector } from "./redux-hooks"


export const useEspConnection = () => {
    const disPatch = useAppDispatch();
    const stage = useAppSelector(state => state.connectionStage.stage)

    function updateStageFn(newStage: ConnectionProps) {
        disPatch(updateStage(newStage))
    }

    return { stage, updateStageFn };
}