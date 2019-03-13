<%@ page language="java" pageEncoding="utf-8" %>
<%@ include file="../includes/importer.jsp" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>教室管理</title>
    <jsp:include page="head.jsp"/>
</head>

<body>
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-12">
        <h2>教室管理</h2>
        <ol class="breadcrumb">
            <li>
                <a href="index.html">主页</a>
            </li>
            <li class="active">
                <strong>教室管理</strong>
            </li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-lg-12">
        <div class="wrapper wrapper-content animated fadeInUp">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>教室列表</h5>
                    <div class="ibox-tools">
                        <a href="add_classroom.html" class="btn btn-success btn-sm">
                            <i class="fa fa-plus" aria-hidden="true"></i> 添加教室
                        </a>
                    </div>
                </div>
                <div class="ibox-content clearfix">
                    <div class="row m-b-sm m-t-sm">
                        <div class="col-md-12">
                            <form role="form" class="form-inline">
                                <div class="form-group">
                                    <label>学校:</label>
                                    <input type="text" placeholder="请输入学校名称" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>教室名称:</label>
                                    <input type="text" placeholder="请输入教室名称" class="form-control">
                                </div>
                                <button class="btn btn-primary btn-sm" type="submit">搜索</button>
                            </form>
                        </div>
                    </div>
                    <table class="table table-bordered table-striped m-t" data-page-size="4">
                        <thead>
                        <tr>
                            <th>教室ID</th>
                            <th>学校</th>
                            <th>教室名称</th>
                            <th>可容纳人数</th>
                            <th>NFCID</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${classrooms}" var="classroom">
                            <tr>
                                <td>${classroom.id}</td>
                                <td>${classroom.schoolName}</td>
                                <td>${classroom.classroomName}</td>
                                <td>${classroom.capacity}</td>
                                <td>${classroom.nfcId}</td>
                                <td><fmt:formatDate value="${classroom.createTime}" type="both"/> </td>
                                <td>
                                    <a href="detail_classroom.html">查看</a>/
                                    <a href="#">编辑</a>/
                                    <a href="#" class="delet">删除</a>/
                                    <a href="#" data-toggle="modal" data-target="#change">更换设备</a>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                    <ul class="pagination pull-right">
                        <li class="footable-page-arrow disabled"><a data-page="first" href="#first">«</a></li>
                        <li class="footable-page-arrow disabled"><a data-page="prev" href="#prev">‹</a></li>
                        <li class="footable-page active"><a data-page="0" href="#">1</a></li>
                        <li class="footable-page"><a data-page="1" href="#">2</a></li>
                        <li class="footable-page"><a data-page="2" href="#">3</a></li>
                        <li class="footable-page"><a data-page="3" href="#">4</a></li>
                        <li class="footable-page"><a data-page="4" href="#">5</a></li>
                        <li class="footable-page-arrow"><a data-page="next" href="#next">›</a></li>
                        <li class="footable-page-arrow"><a data-page="last" href="#last">»</a></li>
                    </ul>
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
</div>
</div>
<script>
    $(document).ready(function () {
        // 删除
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