import { Box, Input, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog.jsx";
import { toaster } from "../../components/ui/toaster.jsx";

export function MemberInfo() {
  const { id } = useParams();
  const [member, setMember] = useState({});
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //회원정보 얻기
    axios.get(`/api/member/${id}`).then((res) => setMember(res.data));
  }, []);

  function handleDeleteClick() {
    axios
      .delete("/api/member/remove", {
        data: {
          id: id,
          password: password,
        },
      })
      .then((res) => {
        const message = res.data.message;

        toaster.create({
          type: message.type,
          description: message.text,
        });
        navigate("/member/signup");
      })
      .catch((e) => {
        const message = e.response.data.message;

        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setOpen(false);
        setPassword("");
      });
  }

  if (!member) {
    return <Spinner />;
  }

  console.log(id);
  return (
    <Box>
      <h3>회원정보</h3>
      <Stack gap={5}>
        <Field label={"아이디"}>
          <Input readOnly value={member.id} />
        </Field>
        <Field label={"암호"}>
          <Input readOnly value={member.password} />
        </Field>
        <Field label={"자기소개"}>
          <Textarea readOnly value={member.description} />
        </Field>
        <Field label={"가입일시"}>
          <Input readOnly value={member.inserted} type={"datetime-local"} />
        </Field>
        <Box>
          <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger asChild>
              <Button colorPalette={"red"} variant={"outline"}>
                탈퇴
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>탈퇴 확인</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Stack gap={5}>
                  <p>암호를 입력해주세요.</p>
                  <Field label={"암호"}></Field>
                  <Input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Stack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger>
                  <Button variant={"outline"}>취소</Button>
                </DialogActionTrigger>
                <Button colorPalette={"red"} onClick={handleDeleteClick}>
                  탈퇴
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </Box>
      </Stack>
    </Box>
  );
}
