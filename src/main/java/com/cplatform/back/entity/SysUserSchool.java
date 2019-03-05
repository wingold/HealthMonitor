package com.cplatform.back.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;

/**
 * @author wu
 * @date 2019/3/4
 */
@Getter
@Setter
@Table(name = "t_sys_user_school")
public class SysUserSchool extends BaseEntity {
    private Long userId;

    private Long schoolId;
}
