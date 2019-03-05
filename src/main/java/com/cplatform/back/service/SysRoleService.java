package com.cplatform.back.service;

import com.cplatform.back.entity.SysRole;
import com.cplatform.back.mapper.MenuMapper;
import com.cplatform.back.mapper.SysRoleMapper;
import com.cplatform.back.mapper.SysRolePrivilegeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author wu
 * @date 2019/2/27
 */
@Service
public class SysRoleService {

    @Autowired
    SysRoleMapper sysRoleMapper;

    @Autowired
    SysRolePrivilegeMapper sysRolePrivilegeMapper;

    @Autowired
    MenuMapper menuMapper;

    // 系统固化的按钮
    public static final String add_btn = "新增";

    private static final String update_btn = "更新";

    public static final String mod_btn = "编辑";

    public static final String del_btn = "删除";

    public static final String view_btn = "查看";

    private static Map<String, String> btnMapping = new HashMap<>();
    static {
        btnMapping.put("add_btn",add_btn);
        btnMapping.put("update_btn", update_btn);
        btnMapping.put("mod_btn",mod_btn);
        btnMapping.put("del_btn", del_btn);
        btnMapping.put("view_btn", view_btn);
    }

    public SysRole findById(Long id) {
        return sysRoleMapper.findById(id);
    }

    public SysRole addOrUpdateRole(SysRole role){
        return null;
    }
}
