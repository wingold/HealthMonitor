package com.cplatform.back.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;
import java.util.HashMap;
import java.util.Map;

/**
 * @author wu
 * @date 2019/2/28
 */
@Getter
@Setter
@Table(name = "t_sys_login_log")
public class SysLoginInfo extends BaseEntity {
    private String userName;

    private Long userId;

    private String ip;

    private String loginTime;

    private Integer successFlag;

    private Integer userType;

    private static Map<String, String> flagMap = new HashMap<String, String>();

    static {
        flagMap.put("0", "登录失败");
        flagMap.put("1", "登录成功");
    }
}
