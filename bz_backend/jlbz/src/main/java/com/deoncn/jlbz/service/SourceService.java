package com.deoncn.jlbz.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.deoncn.jlbz.pojo.Source;

public interface SourceService extends IService<Source> {


    IPage<Source> getSourceByOpr(Page<Source> pageParam, Source sourceName);
}
