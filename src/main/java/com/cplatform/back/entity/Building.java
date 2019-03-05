package com.cplatform.back.entity;

import com.cplatform.back.entity.coord.Coordinate;
import com.cplatform.back.entity.coord.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Setter
@Getter
@Table(name = "building")
public class Building extends BaseEntity{

    private String buildingId;
    
    /**
     * 学校ID
     */
    private Long schoolId;
    
    /**
     * 建筑物别名
     */
    private String name;

    @JsonIgnore
    @Transient
    private List<Rectangle> rectangles;

    /**
     * 位于当前建筑物下的学生列表
     */
    @Transient
    private List<Student> students = new ArrayList<>();

    public Building() {
    }

    public boolean isInBuilding(Coordinate coordinate) {
        for (Rectangle rectangle : this.rectangles) {
            if (rectangle.isInRectangle(coordinate)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 生成在建筑物内学生信息
     */
    public int genStudentsInBuilding(List<Student> studentList) {
        this.students = new ArrayList<>();

        Iterator<Student> iterator = studentList.iterator();
        while (iterator.hasNext()) {
            Student s = iterator.next();
            if (this.isInBuilding(s.getCoordinate())) {
                this.students.add(s);
                iterator.remove();
            }
        }
        return this.students.size();
    }
}
