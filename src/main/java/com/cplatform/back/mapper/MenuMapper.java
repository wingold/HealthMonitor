package com.cplatform.back.mapper;

import com.cplatform.back.entity.SysMenu;
import com.cplatform.back.utils.BasicMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wu
 * @date 2019/2/25
 */
@Repository
public interface MenuMapper extends BasicMapper<SysMenu> {
    List<SysMenu> findAllSysMenu();

    List<SysMenu> getSysMenuListByRoleId(Long roleId);

    List<SysMenu> getSysMenuListByUserId(Long userId);
}
