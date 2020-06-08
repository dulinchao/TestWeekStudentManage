package com.student.service;

import com.student.mapper.StudentMapper;
import com.student.pojo.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentMapper studentMapper;

    public void addStudent(Student student){
        studentMapper.insertStudent(student);
    }

    public List<Student> getStudentList(Student queryStudent){
        List<Student> students = studentMapper.getStudent(queryStudent);
        return students;
    }

    public void deleteStudent(Integer id) {
        studentMapper.deleteStudent(id);
    }

    public void updateStudent(Student student) {
        studentMapper.updateStudent(student);
    }
}
