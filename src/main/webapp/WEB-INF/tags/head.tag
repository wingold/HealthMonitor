<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%@ attribute name="title" required="false" %>

    <meta charset="UTF-8" />
    <meta content="width=device-width, minimum-scale=1.0, maximum-scale=2.0" name="viewport">
    <title>${empty title ? '' : title}</title>
    <link href="<spring:url value="/static/css/main-2.css"/>" rel="stylesheet" type="text/css" />
    <link href="<spring:url value="/static/css/main.css"/>" rel="stylesheet" type="text/css" />
    <link href="<spring:url value="/static/css/search-menu.css"/>" rel="stylesheet" type="text/css" /> <!--css menu加载  -->

    <script src="<spring:url value="/static/global.js"/>" type="text/javascript" charset="utf-8"></script>


    <script src="<spring:url value="/static/js/jquery-1.8.3.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/jquery.blockUI.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/jquery.cookie.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/jquery.form.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/lab/jquery.dialog.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/date-picker/WdatePicker.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/lab/jquery.dialog.js"/>" type="text/javascript" charset="utf-8"></script>
    <link href="<spring:url value="/static/js/lab/default/dialog.css"/>" rel="stylesheet" type="text/css" />
    <link href="<spring:url value="/static/js/lab/default/ibutton.css"/>" rel="stylesheet" type="text/css" />

    <!-- 必须在main.js前，绑定验证早于ajax form -->
    <script src="<spring:url value="/static/js/validation/validation_cn.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/main.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/wp-scroll.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/search-menu.js"/>" type="text/javascript" charset="utf-8"></script>

    <!-- form 界面 -->
    <script src="<spring:url value="/static/smooth/scripts/smooth.form.js"/>" type="text/javascript"></script>
    <script src="<spring:url value="/static/smooth/scripts/jquery-ui-1.8.custom.min.js"/>" type="text/javascript"></script>
    <script src="<spring:url value="/static/smooth/scripts/jquery.ui.selectmenu.js"/>" type="text/javascript"></script>
    <!-- dialog -->
	<script type="text/javascript" src="<spring:url value="/static/js/zDrag.js"/>"></script>
    <script type="text/javascript" src="<spring:url value="/static/js/zDialog.js"/>"></script>
    
    <script src="<spring:url value="/static/js/jquery-levelSelect-ajax.js"/>" type="text/javascript" charset="utf-8"></script>
    <script src="<spring:url value="/static/js/jquery.ztree.all-3.5.js"/>" type="text/javascript" charset="utf-8"></script>
         <link href="<spring:url value="/static/js/zTreeStyle/zTreeStyle.css"/>" rel="stylesheet" type="text/css" />
<!--[if lte IE 7]>
    <style type="text/css">
        html .jquerycssmenu{height: 1%;} /*Holly Hack for IE7 and below*/
    </style>
    <![endif]-->