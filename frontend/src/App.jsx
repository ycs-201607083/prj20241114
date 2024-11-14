import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Box, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "./components/ui/field.jsx";
import { Button } from "./components/ui/button.jsx";
import { useState } from "react";

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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const handleSaveClick = () => {
    axios.post("/api/board/add", {
      title: title,
      content: content,
      writer: writer,
    });
  };

  return (
    <Box>
      <h3>게시물 작성</h3>
      <Stack gap={5}>
        <Field label={"제목"}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field label={"본문"}>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>
        <Field label={"작성자"}>
          <Input value={writer} onChange={(e) => setWriter(e.target.value)} />
        </Field>
        <Box>
          <Button
            onClick={() => {
              handleSaveClick;
            }}
          >
            저장
          </Button>
        </Box>
      </Stack>
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
