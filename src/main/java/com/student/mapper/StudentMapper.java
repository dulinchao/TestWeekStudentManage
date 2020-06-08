package com.student.mapper;

import com.student.pojo.Student;

import java.util.List;

public interface StudentMapper {
    void insertStudent(Student student);

    List<Student> getStudent(Student student);

    void deleteStudent(Integer id);

    void updateStudent(Student student);
}
