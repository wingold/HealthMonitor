package com.cplatform.back.mapper;

import com.cplatform.back.entity.SysRolePrivilege;
import com.cplatform.back.utils.BasicMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wu
 * @date 2019/2/25
 */
@Repository
public interface SysRolePrivilegeMapper extends BasicMapper<SysRolePrivilege> {
    SysRolePrivilege findById(Long Id);

    List<SysRolePrivilege> findByRoleId(Long roleId);

    List<SysRolePrivilege> findByUserRolePrivilege(Long userId);

    int deleteByRoleId(Long roleId);
}
