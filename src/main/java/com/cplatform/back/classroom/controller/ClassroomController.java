package com.cplatform.back.classroom.controller;

import com.alibaba.fastjson.JSONObject;
import com.cplatform.back.classroom.entity.Classroom;
import com.cplatform.back.classroom.service.ClassroomService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/classroom")
public class ClassroomController {

    private static final Logger logger = Logger.getLogger(ClassroomController.class);

    @Autowired
    ClassroomService classroomService;

    @RequestMapping("findAll")
    @ResponseBody
    public JSONObject findAll() {
        JSONObject jsonObject = new JSONObject();
        List<Classroom> classrooms = classroomService.findAll();
        jsonObject.put("classrooms", classrooms);
        return jsonObject;
    }

    @RequestMapping("/list")
    public String getList(Model model) {
        List<Classroom> classrooms = classroomService.findAll();
        model.addAttribute("classrooms", classrooms);
        return "classroom/classrooms-list";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String add(Model model) {
        return "classroom/classrooms-add";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject addClassroom(Classroom classroom) {
        logger.info(classroom);
        JSONObject jsonObject = new JSONObject();
        try {
            classroomService.insert(classroom);

        }catch (Exception e){
            logger.error("插入教室数据发生错误!");
        }

        return jsonObject;
    }
}
