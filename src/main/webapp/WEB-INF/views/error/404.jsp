<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="../includes/importer.jsp"%>
<!doctype html>
<html>
<head>
    <head>
        <ht:head title="404 - 页面未找到"/>
    </head>
<body>
<div style="padding-left:120px; height:200px; background:url(${res}/images/warning.jpg) left center no-repeat;">
    <p style="font-size:14px; line-height:30px; padding:30px; color:#000000;">
        系统忙，请重试。<br />很抱歉，您要访问的页面不存在。（404）<br/>
        <a href="javascript:history.go(-1)">返回</a>
    </p>
</div>
</body>
</html>