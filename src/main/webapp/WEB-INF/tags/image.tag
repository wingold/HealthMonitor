<%@tag import="com.cplatform.mall.back.utils.PathUtil"%>
<%@tag import="com.cplatform.mall.back.utils.AppConfig"%>
<%@tag import="org.springframework.web.context.WebApplicationContext"%>
<%@tag import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@ tag pageEncoding="UTF-8" %>
<%--attribute for input --%>
<%@ attribute name="type" required="false" %>
<%@ attribute name="webpath" required="false" %>
<%@ attribute name="id" required="false"  type="java.lang.Long"%><%--商品id --%>
<%--attribute for input --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	  WebApplicationContext ctx = WebApplicationContextUtils.getRequiredWebApplicationContext(application);
	  AppConfig appConfig =  ctx.getBean(AppConfig.class);
 %>
<c:if test="${empty type }">
	<c:set var="type" value="item" />
</c:if>
<c:if test="${type eq 'item' }">
	<%
	 	String path = PathUtil.getItemPic(id,0);
	 %>
	<img  src="<%=appConfig.getUploadItemPath()%><%=path %>${webpath}"/>
</c:if>
<c:if test="${type eq 'brand'  && not empty webpath }">
	<img  src="<%=appConfig.getUploadBrandPath()%>${webpath}" width="100px"/>
</c:if>
<c:if test="${type eq 'ad'  && not empty webpath  }">
	<img  src="<%=appConfig.getUploadAdPath()%>${webpath}"/>
</c:if>
<c:if test="${type eq 'channel'  && not empty webpath  }">
	<img  src="<%=appConfig.getUploadChannelPath()%>${webpath}"/>
</c:if>
<c:if test="${type eq 'shop'  && not empty webpath  }">
	<img  src="<%=appConfig.getUploadShopPath()%>${webpath}"/>
</c:if>
<c:if test="${type eq 'property'   && not empty webpath }">
	<img  src="<%=appConfig.getUploadItemPath()%>${webpath}"/>
</c:if>
<c:if test="${type eq 'qrcode'   && not empty webpath }">
	<img  src="<%=appConfig.getUploadQrcodePath()%>${webpath}"/>
</c:if>
<c:if test="${type eq 'giftrequired'   && not empty webpath }">
	<img  src="<%=appConfig.getUploadGiftrequiredPath()%>${webpath}"/>
</c:if>
<c:if test="${type eq 'advise'   && not empty webpath }">
	<img  src="<%=appConfig.getUploadAdvisePicPath()%>${webpath}"/>
</c:if>
<c:if test="${type eq 'adviseExtend'   && not empty webpath }">
	<img  src="<%=appConfig.getUploadAdviseExtendPicPath()%>${webpath}"/>
</c:if>
<c:if test="${type eq 'locallife'   && not empty webpath }">
	<img  src="<%=appConfig.getLocallifePath()%>${webpath}"/>
</c:if>