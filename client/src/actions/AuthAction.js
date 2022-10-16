import * as AuthApi from '../api/AuthRequest';


//here i am getting dispath from Auth.jsx page (pages/auth/Auth)
export const logIn = (formData) => async(dispatch) => {

    dispatch({type: "AUTH_START"})
    try {
        const {data} = await AuthApi.logIn(formData);
        dispatch({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error);
        dispatch({type: "AUTH_FAIL"})
    }
}

export const signUP = (formData) => async(dispatch) => {

    dispatch({type: "AUTH_START"})
    try {
        const {data} = await AuthApi.signUP(formData);
        dispatch({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error);
        dispatch({type: "AUTH_FAIL"})
    }
}

export const logOut = () => async(dispatch)=> {
    dispatch({type: "LOG_OUT"})
}