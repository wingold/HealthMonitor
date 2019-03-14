package com.cplatform.back.classManage.controller;

import com.alibaba.fastjson.JSONArray;
import com.cplatform.back.classManage.entity.ClassInfo;
import com.cplatform.back.classManage.service.ClassService;
import com.cplatform.back.schoolManage.entity.SchoolInformation;
import com.cplatform.back.schoolManage.service.SchoolService;
import com.github.pagehelper.PageInfo;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

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

    /**
     * 获取页面数据
     * @param classInfo
     * @param model
     * @return
     */
    @RequestMapping(value = "/list")
    public String classList(@ModelAttribute("classInfo")ClassInfo classInfo, Model model){
        try {
            PageInfo<ClassInfo> pageClass = this.classService.findClass(classInfo);
            model.addAttribute("pageData", pageClass);
        } catch (Exception e) {
            log.error("查询班级列表异常", e);
        }
        return "class/class-list";
    }

    /**
     * 跳转到创建班级页面
     * @param model
     * @return
     */
    @RequestMapping(value = "/classAdd", method = RequestMethod.GET)
    public String classAdd(Model model){
        ClassInfo classInfo = new ClassInfo();
        model.addAttribute("classInfo",classInfo);
        return "class/class-add";
    }

    @RequestMapping(value = "/selectSchool", method = RequestMethod.GET)
    public void selectSchool(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        List<SchoolInformation> schoolInformationList =  classService.findSchool();
        JSONArray jsonArray = JSONArray.parseArray(schoolInformationList.toString());
        response.getWriter().print(jsonArray);
    }

}
