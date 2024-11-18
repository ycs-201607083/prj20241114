package com.example.backend.dto.member;

import lombok.Data;

@Data
public class MemberEdit {
    private String id;
    private String email;
    private String password;
    private String description;
    private String oldPassword;
}
