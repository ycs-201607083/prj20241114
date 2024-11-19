USE prj20241114;

CREATE TABLE auth
(
    member_id VARCHAR(20) REFERENCES member (id),
    auth      VARCHAR(20) NOT NULL,
    PRIMARY KEY (member_id, auth)
);

#
INSERT INTO auth (member_id, auth)
VALUES ('1', 'admin');

INSERT INTO auth (member_id, auth)
VALUES ('1', 'manager');

select *
from auth;

desc auth;
DESC member;