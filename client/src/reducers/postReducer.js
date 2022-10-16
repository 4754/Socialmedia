const postReducer = (
    state = {posts: [], loading: false, error: false, uploading: false}
, action) => {
    switch(action.type){
        case "UPLOAD_START":
            return {...state, loading: true, error: false};
        case "UPLOAD_SUCCESS":
            return {...state, posts: [action.data,...state.posts], loading: false, error: false};
        case "UPLOAD_FAIL":
            return {...state, loading: false, error: true};
        case "RETREIVING_START":
            return {...state, loading: true, error: false};
        case "RETREIVING_SUCCESS":
            // console.log("old posts: ", action.data);
            // console.log("new posts:", state.posts)
            return {...state, posts: action.data, loading: false, error: false};
        case "RETREIVING_FAIL":
            return {...state, loading: false, error: true};
        default:
            return {...state};
    }
}

export default postReducer;