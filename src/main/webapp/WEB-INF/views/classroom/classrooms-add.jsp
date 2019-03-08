<%@ page language="java" pageEncoding="utf-8" %>
<%@ include file="../includes/importer.jsp" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>添加教室-教室管理</title>
    <jsp:include page="head.jsp"/>
</head>

<body>
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-12">
        <h2>添加教室</h2>
        <ol class="breadcrumb">
            <li>
                <a href="index.html">主页</a>
            </li>
            <li>
                <a href="list_classrooms.html">教室管理</a>
            </li>
            <li class="active">
                <strong>添加教室</strong>
            </li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-lg-12">
        <div class="wrapper wrapper-content animated fadeInUp">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>填写教室信息</h5>
                </div>
                <div class="ibox-content">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-lg-2 control-label">楼栋名称</label>
                            <div class="col-lg-3">
                                <input type="text" placeholder="请输入楼栋名称" class="form-control">
                                <label id="-error" class="error" for="">验证提示信息区域。</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 control-label">楼层编号</label>
                            <div class="col-lg-3">
                                <input type="text" placeholder="请输入楼层编号" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 control-label">教室编号</label>
                            <div class="col-lg-3">
                                <input type="text" placeholder="请输入教室编号" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 control-label">座位数量</label>
                            <div class="col-lg-3">
                                <input type="text" placeholder="请输入座位数量" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 control-label">是否有投影</label>
                            <div class="col-lg-3">
                                <label class="radio-inline">
                                    <input type="radio" checked="" value="option1" id="optionsRadios1"
                                           name="optionsRadios"> 是
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" value="option2" id="optionsRadios2" name="optionsRadios"> 否
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 control-label">NFC设备编号</label>
                            <div class="col-lg-3">
                                <input type="text" placeholder="请输入NFC设备编号" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-offset-2 col-lg-3">
                                <a class="btn btn-primary btn-m submit-tips">提交教室信息</a>
                            </div>
                        </div>
                    </form>
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
</body>
<script>
    $(document).ready(function () {
        //添加成功提示
        $('.submit-tips').click(function () {
            swal({
                title: "提交成功！",
                type: "success"
            });
        });
    });
</script>

</html>