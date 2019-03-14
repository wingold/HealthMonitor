<%--
  Created by IntelliJ IDEA.
  User: xh
  Date: 2019/3/8
  Time: 17:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>创建班级-班级管理</title>
    <link href="../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../static/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="../static/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="../static/css/animate.css" rel="stylesheet">
    <link href="../static/css/style.css" rel="stylesheet">
    <link href="../static/css/my.css" rel="stylesheet">
</head>
<body>
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-lg-12">
            <h2>创建班级</h2>
            <ol class="breadcrumb">
                <li>
                    <a href="index.html">主页</a>
                </li>
                <li>
                    <a href="../class/list">班级管理</a>
                </li>
                <li class="active">
                    <strong>创建班级</strong>
                </li>
            </ol>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="wrapper wrapper-content animated fadeInUp">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>填写班级信息</h5>
                    </div>
                    <div class="ibox-content">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-2 control-label">学校</label>
                                <div class="col-lg-3">
                                    <select class="form-control" id="schoolId" name="schoolName"></select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">年级</label>
                                <div class="col-lg-3">
                                    <select class="form-control" name="">
                                        <option>选项 1</option>
                                        <option>选项 2</option>
                                        <option>选项 3</option>
                                        <option>选项 4</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">班级号</label>
                                <div class="col-lg-3">
                                    <input type="text" placeholder="请输入班级号" class="form-control">
                                    <label id="-error" class="error" for="">验证提示信息区域。</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">班主任姓名</label>
                                <div class="col-lg-3">
                                    <select class="form-control" name="">
                                        <option>选项 1</option>
                                        <option>选项 2</option>
                                        <option>选项 3</option>
                                        <option>选项 4</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">体育老师姓名</label>
                                <div class="col-lg-3">
                                    <select class="form-control" name="">
                                        <option>选项 1</option>
                                        <option>选项 2</option>
                                        <option>选项 3</option>
                                        <option>选项 4</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-2 col-lg-3">
                                    <a href="javascript:void(0)" class="btn btn-primary btn-m submit-tips">提交班级信息</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../static/js/jquery-3.1.1.min.js"></script>
    <script src="../static/js/bootstrap.min.js"></script>
    <script src="../static/js/plugins/sweetalert/sweetalert.min.js"></script>
    <script>
        $(document).ready(function() {
            //添加成功提示
            $('.submit-tips').click(function(){
                swal({
                    title: "提交成功！",
                    type: "success"
                });
            });
        });

        $(function () {
            $.ajax({
                type:'GET',
                url:"<%=request.getContextPath()%>/class/selectSchool",
                dataType:"json",
                success:function (data) {
                    console.log(data);
                    $("#schoolId").empty();
                    $("#schoolId").append("<option>-请选择-</option>");
                    for (var i = 0; i < data.length; i++) {
                        $("#schoolId").append('<option value='+ data[i].schoolName + '>'+data[i].schoolName + '</option>');
                    }
                }
            })


        })
    </script>
</body>
</html>
