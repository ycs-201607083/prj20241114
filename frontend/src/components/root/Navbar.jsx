import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthenticationContext } from "../../App.jsx";

export function Navbar() {
  const nav = useNavigate();
  //step2 : context 사용
  const authentication = useContext(AuthenticationContext);

  return (
    <Flex gap={3}>
      <Box onClick={() => nav("/")}>HOME</Box>
      <Box onClick={() => nav("/add")}>작성</Box>
      <Box onClick={() => nav("member/signup")}>회원가입</Box>
      <Box onClick={() => nav("member/list")}>회원목록</Box>
      <Box onClick={() => nav("member/login")}>로그인</Box>
      <Box
        onClick={() => {
          localStorage.removeItem("token");
          nav("member/login");
        }}
      >
        로그아웃
      </Box>
      <Box>{authentication.id}</Box>
    </Flex>
  );
}
