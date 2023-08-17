package com.deoncn.jlbz.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.deoncn.jlbz.mapper.SourceMapper;
import com.deoncn.jlbz.pojo.Source;
import com.deoncn.jlbz.service.SourceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service("sourceServiceImpl")
@Transactional
public class SourceServiceImpl extends ServiceImpl<SourceMapper, Source> implements SourceService {


    @Override
    public IPage<Source> getSourceByOpr(Page<Source> pageParam, Source sourceName) {

        QueryWrapper<Source> sourceQueryWrapper = new QueryWrapper<>();

        if (!StringUtils.isEmpty(sourceName.getDescription())) {
            sourceQueryWrapper.like("description",sourceName.getDescription());
        }

        sourceQueryWrapper.orderByDesc("id");
        Page<Source> sourcePage = baseMapper.selectPage(pageParam,sourceQueryWrapper);


        return sourcePage;
    }
}
