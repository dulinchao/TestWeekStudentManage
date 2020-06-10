package com.student.controller;

import com.student.dto.ResultDTO;
import com.student.exception.CustomizeErrorCode;
import com.student.pojo.Student;
import com.student.pojo.User;
import com.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class IndexController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/")
    public String toIndex(Model model){
        List<Student> studentList = studentService.getStudentList(null);
        model.addAttribute("students",studentList);
        return "index";
    }

    @ResponseBody
    @PostMapping("/addStudent")
    public Object login(@RequestBody Student student){
        studentService.addStudent(student);
        return ResultDTO.okOf();
    }

    @ResponseBody
    @PostMapping("/query")
    public List<Student> query(@RequestBody Student student){
        if(student.getName()!=null && student.getName().equals("")) student.setName(null);
        if(student.getClassName()!=null && student.getClassName().equals("")) student.setClassName(null);
        if(student.getSex()!=null && student.getSex().equals("")) student.setSex(null);
        if(student.getGrade()!=null && student.getGrade().equals("")) student.setGrade(null);
        if(student.getLesson()!=null && student.getLesson().equals("")) student.setLesson(null);

        List<Student> studentList = studentService.getStudentList(student);
        return studentList;
    }

    @ResponseBody
    @GetMapping("/deleteStudent")
    public Object delete(@RequestParam (name = "id") Integer id){
        studentService.deleteStudent(id);
        return ResultDTO.okOf();
    }

    @ResponseBody
    @PostMapping("/updateStudent")
    public Object update(@RequestBody Student student){
        studentService.updateStudent(student);
        return ResultDTO.okOf();
    }
}
