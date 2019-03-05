package com.cplatform.back.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;

/**
 * @author wu
 * @date 2019/2/25
 */
@Getter
@Setter
@Table(name = "t_sys_role_privilege")
public class SysRolePrivilege extends BaseEntity {

    private Long roleId;//角色ID

    private String menuCode;//菜单code

    private String menuBtn;//菜单按钮
}
