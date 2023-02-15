import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import CategoryAddNew from "./module/category/CategoryAddNew";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import PostAddNew from "./module/post/PostAddNew";
import PostManage from "./module/post/PostManage";
import UserAddNew from "./module/user/UserAddNew";
import UserProfile from "./module/user/UserProfile";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import PostDetailPage from "./pages/PostDetailPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailPage></PostDetailPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
