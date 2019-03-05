package com.cplatform.back.coord;

import com.cplatform.back.entity.Building;
import com.cplatform.back.entity.coord.Coordinate;
import com.cplatform.back.entity.Rectangle;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class BuildingTest {

    private List<Rectangle> rectangles;
    //private Coordinate coordinate;
    private Building building;

    @Before
    public void buildParam() {
        rectangles = new ArrayList<>();
        Rectangle r1 = new Rectangle("300", "0", "0", "100");
        Rectangle r2 = new Rectangle("100", "100", "0", "300");
        rectangles.add(r1);
        rectangles.add(r2);
        building = new Building();
        building.setRectangles(rectangles);
    }

    @Test
    public void testInRectangle() {
        Coordinate coordinate1 = new Coordinate("50", "50"); // 在
        Coordinate coordinate2 = new Coordinate("50", "400"); // 不在
        assertTrue(rectangles.get(0).isInRectangle(coordinate1));
        assertFalse(rectangles.get(0).isInRectangle(coordinate2));
    }

    @Test
    public void testInBuilding() {
        Coordinate coordinate1 = new Coordinate("200", "50"); // 在
        Coordinate coordinate2 = new Coordinate("400", "50"); // 不在
        assertTrue(building.isInBuilding(coordinate1));
        assertFalse(building.isInBuilding(coordinate2));
    }
    

}