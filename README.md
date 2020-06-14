"# TestWeekStudentManage" 

数据库建表如下：
```sql
create table STUDENTS
(
    ID         INT auto_increment,
    NAME       VARCHAR(50),
    CLASS_NAME VARCHAR(20),
    SEX        VARCHAR(10),
    GRADE      VARCHAR(20),
    LESSON     VARCHAR(20),
    constraint STUDENTS_PK
        primary key (ID)
);
```
```sql
create table USER
(
    ID        INT auto_increment,
    USER_NAME VARCHAR(100),
    EMAIL     VARCHAR(50),
    PASSWORD  VARCHAR(50),
    IDENTITY  VARCHAR(20),
    constraint USER_PK
        primary key (ID)
);
```