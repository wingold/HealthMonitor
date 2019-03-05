$(function(){

    setTableRowColor();

    attachAjaxBlock();

    // default ajax form bind
    autoBindAjaxForm();

     
    setTableEvnent();
    
    //default query form flag参数
    autoBindQueryFormFlag();
});


function autoBindQueryFormFlag(){
	//如果是弹出框 或者包含页面 ，则不增加参数
	 if (window.name =="content-iframe") {
		 var queryContainer = $('#queryForm');
		 if (!queryContainer.hasClass("noQueryBackForm")) {
			 $("#queryForm").append("<input type='hidden' name='queryFormBackFlag' value='backForm'/>");
		 }
	}
}


/********************
 * AJAX Form 扩展方法
 **************************************/


// 默认的ajax form submit success 回调， 执行预定义的 成功跳转、提示、错误提示等
function formPostCallback(resp) {	
    if (resp.success) {
        var msg = resp.message;
        var url = resp.url;
        var confirmMsg = resp.confirmMsg;
        if (url && url.indexOf('http') != 0 && url.indexOf("javascript") != 0) {
            url = G_CTX_ROOT + url;
        }
        if (msg) {
        	if(confirmMsg){
        		if(confirmMsg==='1'){
        			 customConfirm('提示', 'icon-question', msg + '<br/><br/>', resp.lab1, resp.lab2,function() {
	              			  location.href = G_CTX_ROOT + resp.lab1Url;
	                     },function() {
	                    	  location.href = G_CTX_ROOT + resp.lab2Url;
	                     });
        		}
        	}else{
	            if (url) {
	                simpleAlert(msg, function() {
	                    location.href = url;
	                });
	            } else {
	                simpleAlert(msg);
	                window.close();
	            }
        	}
        } else {
            if (url) {
                location.href = url;
            }
        }
    } else {
        var msg = resp.errorMessage;
        var errors = resp.errors;
        if (msg) {
            simpleWarn("出现未知错误，请联系管理员！ <br/><br/>错误信息：" + msg);
        }
        var first;
        for (var key in errors) {
            var val = errors[key];
            if (!first) {
                first = true;
                var el = 'form:has(#' + key + ')';
                $("html,body").animate({scrollTop: $(el).offset().top - 20}, 0);
                $('#' + key).focus();
            }
            Validation.showErrorMsg('server',$('#' + key), val);
        }
    }
}


/**
 * 绑定表单的ajax form提交方法，
 * 默认成功后，执行成功提示、跳转、错误提示，等操作。
 * 还可以在customCallBack中执行一些后续操作
 * @param formName 绑定的表单名或对象
 * @param customCallBack success后的回调，参数为responseObject
 * @param beforeSubmit 提交回调
 */
var ajaxFormSubmit = function(formName, customCallBack, beforeSubmit) {

    $(formName).ajaxForm({
        dataType:  'json',
        beforeSubmit: function(arr, $form, options) {
            if ($.isFunction(beforeSubmit)) {
                return beforeSubmit.call(this, arr, $form, options);
            }
        },
        error: function() {
            if ($.isFunction(customCallBack)) {
                customCallBack.call(this);
            }
            simpleWarn("出现未知错误，请联系管理员！ ");
        },
        success: function(resp) {
            formPostCallback(resp);

            if ($.isFunction(customCallBack)) {
                customCallBack.call(this, resp);
            }
        }
    });
};

var autoBindAjaxForm = function() {
    var forms = $('.required-validate');
    for(var i = 0; i < forms.length; i++) {
        ajaxFormSubmit(forms[i], function(){
        	$("input[type=submit],input[type=image]",forms[i]).each(function(){
    			$(this).attr("disabled",false); 
    			$(this).attr("value","提交");	
        	});
        }, function(arr,form,options){
        	$("input[type=submit],input[type=image]",form).each(function(){
        		$(this).attr("disabled",true); 
        		$(this).attr("value","提交中....");	
        	});
        });
    }
};





/********************
 * Block UI 相关
 **************************************/

var attachAjaxBlock = function() {
    $(document).ajaxStart(waitBlock).ajaxStop($.unblockUI);
}


var waitBlock = function() {
    // Console.log("waitBlock");
    $.blockUI({
        fadeIn: 0,
        fadeOut: 0,
        showOverlay: true, 
        centerY: false, 
        overlayCSS:  {
            backgroundColor: '#000',
            opacity:         .1,
            cursor:          'wait'
        },
        message:  '<h1>请稍候...</h1>',
        css: {
            border: 'none',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity:.5,
            color: '#fff'
        } });
}

/********************
 * float dialog;
 **************************************/

function customAlert(title, icon, content, fn) {
    $.alert({
        title: title,
        icon: icon,
        content: content,
        onClose: function($dialog) {
            if ($.isFunction(fn)) {
                fn.call(this, $dialog);
            }
        }
    });
}

function customConfirm(title, icon, content, labelConfirm, labelCancel, fn1, fn2) {
    $.confirm({
        title: title,
        icon: icon,
        content: content,
        labConfirm: labelConfirm,
        labCancel: labelCancel,
        onConfirm: function($dialog) {
            if ($.isFunction(fn1)) {
                fn1.call(this, $dialog);
            }
            return false;
        },
        onCancel: function($dialog) {
            if ($.isFunction(fn2)) {
                fn2.call(this, $dialog);
            }
        }
    });
}


function simpleWarn(msg, fn) {
    customAlert('出错了', 'icon-exclamation', msg + '<br/><br/>', fn);
}

/* 弹出简单的文字提示框，有确定按钮回调功能 */
function simpleAlert(content, fn) {
    customAlert('提示', 'icon-information', content + '<br/><br/>', fn);
}

/* 弹出简单的文字提示框，有确定按钮回调功能 */
function simpleConfirm(content,label, fn1,fn2) {
    customConfirm('提示', 'icon-question', content + '<br/><br/>', '确定', label, fn1, fn2);
}



/********************
 * other
 **************************************/


var setTableRowColor = function() {

    $('table.datalist tr:even').each(function(s) {
        this.className = 'tabtdbg';
    });

    $('table.datalist tr').hover(function() {
        $(this).addClass('bggray');
    }, function() {
        $(this).removeClass('bggray');
    });
    
    //初始化超长title提示
    $("table.datalist .ellipsis").each(function(){
    	$(this).attr("title",$(this).text());
    });
}

//设置每两行的颜色相同，index：table下从索引为index的tr开始设置颜色样式
var setTableDoubleRowColor = function(index) {
	$('table.datalist tr').each(function(s) {
		var RowIndex = parseInt(this.sectionRowIndex);
        this.className = '';
    	if(((RowIndex - index + 2)%4 == 0 || (RowIndex - index + 1)%4 == 0) && RowIndex >= index){
	    	$('table.datalist tr')[RowIndex].className = 'tabtdbgc';
    	}
    });
    
    $('table.datalist tr').hover(function() {
    	var RowIndex = parseInt(this.sectionRowIndex);
		if(RowIndex >= index){
			 $(this).addClass('bggray');
			((RowIndex + index)%2 != 0)?$(this).prev().addClass('bggray'):$(this).next().addClass('bggray');		
		}

    }, function() {
    	var RowIndex = parseInt(this.sectionRowIndex);
		if(RowIndex >= index){
        $(this).removeClass('bggray');
    		((RowIndex + index)%2 != 0)?$(this).prev().removeClass('bggray'):$(this).next().removeClass('bggray');
		}
	});
}

var setTableEvnent = function(){
	//全选参数
	$('table.datalist .checkall').click(function(){
		var checkall = $(this);
		$('table.datalist tr input[type=checkbox]').each(function(){
			if(checkall.is(":checked")){
				$(this).attr("checked",true);
			}else{
				$(this).attr("checked",false);
			}
		});
	});
	//初始化事件
	$('table.datalist .actionBtn').click(function(){
		//判断是否选择
		if ($(this).attr("title") != "") {
			var checks = dataTableChecked();//已选择的元素
			if(!checks  || checks.length <= 0 ){
				checks = 	dataTableRadioChecked();//已选则的radio
				if(!checks  || checks.length <= 0){
					simpleAlert("请选择要" + $(this).attr("title") + "的项！");
					return;
				}
			}
		}
		var btnAction =  $(this).attr("action");
		var open = $(this).attr("openFlag");
		var onAction = $(this).attr("onAction");
		
		var actionurl = G_CTX_ROOT;
		if(!jQuery.isEmptyObject( $("table.datalist").attr("action"))){
			actionurl +=  $("table.datalist").attr("action") ;
		}
		actionurl +=  btnAction;
		
		//判断是否有提交前操作对象传入
		if(onAction && onAction != ""){
			var onActionFun = eval(onAction);
			if(!onActionFun(checks)){
				return ;
			}
		}
		
		if("true" == open){//新打开窗口
			if(actionurl.indexOf("?") > 0){
				window.location = actionurl+"&"+ jQuery.param(checks);
			}else{
				window.location = actionurl+"?"+ jQuery.param(checks);
			}
			return;
		}
		if ($(this).attr("title") != "") {
			simpleConfirm("请确认要"+ $(this).attr("title") + "选择的项？",'取消',function(){
				$.ajax(actionurl,{
					cache:false,
					type:'POST',
					dataType:'json',
					data: jQuery.param(checks),
					success:function(resp, textStatus){
						  if (resp.success) {
						        var msg = resp.message;
						        var url = resp.url;
						        if (url && url.indexOf('http') != 0 && url.indexOf("javascript") != 0) {
						            url = G_CTX_ROOT + url;
						        }
						        if (msg) {
						            if (url) {
						                simpleAlert(msg, function() {
						                    location.href = url;
						                });
						            } else {
						                simpleAlert(msg);
						            }
						        } else {
						            if (url) {
						                location.href = url;
						            }
						        }
						} else {
						        var msg = resp.errorMessage;
						        var errors = resp.errors;
						        if (msg) {
						            simpleWarn("出现未知错误，请联系管理员！ <br/><br/>错误信息：" + msg);
						        }else{
						        	 simpleWarn( "出现未知错误，请联系管理员！ ");
						        }
						}
					}
				});
			});
		} else {
			$.ajax({
				cache:false,
				type:'POST',
				url : actionurl,
				dataType:'json',
				success:function(resp){
					  if (resp.success) {
					        var msg = resp.message;
					        var url = resp.url;
					        if (url && url.indexOf('http') != 0 && url.indexOf("javascript") != 0) {
					            url = G_CTX_ROOT + url;
					        }
					        if (msg) {
					            if (url) {
					                simpleAlert(msg, function() {
					                    location.href = url;
					                });
					            } else {
					                simpleAlert(msg);
					            }
					        } else {
					            if (url) {
					                location.href = url;
					            }
					        }
					} else {
					        var msg = resp.errorMessage;
					        var errors = resp.errors;
					        if (msg) {
					            simpleWarn("出现未知错误，请联系管理员！ <br/><br/>错误信息：" + msg);
					        }else{
					        	 simpleWarn( "出现未知错误，请联系管理员！ ");
					        }
					}
				}
			});
		}
		
	});
	//初始化排序
	$('table.datalist .tableSort').click(function(){
	    var localurl = window.location.toString();
	    var orderBy = $(this).attr("orderBy");
	    //window.location = localurl + "?tableOrderBy=" + orderBy +"&tableOrder=asc";
	    //TODO:没有实现 ，需要实现选择字段后台的跳转 及字段的升降显示在标签中处理
	});
	
	//初始化可编辑字段
	$("table.datalist .edit-input").click(function(){
		var editArea = $(this);
		var content = editArea.text();
		var param = editArea.attr("param");//请求参数值
		var editAction =  editArea.attr("action");
		var newInput = $("<input type='input' value='"+content+"' style='width:"+editArea.innerWidth() +"'/>");
		newInput.blur(function(){
			if(jQuery.trim(content)  == jQuery.trim($(this).val()) ){
				$(this).parent("span").html(content);
			}else{
				var url = G_CTX_ROOT;
				if(!jQuery.isEmptyObject( $("table.datalist").attr("action"))){
					url +=  $("table.datalist").attr("action") ;
				}
				url +=  editAction;
				var datas = param +"=" +  newInput.val();
				$.ajax(url,{
					cache:false,
					type:'POST',
					dataType:'json',
					data: datas,
					success:function(resp, textStatus){
						if (resp.success) {
							newInput.parent("span").html(newInput.val());      
						} else {
							newInput.parent("span").html(content);        
						}
						$(this).remove();
					},
					error:function(){
						newInput.parent("span").html(content);     
						$(this).remove();
					},
					statusCode: {
						404: function() {
							newInput.parent("span").html(content);       
							$(this).remove();
						},
						500: function() {
							newInput.parent("span").html(content);    
							$(this).remove();
						}
					 }

				});
			}
		});
		editArea.html(newInput);
		newInput.focus();
		
	});
	
	//初始化 区域点击请求
	$("table.datalist .edit-area").click(function(){
		var editArea = $(this);
		var content = editArea.text();
		var editAction =  editArea.attr("action");
		var actionurl = G_CTX_ROOT;
		if(!jQuery.isEmptyObject( $("table.datalist").attr("action"))){
			actionurl +=  $("table.datalist").attr("action") ;
		}
		actionurl +=  editAction;
		$.ajax(actionurl,{
			cache:false,
			type:'GET',
			dataType:'json',
			success:function(resp, textStatus){
				if (resp.success) {
					 var url = resp.url;
					editArea.html(resp.message);      
					if(url){
						editArea.attr("action",url);
					}
				} else {
					editArea.html(content);        
				}
			},
			error:function(){
				editArea.html(content);          
			},
			statusCode: {
				404: function() {
					editArea.html(content);          
				},
				500: function() {
					editArea.html(content);        
				}
			 }
		});
	});
}
/**
 * 获得table中选择的checkbox
 * @returns
 */
var dataTableChecked = function(){
	return $('table.datalist tr input[type=checkbox]:checked:not(.checkall)');
}
/**
 * table radio 选中
 * @returns
 */
var dataTableRadioChecked = function(){
	return $('table.datalist tr input[type=radio]:checked');
}



function changeParam(pname, val) {
    var localurl = window.location.toString();
    var newlocal = new Uri(localurl).replaceQueryParam('page.page', 0).replaceQueryParam(pname, val).toString();
    window.location = newlocal;
    return false;
}



function changeSort(sort) {
    var localurl = window.location.toString();
    var newlocal = new Uri(localurl).replaceQueryParam('page.page', 0).replaceQueryParam('page.sort', sort).toString();
    window.location = newlocal;
    return false;
}

function changeCate(cateCode) {
    var localurl = window.location.toString();
    var newlocal = new Uri(localurl).replaceQueryParam('page.page', 0).replaceQueryParam('category', cateCode).toString();
    window.location = newlocal;
    return false;
}

function changePreSort(sort, pre) {
    var localurl = window.location.toString();
    var newlocal = new Uri(localurl).replaceQueryParam(pre+'.page.page', 0).replaceQueryParam(pre+'.page.sort', sort).toString();
    window.location = newlocal;
    return false;
}

function changeQSort(sort) {
    changePreSort(sort, 'q');
}
function changeASort(sort) {
    changePreSort(sort, 'a');
}
function changeDSort(sort) {
    changePreSort(sort, 'd');
}

 
function dealInfo(msg,url,customCallBack){
	if(url.indexOf('?')>0) {
		url+= "&backUrl="+window.location.href;
	}else {
		url+= "?backUrl="+window.location.href;
	}
	if(msg.length>0){
		if(!confirm(msg)) {
			return; 
		}
	}
	waitBlock();
    jQuery.ajax({
    	type : "get",
    	url : url,
    	dataType:  'json',
    	cache:false,
    	success : function(resp){	
		  if ($.isFunction(customCallBack)) {
              customCallBack.call(this, resp);
              return;
          }
		  if (resp.success) {
		        var msg = resp.message;
		        var url = resp.url;
		        if (url && url.indexOf('http') != 0 && url.indexOf("javascript") != 0) {
		            url = G_CTX_ROOT + url;
		        }
		        if (msg) {
		            if (url) {
		                simpleAlert(msg, function() {
		                    location.href = url;
		                });
		            } else {
		                simpleAlert(msg);
		            }
		        } else {
		            if (url) {
		                location.href = url;
		            }
		        }
		    } else {
		        var msg = resp.errorMessage;
		        var errors = resp.errors;
		        if (msg) {
		            simpleWarn("出现未知错误，请联系管理员！ <br/><br/>错误信息：" + msg);
		        }
		    }
    	}
    });
}

function deleteItem(url,customCallBack){ 
	dealInfo("确定要删除此条记录吗？",url,customCallBack);
}

function enableItem(url,customCallBack){ 
	dealInfo("确定要启用此条记录吗？",url,customCallBack);
}

/**
 * 弹出dialog对话框，可以指定地址
 * @param title 标题
 * @param url 要打开的地址
 * @param fn 要回调的函数 函数会传入参数是打开窗口的document
 * @param opts 要修改dialog的一些打开参数，可以修改，不是必填
 */
function showDialog(title,url,fn,opts){
	var param = $.extend({
		ID    : "custom-dialog",
		Title :  title,
		Height: 350,
		Width : 550,
		ShowButtonRow : true,
		URL : url	
	},opts||{});
	
	var diag = new Dialog(param);
	diag.CancelEvent=function(){diag.close();};
	diag.OKEvent = function(){
		if(jQuery.isFunction(fn)){
			 fn(diag.innerDoc,diag.innerWin);
		}
		 diag.close();
	};
	
	if(param.ShowMessageRow){
		diag.Message = title;
	}
	diag.show();
	
	diag.okButton.value="确 定";
	diag.cancelButton.value="关 闭";
	
	
	if(opts && opts.ShowButtonRow !=undefined && !opts.ShowButtonRow){
	    diag.okButton.style.display = "none";
	}
}

/**
 * 选择多个商品
 * @param selectedItems
 * @param callback
 * @param opts
 */
function selectGoods(selectedItems,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900,
		storeId:'',
		itemMode:'',//实物 0 虚拟物 1
		areaCode:''//商品区域
	},opts||{});
	
	
	var url = G_CTX_ROOT + "/item/item/selectItems?ids=" + selectedItems+"&storeId=" + param.storeId + "&itemMode="+param.itemMode+"&saleAreaCode="+param.areaCode;
	
	showDialog("选择商品",url,function(innerDoc,innerWin){
		var ids = [];
		var txts = [];
		$("#second option",innerDoc).each(function(){
			ids.push($(this).val());
			txts.push($(this).text());
		});
		if(jQuery.isFunction(callback)){
			callback(ids,txts,innerDoc,innerWin);
		}
	},param);
}

/**
 * 选择多个有机商品
 * @param selectedItems
 * @param callback
 * @param opts
 */
function selectGoods_green(selectedItems,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900,
		storeId:'',
		itemMode:'',//实物 0 虚拟物 1
		areaCode:'',//商品区域
		channel:'',//频道
		groupId:''//楼层
	},opts||{});
	
	
	var url = G_CTX_ROOT + "/item/item/selectItems_green?ids=" + selectedItems+"&storeId=" + param.storeId + "&itemMode="+param.itemMode+"&saleAreaCode="+param.areaCode+"&channel="+param.channel+"&floorId="+param.groupId;
	//alert(url);
	
	showDialog("选择商品",url,function(innerDoc,innerWin){
		var ids = [];
		var txts = [];
		$("#second option",innerDoc).each(function(){
			ids.push($(this).val());
			txts.push($(this).text());
		});
		if(jQuery.isFunction(callback)){
			callback(ids,txts,innerDoc,innerWin);
		}
	},param);
}

/**
 * 选择多个商城币商品
 * @param selectedItems
 * @param callback
 * @param opts
 */
function selectGoods_coin(selectedItems,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900,
		storeId:'',
		itemMode:'',//实物 0 虚拟物 1
		areaCode:''//商品区域
	},opts||{});
	
	
	var url = G_CTX_ROOT + "/item/item/selectItems_coin?ids=" + selectedItems+"&storeId=" + param.storeId + "&itemMode="+param.itemMode+"&saleAreaCode="+param.areaCode;
	
	showDialog("选择商品",url,function(innerDoc,innerWin){
		var ids = [];
		var txts = [];
		$("#second option",innerDoc).each(function(){
			ids.push($(this).val());
			txts.push($(this).text());
		});
		if(jQuery.isFunction(callback)){
			callback(ids,txts,innerDoc,innerWin);
		}
	},param);
}

/**
 * 选择一个商品
 * @param selectedItems
 * @param callback
 * @param opts
 */
function selectSinggleGood(selectedItems,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	showDialog("选择商品", G_CTX_ROOT + "/item/item/selectSingleItem?&ids=" +selectedItems ,function(innerDoc,innerWin){
		
		var selectRadio = $("input[name='itemSelector']:checked",innerDoc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("itmeName");
			var valTxt1 =selectRadio.attr("storename")
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,valTxt1,innerDoc,innerWin);
			}
		}
	},param);
}

/**
 * 选择一个商户的商品
 * @param selectedItems
 * @param callback
 * @param opts
 */
function selectSinggleGoodByStoreId(selectedItems,storeId,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	showDialog("选择商品", G_CTX_ROOT + "/item/item/selectSingleItem?&ids=" +selectedItems +"&storeId=" +storeId ,function(innerDoc,innerWin){
		
		var selectRadio = $("input[name='itemSelector']:checked",innerDoc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("itmeName");
			var valTxt1 =selectRadio.attr("storename")
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,valTxt1,innerDoc,innerWin);
			}
		}
	},param);
}





/**
 * 选择一个推广商品
 * @param selectedItems
 * @param callback
 * @param opts
 */
function selectSpreadlist(selectedItems,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	showDialog("选择推广商品", G_CTX_ROOT + "/spread/list_forms?&ids=" +selectedItems ,function(innerDoc,innerWin){
		
		var selectRadio = $("input[name='itemSelector']:checked",innerDoc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("itmeName");
			var valTxt1 =selectRadio.attr("itemtypes");
			var valTxt2 =selectRadio.attr("itemprice");
			var valTxt3 =selectRadio.attr("itemremark");
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,valTxt1,valTxt2,valTxt3,innerDoc,innerWin);
			}
		}
	},param);
}

function changeItem(url,customCallBack){
 	dealInfo("确定要变更记录吗？",url,customCallBack);
}

/**
 * 选择一个商品
 * @param selectedItems
 * @param callback
 * @param opts
 */
function selectlipin(selectedItems,itemType,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	showDialog("选择商品", G_CTX_ROOT + "/item/item/selectSinglelipin?i="+itemType+"&ids=" +selectedItems ,function(innerDoc,innerWin){
		
		var selectRadio = $("input[name='itemSelector']:checked",innerDoc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("itmeName");
			var valTxt1 =selectRadio.attr("storename")
			
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,valTxt1,innerDoc,innerWin);
			}
		}
	},param);
}
/**
 * 选择一个短信购
 * @param selectedItems
 * @param callback
 * @param opts
 */
function selectRouter(selectedItems,itemType,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	showDialog("选择商品", G_CTX_ROOT + "/item/item/selectSinglelipin?i="+itemType+"&ids=" +selectedItems ,function(innerDoc,innerWin){
		
		var selectRadio = $("input[name='itemSelector']:checked",innerDoc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("itmeName");
			var valTxt1=selectRadio.attr("shortName");
			var valTxt2=selectRadio.attr("shopPrice");
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,valTxt1,valTxt2,innerDoc,innerWin);
			}
		}
	},param);
	
}

/**
 * 选择码库
 * @param callback
 * @param opts
 * @return
 */
function selectCodeHouse(storeId,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	showDialog("选择码库", G_CTX_ROOT + "/item/thirdcode/selectCodeHouse?i="+storeId ,function(innerDoc,innerWin){
		
		var selectRadio = $("input[name='itemSelector']:checked",innerDoc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("codeHouseId");
			var valTxt1=selectRadio.attr("codeHouseName");
			var valTxt2=selectRadio.attr("codeType");
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt1,valTxt2,innerDoc,innerWin);
			}
		}
	},param);
	
}


/**
 * 选择区域方法
 * @param selector jquery选择器，要弹出地区选择的元素 选择器
 * @param returnValueId  返回的id列表，要匹配的元素id（要input元素），
 * @param returnTxtId 返回的文字列表
 * @param pid 要查询的父区域id，默认为0
 * @param opts 可选。指定弹出选择的参数{} ，具体参考jquery-levelSelect-ajax.js 中的参数说明
 */
function selectRegion(selector,returnValueId,returnTxtId,pid,opts){

	$( selector).click(function(){
		var param = $.extend({
			maxItems : 32,
			pid : pid,
			title:'区域选择',
			url: G_CTX_ROOT + '/sys/region/selectRegion',
			returnText : returnTxtId,
			returnValue : returnValueId,
			span_width : {d1:120,d2:120,d3:120},
			index :$(selector).index(),
			regionElement:$(this)		
		},opts||{});
		$.openLayer(param);
	});
}



/**
 * 选择区域方法
 * @param selector jquery选择器，要弹出地区选择的元素 选择器
 * @param callback 回调函数，点击“确定” 按钮时会调用，传入2个参数， returnValueStr 返回的id列表str，eturnTxtStr 返回的文字列表str
 * @param pid 要查询的父区域id，默认为0
 * @param opts 可选。指定弹出选择的参数{} ，具体参考jquery-levelSelect-ajax.js 中的参数说明
 */
function selectRegionCallBack(selector,callback,pid,opts){
	var param = $.extend({
		callback:callback
	},opts||{});
	selectRegion(selector,'','',pid,param);
}

/**
 * 
 * @param type 1-shop 2-goods
 * @param returnValueId
 * @param returnTxtId
 * @param opts {selected:'选中的id',one:true(是否单选)}
 */
function selectType(type,returnValueId,returnTxtId,opts){
	var set_returnVals  = function(id,vals) {	//按"确定"按钮时处理、设置返回值
		if(id != ""){
			var Container = $("#" + id);
			if(Container.length > 0){
				if(Container.is("input")){
					Container.val(vals.substring(1));
				}else{
					Container.text(vals.substring(1));
				}
			}
		}	
	};
	
	var param = $.extend({
		one : false,//是否单选
		selected:"",//选中的id，逗号分隔
		callback:""//回调方法
	},opts||{});
	
	var url = G_CTX_ROOT + '/sys/type/selectType?type=' + type;
	if(param.one){
		url += "&isone=true"
	}
	if(param.selected){
		url += "&selected="+param.selected;
	}
	
	showDialog("选择类别",url, function(doc,win){
		var zTree = win.$.fn.zTree.getZTreeObj("treeContainer");
		var nodes = zTree.getCheckedNodes(true);
		var vals = "";
		var txts = "";
		var tmp = "";
		for(var i =0;i<nodes.length;i++){
			var node = nodes[i];
			vals += ("," +node.id);
			tmp = node.name;
			node =  node.getParentNode();
			while(!jQuery.isEmptyObject(node) ){
				tmp = (node.name) +"/" +tmp ;
				node = node.getParentNode();
			}
			txts += ("," +tmp);
		}
		
		if(jQuery.isFunction(param.callback)){
			param.callback(vals,txts);
		}else{
			set_returnVals(returnValueId,vals);
			set_returnVals(returnTxtId,txts);
		}
		
	},{ShowMessageRow:true,
		Height: 350,
		Width : 300});
}


/**
 * 
 */
function selectItemType(selector,callback,opts){
	//判断容器是否存在
	var typeBox = $("#typeContentBox");
	if(typeBox.length == 0){
		typeBox = $('<div id="typeContentBox"  style="border: 1px solid rgb(127, 157, 185);background:#ffffff;display:none; position: absolute;"><ul id="typeTreeBox" class="ztree" style="margin-top:0; width:280px;">正在加载数据，请稍后...</ul></div>');
		$("body").append(typeBox);
	}
	var param = $.extend({
		type:2,//商品分类
		leaf:true//是否只允许选择页节点
	},opts||{});
	
	var setting = {
			view: {
				dblClickExpand: false,
				expandSpeed: ""
			},
			data: {
				simpleData: {
					enable: true,
					 idKey: "id",
                     pIdKey: "pId",
                     rootPId: 0
				}
			},
			async: {
				enable: true,
				url:  G_CTX_ROOT + '/sys/type/selectItemType',
				dataType : "json",
				autoParam: ["id"],
				otherParam: ["type", param.type],
				dataFilter : function(treeId, parentNode, responseData){
					return responseData;
				}
			},
			callback: {
				beforeClick: function beforeClick(treeId, treeNode) {
					if(param.leaf){
						var check = (treeNode && !treeNode.isParent);
						return check;
					}else{
						return true;
					}
				},
				onClick: function onClick(e, treeId, treeNode) { //判断只能选择子节点
					callback(treeNode.id,treeNode.name);
					$("#typeContentBox").fadeOut("fast");
					$("body").unbind("mousedown", onBodyDown);
				}				
			}
		};
		
		$(selector).click(function(){
			var treeObj = $.fn.zTree.getZTreeObj("typeTreeBox");
			if(!treeObj){
				$.fn.zTree.init($("#typeTreeBox",typeBox), setting);
			}
			var thisOffset = $(this).offset();
			typeBox.css({left:thisOffset.left + "px", top:thisOffset.top + $(this).outerHeight() + "px"}).slideDown("fast");
			$("body").bind("mousedown", onBodyDown);
		});
		
		
		function onBodyDown(event) {
			if (!($(event.target).attr("id")== $(selector).attr("id") || event.target.id == "typeContentBox" || $(event.target).parents("#typeContentBox").length>0)) {
				$("#typeContentBox").fadeOut("fast");
				$("body").unbind("mousedown", onBodyDown);
			}
		}
}

/**
 * 选择会员类别 added by：yudj 2014-11-28
 */
function selectMemberType(selector,callback,opts){
	//判断容器是否存在
	var typeBox = $("#typeContentBox");
	if(typeBox.length == 0){
		typeBox = $('<div id="typeContentBox"  style="border: 1px solid rgb(127, 157, 185);background:#ffffff;display:none; position: absolute;"><ul id="typeTreeBox" class="ztree" style="margin-top:0; width:280px;">正在加载数据，请稍后...</ul></div>');
		$("body").append(typeBox);
	}
	var param = $.extend({
		leaf:false//是否只允许选择叶子节点
	},opts||{});
	
	var setting = {
			view: {
				dblClickExpand: false,
				expandSpeed: ""
			},
			data: {
				simpleData: {
					enable: true,
					 idKey: "id",
                     pIdKey: "pId",
                     rootPId: 0
				}
			},
			async: {
				enable: true,
				url:  G_CTX_ROOT + '/membercenter/memberTypeManage/selectMemberType',
				dataType : "json",
				autoParam: ["id"],
				dataFilter : function(treeId, parentNode, responseData){
					return responseData;
				}
			},
			callback: {
				beforeClick: function beforeClick(treeId, treeNode) {
					if(param.leaf){
						var check = (treeNode && !treeNode.isParent);
						return check;
					}else{
						return true;
					}
				},
				onClick: function onClick(e, treeId, treeNode) { //判断只能选择子节点
					callback(treeNode.id,treeNode.name,treeNode.pId);
					$("#typeContentBox").fadeOut("fast");
					$("body").unbind("mousedown", onBodyDown);
				}				
			}
		};
		
		$(selector).click(function(){
			var treeObj = $.fn.zTree.getZTreeObj("typeTreeBox");
			if(!treeObj){
				$.fn.zTree.init($("#typeTreeBox",typeBox), setting);
			}
			var thisOffset = $(this).offset();
			typeBox.css({left:thisOffset.left + "px", top:thisOffset.top + $(this).outerHeight() + "px"}).slideDown("fast");
			$("body").bind("mousedown", onBodyDown);
		});
		
		
		function onBodyDown(event) {
			if (!($(event.target).attr("id")== $(selector).attr("id") || event.target.id == "typeContentBox" || $(event.target).parents("#typeContentBox").length>0)) {
				$("#typeContentBox").fadeOut("fast");
				$("body").unbind("mousedown", onBodyDown);
			}
		}
}

/**
 * 选择特惠频道商品分类
 */
function selectChannelType(selector,callback,opts){
	//判断容器是否存在
	var typeBox = $("#typeContentBox");
	if(typeBox.length == 0){
		typeBox = $('<div id="typeContentBox"  style="border: 1px solid rgb(127, 157, 185);background:#ffffff;display:none; position: absolute;"><ul id="typeTreeBox" class="ztree" style="margin-top:0; width:280px;">正在加载数据，请稍后...</ul></div>');
		$("body").append(typeBox);
	}
	var param = $.extend({
		leaf:true
	},opts||{});
	
	var setting = {
			view: {
				dblClickExpand: false,
				expandSpeed: ""
			},
			data: {
				key:{
					name:"typeName"
				},
				simpleData: {
					enable: true,
					 idKey: "id",
                     pIdKey: "pid",
                     rootPId: 0
				}
			},
			async: {
				enable: true,
				url:  G_CTX_ROOT + '/item/welfare/selectChannelType',
				dataType : "json",
				autoParam: ["id"],
				dataFilter : function(treeId, parentNode, responseData){
					return responseData;
				}
			},
			callback: {
				beforeClick: function beforeClick(treeId, treeNode) {
					if(param.leaf){
						var check = (treeNode && !treeNode.isParent);
						return check;
					}else{
						return true;
					}
				},
			onClick: function onClick(e, treeId, treeNode) { //判断只能选择子节点
				callback(treeNode.id,treeNode.typeName,treeNode.pid);
				$("#typeContentBox").fadeOut("fast");
				$("body").unbind("mousedown", onBodyDown);
			}				
		}
	};
		
	$(selector).click(function(){
		var treeObj = $.fn.zTree.getZTreeObj("typeTreeBox");
		if(!treeObj){
			$.fn.zTree.init($("#typeTreeBox",typeBox), setting);
		}
		var thisOffset = $(this).offset();
		typeBox.css({left:thisOffset.left + "px", top:thisOffset.top + $(this).outerHeight() + "px"}).slideDown("fast");
		$("body").bind("mousedown", onBodyDown);
	});
		
		
	function onBodyDown(event) {
		if (!($(event.target).attr("id")== $(selector).attr("id") || event.target.id == "typeContentBox" || $(event.target).parents("#typeContentBox").length>0)) {
			$("#typeContentBox").fadeOut("fast");
			$("body").unbind("mousedown", onBodyDown);
		}
	}
}

//选择商户自定义分类
function selectStoreShelf(selector,storeId,callback,opts){
	//判断容器是否存在
	var treeBox = {
			treeId : "storeShelfTreeBox",
			boxId :  "storeShelfTreeBoxContentBox",			 
			storeShelfBox:null,//选择区域box
			 init :function(){ //初始化区域
				this.storeShelfBox = $("#" +this.boxId);
			  	if(this.storeShelfBox.length == 0){
			  		this.storeShelfBox = $('<div id="'+this.boxId+'"  style="border: 1px solid rgb(127, 157, 185);background:#ffffff;display:none; position: absolute;"><ul id="'+this.treeId+'" class="ztree" style="margin-top:0; width:280px;"></ul></div>');
					$("body").append(this.storeShelfBox);
				 }
			 },
			 onBodyDown:function (event) { //鼠标点击事件
					if (!($(event.target).attr("id")== $(selector).attr("id") || event.target.id == treeBox.boxId || $(event.target).parents("#" +treeBox.boxId).length>0)) {
						$("#" + treeBox.boxId).fadeOut("fast");
						$("body").unbind("mousedown", treeBox.onBodyDown);
					}
		     },
		     clearTreeBox :function(){//清空
		    	// console.log(this.storeShelfBox);
		    	 if(this.storeShelfBox){
		    		var treeObj  = $.fn.zTree.getZTreeObj(this.treeId);
		    		if(treeObj){
		    			treeObj.destroy();
		    		}
		    	   this.storeShelfBox.remove();
		    	   this.storeShelfBox = null;
		    	 }
		     },
		     setting : { //tree setting 
		 			view: {
		 				dblClickExpand: false,
		 				expandSpeed: ""
		 			},
		 			data: {
		 				simpleData: {
		 					enable: true,
		 					 idKey: "id",
		                     pIdKey: "pid",
		                     rootPId: 0
		 				}
		 			},
		 			async: {
		 				enable: true,
		 				url:  G_CTX_ROOT + '/store/shelf/select',
		 				dataType : "json"
		 			},
		 			callback: {
		 				onClick: function onClick(e, treeId, treeNode) { //判断只能选择子节点
		 					callback(treeNode.id,treeNode.name);
		 					$("#" + treeBox.boxId).fadeOut("fast");
		 					$("body").unbind("mousedown", treeBox.onBodyDown);
		 				}				
		 			}
		 		}			
	
	};
		
		$(selector).click(function(){
			var treeObj = $.fn.zTree.getZTreeObj(treeBox.treeId);
			if( $("#"+storeId ).val() == ''){
				return;
			}
			treeBox.setting.async.url = G_CTX_ROOT + '/store/shelf/select?shopId=' +  $("#"+storeId ).val();
			if(!treeBox.storeShelfBox){
				treeBox.init();
				$.fn.zTree.init($("#"+treeBox.treeId ,treeBox.storeShelfBox), treeBox.setting);
			}
			var thisOffset = $(this).offset();
			treeBox.storeShelfBox.css({left:thisOffset.left + "px", top:thisOffset.top + $(this).outerHeight() + "px"}).slideDown("fast");
			$("body").bind("mousedown", treeBox.onBodyDown);
		});
		
		return treeBox;
}

/**
 * 选择品牌
 * @param returnValueId 写入的文本框id
 * @param opts
 */
function selectBrand(returnValueId,opts){
	var set_returnVals  = function(id,vals) {	//按"确定"按钮时处理、设置返回值
		if(id != ""){
			var Container = $("#" + id);
			if(Container.length > 0){
				if(Container.is("input")){
					Container.val(vals);
					Container.focus();
					Container.blur();
				}else{
					Container.text(vals);
				}
			}
		}	
	};
	
	var param = $.extend({
		callback:""//回调方法
	},opts||{});
	
	var url = G_CTX_ROOT + '/item/brand/selectBrand';
	
	showDialog("选择品牌",url, function(doc,win){
		var selectLi = $("ul.brandList li.selected",doc);
		if(selectLi.length > 0){
			var vals = $(selectLi[0]).text();
			if(jQuery.isFunction(param.callback)){
				param.callback(vals);
			}else{
				set_returnVals(returnValueId,vals);
			}
		}
	},{ShowMessageRow:false,
		Height: 350,
		Width : 300});
}

/**
 * 选择多个商户
 * @param selectedItems
 * @param shopClass 商户类型 3-渠道商 2-商户
 * @param callback
 * @param opts
 */
function selectMultiGoods(selectedItems,shopClass,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	
	showDialog("选择商户", G_CTX_ROOT + "/store/store/findStore?shopClass="+shopClass+"&ids=" + selectedItems ,function(innerDoc,innerWin){
		var ids = [];
		var txts = [];
		$("#second option",innerDoc).each(function(){
			ids.push($(this).val());
			txts.push($(this).text());
		});
		if(jQuery.isFunction(callback)){
			callback(ids,txts,innerDoc,innerWin);
		}
	},param);
}

/**选择商户页面（兼容二期与三期商户）
 * 
 * @param shopClass
 * @param callback
 * @param opts
 */
function selectStoreCallBack(shopClass,callback,opts){
   
	var param = $.extend({	
		ShowMessageRow:false,
		Height: 500,
		Width : 700},opts||{});
	

	
	var url = G_CTX_ROOT + '/store/store/selectTotalStore';
	if(shopClass!= ""){
		url += "?shopClass=" +shopClass ;
	}
	
	showDialog("选择商户",url, function(doc,win){
		var selectRadio = $("input[name='shopIdSelector']:checked",doc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("shopName");
			var valShopClass =selectRadio.attr("shopClass");
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,valShopClass,doc,win);
			}
		}
	},param);
}







/**选择商户页面（兼容二期与三期商户）（码管理专用）
 * 
 * @param shopClass
 * @param callback
 * @param opts
 */
function selectStoreCallBackCode(shopClass,callback,opts){
   
	var param = $.extend({	
		ShowMessageRow:false,
		Height: 500,
		Width : 700},opts||{});
	

	
	var url = G_CTX_ROOT + '/store/store/selectTotalStore';
	if(shopClass!= ""){
		url += "?shopClass=" +shopClass ;
	}
	
	showDialog("选择商户",url, function(doc,win){
		var selectRadio = $("input[name='shopIdSelector']:checked",doc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("shopName");
			var valAreaName =selectRadio.attr("areaName");
			var valShopClass =selectRadio.attr("shopClass");
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,valAreaName,valShopClass,doc,win);
			}
		}
	},param);
}


/**
 * 
 * @param shopClass
 * @param callback
 * @param opts
 */
function selectStoreCallBackHaveArea(shopClass,callback,opts){
   
	var param = $.extend({	
		ShowMessageRow:false,
		Height: 500,
		Width : 700},opts||{});
	
	var url = G_CTX_ROOT + '/store/store/selectStore';
	if(shopClass!= ""){
		url += "?shopClass=" +shopClass ;
	}
	
	showDialog("选择商户",url, function(doc,win){
		var selectRadio = $("input[name='shopIdSelector']:checked",doc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("shopName");
			var areaName =selectRadio.attr("areaName");
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,areaName,doc,win);
			}
		}
	},param);
}






/**选择商户页面（配置渠道商『商户』）
 * 
 * @param shopClass
 * @param callback
 * @param opts
 
 */
function selectStoreInstruction(shopClass,callback,opts){
   
	var param = $.extend({	
		ShowMessageRow:false,
		Height: 500,
		Width : 700},opts||{});
	

	
	var url = G_CTX_ROOT + '/join/twoChannel/selectInstructionStore';
	if(shopClass!= ""){
		url += "?shopClass=" +shopClass ;
	}
	
	showDialog("选择商户",url, function(doc,win){
		var selectRadio = $("input[name='shopIdSelector']:checked",doc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("storeName");
			var shortName =selectRadio.attr("shortName");
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,shortName,doc,win);
			}
		}
	},param);
}




/**选择商户页面（配置渠道商『渠道商』）
 * 
 * @param shopClass
 * @param callback
 * @param opts
 
 */
function selectStoreChannel(shopClass,callback,opts){
   
	var param = $.extend({	
		ShowMessageRow:false,
		Height: 500,
		Width : 700},opts||{});
	

	
	var url = G_CTX_ROOT + '/join/twoChannel/selectChannelStore';
	if(shopClass!= ""){
		url += "?shopClass=" +shopClass ;
	}
	
	showDialog("选择商户",url, function(doc,win){
		var selectRadio = $("input[name='shopIdSelector']:checked",doc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("storeName");
			var shortName =selectRadio.attr("shortName");
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,shortName,doc,win);
			}
		}
	},param);
}






/**
 * 选择商户 单选
 * @param returnValueId 返回的id
 * @param returnTxtId 返回的文本
 * @param opts
 */
function selectStore(returnValueId,returnTxtId,returnShopClassId,opts){
	var set_returnVals  = function(id,vals) {	//按"确定"按钮时处理、设置返回值
		if(id != ""){
			var Container = $("#" + id);
			if(Container.length > 0){
				if(Container.is("input")){
					Container.val(vals);
				}else{
					Container.text(vals);
				}
			}
		}	
	};
	
	var param = $.extend({
		callback:"",//回调方法
		shopClass:'',//商户类型
		merchid:''//商户结算ID
	},opts||{});
	
	var url = G_CTX_ROOT + '/store/store/selectStore';
	if(param.shopClass != "" || param.shopMerchid != ""){
		url += "?shopClass=" +param.shopClass + "&merchid=" +param.merchid;
	}
	
	showDialog("选择商户",url, function(doc,win){
		var selectRadio = $("input[name='shopIdSelector']:checked",doc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("shopName");
			var valShopClass =selectRadio.attr("shopClass");
			var valId =selectRadio.val();
			if(jQuery.isFunction(param.callback)){
				param.callback(vals);
			}else{
				set_returnVals(returnValueId,valId);
				set_returnVals(returnTxtId,valTxt);
				set_returnVals(returnShopClassId,valShopClass);
				$("#"+returnTxtId).focus();
				$("#"+returnTxtId).blur();
				
			}
			
		}
	},{ShowMessageRow:false,
		Height: 500,
		Width : 700});
}

//选择门店
function selectAllShop(returnValueId,returnTxtId,returnValuesId,returnTxtsId,opts){
	var set_returnVals  = function(id,vals) {	//按"确定"按钮时处理、设置返回值
		if(id != ""){
			var Container = $("#" + id);
			if(Container.length > 0){
				if(Container.is("input")){
					Container.val(vals);
				}else{
					Container.text(vals);
				}
			}
		}	
	};
	
	var param = $.extend({
		callback:""//回调方法
	},opts||{});
	
	var url = G_CTX_ROOT + '/store/shop/selectShop';
	
	showDialog("选择门店",url, function(doc,win){
		var selectRadio = $("input[name='shopIdSelector']:checked",doc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("shopName");
			var valId =selectRadio.val();
			var valsId =selectRadio.attr("storeId");
			var valTxts =selectRadio.attr("storeName");
			if(jQuery.isFunction(param.callback)){
				param.callback(vals);
			}else{
				set_returnVals(returnValueId,valId);
				set_returnVals(returnTxtId,valTxt);
				set_returnVals(returnValuesId,valsId);
				set_returnVals(returnTxtsId,valTxts);
				$("#"+returnTxtId).focus();
				$("#"+returnTxtId).blur();
				
			}
			
		}
	},{ShowMessageRow:false,
		Height: 500,
		Width : 900});
}

/**
 * 选择门店
 * @param storeId 商户编号
 * @param selectedItems 已选的门店
 * @param callback 回调
 * @param opts 
 */
function selectShop(storeId,selectedItems,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	
	showDialog("选择门店", G_CTX_ROOT + "/store/shop/selectStoreShop?storeid="+storeId+"&ids=" + selectedItems ,function(innerDoc,innerWin){
		var ids = [];
		var txts = [];
		$("input[name='id']:checked",innerDoc).each(function(){
			ids.push($(this).val());
			txts.push($(this).attr("shopName"));
		});
		if(jQuery.isFunction(callback)){
			callback(ids,txts,innerDoc,innerWin);
		}
	},param);
}

/**
 * 选择门店（翻页记忆功能）
 * @param storeId 商户编号
 * @param selectedItems 已选的门店
 * @param callback 回调
 * @param opts 
 */
function selectMoreShop(storeId,selectedItems,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	$.cookie("selectIds",null,{path:'/'});
	$.cookie("selectNames",null,{path:'/'});
	$.cookie("selectIds", selectedItems,{expires:1, path:'/'}); 
	showDialog("选择门店", G_CTX_ROOT + "/store/shop/selectMoreStoreShop?storeid="+storeId,function(innerDoc,innerWin){
	var ids = $.cookie('selectIds').split(",");
	//如果选中门店超过10个，只取前10个
	var idParam = "";
	if(ids.length > 10){
		for(var i = 0;i<10;i++){
			idParam = idParam + ids[i] + ",";
		}
		idParam = idParam.substring(0,idParam.length-1);
	}else{
		idParam = ids;
	}
	$.ajax({
		url : G_CTX_ROOT + "/store/shop/selectShopNames?ids=" + idParam,
		success : function(data) {
			if(jQuery.isFunction(callback)){
				callback(ids,data,innerDoc,innerWin);
				$.cookie("selectIds",null,{path:'/'});
			}
		}
	});
	},param);
}


/**
 * 兼容chrome浏览器的form submit提交
 * @param jqueryForm
 */
function commonSubmit(form){
	//获取浏览器参数  
	var browserName=navigator.userAgent.toLowerCase();  
	if(/chrome/i.test(browserName)&&/webkit/i.test(browserName)&&/mozilla/i.test(browserName)){  
	    //如果是chrome浏览器  
		var jqueryForm = $(form);
	    var tmp=jqueryForm.attr('action');  
	    $.ajaxSetup({ //同步提交表单
	    	async:false
	    });
	    $.post(tmp,jqueryForm.serialize());  
	    $.ajaxSetup({
	    	async:true
	    });
	}else{  
	    //执行SUBMIT  
		form.submit();  
	}  
}

/**
 * 
 * @param shopClass
 * @param callback
 * @param opts
 */
function selectAllStoreCallBack(shopClass,callback,opts){
	
	var param = $.extend({	
		ShowMessageRow:false,
		Height: 500,
		Width : 700},opts||{});
	
	var url = G_CTX_ROOT + '/store/store/selectAllStore';
	if(shopClass!= ""){
		url += "?shopClass=" +shopClass ;
	}
	
	showDialog("选择商户",url, function(doc,win){
		var selectRadio = $("input[name='shopIdSelector']:checked",doc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("shopName");
			var valShopClass =selectRadio.attr("shopClass");
			var valId =selectRadio.val();
			if(jQuery.isFunction(callback)){
				callback(valId,valTxt,valShopClass,doc,win);
			}
		}
	},param);
}

/**
 * 根据商户ID选择商户费率 单选
 * @param returnValueId 返回的id
 * @param returnTxtId 返回的文本
 * @param opts
 */
function selectFeeByStore(returnValueId,returnTxtId,returnShopClassId,opts){
	var set_returnVals  = function(id,vals) {	//按"确定"按钮时处理、设置返回值
		if(id != ""){
			var Container = $("#" + id);
			if(Container.length > 0){
				if(Container.is("input")){
					Container.val(vals);
				}else{
					Container.text(vals);
				}
			}
		}	
	};
	
	var param = $.extend({
		callback:"",//回调方法
		storeId:''
		//shopClass:'',//商户类型
		//merchid:''//商户结算ID
	},opts||{});
	
	var url = G_CTX_ROOT + '/item/hisunproduction/getFeeByStore';
	if(param.shopClass != "" || param.shopMerchid != ""){
		url += "?storeId=" +param.storeId ;
	}
	
	showDialog("选择计费分类",url, function(doc,win){
		var selectRadio = $("input[name='shopIdSelector']:checked",doc);
		if(!jQuery.isEmptyObject(selectRadio)){
			var valTxt =selectRadio.attr("shopName");
			//var valShopClass =selectRadio.attr("shopClass");
			var valId =selectRadio.val();
			if(jQuery.isFunction(param.callback)){
				param.callback(vals);
			}else{
				set_returnVals(returnValueId,valId);
				set_returnVals(returnTxtId,valTxt);
				//set_returnVals(returnShopClassId,valShopClass);
				$("#"+returnTxtId).focus();
				$("#"+returnTxtId).blur();
				
			}
			
		}
	},{ShowMessageRow:false,
		Height: 500,
		Width : 700});
}
/**
 * 选择多个商户
 * @param selectedItems
 * @param shopClass 商户类型 3-渠道商 2-商户
 * @param callback
 * @param opts
 */
function selectMultiGoodsForThird(selectedItems,shopClass,callback,opts){
	var param = $.extend({
		Height: 400,
		Width : 900
	},opts||{});
	
	showDialog("选择商户", G_CTX_ROOT + "/thirdstore/store/findStore?shopClass="+shopClass+"&ids=" + selectedItems ,function(innerDoc,innerWin){
		var ids = [];
		var txts = [];
		$("#second option",innerDoc).each(function(){
			ids.push($(this).val());
			txts.push($(this).text());
		});
		if(jQuery.isFunction(callback)){
			callback(ids,txts,innerDoc,innerWin);
		}
	},param);
}

/**
* 时间对象的格式化
*/
Date.prototype.format = function(format) {
	/*
	 * format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}


function loadPaymentsCallBack(itemId,type,callback){
	$.ajax({
		url: G_CTX_ROOT + '/load/payment/firstProvincePayment?itemId=' +itemId+'&type='+type,
		success:function(data) {
			callback(data);
		}
	});
}

function loadLandPaymentsCallBack(itemId,type,callback){
	$.ajax({
		url: G_CTX_ROOT + '/load/payment/landProvincePayment?itemId=' +itemId+'&type='+type,
		success:function(data) {
			callback(data);
		}
	});
}

function isDecimal(s) {
	var regu = "^([0-9]*[.0-9])$"; 
	var re = new RegExp(regu);
	if (s.search(re) != -1)
		return false;
	else
		return true;
}

