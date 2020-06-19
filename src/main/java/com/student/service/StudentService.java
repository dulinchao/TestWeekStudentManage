package com.student.service;

import com.student.mapper.LessonMapper;
import com.student.mapper.StudentMapper;
import com.student.pojo.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private LessonMapper lessonMapper;

    public void addStudent(Student student){

        studentMapper.insertStudent(student);

    }

    public List<Student> getStudentList(Student queryStudent){
        List<Student> students = studentMapper.getStudent(queryStudent);
        for (int i = 0; i < students.size(); i++) {
            List<String> lessons = lessonMapper.getLessons(students.get(i).getId());
            students.get(i).setLesson(lessons);
        }
        return students;
    }

    public void deleteStudent(String id) {
        studentMapper.deleteStudent(id);
    }

    public void updateStudent(Student student) {
        studentMapper.updateStudent(student);
    }

}
