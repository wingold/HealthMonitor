<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="../includes/importer.jsp"%>
<!doctype html>
<html>
<head>
    <ht:head/>
</head>
<body>
<div class="main_right">
	<div id="toptit"><img width="18" height="18" src="${res }/images/wel_06.jpg"> 欢迎光临广西专升本管理系统</div>
	<div class="dbsx">
			<h5 style="padding:5px 0 5px 20px;" class="fontblue"><img width="16" height="16" src="${res }/images/personinfo.gif"> 个人信息 </h5>
   			<div class="dbsx_list">
				<ul>
			    	<li><strong>UID:</strong>${sessionUser.id }</li>
			    	<li><strong>登录账号:</strong>${sessionUser.sysUser.userCode }</li>
			    	<li><strong>用户名:</strong>${sessionUser.name }</li>
			    	<li><strong>终端号码:</strong>${sessionUser.mobile }</li>
			    	<li><strong>Email:</strong>${sessionUser.email }</li>
			    	<li><strong>描述:</strong>${sessionUser.sysUser.remark }</li>			    
			    	<li><strong>有效时间:</strong><ct:time source="${sessionUser.sysUser.validTime }" sfmt="yyyyMMdd" tfmt="yyyy-MM-dd"/></li>
			    	<li><strong>创建时间:</strong><ct:time source="${sessionUser.sysUser.createTime }"/></li>
			    	<li><strong>修改密码时间:</strong><ct:time source="${sessionUser.sysUser.changePwdTime }"/></li>
			    	<li><strong>更新时间:</strong><ct:time source="${sessionUser.sysUser.updateTime }"/></li>
			    	<li><strong>是否锁定:</strong>${sessionUser.sysUser.lockStatusTypeName }</li>
			    	<li><strong>帐户状态:</strong>${sessionUser.sysUser.statusTypeName}</li>
			    	<li><strong>查询范围:</strong>
			    	<c:forEach items="${sessionUser.areaList }" var="item">
			    		${item.regionName } 
			    	</c:forEach>
			    	<br></li>
			  	</ul>
			</div>
	</div>
</div>


</body>
</html>