//鐐瑰嚮鏌ヨ鏉′欢
var searchMenuClick = function(){
    var searchImg = $('#search-menu li:first img')[0];
    var queryContainer = $('.queryContainer');
   
 
    if (queryContainer.is(":visible")) {
        searchImg.src = searchImg.src.replace(/ico_search.gif/g, 'ico_searchup.gif');
        queryContainer.slideUp(200);
    }else {
        searchImg.src = searchImg.src.replace(/ico_searchup.gif/g, 'ico_search.gif');
        queryContainer.slideDown(200);
    }
};

$(function(){
    $('#search-menu .switch').click(function() {
        searchMenuClick();
    });
    if (window.name !="content-iframe") {
    	  $('.queryContainer').show()
    }else{
    	//鍟嗘埛绠＄悊銆佸悎鍚岀鐞嗐�鍟嗗搧绠＄悊銆佽鍗曠鐞嗙殑鏌ヨ鏉′欢锛岄粯璁ゅ睍寮�
    	var openUrl = window.location.href;
	    var pattern = /queryFormBackFlag=backForm/i;
	   if( pattern.test(window.location.search) 
			   || openUrl.indexOf("/item/meal/meallist")> 0
			   || openUrl.indexOf("/item/list")> 0 //鍟嗘埛绠＄悊椤甸潰 
			   || openUrl.indexOf("/store/list")> 0 //缁撶畻鍟嗘埛绠＄悊椤甸潰
			   || openUrl.indexOf("/store/nonList")> 0//闈炵粨绠楀晢鎴风鐞嗛〉闈�
			   || openUrl.indexOf("/sysfee/feelist")> 0 //璐圭巼鍒嗙被绠＄悊椤甸潰
			   || openUrl.indexOf("/store/treaty/list")> 0 //鍟嗘埛鍗忚绠＄悊椤甸潰
			   || openUrl.indexOf("/store/storeSettle/auditlist")> 0 //鍟嗘埛缁撶畻瀹℃牳椤甸潰
			   || openUrl.indexOf("/store/storeFee/auditlist")> 0 //鍟嗘埛璐圭巼瀹℃牳椤甸潰
			   || openUrl.indexOf("/item/hisunproduction/settleList")> 0 //鍟嗗搧鍗忚绠＄悊椤甸潰
			   || openUrl.indexOf("/item/hisunproduction/settleAudit")> 0 //鍟嗗搧鍗忚瀹℃牳椤甸潰
			   || openUrl.indexOf("/order/refund/list")> 0 //璁㈠崟绠＄悊椤甸潰
			   || openUrl.indexOf("/order/refund/audit")> 0 //璁㈠崟閫�瀹℃牳椤甸潰
			   || openUrl.indexOf("/store/nonAuditList")> 0//闈炵粨绠楀晢鎴风鐞嗛〉闈�
			   || openUrl.indexOf("/store/auditList/firstAudit")> 0
			   || openUrl.indexOf("/store/auditList/secondAudit")> 0
			   || openUrl.indexOf("/store/shop/list")> 0
			   || openUrl.indexOf("/item/auditList")> 0
			   || openUrl.indexOf("/item/twoAuditList")> 0
			   || openUrl.indexOf("/item/vitual/list")> 0
			   || openUrl.indexOf("/item/vitual/auditList")> 0
			   || openUrl.indexOf("/code/composite/list")> 0
			   || openUrl.indexOf("/item/meal/mealTwoAuditList")> 0
			   || openUrl.indexOf("/item/virShop/list")> 0
			   || openUrl.indexOf("/item/virShop/auditList")> 0
			   || openUrl.indexOf("/sms/lottery/resultlist")> 0
			   || openUrl.indexOf("/orgnaic/star/list")> 0//缁胯壊鏈夋満棣嗚瘎鏄熼〉闈�
			   || openUrl.indexOf("/orgnaic/pic/list")> 0//缁胯壊鏈夋満棣嗙劍鐐瑰浘椤甸潰
			   || openUrl.indexOf("/orgnaic/floor/list")> 0//缁胯壊鏈夋満棣嗘ゼ灞傝缃〉闈�
			   || openUrl.indexOf("/orgnaic/catalog/list")> 0 //缁胯壊鏈夋満棣嗘ゼ灞傚晢鍝侀〉闈�
			   
			   || openUrl.indexOf("/store/code/list")> 0
			   
			   || openUrl.indexOf("/flow/orderList")> 0
			   || openUrl.indexOf("/flow/list")> 0
			   || openUrl.indexOf("/order/smsbuy/list")> 0
			   || openUrl.indexOf("/order/refund/exception-list")> 0
			   || openUrl.indexOf("/order/refund/exception-select")> 0
			   || openUrl.indexOf("/refundV2/list")> 0 //璁㈠崟绠＄悊椤甸潰
			   || openUrl.indexOf("/refundV2/audit")> 0 //閫�V2
			   || openUrl.indexOf("/refundOrder/orderList")> 0 //璁㈠崟绠＄悊椤甸潰V3
			   || openUrl.indexOf("/refundOrder/refundOrderList")> 0 //璁㈠崟绠＄悊椤甸潰V3
			   || openUrl.indexOf("/orderBalance/list")> 0 //璇濊垂鐩村厖
			   || openUrl.indexOf("/orderDelivery/list")> 0 //璇濊垂鐩村厖
			   || openUrl.indexOf("/shopSet/wifi/list")> 0 //闂ㄥ簵Wifi绠＄悊
			   || openUrl.indexOf("/shopSet/wifi/connectList")> 0 //Wifi杩炴帴璇︽儏
			   || openUrl.indexOf("/shopSet/wifi/connectDetailList")> 0 //Wifi缁熻缁撴灉
			   || openUrl.indexOf("/mmsMo/manager/list")> 0 //褰╀俊涓婅鍒楄〃
			   || openUrl.indexOf("/mmsMo/manager/countList")> 0 //褰╀俊涓婅缁熻鍒楄〃
			   || openUrl.indexOf("/mmsMt/manager/list")> 0 //褰╀俊涓嬭鍒楄〃
			   || openUrl.indexOf("/mmsMt/manager/countList")> 0 //褰╀俊涓嬭缁熻鍒楄〃
			   || openUrl.indexOf("/smsMo/manager/list")> 0 //鐭俊涓婅鍒楄〃
			   || openUrl.indexOf("/smsMo/manager/countList")> 0 //鐭俊涓婅缁熻鍒楄〃
			   || openUrl.indexOf("/smsMt/manager/list")> 0 //鐭俊涓嬭鍒楄〃
			   || openUrl.indexOf("/smsMt/manager/countList")> 0 //鐭俊涓嬭缁熻鍒楄〃
			   || openUrl.indexOf("/refundCustomer/list") > 0 //水电煤退款客服受理管理页面
               || openUrl.indexOf("/sms/lottery/member/list") > 0
               || openUrl.indexOf("/sms/lottery/member/list") > 0
               || openUrl.indexOf("/sms/lottery/resultlist") > 0
		       || openUrl.indexOf("/refundCustomer/gamecard")>0  //游戏点卡查询页面
	   ){
		   $('.queryContainer').show();
	   }else{
		   $('.queryContainer').hide();
	   }
    }

});
