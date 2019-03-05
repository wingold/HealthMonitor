<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--attribute for input --%>
<%@ attribute name="text" required="false" %>
<%@ attribute name="type" required="false" %>
<%@ attribute name="url" required="false" %>
<%@ attribute name="menuSelected" required="false" %>
<%--attribute for input --%>
<c:if test="${type == 'search'}">
    <c:set var="src" value="${pageContext.request.contextPath}/static/images/ico_search.gif" />
    <c:set var="text" value="查询条件"/>
    <c:set var="class" value="class='switch'"/>
</c:if>
<c:if test="${type == 'add'}">
	<c:set var="src" value="${pageContext.request.contextPath}/static/images/ico_add.gif" />
</c:if>
<c:if test="${type == 'input'}"><c:set var="src" value="${pageContext.request.contextPath}/static/images/ico_input.gif" /></c:if>
<c:if test="${empty type}">
	<c:set var="src" value="${pageContext.request.contextPath}/static/images/ico_default.gif" />
</c:if>

<c:if test="${empty url}"><c:set var="href" value="javascript:void(0);"/></c:if>
<c:if test="${not empty url}"><c:set var="href" value="${pageContext.request.contextPath}${url}"/></c:if>
<c:if test="${not empty menuSelected }"><c:set var="menuSelected" value="class='${menuSelected }'"/></c:if>

<li><a href="${href}"  ${class}   ${menuSelected}><img src="${src}" align="absmiddle" />${text}</a></li>