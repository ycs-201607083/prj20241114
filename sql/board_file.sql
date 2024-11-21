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