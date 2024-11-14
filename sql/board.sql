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