"# TestWeekStudentManage" 

数据库建表如下：
```sql
create table STUDENTS
(
    ID         VARCHAR(20) not null,
    NAME       VARCHAR(50),
    CLASS_NAME VARCHAR(20),
    SEX        VARCHAR(10),
    GRADE      VARCHAR(20),
    constraint STUDENTS_PK
        primary key (ID)
);
```
```sql
create table USER
(
    ID        VARCHAR(20) not null,
    USER_NAME VARCHAR(100),
    PASSWORD  VARCHAR(50),
    IDENTITY  VARCHAR(20),
    constraint USER_PK
        primary key (ID)
);
```
```sql
create table LESSON
(
    STUDENT_ID VARCHAR(20) not null,
    LESSON     VARCHAR(30) not null,
    ID         INT auto_increment,
    constraint LESSON_PK
        primary key (ID)
);
```