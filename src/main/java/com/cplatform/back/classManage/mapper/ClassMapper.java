package com.cplatform.back.classManage.mapper;

import com.cplatform.back.classManage.entity.Class;
import org.springframework.stereotype.Repository;
import com.cplatform.back.utils.BasicMapper;

import java.util.List;

/**
 * 班级管理映射类 Title. <br>
 * Description.
 * <p>
 * Copyright: Copyright (c) 2019-3-5 下午16:02:11
 * <p>
 * Company: 苏州宽连信息技术有限公司
 * <p>
 * Author: xinghao@c-platform.com
 * <p>
 * Version: 1.0
 * <p>
 */
@Repository
public interface ClassMapper extends BasicMapper<Class> {

    List<Class> getClassList();

}
