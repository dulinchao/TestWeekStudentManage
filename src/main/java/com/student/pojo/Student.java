package com.student.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Student {
    private String id;
    private String name;
    private String className;
    private String sex;
    private String grade;
    private List<String> lesson;

    public Student(String id, String name, String className, String sex, String grade) {
        this.id = id;
        this.name = name;
        this.className = className;
        this.sex = sex;
        this.grade = grade;
    }
}
