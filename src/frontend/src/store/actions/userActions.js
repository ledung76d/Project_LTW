import actionTypes from './actionTypes';

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const resetUserInfo = (userInfo)=>({
    type: actionTypes.RESET_USER_INFO,
    userInfo: userInfo
})

export const changeFLA = (payload)=>({
    type: actionTypes.CHANGE_FLA,
    payload: payload
})