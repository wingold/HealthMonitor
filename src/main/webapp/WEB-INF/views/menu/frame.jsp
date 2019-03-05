<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
    <title>学生健康体质监测平台</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script>
        if (window!=top) top.location.href = window.location.href;
    </script>
</head>
<frameset id="fst1" rows="68,*" width="1006" cols="*" border="0" framespacing="0" frameborder="NO" bordercolor="#0099CC">
    <frame name="topFrame" scrolling="NO" noresize src="<spring:url value="/menu/head"/>" bordercolor="#0099CC">
    <frame name="containerFrame" src="<spring:url value="/menu/container"/>">
</frameset>
</html>
