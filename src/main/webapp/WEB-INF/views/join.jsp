<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html >
<html>
<head>
<title>꼬모롱베니트's 지원서 작성</title>
<link rel="stylesheet" href="./css/applicants.css">
<link rel="stylesheet" href="./css/skin.css">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script src="./js/certification.js" ></script>
<script src="./js/registResume.js" ></script>
<script src="/js/loginValidator.min.js" ></script>
<style>
.errormsg {
	
}

</style>
</head>
<body class="type-07">
	<jsp:include page="header.jsp"></jsp:include>   

	<div id="wrap">
		<form id="frm" method="post" action="writeResume" data-type="regist">
		<header id="header">
			<h1 class="recruitNoticeTitle">지원서 작성</h1>
		</header>
		<section id="loginForm" class="writeResume">
			<div class="subject collapsed">
				<label class="h2">공고명</label>
				<div class="row in-span no-margin">
					<div class="span per70 text">2020년 상반기 신입사원 공개채용</div>
					<div class="span per30"></div>
				</div>
			</div>
			<div class="subject collapsed" data-wrap="agreement">
				<label class="h2">개인정보 제공동의</label>
				<div class="row in-span no-margin">
					<div class="span per10">
						<button class="btn" data-button="agreement" type="button">내용확인</button>
					</div>
					<div class="span per85 text" style="margin-left:30px;" id="agreementRegMsg"> 필수 개인정보 제공에
						동의해주세요</div>
				</div>
			</div>
			<hr>
			<div class="subject">
				<label for="name" class="h2">성명</label>
				<div class="row in-span no-margin">
					<div class="span per40 text">
						<input id="name" name="name" class="text" title="성명" required="">
					</div>
					<div class="span per60" id="nameRegMsg"></div>
				</div>
				<div class="wrapGuide">
					<div class="guide">※ 공백 없이 입력하세요.</div>
				</div>
			</div>
			<div class="subject">
				<label for=mobile1 class="h2">휴대전화</label>
				<div class="row in-span no-margin">
					<div class="span per10 mobile">
						<input maxlength="3" type="text" id="mobile1" name="mobile1"
							class="text" title="휴대전화 첫번째 자리" required="">
					</div>
					<div class="span per10 mobile">
						<input maxlength="4" type="text" id="mobile2" name="mobile2"
							class="text" title="휴대전화 두번째 자리" required="">
					</div>
					<div class="span per10 mobile">
						<input maxlength="4" type="text" id="mobile3" name="mobile3"
							class="text" title="휴대전화 세번째 자리" required="">
					</div>
					<div class="span per60 text error" id="phoneRegMsg"></div>
				</div>
				<div class="wrapGuide">
					<div class="guide">※ 전형결과 알림에 사용되오니, 반드시 연결가능한 번호를 입력하세요.(본인미보유시, 가족 핸드폰 입력)</div>
				</div>
			</div>
			<div class="subject">
				<label for="email" class="h2">이메일</label>
				<div class="row in-span no-margin collapsed">
					<div class="span per60">
						<input type="email" id="email" name="email"
							placeholder="이메일을 입력해주세요." title="이메일" class="text error" required="">
					</div>
					<div class="span per40 text error" id="emailRegMsg"></div>
				</div>
				<div class="row in-span no-margin collapsed">
					<div class="span per60">
						<input type="email" id="emailConfirm" name="email"	placeholder="이메일 확인을 위해 다시 한번 입력해주세요." title="이메일"
							class="text ok" required="">
					</div>
					<div class="span per40 text" id="emailValidaterMsg"></div>
				</div>
				<div class="wrapGuide">
					<div class="guide">※ 비밀번호 찾기 및 전형결과 알림에 사용되오니, 반드시 자주 사용하는 메일주소를 입력해주세요.</div>
				</div>
			</div>
			<div class="subject ">
				<label for="password" class="h2">비밀번호</label>
				<div class="row in-span no-margin collapsed">
					<div class="span per60">
						<input type="password" id="password" name="password"
							placeholder="비밀번호를 입력해주세요." maxlength="16" class="text"
							autocomplete="off" required="">
					</div>
					<div class="span per40 text" id="passwordValidaterMsg"></div>
				</div>

				<div class="row in-span no-margin collapsed">
					<div class="span per60">
						<input type="password" id="passwordConfirm" name="password"
							placeholder="비밀번호 확인을 위해 다시 한번 입력해주세요." maxlength="16"
							class="text" autocomplete="off" required="">
					</div>
					<div class="span per40 text" id="passwordRegMsg"></div>
				</div>

				<div class="wrapGuide">
					<div class="guide">※ 8~9자 영문 대문자/소문자/특수문자/숫자 중 3종류, 혹은 10자 이상 영문/숫자/특수문자 중 2종류를 사용하세요.</div>
				</div>
			</div>
			<div id="certification" class="subject">
				<label class="h2">본인확인</label>
				<div class="row in-span no-margin">
					<div class="span 100">
					<button type="button" data-button="email" class="btn">이메일 인증 </button>
					</div>
					<div class="wrapLayerInfo" style="display:none">		
					<i class="fa fa-info-circle"></i>		
						<ul class="layerInfo">			
							<li>이메일 인증은 주민등록번호 대체수단으로서 지원자의 주민등록번호 대신, 지원서 제출에 사용한 이메일로 인증번호를 전송하여 인증번호를 입력 후 지원서를 작성하실 수 있습니다.</li>			
							<li>타인의 정보를 도용하여 사용하는 경우 3년 이하의 징역 또는 1천만원 이하의 벌금이 부과될 수 있으며,<br>채용과정에서 제외될 수 있습니다.</li>			
							<li>받는 메일서버의 사정으로 이메일 인증을 위한 인증번호를 받지 못하는 경우도 있습니다.</li>			
							<li>이메일 인증은 인증번호 전송 후 동일한 메일주소로는 5분 동안 발송되지 않습니다.</li>		
						</ul>	
					</div>
					<span id="certificationMsg" style="margin-left:10px;"></span>
				</div>
			</div>
		</section>
			<div id="wrapSessionArea">
				<div id="sessionArea" class="sessionArea">
					<div class="btnGroup">
					<button type="submit" class="btn btn-great">지원서 작성</button>
					</div>
				</div>
		   </div>
	 	</form>
	 </div>
</body>
<script>
	
</script>
</html>