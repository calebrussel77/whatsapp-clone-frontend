import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers/updateObject";

const initialState = {
  token: null,
  userName: "",
  error: null,
  isLoading: false,
  errorMsg: "",
  userId: null,
  imageUrl: "",
  email: "",
  successMsg: "",
  bio: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.AUTH_ERROR:
      return updateObject(state, {
        isLoading: false,
        errorMsg: action.errorMsg,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userName: "",
        error: null,
        isLoading: false,
        errorMsg: "",
        userId: null,
        imageUrl: "",
        email: "",
        successMsg: "",
        bio: "",
      });
    case actionTypes.AUTH_SIGNIN_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        userName: action.userName,
        userId: action.userId,
        token: action.token,
        email: action.email,
        imageUrl: action.imageUrl,
        successMsg: "success login",
      });
    default:
      return state;
  }
};

export default authReducer;
