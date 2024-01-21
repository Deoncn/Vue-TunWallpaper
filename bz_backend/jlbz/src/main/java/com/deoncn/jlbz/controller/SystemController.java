package com.deoncn.jlbz.controller;


import com.deoncn.jlbz.util.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.SneakyThrows;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;



@Api(tags = "系统管理接口")
@RestController
@RequestMapping("/sms/system")
public class SystemController {

    /* POST */
    @SneakyThrows
    @ApiOperation("文件上传统一入口")
    @PostMapping("/headerImgUpload")
    public Result headerImgUpload(@ApiParam("要上传的文件") @RequestPart("multipartFile") MultipartFile multipartFile, HttpServletRequest request) {

        String uuid = UUID.randomUUID().toString().replace("-", "").toLowerCase();
        String originalFilename = multipartFile.getOriginalFilename();
        int i = originalFilename.lastIndexOf(".");
        String newFilename = uuid.concat(originalFilename.substring(i));

        // 保存文件 将文件发送到第三方图片服务器上。
        // request.getServletContext().getRealPath("public/upload/");

        /**
         * path1
         * */
        File path1 = new File(ResourceUtils.getURL("classpath:").getPath());
        if (!path1.exists()) {
            path1 = new File("");
        }
        System.out.println(path1);

        File upload = new File(path1.getAbsolutePath(), "static/upload/");
        if (!upload.exists()) {
            upload.mkdirs();
        }
        String parent = upload.getPath();
        System.out.println(parent);

        String resource = parent + '/';

        String resource2 = resource.concat(newFilename);
        System.out.println(resource2);

        try {
            multipartFile.transferTo(new File(resource2));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        // 响应的图片路径
        String path = "upload/".concat(newFilename);
        return Result.ok(path);
    }

    /** * GET * http://localhost:9001/sms/system/download  */
    @ApiOperation("文件下载入口")
    // 暂时关闭
//    @GetMapping("/download")
    public void headerImgDownload(HttpServletResponse response) throws Exception {

        response.reset();
        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-disposition","attachment; filename=test.png");

        try (
            //  BufferedInputStream bis = new BufferedInputStream(new FileInputStream("static/upload/1b4b41f62862480b8c9dc479a5409da1.jpg"));
                BufferedInputStream bis = new BufferedInputStream(new FileInputStream("https://deoncnone.oss-cn-chengdu.aliyuncs.com/2022-11-10/8538cab81566469a96d538e7d0b72f77.jpg"));

                // 输出流
                BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
        )
        {
            byte[] buff = new byte[1024];
            int len = 0;
            while ((len = bis.read(buff)) > 0) {
                bos.write(buff, 0, len);
            }
        }

        System.out.println("下载成功");
    }

}
