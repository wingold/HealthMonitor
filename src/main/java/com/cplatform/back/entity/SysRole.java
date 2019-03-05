package com.cplatform.back.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * @author wu
 * @date 2019/2/27
 */
@Getter
@Setter
@Table(name = "t_sys_role")
public class SysRole extends BaseEntity {
    private String roleName;//角色名称

    private Long updateUserId;//更新用户ID

    private Long createUserId;//创建用户ID

    private int unitId;//单位ID

    private String remark;//备注

    private String startTime;

    private String stopTime;

    private String menuPrivilege;

    @Transient
    public String getStartTime() {
        return startTime;
    }

    @Transient
    public String getStopTime() {
        return stopTime;
    }

    @Transient
    public String getMenuPrivilege() {
        return menuPrivilege;
    }
}
