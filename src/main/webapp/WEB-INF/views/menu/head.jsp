<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../static/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="../static/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="../static/css/animate.css" rel="stylesheet">
    <link href="../static/css/style.css" rel="stylesheet">
    <link href="../static/css/my.css" rel="stylesheet">
</head>
<body>
    <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <span class="m-r-sm text-muted welcome-message">欢迎使用学生健康体质监测平台</span>
            </div>
            <ul class="nav navbar-top-links navbar-right">
                <li>
                    <a href="index.html"><i class="fa fa-sign-out"></i> 返回主页</a>
                </li>
            </ul>
        </nav>
    </div>
</body>
</html>