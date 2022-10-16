const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };

    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };

    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };

    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false};

    case "UPDATING_START":
      return { ...state, loading: true, error: false};

    case "UPDATING_SUCCESS":
      console.log(action.data);
      localStorage.setItem('profile', JSON.stringify({...action?.data}))
      return {...state, authData: action.data, loading: false, error: false};
    case "UPDATING_FAIL":
       return {...state, loading: false, error: true };
    case "FOLLOW_USER":
      console.log(action.data)
     return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action?.data]}}, loading: false, error: false}
    case "UNFOLLOW_USER":
      console.log(state)
      return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId) => personId!==action.data)]}}, loading: false, error: false}
    default:
      return state;
  }
};

export default authReducer;
