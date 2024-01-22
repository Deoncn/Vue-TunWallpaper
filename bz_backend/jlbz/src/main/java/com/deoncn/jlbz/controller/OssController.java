package com.deoncn.jlbz.controller;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.common.utils.BinaryUtil;
import com.aliyun.oss.model.MatchMode;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.PolicyConditions;
import com.deoncn.jlbz.util.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/oss")
public class OssController {

    @GetMapping ("/policy")
    public Result policy(){
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        String accessId = "阿里云 ACCESS 访问控制链";
        String accessKey = "阿里云 ACCESS 访问控密码";
        // Endpoint以华东1（杭州）为例，其它Region请按实际情况填写。
        // deoncnone.oss-cn-chengdu.aliyuncs.com
        String endpoint = "oss-cn-chengdu.aliyuncs.com";
        // 填写Bucket名称，例如examplebucket。
        String bucket = "deoncnone";
        // 填写Host地址，格式为https://bucketname.endpoint。
        String host = "https://" + bucket + "." + endpoint ;
        // 设置上传回调URL，即回调服务器地址，用于处理应用服务器与OSS之间的通信。OSS会在文件上传完成后，把文件上传信息通过此回调URL发送给应用服务器。
        // String callbackUrl = "https://192.168.0.0:8888";
        // 设置上传到OSS文件的前缀，可置空此项。置空后，文件将上传至Bucket的根目录下。
        String format = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        String dir = format + "/";

        // 创建ossClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessId, accessKey);

        Map<String, String> respMap = null;
        try {
            long expireTime = 30;
            long expireEndTime = System.currentTimeMillis() + expireTime * 1000;
            Date expiration = new Date(expireEndTime);
            PolicyConditions policyConds = new PolicyConditions();
            policyConds.addConditionItem(PolicyConditions.COND_CONTENT_LENGTH_RANGE, 0, 1048576000);
            policyConds.addConditionItem(MatchMode.StartWith, PolicyConditions.COND_KEY, dir);

            String postPolicy = ossClient.generatePostPolicy(expiration, policyConds);
            byte[] binaryData = postPolicy.getBytes(StandardCharsets.UTF_8);
            String encodedPolicy = BinaryUtil.toBase64String(binaryData);
            String postSignature = ossClient.calculatePostSignature(postPolicy);

            //   respMap = new LinkedHashMap<String, String>();
            respMap = new LinkedHashMap<>();
            respMap.put("accessId", accessId);
            respMap.put("policy", encodedPolicy);
            respMap.put("signature", postSignature);
            respMap.put("dir", dir);
            respMap.put("host", host);
            respMap.put("expire", String.valueOf(expireEndTime / 1000));
            // respMap.put("expire", formatISO8601Date(expiration));


        } catch (Exception e) {
            // Assert.fail(e.getMessage());
            System.out.println(e.getMessage());
        }

        return Result.ok(respMap);

    }

    @GetMapping ("/download")
    public void downloader(String filepath,HttpServletResponse response) {
        // Endpoint以华东1（杭州）为例，其它Region请按实际情况填写。关于其他Region对应的Endpoint信息，请参见访问域名和数据中心。
        String endpoint = "https://oss-cn-chengdu.aliyuncs.com";
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        String accessId = "阿里云 ACCESS 访问控制链";
        String accessKey = "阿里云 ACCESS 访问控密码";
        // 填写Bucket名称，例如examplebucket。
        String bucketName = "deoncnone";
        // 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中不能包含Bucket名称。
        String objectName = filepath;

        BufferedInputStream input;
        OutputStream outputStream;

        response.setContentType("application/octet-stream;charset=utf-8");
        response.setHeader("Content-disposition","attachment; filename=" + filepath.substring(filepath.indexOf("/") + 1));

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        try {
            // ossObject包含文件所在的存储空间名称、文件名称、文件元信息以及一个输入流。
            OSSObject ossObject = ossClient.getObject(bucketName, objectName);


            /* zi */
            input = new BufferedInputStream(ossObject.getObjectContent());
            byte[] buffBytes = new byte[1024];
            outputStream = response.getOutputStream();
            int read;
            while ((read = input.read(buffBytes)) != -1) { outputStream.write(buffBytes, 0, read); }
            outputStream.flush();


            // 读取文件内容。
            // 数据读取完成后，获取的流必须关闭，否则会造成连接泄漏，导致请求无连接可用，程序无法正常工作。
            // ossObject对象使用完毕后必须关闭，否则会造成连接泄漏，导致请求无连接可用，程序无法正常工作。
            ossObject.close();

        }
        catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, " + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        }
        catch (Throwable ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        }
        finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }

        /* 结束段 */
    }


}






