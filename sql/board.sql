CREATE TABLE board
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    title    varchar(300)  not null,
    content  varchar(5000) not null,
    writer   varchar(100)  not null,
    inserted DATETIME default NOW()
);

SELECT *
FROM board;

#페이지 연습용 복붙
INSERT INTO board
    (title, content, writer)
SELECT title, content, writer
FROM board;

SELECT COUNT(*)
FROM board;