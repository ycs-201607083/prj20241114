use prj20241114;

desc board;

CREATE TABLE board_file
(

    board_id INT          NOT NULL,
    name     VARCHAR(300) NOT NULL,
    PRIMARY KEY (board_id, name)
);

select *
from board_file;

#게시물 목록 조회(w/ 파일수)
SELECT b.id, b.title, COUNT(DISTINCT c.id) 댓글수, COUNT(DISTINCT f.name) 파일수
FROM board b
         LEFT JOIN comment c
                   ON b.id = c.board_id
         LEFT JOIN board_file f
                   ON b.id = f.board_id
Group By b.id
ORDER BY b.id DESC;

SELECT b.id,
       b.title,
       (SELECT COUNT(*) FROM board_file f WHERE f.board_id = f.board_id) 댓글수,
       (SELECT COUNT(*) FROM comment c WHERE c.board_id = b.id)          파일수
FROM board b
Group By b.id
ORDER BY b.id DESC;

