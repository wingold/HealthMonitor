//CharMode函数 
//测试某个字符是属于哪一类.
 
    function CharMode(iN) {
        if (iN >= 48 && iN <= 57) //数字 
            return 1;
        if (iN >= 65 && iN <= 90) //大写字母 
            return 2;
        if (iN >= 97 && iN <= 122) //小写 
            return 4;
        else
            return 8; //特殊字符 
    }
    //bitTotal函数 
    //计算出当前密码当中一共有多少种模式 
    function bitTotal(num) {
        modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) modes++;
            num >>>= 1;
        }
        return modes;
    }
    //checkStrong函数 
    //返回密码的强度级别 
    function checkStrong(sPW) {
        Modes = 0; //输入的字符种类有几种如：a1两种aA_d三种
        for (i = 0; i < sPW.length; i++) {
            //测试每一个字符的类别并统计一共有多少种模式. 
            Modes |= CharMode(sPW.charCodeAt(i));
        }
        Modes = bitTotal(Modes); //由几种字符组成
        var pwdLength = sPW.length; //密码长度
        var level = 0; //密码强度级别
        if (pwdLength < 6 && Modes <= 2)
            level = 0;
        if ((pwdLength < 10 && Modes >= 3) || (pwdLength >= 6 && Modes == 2))
            level = 1;
        if (pwdLength >= 10 && Modes >= 3)
            level = 2;
        return level;
    }
    //pwStrength函数 
    //根据pwd强度改变css样式
    function pwStrength(pwd) {
        var $strength_L = $("#pwd_strength");
		var S_level = 0;
        if (pwd == null || pwd == '') {
            $strength_L.addClass("security0");
        }
        else {
            $strength_L.removeClass("security3");
            $strength_L.removeClass("security2");
            $strength_L.removeClass("security1");
            S_level = checkStrong(pwd);
            switch (S_level) {

                case 0: //低
                    $strength_L.addClass("security0");
                    break;
                case 1: //中
                    $strength_L.addClass("security1");
                    break;
                case 2: //高
                    $strength_L.addClass("security2");
                    break;
                default:
                    $strength_L.addClass("security0");
            }
        }
        return S_level;
    }
$(function() {
    //pwd事件触发：当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色 
    $("#dstPwd").keyup(function () {
       var strength =  pwStrength(this.value);
	   if(strength==0){
		   //表单提交时， 判断strength==0， 不允许提交， 提示“强度强度太弱，请重新输入”
	   }

    });
    //失去光标事件
    $("#dstPwd").blur(function () {
        var strength = pwStrength(this.value);

		if(strength==0){			 
		   //表单提交时， 判断strength==0， 不允许提交， 提示“强度强度太弱，请重新输入”
	   }
    });
 });