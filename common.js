var timer = null;
var ui = {
	openLoading : function() {
		var _html = '<div id="loading" class="dialog fromShade">\
                            <div class="loadingContainer">\
                                <div class="loadingMain">\
                                    <p><i class="icon_spinner9"></i></p>\
                                </div>\
                            </div>\
                    </div>';
		var oLoading = $('#loading').length;
		if (oLoading == 0) {
			$('body').append(_html);
		}
	},
	closeLoading : function() {
		var oLoading = $('#loading');
		oLoading.remove();
	},
	tip : function(str) {
		// 清除定时器
		clearInterval(timer);
		// 提示信息
		var _html = '<div class="tips_dialog"><p>' + str + '</p></div>';
		var sum = $('.tips_dialog').length;
		if (sum == 0) {
			$('.mobanker').append(_html);
		}
		var oTips = $('.tips_dialog');
		oTips.fadeIn();
		// 2秒后关闭提示
		timer = setInterval(function() {
			oTips.fadeOut();
			clearInterval(timer);
			timer = setInterval(function() {
				oTips.remove();
			}, 300);
		}, 3000);
	}
};

/**
 * 手机正则表达式
 */

function ajaxLoading() {
	$("#mask").css("display", "block");
	$("#cashloading").css("display", "block");
}

function fnSlide() {
	var banner = Swipe(document.getElementById('slide'), {
		auto : 4000,
		continuous : true,
		disableScroll : false,
		callback : function(pos) {
			// console.dir(pos);
		}
	});
}

function fnMarquee() {
	var oMarquee = document.getElementById('notes'); // 滚动对象 
	oMarquee.innerHTML += oMarquee.innerHTML;// 元素内部html代码
	window.setTimeout("fnScroll()", 1000);
}
function fnScroll() {
	var oMarquee = document.getElementById('notes'); // 滚动对象 
	var iLineHeight = 22; // 单行高度，像素 
	var iLineCount = 10; // 实际行数 
	var iScrollAmount = 1; // 每次滚动高度，像素
	oMarquee.scrollTop += iScrollAmount;
	if (oMarquee.scrollTop == iLineCount * iLineHeight)
		oMarquee.scrollTop = 0;
	if (oMarquee.scrollTop % iLineHeight == 0) {
		window.setTimeout("fnScroll()", 1000);
	} else {
		window.setTimeout("fnScroll()", 20);
	}
}

function changeTwoDecimal(floatvar) {
	var f_x = parseFloat(floatvar);
	if (isNaN(f_x)) {
		return false;
	}
	var f_x = Math.round(floatvar * 100) / 100;
	return f_x;
}

function fnDialog(_html) {

	var oDialog = document.getElementById('dialog');
	oDialog.style.display = 'block';

	var oDialogContent = document.getElementById('dialogContent');
	var oDialogMain = document.getElementById('dialogMain');
	oDialogMain.innerHTML = _html;

	var oClientW = document.clientWidth || document.body.clientWidth;
	var oClientH = document.scrollHeight || document.body.scrollHeight;
	var oScreenH = document.documentElement.clientHeight;
	oDialog.style.height = oClientH + 'px';
	oDialogContent.style.left = (oClientW - oDialogContent.offsetWidth) / 2
			+ 'px';
	oDialogContent.style.top = (oScreenH - oDialogContent.offsetHeight) / 2
			- 50 + 'px';

	var aA = oDialog.getElementsByTagName('a');
	var i = 0;
	for (i = 0; i < aA.length; i++) {
		aA[i].onclick = function() {
			if (this.getAttribute('name') == 'OK'
					|| this.getAttribute('name') == 'Cancel') { // 确定、取消
				oDialog.style.display = 'none';
			}
		}
	}
}
// 获取className
function fnGetClassName(oParent, sClass) {
	var aEl = oParent.getElementsByTagName('*');
	var aResult = [];
	var i = 0;

	for (i = 0; i < aEl.length; i++) {
		if (aEl[i].className == sClass) {
			aResult.push(aEl[i]);
		}
	}
	return aResult;
}

/*
 * 页面加载调用： dialog.loadingOpen({ time: 3000 });
 */
var dialogopenTimeout = null;
var dialog = {
	loadingOpen : function(arg) {
		var oDiv = document.createElement('div');
		var oHtml = '<p><i class="icon-loading"></i></p>';
		var oHeight = window.screen.height;
		var oWidth = document.body.clientWidth;

		oDiv.id = 'dialogLoading';
		oDiv.className = 'dialogLoading';
		oDiv.innerHTML = oHtml;
		oDiv.style.height = oHeight + 'px';

		var op = oDiv.getElementsByTagName('p')[0];
		op.style.left = (oWidth - 50) / 2 + 'px';
		op.style.top = (oHeight - 50) / 2 + 'px';

		document.body.appendChild(oDiv);

		// 30秒后消息
		if (typeof (arg) != 'undefined' && typeof (arg.time) != 'undefined') {
			dialogopenTimeout = setTimeout(dialog.loadingClose, arg.time);
		}
	},
	loadingClose : function() {
		if (dialogopenTimeout != null && dialogopenTimeout != "") {
			clearTimeout(dialogopenTimeout);
		}
		if ($('#dialogLoading').length > 0) {
			document.body.removeChild(document.getElementById('dialogLoading'));
		}
	}
};

// 验证手机号
function validatePhoneNumber(mobile) {
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|145|147|222)+\d{8})$/;
	if (!myreg.test(mobile)) {
		return false;
	} else {
		return true
	}
}

// 验证密码
function validatePassword(pass) {
	// }
	/**
	 * //密码长度限定 if (str.length < 6 || str.length > 10){ return false; }
	 * //中英文混合密码验证
	 * if(!str.match(/[0-9]/)||!(str.match(/[a-zA-Z]/)||/\W/.test(str))){ return
	 * false; }
	 */
	return true;
}

function validateSmscode(checkcode) {
	var patn = /^[^\s?<>\'\"!@%#$~&*():;]*$/;
	if (!patn.test(checkcode)) {
		return false;
	} else {
		return true;
	}
}

// 用户名验证
function validateUsername(username) {
	var myreg = /^[\u4E00-\u9FA5a-zA-Z0-9_]{3,20}$/;
	if (!myreg.test(username)) {
		return false;
		// 汉字 英文字母 数字 下划线组成，3-20位
	} else {
		return true
	}
}

$(document)
		.ready(
				function() {

					$('.phone')
							.each(
									function() {
										$(this)
												.bind(
														'blur',
														function() {
															var val = $(this)
																	.val();
															if (val != '') {
																var c = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
																if (!c
																		.test(val)) {
																	alert('请输入11位真实手机号');
																	return false;
																}
															}
														});
									});

					$('.card').each(function() {
						$(this).bind('blur', function() {
							var val = $(this).val();
							if (val != '') {
								var c = /^\d{19}$/g;
								if (!c.test(val)) {
									alert('银行卡格式有误，请重新输入');
									$(this).val('');
									return false;
								}
							}
						});
					});

					$(".rvalidate").each(function() {
						$(this).bind('blur', function() {
							var val = $(this).val();
							if (val != "" && val.length != 4) {
								alert("请输入4位图片验证码");
							}
						});
					});

					$(".passwd").each(function() {
						$(this).bind('blur', function() {
							var val = $(this).val();
							if (val != "" && val.length < 6) {
								alert("请输入6-20位登录密码");
							}
						});
					});

					$(".no_paste").each(function() {
						$(this).bind('paste', function() {
							return false;
						});
					});

					$(".number").each(function() {
						$(this).bind('keyup', function() {
							$(this).val($(this).val().replace(/\D/g, ''));
							return false;
						});
					});

					$(".no_space").each(function() {
						$(this).bind('keyup', function() {
							$(this).val($(this).val().replace(/\s/g, ''));
							return false;
						});
					});
				});

function luhmCheck(bankno) {
	if (bankno.length < 16 || bankno.length > 19) {
		return false;
	}
	var num = /^\d*$/; // 全数字
	if (!num.exec(bankno)) {
		return false;
	} else {
		return true;
	}
}

$('.email')
		.each(
				function() {
					$(this)
							.bind(
									'blur',
									function() {
										var val = $(this).val();
										if (val != '') {
											var c = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
											if (!c.test(val)) {
												alert('邮箱格式有误，请重新输入');
												$(this).val('');
												return false;
											}
										}
									});
				});

// 检查email邮箱
function isEmail(str) {
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	return reg.test(str);
}

function isChinese(temp) {
	var re = /[^\u4e00-\u9fa5]/;
	if (re.test(temp))
		return false;
	return true;
}

// 光标靠右边显示
/*
 * function setSelectionRange(input, selectionStart, selectionEnd) { if
 * (input.setSelectionRange) { input.focus();
 * input.setSelectionRange(selectionStart, selectionEnd); } else if
 * (input.createTextRange) { var range = input.createTextRange();
 * range.collapse(true); range.moveEnd('character', selectionEnd);
 * range.moveStart('character', selectionStart); range.select(); } }
 * 
 * function setCaretToPos (input, pos) { setSelectionRange(input, pos, pos); }
 * 
 * var aInput = document.getElementsByTagName('input'); for(var i=0;i<aInput.length;i++){
 * setCaretToPos(aInput[i], 0); }
 */

// 验证工作电话
function checkTel(val) {
	var isTel = /^((\+?86)|(\(\+86\)))?\d{3,4}\d{7,8}(\d{3,4})?$/;
	var value = val.trim();
	if (isTel.test(value)) {
		console.log('true');
		return true;
	} else {
		console.log('false');
		return false;
	}
}

// 验证身份证格式
function checkPid(pId) {
	// 检查身份证号码

	var arrVerifyCode = [ 1, 0, "x", 9, 8, 7, 6, 5, 4, 3, 2 ];
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
	var Checker = [ 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1 ];

	// if(pId.length != 15 && pId.length != 18) return false;
	if (pId.length == 15 || pId.length != 18)
		return false;

	var Ai = pId.length == 18 ? pId.substring(0, 17) : pId.slice(0, 6) + "19"
			+ pId.slice(6, 16);

	if (!/^\d+$/.test(Ai))
		return false;

	var yyyy = Ai.slice(6, 10), mm = Ai.slice(10, 12) - 1, dd = Ai
			.slice(12, 14);

	var d = new Date(yyyy, mm, dd), now = new Date();
	var year = d.getFullYear(), mon = d.getMonth(), day = d.getDate();

	if (year != yyyy || mon != mm || day != dd || d > now || year < 1940)
		return false;

	for (var i = 0, ret = 0; i < 17; i++)
		ret += Ai.charAt(i) * Wi[i];
	Ai += arrVerifyCode[ret %= 11];

	return pId.length == 18 && pId != Ai ? false : true;

}

var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "//hm.baidu.com/hm.js?b991e5f85e62251541c2bc64818e038e";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();

var even = 'click' || 'touchstart';
/**
 * 通用组件
 */
var ui = {
	linkRow : function() {
		$('.linkRow').each(function() {
			var $this = $(this);
			$this.bind(even, function() {
				var thisUrl = $this.attr('data-url');
				location.href = thisUrl;
			}).css('cursor', 'pointer');
		})
	},
	hideShade : function(obj, container, button) {
		$('.' + obj).bind(even, function() {
			return false;
		});
		$('.' + container).bind(even, function() {
			$(this).fadeOut();
		});
		$('.' + button).bind(even, function() {
			$('.' + container).fadeOut();
		});
	}
};

/*
 * 真实值 前面保留 后面保留
 */
function hideValue(realValue, first, last) {

	var len = realValue == null ? 0 : realValue.length;
	var len2 = first + last;
	if (len <= len2) {
		return realValue;
	} else {

		var result = realValue.substr(0, first);
		for (var i = 0; i < len - len2; i++) {
			result += "*";
		}
		return result + realValue.substr(0 - last);
	}
}

function showValue(sid){
	
	$("#input"+sid).val($("#real"+sid).val());
}

function toastCheck(sid, min, tip, first, last) {
	var value = $("#input" + sid).val();
	
	$("#real" + sid).val(value);
	
	$("#input" + sid).val(hideValue(value, first, last));
	
	if (value == null||value == ""||value.length< min) {
		tips.show(tip);
	}
}

function toastCheckId(pId, tip){
	
	var arrVerifyCode = [ 1, 0, "x", 9, 8, 7, 6, 5, 4, 3, 2 ];
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
	var Checker = [ 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1 ];

	// if(pId.length != 15 && pId.length != 18) return false;
	if (pId.length != 15 && pId.length != 18){
		tips.show(tip);
	    return false;
	}
	var Ai = pId.length == 18 ? pId.substring(0, 17) : pId.slice(0, 6) + "19"
			+ pId.slice(6, 16);

	if (!/^\d+$/.test(Ai)){
		tips.show(tip);
	    return false;
	}
	var yyyy = Ai.slice(6, 10), mm = Ai.slice(10, 12) - 1, dd = Ai
			.slice(12, 14);

	var d = new Date(yyyy, mm, dd), now = new Date();
	var year = d.getFullYear(), mon = d.getMonth(), day = d.getDate();

	if (year != yyyy || mon != mm || day != dd || d > now || year < 1940){
		tips.show(tip);
		return false;
	}
	for (var i = 0, ret = 0; i < 17; i++)
		ret += Ai.charAt(i) * Wi[i];
	Ai += arrVerifyCode[ret %= 11];

	if(pId.length == 18 && pId != Ai){
		tips.show(tip);
		return false;
	}
}

function backToIndex() {
	window.location.href= base;
}

function empty(str) {
	return str == null || str == '';
}

/*
 * 真实值 前面保留 后面保留
 */
function hideValue(realValue, first, last){
	
	var len = realValue== null? 0:realValue.length;
	var len2 = first + last;
	if( len<= len2){
		return realValue;
	}else{
		
		var result = realValue.substr(0,first);
		for(var i=0; i< len -len2; i++){
			result += "*";
		}
		return  result+ realValue.substr(0-last);
	}
}
