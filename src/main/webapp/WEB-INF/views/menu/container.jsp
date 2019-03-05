<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
    <title>学生健康体质监测平台</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="<spring:url value="/static/js/ext/css/ext-all.css"/>"/>
    <link rel="stylesheet" href="<spring:url value="/static/js/ext/menu/menu.css"/>"/>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../static/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="../static/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="../static/css/animate.css" rel="stylesheet">
    <link href="../static/css/style.css" rel="stylesheet">
    <link href="../static/css/my.css" rel="stylesheet">
</head>
<body scroll="no">
        <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
        <li class="nav-header">
        <div class="dropdown profile-element">
        <span><img alt="image" class="img-circle" src="../static/images/profile_small.jpg" /></span>
        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
        <span class="clear">
        <span class="block m-t-xs"><strong class="font-bold userName">王宇</strong></span>
        <span class="text-muted text-xs block userIdentity">管理员</span>
        </span>
        </a>
        </div>
        </li>
        <li class="active">
        <a href="list_schools.html">
        <i class="fa fa-university" aria-hidden="true"></i> <span class="nav-label">学校管理</span></span>
        </a>
        </li>
        <li>
        <a href="list_classrooms.html"><i class="fa fa-window-maximize" aria-hidden="true"></i> <span class="nav-label">教室管理</span></a>
        </li>
        <li>
        <a href="list_classes.html"><i class="fa fa-users" aria-hidden="true"></i> <span class="nav-label">班级管理</span></a>
        </li>
        <li>
        <a href="list_courses.html"><i class="fa fa-book" aria-hidden="true"></i> <span class="nav-label">课程管理</span></a>
        </li>
        <li>
        <a href="list_teachers.html"><i class="fa fa-user fa-lg" aria-hidden="true"></i> <span class="nav-label">教师管理</span></a>
        </li>
        <li>
        <a href="list_students.html"><i class="fa fa-graduation-cap" aria-hidden="true"></i> <span class="nav-label">学生管理</span></a>
        </li>
        <li>
        <a href="list_bracelet.html"><i class="fa fa-circle-o-notch" aria-hidden="true"></i> <span class="nav-label">手环管理</span></a>
        </li>
        <li>
        <a href="list_parameter.html"><i class="fa fa-tasks" aria-hidden="true"></i> <span class="nav-label">参数管理</span></a>
        </li>
        </ul>
        </div>
        </nav>
<script type="text/javascript" src="<spring:url value="/static/js/ext/ext-base.js"/>"></script>
<script type="text/javascript" src="<spring:url value="/static/js/ext/ext-all.js"/>"></script>
<script type="text/javascript" src="<spring:url value="/static/js/ext/menu/treeutil.js"/>"></script>
<script>
    <%--var tu;--%>
    <%--Ext.onReady(function(){--%>
        <%--tu = new XTreeUtil('学生健康体质监测平台',--%>
                <%--'<spring:url value="/menu/tree"/>',--%>
                <%--'content-iframe',--%>
                <%--'<spring:url value="/"/>',--%>
                <%--'<spring:url value="/menu/welcome"/>',--%>
                <%--'<spring:url value="/menu/fav?p=1"/>'--%>
        <%--);--%>
        <%--tu.init();--%>
        <%--tu.show();--%>
    <%--});--%>
</script>

</body>
</html>