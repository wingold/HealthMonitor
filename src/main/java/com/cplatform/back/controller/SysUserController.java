package com.cplatform.back.controller;

import com.cplatform.back.entity.SysUser;
import com.cplatform.back.entity.model.SessionUser;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.sql.SQLException;

/**
 * 用户管理控制类
 * @author wu
 * @date 2019/2/27
 */
@Controller
@RequestMapping("/sys/user")
public class SysUserController {
    private static Logger log = Logger.getLogger(SysUserController.class);

    private final String MODULE_NAME = "用户管理";

    @RequestMapping(value = "/pwdEdit", method = RequestMethod.GET)
    public String pwdEdit(Model model) throws SQLException {
//        SysUser sysUser = this.userService.findSysUserById(SessionUser.getSessionUser().getId());
        SysUser sysUser = new SysUser();
        model.addAttribute("user", sysUser);
        return "sys/user/pwd-edit";
    }
}
