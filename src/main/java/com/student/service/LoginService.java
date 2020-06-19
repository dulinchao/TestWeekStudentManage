package com.student.service;

import com.student.mapper.LoginMapper;
import com.student.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginMapper loginMapper;

    public User queryUser(User user){
        return loginMapper.queryUser(user.getId());
    }

    public void addUser(User user) {
        loginMapper.addUser(user);
    }
}
