package com.deoncn.jlbz.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.deoncn.jlbz.pojo.Source;
import com.deoncn.jlbz.service.SourceService;
import com.deoncn.jlbz.util.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "接口大全")
@RestController
@RequestMapping("/img/SourceController")
public class SourceController {

    @Autowired
    SourceService sourceService;

    /**  GET
     *  <a href="http://localhost:9001/img/SourceController/getAllSource/1/3">...</a> * */
    @ApiOperation("分页带条件查询管理员信息")
    @GetMapping("/getAllSource/{pageNo}/{pageSize}")
    public Result getAllSource(@ApiParam("页码数")@PathVariable("pageNo") Integer pageNo,@ApiParam("页大小") @PathVariable("pageSize") Integer pageSize,@ApiParam("传入的图片描述") Source SourceName){

        // 分页查询条件
        Page<Source> pageParam = new Page<>(pageNo, pageSize);
        // 通过Service 层连接数据库进行查询
        IPage<Source> iPages = sourceService.getSourceByOpr(pageParam,SourceName);

        // 封装Result 对象并返回
        return Result.ok(iPages);
    }

    /** *   POST *  <a href="http://localhost:9001/img/SourceController/saveOrUpdateSource">...</a>* */
    @ApiOperation("修改新增信息")
    @PostMapping("/saveOrUpdateSource")
    public Result saveOrUpdateSource(@ApiParam("JSON的Source对象") @RequestBody Source source){
        sourceService.saveOrUpdate(source);
        return Result.ok();
    }

    /**
     *   DELETE
     *  <a href="http://localhost:9001/img/SourceController/deleteSource">...</a>
     * <p>
     * */
    @ApiOperation("删")
    @DeleteMapping("/deleteSource")
    public Result deleteSource(@ApiParam("JSON的要删除的Source对象") @RequestBody List<Integer> ids){
        sourceService.removeByIds(ids);
        return Result.ok();
    }



}
