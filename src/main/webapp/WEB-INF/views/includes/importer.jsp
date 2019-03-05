<%@ page session="true" %>
<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="ht" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="ct" uri="/cplatform-tag" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="res" value="${ctx}/static" />
<c:set var="loginuser" value="${sessionScope._dest_login_}" />
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>