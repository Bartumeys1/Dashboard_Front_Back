export interface BlogState{
    message: null | string,
    loading: boolean,
    error: null | string
    readPost:any,
    allBlogs: [],
    topPosts: [],

}

export enum BlogActionTypes{
    START_REQUEST = "START_REQUEST",
    SUCCESS_CREATE_REQUEST = "SUCCESS_CREATE_REQUEST",
    ALL_BLOGS_LOADED = "ALL_BLOGS_LOADED",
    ERROR_REQUEST = "ERROR_REQUEST",
    UPDATE_BLOG ="UPDATE_BLOG",
    REMOVE_REQUEST ="REMOVE_REQUEST",
    TOP_POSTS_LOADED="TOP_POSTS_LOADED",
    SET_READ_POST="SET_READ_POST",
}

interface StartRequestAction{
    type:BlogActionTypes.START_REQUEST,
}

interface ErrorRequestAction{
    type:BlogActionTypes.ERROR_REQUEST,
    payload:any
}

interface CreateRequestAction{
    type:BlogActionTypes.SUCCESS_CREATE_REQUEST,
    payload:any
}

interface GetAllBlogsRequestAction{
    type:BlogActionTypes.ALL_BLOGS_LOADED,
    payload:any
}

interface UpdateRequestAction{
    type:BlogActionTypes.UPDATE_BLOG,
    payload:any
}

interface RemoveRequestAction{
    type:BlogActionTypes.REMOVE_REQUEST,
    payload:any
}

interface GetTopPostsRequestAction{
    type:BlogActionTypes.TOP_POSTS_LOADED,
    payload:any
}

interface SetReadPostAction{
    type:BlogActionTypes.SET_READ_POST,
    payload:any
}
export type BlogActions =StartRequestAction
|ErrorRequestAction
|CreateRequestAction
|GetAllBlogsRequestAction
|UpdateRequestAction
|RemoveRequestAction
|GetTopPostsRequestAction
|SetReadPostAction;