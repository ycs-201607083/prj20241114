import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
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
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";
import { CommentContainer } from "../../components/comment/CommentContainer.jsx";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { ToggleTip } from "../../components/ui/toggle-tip.jsx";

function ImageFileView({ files }) {
  return (
    <Box>
      {files.map((file) => (
        <Image
          key={file.name}
          src={file.src}
          border={"1px solid black"}
          m={3}
        />
      ))}
    </Box>
  );
}

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [likeTooltipOpen, setLikeTooltipOpen] = useState(false);
  const [like, setLike] = useState({ like: false, count: 0 });
  const navigate = useNavigate();
  const { hasAccess, isAuthenticated } = useContext(AuthenticationContext);

  useEffect(() => {
    axios.get(`/api/board/view/${id}`).then((res) => setBoard(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/board/like/${id}`)
      .then((res) => res.data)
      .then((data) => setLike(data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  const handleDeleteClick = () => {
    axios
      .delete(`/api/board/delete/${board.id}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        navigate("/");
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  const handleLikeClick = () => {
    if (isAuthenticated) {
      axios
        .post("/api/board/like", {
          id: board.id,
        })
        .then((res) => res.data)
        .then((data) => setLike(data))
        .catch()
        .finally();
    } else {
      //Tooltip 보여주기
      setLikeTooltipOpen(true);
    }
  };

  return (
    <Box>
      <Flex>
        <Heading me={"auto"}>{id} 번 게시물</Heading>
        <HStack>
          <Box onClick={handleLikeClick}>
            <ToggleTip
              open={likeTooltipOpen}
              content={"로그인 후 좋아요를 클릭해주세요."}
            >
              <Heading>
                {like.like || <GoHeart />}
                {like.like && <GoHeartFill />}
              </Heading>
            </ToggleTip>
          </Box>
          <Box>
            <Heading>{like.count}</Heading>
          </Box>
        </HStack>
      </Flex>
      <Stack gap={5}>
        <Field label="제목" readOnly>
          <Input value={board.title} />
        </Field>
        <Field label="본문" readOnly>
          <Textarea value={board.content} />
        </Field>
        <ImageFileView files={board.fileList} />
        <Field label="작성자" readOnly>
          <Input value={board.writer} />
        </Field>
        <Field label="작성일시" readOnly>
          <Input value={board.inserted} type={"datetime-local"} />
        </Field>
        {hasAccess(board.writer) && (
          <Box>
            <DialogRoot>
              <DialogTrigger asChild>
                <Button colorPalette={"red"} variant={"outline"}>
                  삭제
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>삭제 확인</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p>{board.id}번 게시물을 삭제하시겠습니까?</p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button variant={"outline"}>취소</Button>
                  </DialogActionTrigger>
                  <Button colorPalette={"red"} onClick={handleDeleteClick}>
                    삭제
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
            <Button
              colorPalette={"cyan"}
              onClick={() => navigate(`/edit/${board.id}`)}
            >
              수정
            </Button>
          </Box>
        )}
      </Stack>

      <hr />

      <CommentContainer boardId={board.id} />
    </Box>
  );
}
