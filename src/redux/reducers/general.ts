import { ReduxGeneralStateProps } from "../../config/types";
import { SET_ACTIVE_ROOM } from "../actionTypes";

const initialState: ReduxGeneralStateProps = {
  roomId: "",
};

const generalReducer = (
  state: ReduxGeneralStateProps = initialState,
  action: { type: string; payload: ReduxGeneralStateProps }
): ReduxGeneralStateProps => {
  switch (action.type) {
    case SET_ACTIVE_ROOM:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default generalReducer;
