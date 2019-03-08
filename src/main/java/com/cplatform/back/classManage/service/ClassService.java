package com.cplatform.back.classManage.service;

import com.cplatform.back.classManage.entity.ClassInfo;
import com.cplatform.back.classManage.mapper.ClassMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.util.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.util.List;


/**
 * 班级管理服务类. <br>
 * Description.
 * <p>
 * Copyright: Copyright (c) 2019-3-5 下午16:26:26
 * <p>
 * Company: 北京宽连十方数字技术有限公司
 * <p>
 * Author: xinghao@c-platform.com
 * <p>
 * Version: 1.0
 * <p>
 */
@Service
public class ClassService {

    private static Logger log = Logger.getLogger(ClassService.class);

    @Autowired
    private ClassMapper classMapper;

    public PageInfo<ClassInfo> findClass(ClassInfo classInfo) {
        PageHelper.startPage(1, 20);
        Example example = new Example(ClassInfo.class);
        Example.Criteria criteria = example.createCriteria();
        System.out.println("class:"+classInfo.toString());
        if (StringUtil.isNotEmpty(classInfo.getSchoolName())){
            criteria.andEqualTo("schoolName",classInfo.getSchoolName());
        }
        if (StringUtil.isNotEmpty(classInfo.getClassName())){
            criteria.andEqualTo("className",classInfo.getClassName());
        }
        example.setOrderByClause("id asc");
        List<ClassInfo> classList = classMapper.selectByExample(example);
        return new PageInfo<>(classList);
    }

}
