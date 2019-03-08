package com.cplatform.back.classManage.controller;

import com.cplatform.back.classManage.entity.ClassInfo;
import com.cplatform.back.classManage.service.ClassService;
import com.github.pagehelper.PageInfo;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 班级管理控制类 Title. <br>
 * Description.
 * <p>
 * Copyright: Copyright (c) 2019-3-5 下午14:00:03
 * <p>
 * Company: 苏州宽连信息技术有限公司
 * <p>
 * Author: xinghao@c-platform.com
 * <p>
 * Version: 1.0
 * <p>
 */
@Controller
@RequestMapping("/class")
public class ClassController {

    private static final Logger log = Logger.getLogger(ClassController.class);

    private final String MODULE_NAME = "班级管理";

    @Autowired
    private ClassService classService;

    @RequestMapping(value = "/list")
    public String protocol(@ModelAttribute("classInfo")ClassInfo classInfo, Model model){
        try {
            PageInfo<ClassInfo> pageClass = this.classService.findClass(classInfo);
            model.addAttribute("pageData", pageClass);
        } catch (Exception e) {
            log.error("查询班级列表异常", e);
        }
        return "class/class-list";
    }



}
