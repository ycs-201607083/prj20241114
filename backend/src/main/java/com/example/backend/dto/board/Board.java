package com.example.backend.dto.board;

import lombok.Data;

@Data
public class Board {
    private int id;
    private String title;
    private String content;
    private String writer;
    private String inserted;
}
