package com.student.controller;

import com.student.dto.ResultDTO;
import com.student.exception.CustomizeErrorCode;
import com.student.mapper.LessonMapper;
import com.student.mapper.StudentMapper;
import com.student.pojo.Lessons;
import com.student.pojo.Student;
import com.student.service.StudentService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class IndexController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private LessonMapper lessonMapper;
    @Autowired
    private StudentMapper studentMapper;
    @GetMapping("/")
    public String toIndex(Model model){
        List<Student> studentList = studentService.getStudentList(null);//从数据库里查询学生列表
        model.addAttribute("students",studentList);//把得到的学生列表放到model里 studentList是值
        return "index";
    }

    @ResponseBody
    @PostMapping("/addStudent")
    public Object login(@RequestBody Student student){
        Student query = new Student();
        query.setId(student.getId());
        if(studentMapper.getStudent(query)!=null){
            return ResultDTO.errorOf(CustomizeErrorCode.STUDENT_ALREADY_EXIST);
        }

        studentService.addStudent(student);
        return ResultDTO.okOf();
    }

    @ResponseBody
    @PostMapping("/query")
    public List<Student> query(@RequestBody Student student){
        if(student.getId()!=null && student.getId().equals("")) student.setId(null);
        if(student.getName()!=null && student.getName().equals("")) student.setName(null);
        if(student.getClassName()!=null && student.getClassName().equals("")) student.setClassName(null);
        if(student.getSex()!=null && student.getSex().equals("")) student.setSex(null);
        if(student.getGrade()!=null && student.getGrade().equals("")) student.setGrade(null);

        List<Student> studentList = studentService.getStudentList(student);
        return studentList;
    }

    @ResponseBody
    @GetMapping("/deleteStudent")
    public Object delete(@RequestParam (name = "id") String id){
        studentService.deleteStudent(id);
        return ResultDTO.okOf();
    }

    @ResponseBody
    @PostMapping("/updateStudent")
    public Object update(@RequestBody Student student){
        studentService.updateStudent(student);
        return ResultDTO.okOf();
    }

    @ResponseBody
    @PostMapping("/updateLesson")
    public Object updateLesson(@RequestBody Lessons lessons){
        String id = lessons.getId();
        lessonMapper.deleteLessons(id);
        for (String lesson : lessons.getLessons()) {
            lessonMapper.insertLesson(id,lesson);
        }
        return ResultDTO.okOf();
    }

    @GetMapping("/getQuery")
    public String getQuery(@RequestParam (name = "id") String id,
                           @RequestParam (name = "name") String name,
                           @RequestParam (name = "className") String className,
                           @RequestParam (name = "sex") String sex,
                           @RequestParam (name = "grade") String grade,
                           Model model){
        Student student = new Student();
        if(!id.equals("")) student.setId(id);
        if(!name.equals("")) student.setName(name);
        if(!className.equals("")) student.setClassName(className);
        if(!sex.equals("")) student.setSex(sex);
        if(!grade.equals("")) student.setGrade(grade);

        List<Student> studentList = studentService.getStudentList(student);
        model.addAttribute("students",studentList);
        return "index";
    }

    @GetMapping("/student/{id}")
    public String toStudentIndex(@PathVariable(name = "id") String id,Model model){
        Student query = new Student();
        query.setId(id);
        List<Student> studentList = studentService.getStudentList(query);
        model.addAttribute("students",studentList);
        return "index";
    }
}
