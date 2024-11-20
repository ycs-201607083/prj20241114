package com.example.backend.comment;

import com.example.backend.dto.comment.Comment;
import com.example.backend.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    final CommentService service;

    @GetMapping("list/{boardId}")
    public List<Comment> list(@PathVariable Integer boardId) {
        return service.list(boardId);
    }

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> add(@RequestBody Comment comment, Authentication auth) {
        service.add(comment, auth);

        return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "댓글이 입력 되었습니다.")));
    }

    @DeleteMapping("remove/{id}")
    @PreAuthorize("isAuthenticated()")
    public void remove(@PathVariable Integer id, Authentication auth) {
        if (service.hasAccess(id, auth)) {
            service.remove(id);
        }
    }

    @PutMapping("edit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> edit(@RequestBody Comment comment, Authentication auth) {
        if (service.hasAccess(comment.getId(), auth)) {
            if (service.Update(comment)) {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "댓글이 수정 되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "warning", "text", "댓글이 수정되지 되었습니다.")));
            }
        } else {
            return ResponseEntity.status(403).build();
        }
    }
}
