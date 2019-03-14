<%--
  Created by IntelliJ IDEA.
  User: xh
  Date: 2019/3/5
  Time: 16:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../includes/importer.jsp"%>
<html>
<head>
    <ht:head />
    <jsp:include page="../classroom/head.jsp"/>
</head>
<body>
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-lg-12">
            <h2>班级管理</h2>
            <ol class="breadcrumb">
                <li>
                    <a href="index.html">主页</a>
                </li>
                <li class="active">
                    <strong>班级管理</strong>
                </li>
            </ol>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="wrapper wrapper-content animated fadeInUp">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>班级列表</h5>
                        <%--<ht:menu-btn type="search" />--%>
                        <div class="ibox-tools">
                            <a href="../class/classAdd" class="btn btn-success btn-sm"><i class="fa fa-plus" aria-hidden="true"></i> 创建班级</a>
                        </div>
                    </div>
                    <div class="ibox-content clearfix">
                        <div class="row m-b-sm m-t-sm">
                            <div class="col-md-12">
                                <form role="form" class="form-inline" name="queryForm" id="queryForm" action="?" method="post">
                                    <div class="form-group">
                                        <label>学校:</label>
                                        <input type="text" placeholder="请输入学校名称" name="schoolName" value="${param.schoolName}" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>班级号:</label>
                                        <input type="text" placeholder="请输入班级号" name="className" value="${param.className}" class="form-control">
                                    </div>
                                    <button class="btn btn-primary btn-sm">
                                        <ct:btn type="search"/>
                                    </button>
                                </form>
                            </div>
                        </div>
                            <table class="table table-bordered table-striped m-t" data-page-size="4">
                                <thead>
                                    <tr>
                                        <th>班级ID</th>
                                        <th>学校名称</th>
                                        <th>年级</th>
                                        <th>班级</th>
                                        <th>班级人数</th>
                                        <th>创建时间</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <c:forEach items="${pageData.list}" var="item">
                                    <tr>
                                        <td>${item.id}</td>
                                        <td>${item.schoolName}</td>
                                        <td>${item.gradeName}</td>
                                        <td>${item.className}</td>
                                        <td>${item.classNum}</td>
                                        <td>${item.createTime}</td>
                                        <td>
                                            <a href="detail_class.html">查看</a>/<a href="#">编辑</a>/<a href="#" class="delet">删除</a>
                                        </td>
                                    </tr>
                                </c:forEach>
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <div>
            <strong>Copyright</strong> Example Company &copy; 2014-2017
        </div>
    </div>

    <script src="../static/js/jquery-3.1.1.min.js"></script>
    <script src="../static/js/bootstrap.min.js"></script>
    <script src="../static/js/plugins/sweetalert/sweetalert.min.js"></script>
    <script>
        $(document).ready(function() {
            $('.delet').click(function () {
                swal({
                    title: "您确定？",
                    text: "您将无法恢复这条数据！",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "是的，删除",
                    closeOnConfirm: false
                }, function () {
                    swal("删除成功", "您的数据已被删除。", "success");
                });
            });
        });
    </script>
</body>
</html>
