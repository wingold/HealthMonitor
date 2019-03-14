package com.cplatform.back.schoolManage.service;

import com.cplatform.back.classManage.entity.ClassInfo;
import com.cplatform.back.schoolManage.entity.SchoolInformation;
import com.cplatform.back.schoolManage.mapper.SchoolInformationMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.util.StringUtil;

import java.util.List;

/**
 * @author wu
 * @date 2019/2/21
 */
@Service
public class SchoolService {

    @Autowired
    private SchoolInformationMapper schoolInformationMapper;

    public PageInfo<SchoolInformation> getSchoolList(SchoolInformation information){
        PageHelper.startPage(1, information.getPageSize());
        Example example = new Example(ClassInfo.class);
        Example.Criteria criteria = example.createCriteria();
        if (StringUtil.isNotEmpty(information.getArea())){
            criteria.andEqualTo("area",information.getArea());
        }
        if (StringUtil.isNotEmpty(information.getSchoolName())){
            criteria.andEqualTo("schoolName",information.getSchoolName());
        }
        example.setOrderByClause("id asc");
        List<SchoolInformation> schoolList = schoolInformationMapper.selectByExample(example);
        return new PageInfo<>(schoolList);
    }

    public int addSchool(SchoolInformation information){
        return schoolInformationMapper.insertSelective(information);
    }

    public List<SchoolInformation> getAllSchool(){
        return schoolInformationMapper.selectAll();
    }

    public int delInfor(Long id){
        return schoolInformationMapper.deleteByPrimaryKey(id);
    }
}
