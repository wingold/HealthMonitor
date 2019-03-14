package com.cplatform.back.classManage.entity;


import com.cplatform.back.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 班级管理实体类. <br>
 * Description.
 * <p>
 * Copyright: Copyright (c) 2019-3-5 下午15:20:47
 * <p>
 * Company: 北京宽连十方数字技术有限公司
 * <p>
 * Author: xinghao@c-platform.com
 * <p>
 * Version: 1.0
 * <p>
 */
@Getter
@Setter
@Table(name = "t_class")
public class ClassInfo extends BaseEntity {

    // 学校ID
    private String schoolId;

    // 学校名称
    @Transient
    private String schoolName;

    // 年级名称
    private String gradeName;

    // 班级名称
    private String className;

    // 班级人数
    private String classNum;

    // 班主任名字
    private String classteacherId;

    // 体育老师名字
    private String peteacherId;

}
