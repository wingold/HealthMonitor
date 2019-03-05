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
@Table(name = "t_sys_log")
public class SysLogInfo extends BaseEntity {
    private String userId;//用户ID

    private String userName;//用户名称

    private String operTime;//操作时间

    private String operType;//操作类型:1-查看，2-添加，3-修改，4-删除，5-审核，6-其他

    private String module;//模块

    private String description;//描述

    private String ip;//ip地址

    private String resultCode;//结果code

    private String userType;//用户类型

    private Long opId;//操作ip


}
