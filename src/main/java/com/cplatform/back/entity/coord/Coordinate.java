package com.cplatform.back.entity.coord;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class Coordinate {

    /**
     * 经度
     */
    private BigDecimal precision;
    /**
     * 纬度
     */
    private BigDecimal latitude;

    /**
     * 坐标的设备来源（设备id）
     */
    private String deviceId;
    
    public Coordinate() {
        
    }
    
    public Coordinate (BigDecimal precision, BigDecimal latitude) {
        if (precision == null || latitude == null) {
            throw new IllegalArgumentException();
        }
        this.precision = precision;
        this.latitude = latitude;
    }

    public Coordinate (String precision, String latitude) {
        if (precision == null || latitude == null) {
            throw new IllegalArgumentException();
        }
        this.precision = new BigDecimal(precision);
        this.latitude = new BigDecimal(latitude);
    }
    
}
