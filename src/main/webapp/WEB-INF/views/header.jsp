<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>header</title>
<style type="text/css">
a {
	text-decoration: none
}

.header {
	text-align: center;
	border-bottom: 1px solid #aaa;
	margin: 20px 20px 0;
	font-size: 15px;
	font-color: white;
	padding-bottom: 20px;
}

.dropbtn {
	background-color: #a7abb7;
	color: white;
	padding: 1px;
	font-size: 16px;
	border: none;
	cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
	position: relative;
	display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
	display: none;
	position: absolute;
	background-color: #f9f9f9;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
	background-color: #f1f1f1
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
	display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
	background-color: #4d504d;
}
</style>
</head>
<body>
	<div class="header">
		<div style="display: inline-block">
			<div id="logo" style="width: 200px; display: inline-block">
				<a href="/recurit"><img src="./image/kkomo.jpg" width="150px"
					height="116px" /></a>
			</div>
			<div style="width: 800px; display: inline-block; height: 10px">
				<div id="topMenu" class="dropdown"
					style="text-align: center; width: 100px; display: inline-block; vertical-align: bottom">
					<a href="javascript:" class="dropbtn">회사소개</a>
					<div class="dropdown-content">
						<a href="/recurit">회사개요 및 연혁</a> <a href="/recurit">경영진</a> <a
							href="/recurit">재무정보</a> <a href="/recurit">윤리경영</a> <a
							href="/recurit">찾아오시는길</a>
					</div>
				</div>
				<div id="topMenu" class="dropdown"
					style="width: 100px; display: inline-block; vertical-align: bottom">
					<a href="javascript:" class="dropbtn">사업소개</a>
					<div class="dropdown-content">
						<a href="/recurit">Future Technologies</a> <a href="/recurit">IT
							Distribution</a> <a href="/recurit">Enterprise IT Service</a>
					</div>
				</div>
				<div id="topMenu" class="dropdown"
					style="width: 100px; display: inline-block; vertical-align: bottom">
					<a href="/recurit/join" class="dropbtn">인재채용</a>
					<div class="dropdown-content">
						<a href="/recurit">인재육성</a> <a href="/recurit">인사제도</a> <a
							href="/recurit">꼬모인</a> <a href="/recurit">채용정보</a>
					</div>
				</div>
				<div id="topMenu" class="dropdown"
					style="width: 100px; display: inline-block; vertical-align: bottom">
					<a href="javascript:" class="dropbtn">홍보센터</a>
					<div class="dropdown-content">
						<a href="/recurit">사업소식</a> <a href="/recurit">사회공헌</a> <a
							href="/recurit">CI소개</a> <a href="/recurit">자료실</a>
					</div>
				</div>
				<div id="topMenu" class="dropdown"
					style="width: 100px; display: inline-block; vertical-align: bottom">
					<a href="javascript:" class="dropbtn">고객지원</a>
					<div class="dropdown-content">
						<a href="/recurit">담당자연락처</a> <a href="/recurit">고객문의</a> <a
							href="/recurit">자주하는 질문</a>
					</div>
				</div>
				<div id="logo" style="width: 200px; display: inline-block">
					<a href="/recurit"><img src="./image/kkomo.jpg" width="150px"
						height="116px" /></a>
				</div>

			</div>
		</div>
	</div>

</body>
</html>