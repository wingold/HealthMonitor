package com.cplatform.back.mapper;

import com.cplatform.back.entity.SysUserSchool;
import com.cplatform.back.utils.BasicMapper;
import org.springframework.stereotype.Repository;

/**
 * @author wu
 * @date 2019/3/4
 */
@Repository
public interface SysUserSchoolMapper extends BasicMapper<SysUserSchool> {
    SysUserSchool findBySchoolId(Long schoolId);
}
