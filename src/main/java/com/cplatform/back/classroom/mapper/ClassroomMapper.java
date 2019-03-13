package com.cplatform.back.classroom.mapper;

import com.cplatform.back.classroom.entity.Classroom;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface ClassroomMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_classroom
     *
     * @mbggenerated
     */
    @Delete({
        "delete from t_classroom",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_classroom
     *
     * @mbggenerated
     */
    @Insert({
        "insert into t_classroom (id, school_id, ",
        "classroom_name, capacity, ",
        "nfc_id, floor_numb, ",
        "building_numb, projector, ",
        "create_time, update_time)",
        "values (#{id,jdbcType=INTEGER}, #{schoolId,jdbcType=VARCHAR}, ",
        "#{classroomName,jdbcType=VARCHAR}, #{capacity,jdbcType=VARCHAR}, ",
        "#{nfcId,jdbcType=VARCHAR}, #{floorNumb,jdbcType=VARCHAR}, ",
        "#{buildingNumb,jdbcType=VARCHAR}, #{projector,jdbcType=INTEGER}, ",
        "#{createTime,jdbcType=TIMESTAMP}, #{updateTime,jdbcType=TIMESTAMP})"
    })
    int insert(Classroom record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_classroom
     *
     * @mbggenerated
     */
    int insertSelective(Classroom record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_classroom
     *
     * @mbggenerated
     */
    @Select({
        "select",
        "id, school_id, classroom_name, capacity, nfc_id, floor_numb, building_numb, ",
        "projector, create_time, update_time",
        "from t_classroom",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @ResultMap("BaseResultMap")
    Classroom selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_classroom
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(Classroom record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_classroom
     *
     * @mbggenerated
     */
    @Update({
        "update t_classroom",
        "set school_id = #{schoolId,jdbcType=VARCHAR},",
          "classroom_name = #{classroomName,jdbcType=VARCHAR},",
          "capacity = #{capacity,jdbcType=VARCHAR},",
          "nfc_id = #{nfcId,jdbcType=VARCHAR},",
          "floor_numb = #{floorNumb,jdbcType=VARCHAR},",
          "building_numb = #{buildingNumb,jdbcType=VARCHAR},",
          "projector = #{projector,jdbcType=INTEGER},",
          "create_time = #{createTime,jdbcType=TIMESTAMP},",
          "update_time = #{updateTime,jdbcType=TIMESTAMP}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Classroom record);

    List<Classroom> selectAll();
}