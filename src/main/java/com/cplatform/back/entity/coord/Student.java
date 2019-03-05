package com.cplatform.back.entity.coord;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Student {

    /**
     * 数据库id
     */
    private Long id;
    /**
     * 姓名
     */
    private String name;

    /**
     * 学生编号
     */
    private String sno;

    /**
     * 设备id
     */
    private String deviceId;
    private Coordinate coordinate;

}
