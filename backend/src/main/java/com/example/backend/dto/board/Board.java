package com.example.backend.dto.board;

import lombok.Data;

@Data
public class Board {
    private String title;
    private String content;
    private String writer;
}
