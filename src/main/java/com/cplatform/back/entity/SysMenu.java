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
@Table(name = "t_sys_menu")
public class SysMenu {

    private String menuCode;//菜单code，唯一值

    private String menuName;//菜单名称

    private String menuPcode;//当前菜单父菜单code

    private String menuUrl;//菜单指向的URL链接，没有链接可以使用#

    private boolean leafYn;//是否为末级标志，0-否;1是

    private String modelCode;//标识模块,最末级菜单需要指明该字段,且在本系统内具有唯一性

    private String urlBtns;//每个页面所拥有的按钮(add_btn,mod_btn,del_btn)

    private int sysType;//0后台管理系统


}
