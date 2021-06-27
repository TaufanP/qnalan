import { SET_ACTIVE_ROOM } from "../actionTypes";
import { ReduxGeneralStateProps } from "../../config/types";

const setActiveRoom = (payload: ReduxGeneralStateProps) => ({
  type: SET_ACTIVE_ROOM,
  payload,
});

export { setActiveRoom };
