import * as PostApi from '../api/postRequest'

export const getTimelinePost = (id) => async(dispatch)=>{
    dispatch({type: "RETREIVING_START"})
    try {
        const {data} = await PostApi.getTimelinePost(id); 
        dispatch({type: "RETREIVING_SUCCESS", data});
    } catch (error) {
        console.log(error);
       dispatch({type: "RETREIVING_FAIL"})
    }
}