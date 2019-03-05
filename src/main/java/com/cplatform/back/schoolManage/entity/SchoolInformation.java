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
@Table(name = "t_school_information")
public class SchoolInformation extends BaseEntity {
    private String schoolType;//学校类型

    private String schoolName;//学校名称

    private String school_address;//学校地址

    private Date createTime;//创建时间

    private Date updateTime;//修改时间
}
