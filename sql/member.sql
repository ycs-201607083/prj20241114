CREATE TABLE member
(
    id          VARCHAR(30) PRIMARY KEY,
    email       VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(30)  NOT NULL,
    description VARCHAR(1000),
    inserted    DATETIME DEFAULT NOW()
);

select *
from member;

DROP TABLE member;

delete
from member
WHERE id = '';