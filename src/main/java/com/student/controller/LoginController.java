package com.student.controller;

import com.student.dto.ResultDTO;
import com.student.exception.CustomizeErrorCode;
import com.student.pojo.User;
import com.student.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController {
    @Autowired
    private LoginService loginService;

    @GetMapping("/toRegister")
    public String toRegister(){
        return "register";
    }

    @ResponseBody
    @PostMapping("/register")
    public Object register(@RequestBody User user){
        //如果数据库中已经有记录，就报错
        if(loginService.queryUser(user)!=null){
            return ResultDTO.errorOf(CustomizeErrorCode.USER_ALREADY_EXIST);
        }
        loginService.addUser(user);
        return ResultDTO.okOf();
    }

    @ResponseBody
    @PostMapping("/login")
    public Object login(@RequestBody User user,
                        HttpServletRequest request){
        User queryUser = loginService.queryUser(user);
        if(queryUser ==null){
            return ResultDTO.errorOf(CustomizeErrorCode.USER_NOT_EXIST);
        }
        if(!queryUser.getPassword().equals(user.getPassword())){
            return ResultDTO.errorOf(CustomizeErrorCode.PASSWORD_ERROR);
        }
        HttpSession session = request.getSession();
        session.setAttribute("user",queryUser);
        return ResultDTO.okOf();
    }
}
