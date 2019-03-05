<%@ tag pageEncoding="UTF-8" %>
<%--attribute for input --%>
<%@ attribute name="selected" required="false" %>
<%--attribute for input --%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib tagdir="/WEB-INF/tags" prefix="ht" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="wiki" value="${ctx}/doc/wiki" />

<script src="${ctx}/static/js/tree.js" type="text/javascript" charset="utf-8"></script>
<script language="javascript">
    $(function(){
        if($('#w260').height() > $('#w690').height()){
            $('#w690').height($('#w260').height());
        }else{$('#w260').height($('#w690').height());}
    })

</script>

<div id="w260" class="appdl">
    <dl class="mymenu" id="tree">
        <dt class="first ${page eq 'home' ? 'curr' : ''}"><a href="${wiki}/home">首页</a></dt>
        <dt class="navup">开放平台</dt>
        <dd ${!fn:startsWith(page, 'p_1') ? 'style="display:none;"' : ''}>
            <a class="${fn:startsWith(page, 'p_1_1') ? 'curr' : ''}" href="${wiki}/p_1_1">平台介绍</a>
            <a class="${fn:startsWith(page, 'p_1_2') ? 'curr' : ''}" href="${wiki}/p_1_2">应用接入指引</a>
            <a class="${fn:startsWith(page, 'p_1_3') ? 'curr' : ''}" href="${wiki}/p_1_3">开发者协议</a>
            <a class="${fn:startsWith(page, 'p_1_4') ? 'curr' : ''}" href="${ctx}/doc/messages">平台动态</a>
        </dd>
        <dt class="navup">API接口</dt>
        <dd ${!fn:startsWith(page, 'p_2') ? 'style="display:none;"' : ''}>
            <a class="${fn:startsWith(page, 'p_2_1') ? 'curr' : ''}" href="${wiki}/p_2_1">API文档</a>
            <a class="${fn:startsWith(page, 'p_2_2') ? 'curr' : ''}" href="${wiki}/p_2_2">API调用权限说明</a>
        </dd>
        <dt class="navup">SDK及资源</dt>
        <dd ${!fn:startsWith(page, 'p_3') ? 'style="display:none;"' : ''}>
            <a class="${fn:startsWith(page, 'p_3_1') ? 'curr' : ''}" href="${wiki}/p_3_1">SDK下载</a>
        </dd>
        <dt class="navup">常见问题</dt>
        <dd ${!fn:startsWith(page, 'p_4') ? 'style="display:none;"' : ''}>
            <a class="${fn:startsWith(page, 'p_4_1') ? 'curr' : ''}" href="${wiki}/p_4_1">常见问题解答</a>
            <a class="${fn:startsWith(page, 'p_4_2') ? 'curr' : ''}" href="${wiki}/p_4_2">联系我们</a>
        </dd>
    </dl>
</div>