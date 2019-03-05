package com.cplatform.back.mapper;

import com.cplatform.back.entity.Building;
import com.cplatform.back.utils.BasicMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuildingMapper extends BasicMapper<Building> {

    List<Building> getAllBuilding();
    
    List<Building> getAllSchool();
}
