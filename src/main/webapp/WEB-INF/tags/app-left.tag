<%@ tag pageEncoding="UTF-8" %>
<%--attribute for input --%>
<%@ attribute name="selected" required="false" %>
<%--attribute for input --%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib tagdir="/WEB-INF/tags" prefix="ht" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="res" value="${ctx}/static" />
<input type='hidden' id='ctx' value='${ctx }' />
<div id="w260" class="appdl">
    <dl class="apps">
        <dt class="myport"><ht:icon logoPath="${app.logoPath}" logoExt="${app.logoExt}"/></dt>
        <dd>${app.appName }</dd>
        <dd>
        	<c:if test="${app.auditStatus==0 || app.auditStatus==3}">
	       		 <a href="javascript:deleteAppInfo(${app.id});">[删除应用]</a>
	        </c:if>
	        <c:if test="${app.auditStatus==1 || app.auditStatus==2}">
	        	<font color='#cccccc'>[删除应用]</font>
	        </c:if>
        </dd>
    </dl>
    <ul class="mymenu">
        <li<c:if test="${selected eq 'summary'}"> class="curr"</c:if>><a href="${ctx}/myapp/${app.id}">应用概览</a></li>
        <li<c:if test="${selected eq 'base'}"> class="curr"</c:if>><a href="${ctx}/myapp/${app.id}/edit">基本信息</a></li>
        <li<c:if test="${selected eq 'stat'}"> class="curr"</c:if>><a href="${ctx}/myapp/${app.id}/statics">数据统计</a></li>
        <li<c:if test="${selected eq 'board'}"> class="curr"</c:if>><a href="${ctx}/notice/${app.id}">应用新鲜事</a></li>
        <li<c:if test="${selected eq 'content'}"> class="curr"</c:if>><a href="${ctx}/content/${app.id}">内容发布</a></li>
        <li<c:if test="${selected eq 'syssupport'}"> class="curr"</c:if>><a href="${ctx}/syssupport/${app.id}?filter=0">投诉处理</a></li>
    </ul>
</div>