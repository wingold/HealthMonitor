<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--attribute for input --%>
<%@ attribute name="text" required="true" %>
<%@ attribute name="url" required="true" %>
<%@ attribute name="open" required="false" %><%--否打开新窗口--%>
<%@ attribute name="onAction" required="false" %><%--具体操作前js，如果返回false，后续不执行--%>
<c:if test="${empty open }">
	<c:set var="open" value="false"/>
</c:if>
<a class="btn_blue actionBtn" href="javascript:;"  openFlag="${open }"  title="${text }"  action="${url }"  <c:if test="${not empty onAction }">onAction="${onAction }"</c:if>  ><span>${text }</span></a>
<%--attribute for input --%>