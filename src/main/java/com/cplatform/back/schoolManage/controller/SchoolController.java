package com.cplatform.back.schoolManage.controller;

import com.alibaba.fastjson.JSONArray;
import com.cplatform.back.schoolManage.entity.SchoolInformation;
import com.cplatform.back.schoolManage.service.SchoolService;
import com.cplatform.back.utils.JsonRespWrapper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.util.StringUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author wu
 * @date 2019/2/22
 */
@Controller
@RequestMapping("/school")
public class SchoolController {

    @Autowired
    private SchoolService schoolService;

    @RequestMapping("/list")
    public String getSchoolList(@ModelAttribute SchoolInformation information,Model model){
        PageInfo<SchoolInformation> schoolList = schoolService.getSchoolList(information);
        model.addAttribute("schoolList",schoolList);
        return "school/school-list";
    }

    @RequestMapping(value = "/getName",method = RequestMethod.GET)
    public void getAllSchool(HttpServletResponse response) throws IOException {
        System.out.println("进入方法");
        List<SchoolInformation> data = schoolService.getAllSchool();
        System.out.println("1");
        JSONArray jsonArray = JSONArray.parseArray(data.toString());
        System.out.println(jsonArray+"----------------------");
        response.getWriter().print(jsonArray);
//        model.addAttribute("data",data);
//        return JsonRespWrapper.success();
    }

    @RequestMapping("/show")
    public String showSchool(){
        return "school/add-school";
    }

    @RequestMapping("/addSchool")
    @ResponseBody
    public Object addSchool(@ModelAttribute SchoolInformation information){
        schoolService.addSchool(information);
        return JsonRespWrapper.success("添加成功","/school/list");
    }

    @RequestMapping("/delete")
    @ResponseBody
    public Object deleteInfor(Long id){
        if (StringUtil.isNotEmpty(id.toString())){
            schoolService.delInfor(id);
            return JsonRespWrapper.success();
        }
        return JsonRespWrapper.error("删除失败");
    }

}
