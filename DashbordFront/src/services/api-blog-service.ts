import axios from "axios";
import { toast } from "react-toastify";
import { responseBody } from "./api-user-service";

const instance = axios.create({
  //baseURL: "http://194.44.93.225:1111/api/Blog",
  baseURL: "https://localhost:5001/api/Blog",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => {
    console.log("api-blog-service res => ", res);
    return res;
  },
  async (err) => {
    console.log("Error api-blog-service ", err);
    if (err.response) {
      // Validation failed, ...
      console.log("Interceptors", err.response);
      if (err.response.status === 400 && err.response.data) {
        return Promise.reject(err.response.data);
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Backend not started, ...
      if (err.response.status === 404) {
        if (axios.isAxiosError(err)) {
          console.log("err.response.status === 404 ", err);
          return Promise.reject(err.response.data);
        }
        return;
        // Else Toast
      }
    }
    return Promise.reject(err);
  }
);


const requests = {
    get: (url: string) => instance.get(url).then().then(responseBody),
    post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
    put: (url: string, body?: string) =>
    instance.put(url, body).then().then(responseBody),
    patch: (url: string, body: string) =>
    instance.patch(url, body).then().then(responseBody),
    del: (url: string) => instance.delete(url).then().then(responseBody),
  };

const Blog = {
  createPost: (blog: any) => requests.post("/CreateNewPost", blog),
  getAllPosts: (start: number, end: number, isAll: boolean = false) =>
    requests.get(
      "/GetPosts?start=" + start + "&end=" + end + "&isAll=" + isAll
    ),
  updatePost: (blog: any) => requests.post("/EditPost", blog),
  removePost: (id: any) => requests.post("/DeletePost?id=" + id),
  getTopPosts: (count:number) => requests.get("/GetTopPosts?count="+count),
};

export async function createPost(blog: any) {
    const data = await Blog.createPost(blog)
      .then((response) => {
        return {
          response,
        };
      })
      .catch((error) => {
        return error.response;
      });
    return data;
  }

export async function getAllPosts(start: number, end: number, isAll: boolean = false) {
    const data = await Blog.getAllPosts(start,end,isAll)
      .then((response) => {
        return {
          response,
        };
      })
      .catch((error) => {
        return error.response;
      });
    return data;
  }
  
  
  
  export async function updatePost(blog: any) {
    const data = await Blog.updatePost(blog)
      .then((response) => {
        return {
          response,
        };
      })
      .catch((error) => {
        return error.response;
      });
    return data;
  }
  
  export async function removePost(id: any) {
    const data = await Blog.removePost(id)
      .then((response) => {
        return {
          response,
        };
      })
      .catch((error) => {
        return error.response;
      });
    return data;
  }

  
  export async function getTopPosts(count: number) {
    const data = await Blog.getTopPosts(count)
      .then((response) => {
        return {
          response,
        };
      })
      .catch((error) => {
        return error.response;
      });
    return data;
  }