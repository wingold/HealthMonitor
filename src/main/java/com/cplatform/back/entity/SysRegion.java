package com.cplatform.back.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Table;

/**
 * @author wu
 * @date 2019/2/26
 */
@Getter
@Setter
@Table(name = "t_sys_region")
public class SysRegion extends BaseEntity {
    private String regionCode;

    private String regionName;

    private Long regionLevel;

    private String parentRegion;

    private String shortName;

    private String regionSpell;

    private Long isShow;

    private Long sortNum;

    private String areaCode;

    public static final Long LEVEL_PROVINCE = 0L;

    // 全国区域
    public static SysRegion CHINA_REGION;

    static {
        CHINA_REGION = new SysRegion();
        CHINA_REGION.setParentRegion("0");
        CHINA_REGION.setRegionCode("");
        CHINA_REGION.setRegionName("全国");
        CHINA_REGION.setRegionLevel(0L);
        CHINA_REGION.setRegionSpell("china");
        CHINA_REGION.setSortNum(0L);
    }
}
