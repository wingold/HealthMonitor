package com.cplatform.back.mapper;

import com.cplatform.back.entity.Rectangle;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RectangleMapper {
    
    List<Rectangle> getByBuildingId(String buildingId);
}
