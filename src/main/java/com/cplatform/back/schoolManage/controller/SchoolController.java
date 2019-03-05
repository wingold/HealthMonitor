package com.cplatform.back.schoolManage.controller;

import com.cplatform.back.schoolManage.entity.SchoolInformation;
import com.cplatform.back.schoolManage.service.SchoolService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author wu
 * @date 2019/2/22
 */
@Controller
@RequestMapping("/school")
public class SchoolController {

    @Autowired
    private SchoolService schoolService;

    @RequestMapping("/")
    public String getSchoolList(Model model){
        PageInfo<SchoolInformation> schoolList = schoolService.getSchoolList();
        model.addAttribute("schoolList",schoolList);
        return null;
    }

    public String addSchool(){
        return null;
    }


}
