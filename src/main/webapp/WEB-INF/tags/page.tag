<%@ tag pageEncoding="UTF-8" %>
<%--attribute for input --%>
<%@ attribute name="pageData" required="true" type="com.cplatform.dbhelp.page.Page" %>
<%--attribute for input --%>
<div>
    <div id="wp-pagination" style="float:right;margin-top:10px;" class="wp-pagination" title="${pageData.recordCount},${pageData.curPage},${pageData.pageSize}"></div>
</div>