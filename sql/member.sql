CREATE TABLE member
(
    id          VARCHAR(30) PRIMARY KEY,
    password    VARCHAR(30) NOT NULL,
    description VARCHAR(1000),
    inserted    DATETIME DEFAULT NOW()
);

select *
from member;