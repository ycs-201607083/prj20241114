package com.example.backend.controller.board;


import com.example.backend.dto.board.Board;
import com.example.backend.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    final private BoardService service;

    @PostMapping("add")
    public void add(@RequestBody Board board) {
        System.out.println("board = " + board);
        service.add(board);
    }

    @GetMapping("list")
    public List<Board> list() {
        return service.list();
    }
}
