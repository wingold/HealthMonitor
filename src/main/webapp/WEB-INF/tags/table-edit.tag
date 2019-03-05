<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--attribute for input --%>
<%@ attribute name="text" required="true" %>
<%@ attribute name="url" required="true" %>
<%@ attribute name="reqParam" required="false"  type="java.lang.String"%>
<%@ attribute name="type" required="false" %>
<%--attribute for input --%>

<c:if test="${empty type }">
	<c:set var="type" value="input"/>
</c:if>

<c:if test="${type eq 'input' }">
<span style="display:block;" class="edit-input"  param="${reqParam }"  action="${url }">${text }</sapn>
</c:if>
<c:if test="${type eq 'area' }">
<span  style="display:block;cursor:pointer" class="edit-area"  action="${url }">${text }</span>
</c:if>