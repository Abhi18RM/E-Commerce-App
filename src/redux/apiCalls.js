import { logOutHandle, loginFailure, loginStart, loginSuccess } from "./userRedux";
import { userUrl } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await userUrl.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const logOut = async (dispatch) => {
    dispatch(logOutHandle());
}