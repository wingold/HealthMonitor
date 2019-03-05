<%@ tag pageEncoding="UTF-8" %>
<%--attribute for input --%>
<%@ attribute name="selected" required="false" %>
<%--attribute for input --%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="res" value="${ctx}/static" />

<ul class="mymenu">
    <li<c:if test="${selected eq 'app'}">  class="curr"</c:if>><a style="border-top:0;" href="${ctx}/myapp">我的应用列表</a></li>
    <li<c:if test="${selected eq 'profile'}"> style="border-top:0;" class="curr"</c:if>><a href="${ctx}/profile">开发者资料</a></li>
    <li<c:if test="${selected eq 'pwd'}"> style="border-top:0;" class="curr"</c:if>><a href="${ctx}/profile/change-pwd">密码修改</a></li>
    <li><a href="${ctx}/myapp/create" class="btn_add"><em>创建应用</em></a></li>
</ul>
<dl class="user">
    <dt class="myport"><img src="${res}/images/portrait_none.png"/></dt>
    <dd>我是M+用户</dd>
    <dd><a href="${ctx}/profile/edit">[编辑开发者信息]</a></dd>
</dl>