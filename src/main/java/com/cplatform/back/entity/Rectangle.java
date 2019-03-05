package com.cplatform.back.entity;

import com.cplatform.back.entity.coord.Coordinate;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;
import java.math.BigDecimal;

@Setter
@Getter
@Table(name = "rectangle")
public class Rectangle extends BaseEntity{
    
    private String buildingId;
    
    private BigDecimal rTop;
    private BigDecimal rLeft;
    private BigDecimal rBottom;
    private BigDecimal rRight;
    
    public Rectangle () {
        
    }

    public Rectangle(BigDecimal rTop, BigDecimal rLeft, BigDecimal rBottom, BigDecimal rRight) {
        this.rTop = rTop;
        this.rLeft = rLeft;
        this.rBottom = rBottom;
        this.rRight = rRight;
    }

    public Rectangle(String rTop, String rLeft, String rBottom, String rRight) {
        this.rTop = new BigDecimal(rTop);
        this.rLeft = new BigDecimal(rLeft);
        this.rBottom = new BigDecimal(rBottom);
        this.rRight = new BigDecimal(rRight);
    }

    public boolean isInRectangle(Coordinate coordinate) {
        return this.rTop.compareTo(coordinate.getLatitude()) >= 0
                && this.rBottom.compareTo(coordinate.getLatitude()) <= 0
                && this.rLeft.compareTo(coordinate.getPrecision()) <= 0
                && this.rRight.compareTo(coordinate.getPrecision()) >= 0;
    }

    
}
