package com.student.mapper;

import com.student.pojo.User;

public interface LoginMapper {
    User queryUser(String email);

    void addUser(User user);
}
