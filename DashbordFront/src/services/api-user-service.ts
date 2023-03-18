import axios from "axios";



const instance = axios.create({
  //baseURL: "http://194.44.93.225:1111/api/User",
  baseURL: "https://localhost:5001/api/User",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config:any) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    console.log("res => ", res)
      return res;
  },
  async (err) => {
    console.log("Error ", err)
      const originalConfig = err.config;
      if (err.response) {
          // Validation failed, ...
          console.log("Interceptors", err.response)
          if (err.response.status === 400 && err.response.data) {
              return Promise.reject(err.response.data);
          }
          // Access Token was expired
          if (err.response.status === 401 && !originalConfig._retry && getAccessToken() != null) {
              originalConfig._retry = true;
              try {
                  const rs = await refreshAccessToken();
                  const { accessToken, refreshToken } = rs.data;
                  setRefreshToken(refreshToken)
                  setAccessToken(accessToken)
                  instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                  return instance(originalConfig);
              } catch (_error:any) {
                  if (_error.response && _error.response.data) {
                      return Promise.reject(_error.response.data);
                  }
                  return Promise.reject(_error);
              }
          }
          if (err.response.status === 403 && err.response.data) {
              return Promise.reject(err.response.data);
          }
          // Backend not started, ...
          if (err.response.status === 404) {
              if (axios.isAxiosError(err)) {
                console.log("err.response.status === 404 ", err)
                  return Promise.reject(err.response.data);
              }
              return;
              // Else Toast
          }
      }
      return Promise.reject(err);
  }
);

function refreshAccessToken() {
  console.log("refreshAccessToken")
  return instance.post("/RefreshToken", {
      token: getAccessToken(),
      refreshToken: getrefreshToken()
  });
}


export const responseBody: any = (response: any) => response.data;

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

const User = {
  login: (user: any) => requests.post(`/login`, user),
  logout:(userId:string) =>requests.post(`/Logout?userId=`+userId),
  forgotPassword: (email: string) => requests.post(`/ForgotPassword`, email),
  getAllUsers: () => requests.get("/GetAllUsers"),
  registrateUser: (user: any)=> requests.post("/register" , user),
  changeUserProfilee: (user: any) =>requests.post(`/ChangeProfile`,user),
  changePassword: (model:any)=> requests.post("/ChangePassword",model),
  removeUser: (email:any) => requests.post("/DeleteUser?email="+ email),
  updateUser: (user:any) => requests.post("/UpdateUser", user),
  };

export async function login(user: any) {
  const data = await User.login(user)
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

export async function logout(userId:string) {
  const data = await User.logout(userId)
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

export async function forgotPassword(email: string) {
  const data = await User.forgotPassword(email)
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

export async function changePassword(model: any) {
  const data = await User.changePassword(model)
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

export async function getAllUsers() {
  const data = await User.getAllUsers()
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

export async function registrateUser(user: any) {
  const data = await User.registrateUser(user)
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


export async function changeUserProfile(user: any) {
  const data = await User.changeUserProfilee(user)
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

export async function updateUser(user: any) {
  const data = await User.updateUser(user)
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

export async function removeUser(email:string) {
  const data = await User.removeUser(email)
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

export function setAccessToken(token: string){
  window.localStorage.setItem("accessToken", token)
}

export function setRefreshToken(token: string){
  window.localStorage.setItem("refreshToken", token)
}

export function getAccessToken():null|string{
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken
}

export function getrefreshToken():null|string{
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken
}

export function removeTokens(){
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
}
