package com.cplatform.back.entity.coord;

import lombok.Getter;
import lombok.Setter;

/**
 * 手环设备
 */

@Setter
@Getter
public class Device {

    /**
     * 设备号
     */
    private Long deviceId;

    /**
     * 学号
     */
    private Long sno;
    
    /**
     * 设备当前经纬度
     */
    private Coordinate coordinate;
}
