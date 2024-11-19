import { Box, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster.jsx";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";

export function MemberLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authentication = useContext(AuthenticationContext);

  function handleLoginClick() {
    axios
      .post("/api/member/login", {
        id,
        password,
      })
      .then((res) => res.data)
      .then((data) => {
        //토스트 띄우고 "/" 로 이동, localStorage 에 토큰 저장
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        navigate("/");
        authentication.login(data.token);
        //localStorage에 token 저장
      })
      .catch((e) => {
        const message = e.response.data.message;
        // 토스트 띄우고
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally();
  }

  return (
    <Box>
      <h3>로그인</h3>
      <Stack>
        <Field label="아이디">
          <Input
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Field>
        <Field
          label="암호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          <Input />
        </Field>
        <Button onClick={handleLoginClick}>로그인</Button>
      </Stack>
    </Box>
  );
}
