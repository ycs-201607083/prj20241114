package com.example.backend.controller.member;

import com.example.backend.dto.member.Member;
import com.example.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    final MemberService service;

    @PostMapping("signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody Member member) {
        try {
            if (service.add(member)) {
                return ResponseEntity.ok().body(
                        Map.of(
                                "message", Map.of(
                                        "success", "text",
                                        "text", "회원 가입 되었습니다."
                                )
                        )
                );
            } else {
                return ResponseEntity.internalServerError().body(Map.of(
                                "message", Map.of(
                                        "success", "text",
                                        "text", "회원 가입 중 문제가 발생 했습니다.."
                                )
                        )
                );
            }
        } catch (DuplicateKeyException e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of(
                            "success", "text",
                            "text", "이미 존재하는 아이디 입니다."
                    )));
        }
    }
}
