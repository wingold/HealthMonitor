<%@ tag pageEncoding="UTF-8" %>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<c:choose>
    <c:when test="${app.appStatus < 2}">
        <ul class="step step1">
            <li class="first"><span><em class="l"></em>1.开发中<em class="r"></em></span></li>
            <li><span><em class="l"></em>2.上线审核<em class="r"></em></span></li>
            <li><span><em class="l"></em>3.试商用<em class="r"></em></span></li>
            <li><span><em class="l"></em>4.商用<em class="r"></em></span></li>
            <li class="end"><span><em class="l"></em>5.下线<em class="r"></em></span></li>
        </ul> 
    </c:when>
    <c:when test="${app.appStatus == 2}">
        <ul class="step step2">
            <li class="first"><span><em class="l"></em>1.开发中<em class="r"></em></span></li>
            <li class="curr"><span><em class="l"></em>2.上线审核<em class="r"></em></span></li>
            <li><span><em class="l"></em>3.试商用<em class="r"></em></span></li>
            <li><span><em class="l"></em>4.商用<em class="r"></em></span></li>
            <li class="end"><span><em class="l"></em>5.下线<em class="r"></em></span></li>
        </ul>
    </c:when>
    <c:when test="${app.appStatus == 3}">
        <ul class="step step3">
            <li class="first"><span><em class="l"></em>1.开发中<em class="r"></em></span></li>
            <li><span><em class="l"></em>2.上线审核<em class="r"></em></span></li>
            <li class="curr"><span><em class="l"></em>3.试商用<em class="r"></em></span></li>
            <li class="s4"><span><em class="l"></em>4.商用<em class="r"></em></span></li>
            <li class="end"><span><em class="l"></em>5.下线<em class="r"></em></span></li>
        </ul>
    </c:when>
    <c:when test="${app.appStatus == 4}">
        <ul class="step step3">
            <li class="first"><span><em class="l"></em>1.开发中<em class="r"></em></span></li>
            <li class="s2"><span><em class="l"></em>2.上线审核<em class="r"></em></span></li>
            <li><span><em class="l"></em>3.试商用<em class="r"></em></span></li>
            <li class="curr"><span><em class="l"></em>4.商用<em class="r"></em></span></li>
            <li class="end"><span><em class="l"></em>5.下线<em class="r"></em></span></li>
        </ul>
    </c:when>
    <c:when test="${app.appStatus == 5}">
        <ul class="step step3">
            <li class="first"><span><em class="l"></em>1.开发中<em class="r"></em></span></li>
            <li class="s2"><span><em class="l"></em>2.上线审核<em class="r"></em></span></li>
            <li class="s3"><span><em class="l"></em>3.试商用<em class="r"></em></span></li>
            <li><span><em class="l"></em>4.商用<em class="r"></em></span></li>
            <li class="end endi"><span><em class="l"></em>5.下线<em class="r"></em></span></li>
        </ul>
    </c:when>
</c:choose>
