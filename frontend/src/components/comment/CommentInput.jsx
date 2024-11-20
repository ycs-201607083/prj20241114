import { Box, Group, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { useState } from "react";
import axios from "axios";

export function CommentInput({ boardId }) {
  const [comment, setComment] = useState("");

  function handleSaveClick() {
    axios
      .post("/api/comment/add", {
        comment,
        boardId: boardId,
      })
      .then(location.reload())
      .catch()
      .finally();
  }

  return (
    <Box>
      <Group>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant={"outline"}
        />
        <Button onClick={handleSaveClick}>댓글 작성</Button>
      </Group>
    </Box>
  );
}
