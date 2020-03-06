
/* Drop Tables */

DROP TABLE images CASCADE CONSTRAINTS;
DROP TABLE USER CASCADE CONSTRAINTS;



/* Drop Sequences */

DROP SEQUENCE applicants_no;




/* Create Sequences */

-- 신청자누적수&신청자고유넘버
CREATE SEQUENCE applicants_no INCREMENT BY 1 MINVALUE 1 MAXVALUE 20000 START WITH 1;



/* Create Tables */

CREATE TABLE images
(
	-- 이미지 id
	seq number NOT NULL UNIQUE,
	-- 사진이름
	image_name nvarchar2(24),
	image blob NOT NULL,
	PRIMARY KEY (seq)
);


CREATE TABLE USER
(
	username varchar2(12) NOT NULL UNIQUE,
	age number(2,0) NOT NULL,
	birth varchar2(24) NOT NULL,
	college_name varchar2(100),
	college_major varchar2(100),
	support_job_name varchar2(100) NOT NULL,
	 ,
	PRIMARY KEY (username, birth)
);



/* Comments */

COMMENT ON COLUMN images.seq IS '이미지 id';
COMMENT ON COLUMN images.image_name IS '사진이름';



