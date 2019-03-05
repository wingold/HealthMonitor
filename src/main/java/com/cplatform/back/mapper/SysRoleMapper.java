package com.cplatform.back.mapper;

import com.cplatform.back.entity.SysRole;
import com.cplatform.back.utils.BasicMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wu
 * @date 2019/2/27
 */
@Repository
public interface SysRoleMapper extends BasicMapper<SysRole> {
    SysRole findById(Long id);

    List<SysRole> findByUpdateUserId(Long updateUserId);

    SysRole findByConditions(SysRole sysRole);
}
