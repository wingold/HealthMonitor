package com.cplatform.back.entity.model;

import com.cplatform.back.entity.SysRegion;
import com.cplatform.back.entity.SysUser;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * @author wu
 * @date 2019/2/26
 */
@Getter
@Setter
public class SessionUser implements Serializable {
    public static final String SESSION_USER_KEY = "session_user_key__";

    private Long id;

    private String name;

    private String mobile;

    private String email;

    private int status;

    private int userType;

    private Map<String, MenuPrivilege> privilege;

    /** 地区列表 */
    private List<SysRegion> areaList;

    /** 系统用户 */
    private SysUser sysUser;

    private String collegeIds;

    /**
     * 是否是超级管理员
     *
     * @return
     */
    public boolean isSuperAdmin() {
        // return "0".equals(userType);
        return 0 == userType;
    }

    /**
     * 获得当前登录用户信息
     *
     * @return
     */
    public static SessionUser getSessionUser() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpSession session = request.getSession();
        return (SessionUser) session.getAttribute(SESSION_USER_KEY);
    }

    /**
     * 判断是否登录
     *
     * @return
     */
    public static boolean isLogin() {
        return getSessionUser() != null;
    }

}
