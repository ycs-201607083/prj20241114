import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";

export function Navbar() {
  const nav = useNavigate();

  //TODO: 임시.. 삭제할 에정
  const token = localStorage.getItem("token");
  let name;
  if (token) {
    const decode = jwtDecode(token);
    name = decode.sub;
  }

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
      <Box>{name}</Box>
    </Flex>
  );
}
