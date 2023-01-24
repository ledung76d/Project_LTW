import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };

    case actionTypes.RESET_USER_INFO:
      return {
        ...state,
        userInfo: state.userInfo,
      };

    case actionTypes.CHANGE_FLA:
      let tmp = state.userInfo;
      tmp.firstName = action.payload.firstName;
      tmp.lastName = action.payload.lastName;
      tmp.image = action.payload.image;
      return {
        ...state,
        userInfo: tmp,
      };

    default:
      return state;
  }
};

export default appReducer;
