import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Box, Flex, Stack } from "@chakra-ui/react";

function Navbar() {
  const nav = useNavigate();

  return (
    <Flex gap={3}>
      <Box onClick={() => nav("/")}>HOME</Box>
      <Box onClick={() => nav("/add")}>작성</Box>
    </Flex>
  );
}

function RootLayout() {
  return (
    <Stack>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Stack>
  );
}

function BoardList() {
  return (
    <Box>
      <h3>게시물 목록</h3>
    </Box>
  );
}

function BoardAdd() {
  return (
    <Box>
      <h3>게시물 작성</h3>
    </Box>
  );
}

function App() {
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
