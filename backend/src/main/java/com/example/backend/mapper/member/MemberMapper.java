package com.example.backend.mapper.member;

import com.example.backend.dto.member.Member;
import com.example.backend.dto.member.MemberEdit;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MemberMapper {

    @Insert("""
                INSERT INTO member
                (id, email, password, description)
                VALUES (#{id}, #{email}, #{password}, #{description})
            """)
    int insert(Member member);

    @Select("""
            SELECT * FROM member
            WHERE id = #{id}
            """)
    Member selectById(String id);


    @Select("""
                        SELECT id, inserted
                        FROM member
            ORDER BY id
            """)
    List<Member> selectAll();

    @Delete("""
                       DELETE FROM member
            WHERE id = #{id}
            """)
    int deleteById(String id);

    @Update("""
            UPDATE member
            SET password = #{password},
                description = #{description},
                email = #{email}
            WHERE
                id = #{id}
            """)
    int update(MemberEdit member);

    @Select("""
            SELECT * FROM member
            WHERE email = #{email}
            """)
    Member selectByEmail(String email);
}