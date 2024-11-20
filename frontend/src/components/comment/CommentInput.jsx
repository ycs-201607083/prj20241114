import { Box, Group, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { useState } from "react";

export function CommentInput({ boardId, onSaveClick }) {
  const [comment, setComment] = useState("");
  return (
    <Box>
      <Group>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant={"outline"}
        />
        <Button
          onClick={() => {
            onSaveClick(comment);
            setComment("");
          }}
        >
          댓글 작성
        </Button>
      </Group>
    </Box>
  );
}
