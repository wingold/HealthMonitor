package com.cplatform.back.service;

import com.alibaba.fastjson.JSON;
import com.cplatform.back.entity.Building;
import com.cplatform.back.entity.Rectangle;
import com.cplatform.back.entity.coord.Coordinate;
import com.cplatform.back.entity.coord.Student;
import com.cplatform.back.mapper.BuildingMapper;
import com.cplatform.back.mapper.RectangleMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author chenqi
 * @create 2019-02-26 10:53:38
 */
@Service
@Slf4j
public class CoordsService {
    
    private static Map<Long, List<Building>> buildMap = new HashMap<>();
    private static Map<Long, List<Building>> schoolMap = new HashMap<>();
    
    @Autowired
    private BuildingMapper buildingMapper;
    
    @Autowired
    private RectangleMapper rectangleMapper;

    @PostConstruct
    private void init() {
        List<Building> buildings = buildingMapper.getAllBuilding();
        initMap(buildings, buildMap);
        
        List<Building> allSchool = buildingMapper.getAllSchool();
        initMap(allSchool, schoolMap);
        log.info("建筑物坐标初始化完成：{}", JSON.toJSONString(buildMap));
        log.info("学校坐标初始化完成：{}", JSON.toJSONString(schoolMap));
    }

    private void initMap(List<Building> buildings, Map<Long, List<Building>> map){
        for (int i = 0; i < buildings.size(); i++) {
            Building building = buildings.get(i);
            Long schoolId = building.getSchoolId();

            List<Rectangle> rectangles = rectangleMapper.getByBuildingId(building.getBuildingId());
            building.setRectangles(rectangles);

            List<Building> list = map.get(schoolId);
            if (list == null) {
                list = new ArrayList<>();
            }
            list.add(building);

            map.put(schoolId, list);
        }
    }
    
    public List<Building> getPositions(Long schoolId, List<Student> students) {
        List<Building> buildings = buildMap.get(schoolId);
        for (int i = 0; i < buildings.size(); i++) {
            Building building = buildings.get(i);
            building.genStudentsInBuilding(students);
        }
        
        return buildings;
    }


    /**
     * 在校人数
     */
    public long schoolEnrollments(Long schoolId, List<Student> students){
        int count = 0;
        
        List<Building> buildings = schoolMap.get(schoolId);
        for (int i = 0; i < buildings.size(); i++) {
            Building building = buildings.get(i);
            for (int j = 0; j < students.size(); j++) {
                Student student = students.get(j);
                if (building.isInBuilding(student.getCoordinate())) {
                    count++;
                }
            }
        }

        return count;
    }
    
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();

        Student s1 = new Student();
        s1.setCoordinate(new Coordinate("200", "50"));
        s1.setId(1L);
        s1.setName("张三");
        s1.setSno("s01");
        s1.setDeviceId("d01");
        students.add(s1);

        new CoordsService().getPositions(1L, students);
    }
    
}
