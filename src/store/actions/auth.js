import * as actionsTypes from "../actions/actionsTypes";

export const authStart = () => {
  return {
    type: actionsTypes.AUTH_START,
  };
};

export const authLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("imageUrl");
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("bio");
  localStorage.removeItem("email");
  return {
    type: actionsTypes.AUTH_LOGOUT,
  };
};

export const authSignInSuccess = (
  token,
  userId,
  userName,
  imageUrl,
  bio,
  email
) => {
  return {
    type: actionsTypes.AUTH_SIGNIN_SUCCESS,
    token: token,
    userId: userId,
    userName: userName,
    imageUrl: imageUrl,
    bio: bio,
    email: email,
  };
};

export const authError = (errorMsg) => {
  return {
    type: actionsTypes.AUTH_ERROR,
    errorMsg: errorMsg,
  };
};

export const authCheckStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const imageUrl = localStorage.getItem("imageUrl");
    const bio = localStorage.getItem("bio");
    const email = localStorage.getItem("email");

    if (!token) {
      dispatch(authLogout());
    } else {
      dispatch(
        authSignInSuccess(token, userId, userName, imageUrl, bio, email)
      );
    }
  };
};
