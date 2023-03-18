import { BlogActions, BlogActionTypes, BlogState } from "./type";

const initialState: BlogState = {
  message: null,
  loading: false,
  error: null,
  readPost: {},
  allBlogs: [],
  topPosts: [],
};

const BlogReducer = (state = initialState, action: BlogActions): BlogState => {
  switch (action.type) {
    case BlogActionTypes.START_REQUEST:
      return { ...state, loading: true };
    case BlogActionTypes.SUCCESS_CREATE_REQUEST:
      return { ...state, loading: false, message: action.payload.message };
    case BlogActionTypes.ERROR_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        message: action.payload.message,
      };
    case BlogActionTypes.ALL_BLOGS_LOADED:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        allBlogs: action.payload.payload,
      };
    case BlogActionTypes.TOP_POSTS_LOADED:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        topPosts: action.payload.payload,
      };
    case BlogActionTypes.SET_READ_POST:
      return {
        ...state,
        loading: false,
        readPost: action.payload,
      };
    default:
      return state;
  } 
};

export default BlogReducer;
