import React from "react";
// import React Router Dom
import { Routes, Route } from "react-router-dom";

import { useTypedSelector } from "./hooks/useTypedSelector";

// Import components
import Login from "./pages/auth/login";
import NotFound from "./pages/notFound";
import ForgotPassword from "./pages/auth/forgotPassword";
import DashboardLayout from "./containers/dashboardLayout";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/dashboard/users";
import Register from "./pages/dashboard/registration";
import Profile from "./pages/profile";
import EditUser from "./pages/dashboard/editUser";
import BlogsPage from "./pages/blogs";
import Dashboard_Blog from "./pages/dashboard/dashboardBlog";
import CreatePost from "./pages/dashboard/dashboardBlog/createPost";
import PostDetails from "./pages/postDetails";
import EditePost from "./pages/dashboard/dashboardBlog/editPost";

const App: React.FC = () => {
  // For protected routes
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);

  return (
    <Routes>
      {isAuth && (
        <>
          {user.role === "Administrators" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />} />
              <Route path="edit" element={<EditUser />} />
              <Route path="users/registration" element={<Register />} />
              <Route path="profile" element={<Profile />} />

              <Route path="settingsBlog" element={<Dashboard_Blog />} />
              <Route path="settingsBlog/editePost" element={<EditePost />} />
              <Route path="createPost" element={<CreatePost />} />
            </Route>
          )}
          {user.role === "Users" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route index element={<DefaultPage />} />
            </Route>
          )}
        </>
      )}


      <Route path="/" element={<BlogsPage />}/>
        <Route path="post/:slug" element={<PostDetails />} />


        {/* <Route path="/" element={<DefaultSite />}>
        <Route index element={<BlogsPage />} />
        <Route path="post/:slug" element={<PostDetails />} />
      </Route> */}

      <Route path="/login" element={<Login />}/>
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/dashboard/*" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
