use prj20241114;

CREATE TABLE board_like
(
    board_id  INT REFERENCES board (id),
    member_id VARCHAR(20) REFERENCES member (id),
    PRIMARY KEY (board_id, member_id)
);

SELECT *
FROM board_like;