package com.cplatform.back.schoolManage.mapper;

import com.cplatform.back.schoolManage.entity.SchoolInformation;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wu
 * @date 2019/2/22
 */
@Repository
public interface SchoolInformationMapper {
    List<SchoolInformation> getSchoolList();
}
