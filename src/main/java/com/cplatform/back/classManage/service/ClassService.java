package com.cplatform.back.classManage.service;

import com.cplatform.back.classManage.entity.Class;
import com.cplatform.back.classManage.mapper.ClassMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public PageInfo<Class> findClass() {
        PageHelper.startPage(1, 20);
        List<Class> classList = classMapper.getClassList();
        return new PageInfo<>(classList);
    }

}
