package com.student.mapper;

import java.util.List;

public interface LessonMapper {
    void insertLesson(String id,String lesson);

    List<String> getLessons(String id);

    void deleteLessons(String id);
}
