package com.cplatform.back.vo;

import com.alibaba.fastjson.JSON;
import com.cplatform.back.entity.Building;
import com.cplatform.back.entity.coord.Student;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PositioningOutVo {
    private List<Building> buildings;
    private List<Student> studentsOutside;

    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }
}
