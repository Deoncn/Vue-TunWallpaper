package com.deoncn.jlbz;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;

import com.aliyun.oss.model.GetObjectRequest;
import com.aliyun.oss.model.OSSObject;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootTest
class JlbzApplicationTests {

    @Test
    void contextLoads() {

    }

    public void testUpload(){
        // Endpoint以华东1（杭州）为例，其它Region请按实际情况填写。
        String endpoint = "https://oss-cn-chengdu.aliyuncs.com";
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        String accessKeyId = "LTAI5tEZqGzMEo59gSCmPVmE";
        String accessKeySecret = "TPKL8XkvBN5GuLcI6udg7HkfQcotqf";

        // 填写Bucket名称，例如examplebucket。
        String bucketName =  "deoncnone";

        // 填写Object完整路径，完整路径中不能包含Bucket名称，例如exampledir/exampleobject.txt。
        String format = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        String objectName =  format + "/" + "23204900.webp";
        // 填写本地文件的完整路径，例如D:\\localpath\\examplefile.txt。
        // 如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件流。
        String filePath = "C:\\Users\\22106\\Desktop\\11月\\picture\\232049.webp";

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try

        {
            InputStream inputStream = new FileInputStream(filePath);
            // 创建PutObject请求。
            ossClient.putObject(bucketName, objectName, inputStream);
        } catch(
                OSSException oe)

        {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch(
                ClientException ce)

        {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } finally

        {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }

        System.out.println("上传完成");

    }


    public void testDownload(){
        // Endpoint以华东1（杭州）为例，其它Region请按实际情况填写。
        String endpoint = "https://oss-cn-chengdu.aliyuncs.com";
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        String accessKeyId = "LTAI5tEZqGzMEo59gSCmPVmE";
        String accessKeySecret = "TPKL8XkvBN5GuLcI6udg7HkfQcotqf";
        // 填写Bucket名称，例如examplebucket。
        String bucketName = "deoncnone";
        // 填写不包含Bucket名称在内的Object完整路径，例如testfolder/exampleobject.txt。
        //   https://deoncnone.oss-cn-chengdu.aliyuncs.com/2022-11-03/12093614.jpg
        //   https://deoncnone.oss-cn-chengdu.aliyuncs.com/2022-11-03/232049.webp
        String objectName = "2022-11-03/232049.webp";
        String pathName = "C:\\Users\\22106\\Desktop\\232049.webp";

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            // 下载Object到本地文件，并保存到指定的本地路径中。如果指定的本地文件存在会覆盖，不存在则新建。
            // 如果未指定本地路径，则下载后的文件默认保存到示例程序所属项目对应本地路径中。
            ossClient.getObject(new GetObjectRequest(bucketName, objectName), new File(pathName));
        }

        catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }

        System.out.println("下载完成");

    }

}


