<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--attribute for input --%>
<%@ attribute name="text" required="true" %>
<%@ attribute name="orderBy" required="true" %>
<%@ attribute name="order" required="false" %>
<c:if test="${param.tableOrderBy eq orderBy }">
<c:set var="order" value="${ param.tableOrder  }" />
</c:if>
<c:if test="${empty order && empty param.tableOrder && not param.tableOrderBy eq orderBy}">
	<c:set var="order" value="asc" />
</c:if>
<span class="tableSort"  orderBy="${orderBy }"  order="${order }">
<c:choose>
	<c:when test="${param.tableOrderBy eq orderBy}"><font color="red">${text }</font>
		<c:if test="${order eq 'asc' }">
			升
		</c:if>
		<c:if test="${order eq 'desc' }">
			降
		</c:if>
		
	</c:when>
	<c:otherwise>${text }</c:otherwise>
</c:choose>

</span>
<%--attribute for input --%>
