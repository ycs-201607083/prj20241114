import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BoardAdd } from "./page/board/BoardAdd.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberList } from "./page/member/MemberList.jsx";
import { MemberInfo } from "./page/member/MemberInfo.jsx";
import { MemberEdit } from "./page/member/MemberEdit.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import axios from "axios";
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

//axios 인터셉터 설정
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  console.log("token?", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

//react router 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <BoardList />,
      },
      {
        path: "add",
        element: <BoardAdd />,
      },
      {
        path: "view/:id",
        element: <BoardView />,
      },
      {
        path: "edit/:id",
        element: <BoardEdit />,
      },
      { path: "member/signup", element: <MemberSignup /> },
      { path: "member/list", element: <MemberList /> },
      {
        path: "member/:id",
        element: <MemberInfo />,
      },
      {
        path: "member/edit/:id",
        element: <MemberEdit />,
      },
      {
        path: "member/login",
        element: <MemberLogin />,
      },
    ],
  },
]);

//step 1: context 만들기
export const AuthenticationContext = createContext(null);

function App() {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const id = decode.sub;

  return (
    <AuthenticationContext.Provider value={{ id: id }}>
      <RouterProvider router={router} />
    </AuthenticationContext.Provider>
  );
}

export default App;
