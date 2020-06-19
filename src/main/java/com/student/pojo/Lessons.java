package com.student.pojo;

import lombok.Data;

import java.util.List;

@Data
public class Lessons {
    private String id;
    private List<String> lessons;
}
