var form = $('#submit_form');
var idIdentityState = "";

function empty(str) {
	return str == null || str == '';
}

function saveId() {

	var userName = $("#inputUserName").val();
	var cardId = $("#inputCardNo").val();
	var creditCard = $("#inputCreditCard").val();
	var debitCard = $("#inputDebitCard").val();
	
//	var userName = $("#realName").val();
//	var cardId = $("#realCardNo").val();
//	var creditCard = $("#realCreditCard").val();
//	var debitCard = $("#realDebitCard").val();

	var province = $("#cmbProvince").val();
	var city = $("#cmbCity").val();
	var district = $("#cmbArea").val();

	var maritalStatus = $("#maritalStatus").val();

	if (userName == "" || cardId == "" ||
	/* address == "" || */
	province == "" || city == "" || district == "" || maritalStatus == ""
			|| creditCard == "" || debitCard == "") {
		alert("请填写完整资料!");
		return false;
	}
//	var reg = /^[\u4E00-\u9FA5]+$/;
//	if (!reg.test(userName)) {
//		alert("姓名格式错误!");
//		return false;
//	}

	// 身份证号验证
	strVariable = cardId.toLowerCase();
	if (!checkPid(strVariable)) {
		alert("身份证号格式不正确!");
		return false;
	}
	$("#aRegister").attr("disabled", "disabled");
	var param = {
		"userName" : userName,
		"cardId" : cardId,
		// "address" : address,
		"creditCard" : creditCard,
		"debitCard" : debitCard,
		"addressProvince" : province,
		"addressCity" : city,
		"addressDistrict" : district,
		"maritalStatus" : maritalStatus
	};
	$.ajax({
		url : base + "/web/index/profile/idSave",
		type : 'POST',
		async : false,
		dataType : 'json',
		data : param,
		complete : function(data) {
			$("#aRegister").removeAttr("disabled");
			try {
				var rr = data.responseText;
				if (rr == "redirect") {
					alert("登录超时,请重新登录");
					window.location.href = "/index.php/Main";
				} else if (rr == "remoteLogin") {
					alert("您的帐号在另一个地点登录，您被迫下线。如果不是您本人的操作，请注意帐号安全！");
					window.location.href = "/index.php/Main";
				}
			} catch (e) {
				alert("身份认证失败!");
				return false;
			}
			rr = JSON.parse(JSON.parse(data.responseText));
			if (rr.status == "1") {
				tips.show("身份认证成功!");
				cardIdStatus = "1";
				// 置为不可修改
				$("#inputUserName").attr("disabled", "disabled");
				$("#inputCardId").attr("disabled", "disabled");
				dialog.loadingClose();
				var cb = function() {
					window.location.href = base + "/web/index/profile/profile";
				}
				tips.show("", cb);
			} else {
				dialog.loadingClose();
				if (rr["msg"]) {
					tips.show(rr["msg"]);
				} else {
					tips.show("身份认证失败!");
				}
				return false;
			}
		}
	});
}

$("document").ready(function() {

	init();

	// 提交
	$("#aRegister").click(function() {
		saveId();
	});

});

function init() {

	var idIdentityState = $("#identityState").val();
	if (idIdentityState == "1") {
		var marital = $("#marital").val();
		$("#maritalStatus").val(marital);
		$("#cmbProvince").val($("#province").val());
		$("#cmbCity").val($("#city").val());
		$("#cmbArea").val($("#area").val());

		var iList = $("p>i");
		for (var i = 0; i < iList.length; i++) {
			showLi(iList[i]);
			iList[i].disabled = "disabled";
			iList[i].previousElementSibling.disabled = "disabled";
		}

	}

}

function showLi(obj) {

	var id = obj.previousElementSibling.id;
	var value = obj.nextElementSibling.value;
	if (obj.className == "show") {
		obj.className = "hide";
		var first;
		var last;
		switch (id) {
		case "inputUserName":
			first = 0;
			last = 1;
			break;
		case "inputCardNo":
			first = 1;
			last = 1;
			break;
		case "inputCreditCard":
			first = 0;
			last = 3;
			break;
		case "inputDebitCard":
			first = 0;
			last = 3;
			break;
		}

		obj.previousElementSibling.value = hideValue(value, first, last);
	} else {
		obj.className = "show";
		obj.previousElementSibling.value = value;
	}
}

// 身份证号码 keyup
function idkeyup(value) {

	var oldValue = $("#realCardNo").val();
	var newValue = "";
	var rule = /\d|X|x/;
	// 新增 还是 减少

	if (value.length > 18) {
		newValue = oldValue;
	} else if (value.length > oldValue.length) {

		// 新插入的字符是否符合要求
		var tag = 0;
		for (var j = 0; j < value.length; j++) {

			if (rule.test(value.charAt(j))) {
				tag++;
			}
		}
		if ((value.length == 1 && tag == 0) || (value.length == 2 && tag < 2)
				|| (value.length >= 3 && tag < 3)) {
			$("#inputCardNo").val(hideValue(oldValue, 1, 1));
			return false;
		}

		// 前面插入
		if (value.length <= 3) {

			newValue = value;
		} else if (value.charAt(value.length - 2) == '*') {
			for (var i = 0; i < value.length - 1; i++) {
				if (value.charAt(i) != '*') {
					newValue = oldValue.substr(0, i) + value.charAt(i)
							+ oldValue.substr(i);
				}
			}
		} else {
			newValue = oldValue + value.charAt(value.length - 1);
		}
	} else {
		// 末尾减少
		if (value.length == 1) {
			newValue = value;
		} else if (value.charAt(value.length - 1) == '*') {
			newValue = oldValue.substr(0, value.length);
		} else {
			newValue = "";
		}
	}
	$("#realCardNo").val(newValue);
	// var result = "";
	// if(newValue.length>1){
	//		
	// result="";
	// for(var i =1; i<= newValue.length-1; i++){
	// result +='*';
	// }
	// result += newValue.substr(-1);
	// }else{
	// result = newValue;
	// }

	$("#inputCardNo").val(hideValue(newValue, 1, 1));

}

function creditCardkeyup(value, card) {

	var oldValue = $('#real' + card).val();
	var newValue = "";
	var rule = /\d/;
	if (value.length > 19) {
		newValue = oldValue;
		// 新增 还是 减少
	} else if (value.length > oldValue.length) {

		// 新插入的字符是否符合要求
		var tag = 0;
		for (var j = 0; j < value.length; j++) {

			if (rule.test(value.charAt(j))) {
				tag++;
			}
		}
		if ((value.length == 1 && tag == 0) || (value.length == 2 && tag < 2)
				|| (value.length == 3 && tag < 3)
				|| (value.length >= 4 && tag < 4)) {
			$('#input' + card).val(hideValue(oldValue, 1, 1));
			return false;
		}

		// 前面插入
		if (value.length < 4) {
			newValue = value;
		} else if (value.charAt(value.length - 4) == '*') {
			for (var i = 0; i < value.length - 3; i++) {
				if (value.charAt(i) != '*') {
					newValue = oldValue.substr(0, i) + value.charAt(i)
							+ oldValue.substr(i);
				}
			}
		} else {
			newValue = oldValue + value.charAt(value.length - 1);
		}
	} else {
		// 末尾减少
		if (value.charAt(value.length - 3) == '*') {
			newValue = oldValue.substr(0, value.length);
		} else {
			newValue = "";
		}
	}
	$('#real' + card).val(newValue);

	$('#input' + card).val(hideValue(newValue, 0, 3));
}

function namekeyup(value) {

	var oldValue = $("#realName").val();
	var newValue = "";

	if (value.length > 20) {
		newValue = oldValue;
		// 新增 还是 减少
	} else if (value.length > oldValue.length) {
		// 前面插入
		if (value.length == 2) {
			newValue = value;
		} else if (value.charAt(value.length - 2) == '*') {
			for (var i = 0; i < value.length - 1; i++) {
				if (value.charAt(i) != '*') {
					newValue = oldValue.substr(0, i) + value.charAt(i)
							+ oldValue.substr(i);
				}
			}
		} else {
			newValue = oldValue + value.charAt(value.length - 1);
		}
	} else {
		// 末尾减少
		if (value.charAt(value.length - 1) == '*') {
			newValue = oldValue.substr(0, value.length);
		} else {
			newValue = "";
		}
	}
	$("#realName").val(newValue);
	$("#inputUserName").val(hideValue(newValue, 0, 1));
	
}


function nameChange(value) {

	var oldValue = $("#realName").val();
	var newValue = "";

	if (value.length > 20) {
		newValue = oldValue;
		// 新增 还是 减少
	} else if (value.length > oldValue.length) {
		// 前面插入
		if (value.length == 2) {
			newValue = value;
		} else if (value.charAt(value.length - 2) == '*') {
			for (var i = 0; i < value.length - 1; i++) {
				if (value.charAt(i) != '*') {
					newValue = oldValue.substr(0, i) + value.charAt(i)
							+ oldValue.substr(i);
				}
			}
		} else {
			newValue = oldValue + value.charAt(value.length - 1);
		}
	} else {
		// 末尾减少
		if (value.charAt(value.length - 1) == '*') {
			newValue = oldValue.substr(0, value.length);
		} else {
			newValue = "";
		}
	}
	$("#realName").val(newValue);
	$("#inputUserName").val(hideValue(newValue, 0, 1));
	// var result = "";
	// if(newValue.length>1){
	//		
	// result="";
	// for(var i =1; i<= newValue.length-1; i++){
	// result +='*';
	// }
	// result += newValue.substr(-1);
	// }else{
	// result = newValue;
	// }
	// $("#inputUserName").val(result);
}





function takePhoto() {

	var param = {
		"url":window.location.href
	};
	$.ajax({
		url : base + "/web/index/profile/getPhotoSign",
		type : 'POST',
		async : false,
		dataType : 'json',
		data : param,
		complete : function(data) {
				
			rr = JSON.parse(JSON.parse(data.responseText));
			if (rr.status == "1") {
				
				wx.config({
					debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//					appId : 'wxc9822e389c8b1334',// 必填，公众号的唯一标识
					appId : rr.appId,
//					timestamp : 1464058192, // 必填，生成签名的时间戳
					timestamp : rr.timestamp,
//					nonceStr : 'CB3MDEFFGH', // 必填，生成签名的随机串
//					signature : 'd4869cf1164ee446ae424a22350ade2e8a003088',// 必填，签名，见附录1
					nonceStr : rr.nonceStr, // 必填，生成签名的随机串
					signature : rr.signature,
					jsApiList : [ 'chooseImage', 'uploadImage' ]
				// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				
				wx.ready(function(){
					
					wx.chooseImage({
						count : 1, // 默认9
						sizeType : [ 'original', 'compressed' ], // 可以指定是原图还是压缩图，默认二者都有
						sourceType : [ 'camera' ], // 可以指定来源是相册还是相机，默认二者都有
						success : function(res) {
							var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							wx.uploadImage({
										localId : '' + localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
										isShowProgressTips : 1, // 默认为1，显示进度提示
										success : function(res) {
											var serverId = res.serverId; // 返回图片的服务器端ID
//											$("#viewImg")
//													.attr(
//															"href",
//															"http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=Y7FKF1hV0BK3ieEK7nKjix94WTo41nrEhjxsIMB8F5gg925XEZmMWnQQwzbTKb1xrmPpZQCn5NwGdnt_0Un_Q3MehjPMk7Ox3uaSvV2h2qng6PnyMTPi5yUAm9PmytKxRTYfABAIKP&media_id="
//																	+ serverId);
											var param ={"serverId" :serverId};
											
											$.ajax({
												url : base + "/web/index/profile/downloadPhoto",
												type : 'POST',
												async : false,
												dataType : 'json',
												data : param,
												complete : function(data) {
													if (rr.status == "1") {
														tips.show("操作成功!");
													}else {
														tips.show("操作失败!");
													}
												}
											});
										}
									});
						}
					});
				});
				
			} else {
				dialog.loadingClose();
				if (rr["msg"]) {
					tips.show(rr["msg"]);
				} else {
					tips.show("操作失败!");
				}
				return false;
			}
		}
	});


}

function previewImage() {

	wx.previewImage({
		current : '', // 当前显示图片的http链接
		// urls: [] // 需要预览的图片http链接列表
	});
}

function view(){
	$.ajax({
		url : base + "/web/index/profile/viewPhoto",
		type : 'POST',
		async : false,
		dataType : 'json',
		data : param,
		complete : function(data) {
			rr = JSON.parse(JSON.parse(data.responseText));
			if (rr.status == "1") {
				
			}
		}
	});
}
