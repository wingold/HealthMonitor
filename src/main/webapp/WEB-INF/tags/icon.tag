<%@ tag pageEncoding="UTF-8" %>
<%--attribute for input --%>
<%@ attribute name="logoPath" required="false" %>
<%@ attribute name="size" required="false" %>
<%@ attribute name="logoExt" required="false" %>
<%--attribute for input --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ct" uri="/cplatform-tag" %>
<c:set var="sname" value="${size == null ? 'm' : size}" />
<c:set var="extname" value="${logoExt == null ? 'png' : logoExt}" />
<c:if test="${empty logoPath}"><img src="${pageContext.request.contextPath}/static/images/default_logo_${sname}.png"/></c:if>
<c:if test="${not empty logoPath}"><img src="${ct:getSpringBean(pageContext.servletContext, 'appConfig').uploadImgPath}${logoPath}${sname}.${extname}"/></c:if>