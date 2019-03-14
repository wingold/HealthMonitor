package com.cplatform.back.schoolManage.entity;

import com.cplatform.back.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;
import java.util.Date;

/**
 * 学校信息表
 * @author wu
 * @date 2019/2/22
 */
@Getter
@Setter
@Table(name = "t_school")
public class SchoolInformation extends BaseEntity {
    private String schoolType;//学校类型

    private String schoolName;//学校名称

    private String schoolCode;//学校编号

    private String schoolAddress;//学校地址

    private String area;//行政区域

    private String status;//状态
}
