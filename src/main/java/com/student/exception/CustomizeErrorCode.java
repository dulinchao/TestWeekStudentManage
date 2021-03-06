package com.student.exception;

public enum CustomizeErrorCode implements ICustomizeErrorCode {
    USER_ALREADY_EXIST(2001,"用户已经存在"),
    USER_NOT_EXIST(2002,"此用户不存在"),
    PASSWORD_ERROR(2003,"用户名或密码错误"),
    STUDENT_ALREADY_EXIST(2004,"学生已存在"),
    NOT_ADMIN(2005,"这人不是管理员啊");
    private  String message;
    private Integer code;


    CustomizeErrorCode(Integer code, String message) {
        this.message = message;
        this.code = code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public Integer getCode() {
        return code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
