package com.cplatform.back.classroom.service;

import com.cplatform.back.classroom.entity.Classroom;
import com.cplatform.back.classroom.mapper.ClassroomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService {

    @Autowired
    ClassroomMapper classroomMapper;

    public List<Classroom> findAll() {
        return classroomMapper.selectAll();
    }

    public int insert(Classroom classroom){
        return classroomMapper.insert(classroom);
    }
}
