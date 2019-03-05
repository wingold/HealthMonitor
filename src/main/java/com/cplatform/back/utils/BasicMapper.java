package com.cplatform.back.utils;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

public interface BasicMapper<T> extends Mapper<T>, MySqlMapper<T> {

}
