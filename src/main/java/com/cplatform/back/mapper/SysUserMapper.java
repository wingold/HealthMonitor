package com.cplatform.back.mapper;

import com.cplatform.back.entity.SysUser;
import com.cplatform.back.utils.BasicMapper;
import org.springframework.stereotype.Repository;

/**
 * @author wu
 * @date 2019/2/25
 */
@Repository
public interface SysUserMapper extends BasicMapper<SysUser> {
    SysUser findById(Long id);

    SysUser findByUserCode(String userCode);

    SysUser findByEmail(String email);
}
