import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

export function Navbar() {
  const nav = useNavigate();

  return (
    <Flex gap={3}>
      <Box onClick={() => nav("/")}>HOME</Box>
      <Box onClick={() => nav("/add")}>작성</Box>
      <Box onClick={() => nav("member/signup")}>회원가입</Box>
      <Box onClick={() => nav("member/list")}>회원목록</Box>
    </Flex>
  );
}
