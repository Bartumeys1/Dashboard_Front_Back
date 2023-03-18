import { BlogActions, BlogActionTypes } from "../../reducers/blogReducer/type";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import { createPost, getAllPosts, getTopPosts, removePost, updatePost } from "../../../services/api-blog-service";

export const CreatePost = (blog: any) => {
    return async (dispatch: Dispatch<BlogActions>) => {
      try {
        dispatch({ type: BlogActionTypes.START_REQUEST });
        const data = await createPost(blog);
        console.log(`data: ${data}`);
        
        const { response } = data;
        if (!response.isSuccess) {
          dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
            payload: response.message,
          });
          toast.error(response.message);
        } else {
          dispatch({
            type: BlogActionTypes.SUCCESS_CREATE_REQUEST,
            payload: response.message,
          });
          toast.success(response.message);
        }
      } catch (e) {
        dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
          payload: "Unknown error",
        });
      }
    };
  };

  export const  GetAllPosts = (start: number, end: number, isAll: boolean = false) => {
    return async (dispatch: Dispatch<BlogActions>) => {
      try {
        dispatch({ type: BlogActionTypes.START_REQUEST });
        const data = await getAllPosts(start,end,isAll);
        console.log(`data: ${data}`);
        
        const { response } = data;
        if (!response.isSuccess) {
          dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
            payload: response.message,
          });
          toast.error(response.message);
        } else {
          dispatch({
            type: BlogActionTypes.ALL_BLOGS_LOADED,
            payload: response,
          });
        }
      } catch (e) {
        dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
          payload: "Unknown error",
        });
      }
    };
  };

  export const UpdatePost = (blog:any) => {
    return async (dispatch: Dispatch<BlogActions>) => {
      try {
        dispatch({ type: BlogActionTypes.START_REQUEST });
        const data = await updatePost(blog);
        console.log(`data: ${data}`);
        
        const { response } = data;
        if (!response.isSuccess) {
          dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
            payload: response.message,
          });
          toast.error(response.message);
        } else {
          dispatch({
            type: BlogActionTypes.UPDATE_BLOG,
            payload: response,
          });
          toast.success(response.message);
        }
      } catch (e) {
        dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
          payload: "Unknown error",
        });
      }
    };
  };

  export const RemoveBlog = (id:any) => {
    return async (dispatch: Dispatch<BlogActions>) => {
      try {
        dispatch({ type: BlogActionTypes.START_REQUEST });
        const data = await removePost(id);
        console.log(`data: ${data}`);
        
        const { response } = data;
        if (!response.isSuccess) {
          dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
            payload: response.message,
          });
          toast.error(response.message);
        } else {
          dispatch({
            type: BlogActionTypes.REMOVE_REQUEST,
            payload: response.message,
          });
          toast.success(response.message);
        }
      } catch (e) {
        dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
          payload: "Unknown error",
        });
      }
    };
  };


  export const  GetTopPosts = (count:number) => {
    return async (dispatch: Dispatch<BlogActions>) => {
      try {
        dispatch({ type: BlogActionTypes.START_REQUEST });
        const data = await getTopPosts(count);
        console.log(`data: ${data}`);
        
        const { response } = data;
        if (!response.isSuccess) {
          dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
            payload: response.message,
          });
          toast.error(response.message);
        } else {
          dispatch({
            type: BlogActionTypes.TOP_POSTS_LOADED,
            payload: response,
          });
        }
      } catch (e) {
        dispatch({
            type: BlogActionTypes.ERROR_REQUEST,
          payload: "Unknown error",
        });
      }
    };
  };

  export const SetReadPost = (post: any) => {
    return async (dispatch: Dispatch<BlogActions>) => {
      console.log(`Set current post : `,post);
      dispatch({
        type: BlogActionTypes.SET_READ_POST,
        payload: post,
      });
    };
  };