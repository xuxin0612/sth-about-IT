<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html lang="en-US">

<head>
<%@ include file="../../common/commonHead.jsp"%>
<link rel="stylesheet" href="${base}/res/framework/css/common.css" />
<style type="text/css">
.row .photo {
	float: left;
	width: 40% !important;
	border-radius: 8px;
}

#photo {
	margin-left: 5%;
}

.leftTag {
	float: left;
	width: 78.5% !important;
}

.show {
	float: left;
	background-image:
		url(../../../res/framework/plugins/password/img/wink.svg);
	background-position: -44 center;
	background-repeat: no-repeat;
	cursor: pointer;
	height: 100%;
	overflow: hidden;
	text-indent: -9999em;
	width: 44px;
}

.hide {
	float: left;
	/* width: 20% !important; */
	background: url(../../../res/framework/plugins/password/img/wink.svg)
		right no-repeat;
	display: inline-block;
	width: 40px;
	height: 40px;
	position: absolute;
	right: 7px;
	z-index: 100;
	cursor: pointer;
}
</style>
<title>身份认证信息</title>
</head>

<body>
	<div class="mobanker">
		<header class="top-nav">
			<a class="aBack" href="${base}/web/index/profile/profile"> <i
				class="icon-angle-left"> </i>
			</a>
			<h3>身份认证</h3>
			<a class="aRegister" id="aRegister" href="javascript:void(0);">保存</a>
		</header>

		<section class="container my-info">
			<form class="form">
				<div class="row first">
					<label>姓名</label>
					<p>
						<!--<input type="hidden" id="id" value="${user.id}" />  -->
						<!-- <input type="hidden" id="identityState"
							value="${profile.identityState}" /> -->
						<input type="text"
							id="inputUserName" name="userName" placeholder="请输入真实姓名"
							class="form-control leftTag" value="${profile.identityState}" 
							onblur="toastCheck('UserName', 2, '请输入您的真实姓名', 0, 1)" 
							onfocus= "showValue('UserName')" />

						<i class="show" onclick="showLi(this);"></i> 
						<input type="hidden" id="realUserName" value="${user.userName}" /> 
						
						<!-- 
							<span class="glyphicon glyphicon-remove-circle form-control-feedback" style="display:inline-block;"></span> <!--小图标元素-->
						<!-- <span style="display:inline-block;width:40px;height:30px;position:absolute;right:2px;z-index:100;cursor: pointer;"></span> <!--覆盖在小图标上面的元素-->

					</p>
				</div>

				<div class="row ">
					<label>身份证</label>
					<p>
						<input type="text " id="inputCardNo" value="${user.cardNo}"
							class="leftTag" name="cardNo" placeholder="请输入身份证号"  
							onblur="toastCheckId(this.value.toLowerCase(), '请输入您的18位身份证号')"/> 
							<!-- onkeyup="idkeyup(this.value);" />  -->
							<!-- <i class="show" onclick="showLi(this);"></i> 
							<input type="hidden" id="realCardNo" value="${user.cardNo}" /> -->
							<!-- onblur="toastCheckId($('#realCardNo').val().toLowerCase(), '请输入您的18位身份证号')" -->
					</p>
				</div>

				<div class="row ">
					<label>相关照片</label>
					<p>
						<input type="button" class="photo" onclick="showImage();"
							value="查看" /> <input id="photo" type="button" class="photo"
							onclick="takePhoto();" value="拍摄" />
					</p>
				</div>
				<div>
					<li style="list-style-type: none; color: gray;">请拍摄你本人手持身份证照，并保持信息清晰</li>
				</div>

				<div class="row first m-top20">
					<label>信用卡号</label>
					<p>
						<input type="text" id="inputCreditCard" name="creditCard"
							placeholder="请输入信用卡号" class="form-control leftTag"
							onblur="toastCheck(this.value, 12,'请绑定您的真实银行卡')" 
							value="${profile.creditCard}" />
						<!-- 	onkeyup="creditCardkeyup(this.value, 'CreditCard');"
						<!-- onkeyup="this.value=value.replace(/[^\d]/g,'')" 
						<i class="show" onclick="showLi(this);"></i> <input type="hidden"
							id="realCreditCard" value="${profile.creditCard}" />  -->
					</p>
				</div>
				<div class="row ">
					<label>借记卡号</label>
					<p>
						<input type="text" id="inputDebitCard" class="leftTag"
							placeholder="请输入借记卡号" value="${profile.debitCard}"
							onblur="toastCheck(this.value, 12, '请绑定您的真实借记卡')"
							name="debitCard" />
						<!--onkeyup="creditCardkeyup(this.value, 'DebitCard');"
							placeholder="请输入借记卡号" value="${profile.debitCard}">
							onkeyup="this.value=value.replace(/[^\d]/g,'')" -->
						<!-- <i class="show" onclick="showLi(this);"></i> <input type="hidden"
							id="realDebitCard" value="${profile.debitCard}" /> -->
					</p>
				</div>

				<div class="row first m-top20">
					<label>婚姻状况</label>
					<p>
						<select id="maritalStatus"
							onblur="toastCheck(this.value, 1, '请填写您的婚姻情况')">
							<option value='' disabled selected style='display: none;'>选择婚姻情况</option>
							<option value="marriedbear">已婚已育</option>
							<option value="married">已婚未育</option>
							<option value="divoced">离异</option>
							<option value="single">未婚</option>
						</select>
					</p>
					<input type="hidden" id="marital" value="${profile.maritalStatus}" />
				</div>

				<div class="row autoHeight clear">
					<label>居住地</label>
					<ul>
						<li><select id="cmbProvince" cname=""
							onblur="toastCheck(this.value, 1, '请选择省区')">
								<option value='' disabled selected style='display: none;'>所在省区</option>
								<c:forEach items="${provinces}" var="province">
									<option value="${province.id}">${province.dicValue}</option>
								</c:forEach>
						</select></li>
						<input type="hidden" id="province"
							value="${profile.residenceProvince}" />
						<li><select id="cmbCity" cname=""
							onblur="toastCheck(this.value, 1, '请选择市区')">
								<option value='' disabled selected style='display: none;'>所在市区</option>
								<c:if test="${profile.identityState==1}">
									<c:forEach items="${cities}" var="citie">
										<option value="${citie.id}">${citie.dicValue}</option>
									</c:forEach>
								</c:if>
						</select></li>
						<input type="hidden" id="city" value="${profile.residenceCity}" />
						<li><select id="cmbArea" cname=""
							onblur="toastCheck(this.value, 1, '请选择区县')">
								<option value='' disabled selected style='display: none;'>所在区县</option>
								<c:if test="${profile.identityState==1}">
									<c:forEach items="${areas}" var="area">
										<option value="${area.id}">${area.dicValue}</option>
									</c:forEach>
								</c:if>
						</select></li>
						<input type="hidden" id="area"
							value="${profile.residenceDistrict}" />
						<li><input name="address" id="inputAddress"
							style='display: none;' value="${user.address}" type="text"
							placeholder="街道地址"></li>
					</ul>
				</div>
				<div class=" m-top20">
					<li style="list-style-type: none; color: gray;">请输入你本人真实身份信息</li>
					<li style="list-style-type: none; color: gray;">认证通过后信息不能更改</li>
				</div>

				<input type="text" id="testId" onblur="toastCheck(this.value, 12, '请绑定您的真实借记卡')"
					onchange="showValue(this.value)" />
				<script>
					function dochg() {
						document.getElementById("testId").value = "test"
					}
					setTimeout("dochg()", 1000)
					function showValue(obj) {
						alert("changed value is " + obj);
					}
				
				</script>
			</form>
		</section>
	</div>
	<div id="dialog" class="dialog">
		<div id="dialogContent">
			<div id="dialogMain"></div>
		</div>
	</div>

	<%@ include file="../../common/commonJs.jsp"%>
	<!-- <script src="${base}/res/framework/js/jquery.min.js">
		
	</script>
	<script src="${base}/res/framework/js/common.js"> -->

	</script>
	<script src="${base}/res/framework/js/camera.js">
		
	</script>
	<script src="${base}/res/framework/js/jsAddress.js">
		
	</script>
	<script src="${base}/res/framework/js/LocalResizeIMG.js">
		
	</script>
	<script src="${base}/res/framework/js/mobileBUGFix.mini.js"></script>

	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>


	<script src="${base}/res/js/index/profile/profile.js">
		
	</script>
	<script src="${base}/res/js/index/profile/identity.js">
		
	</script>






</body>

</html>
