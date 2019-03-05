package com.cplatform.back.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;

/**
 * @author wu
 * @date 2019/2/27
 */
@Getter
@Setter
@Table(name = "t_sys_user_role")
public class SysUserRole extends BaseEntity {
    private Long userId;//

    private Long roleId;//
}
