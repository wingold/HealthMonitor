package com.cplatform.back.entity;

import com.alibaba.fastjson.JSON;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Date;

/**
 * 基础信息
 * @author wu
 * @date 2019/2/22
 */
@Getter
@Setter
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date createTime;
    
    private Date updateTime;

    @Transient
    private int pageNum = 1;

    @Transient
    private int pageSize = 20;

    @Override
    public String toString(){
        return JSON.toJSONString(this);
    }

}
