package com.deoncn.jlbz.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("tb_source")
public class Source {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String res;
    private String type;

    private String  description;
    private String  src;
    private String  time;


}
