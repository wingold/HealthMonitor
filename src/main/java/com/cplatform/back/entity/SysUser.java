package com.cplatform.back.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author wu
 * @date 2019/2/25
 */
@Setter
@Getter
@Table(name = "t_sys_user")
public class SysUser extends BaseEntity {
    /* 用户状态 */

    /**
     * 用户状态 － 有效
     */
    public static final Long STATUS_VALID = 1L;

    /**
     * 用户状态 － 无效
     */
    public static final Long STATUS_INVALID = 2L;

    /**
     * 用户状态 － 删除
     */
    public static final Long STATUS_DELETED = 3L;

    /* 用户类型 */

    /**
     * 用户类型 － 超级管理员
     */
    public static final int USER_TYPE_MASTER = 0;

    public static Map<Integer, String> flagMap = null;
    static {
        flagMap = new HashMap<>();
        flagMap.put(1, "专家");
        flagMap.put(2, "高职院校");
        flagMap.put(3, "本科院校");
    }

    private String userCode;//用户code

    private String userPwd;//用户密码

    private String userName;//用户名称

    private String terminalId;//手机号

    private String email;//邮箱

    private String remark;//备注

    private Date validTime;//有效时间

    private Date changePwdTime;//修改密码时间

    private Long updateUserId;//更新用户ID

    private int lockStatus;//锁状态

    private int status;//状态:1-有效，2-无效，3-删除

    /** 0-系统管理员，1-专家，2-高职院校，3-本科院校 */
    private Integer flag;

    private Integer unitId;//单位ID
}
