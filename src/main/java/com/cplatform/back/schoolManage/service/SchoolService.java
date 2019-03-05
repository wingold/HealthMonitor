package com.cplatform.back.schoolManage.service;

import com.cplatform.back.schoolManage.entity.SchoolInformation;
import com.cplatform.back.schoolManage.mapper.SchoolInformationMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wu
 * @date 2019/2/21
 */
@Service
public class SchoolService {

    @Autowired
    private SchoolInformationMapper schoolInformationMapper;

    public PageInfo<SchoolInformation> getSchoolList(){
        SchoolInformation schoolInformation = new SchoolInformation();
        PageHelper.startPage(1, 20);
        List<SchoolInformation> schoolList = schoolInformationMapper.getSchoolList();
        return new PageInfo<>(schoolList);
    }
}
