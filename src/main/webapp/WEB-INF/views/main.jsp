<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page session="false"%>
<html>
<head>
<title>KIMMY'S RECURIT</title>
</head>
<body>
	<div>
		<div>
			<div><jsp:include page="header.jsp" flush="false" /></div>
		</div>
		<div>
			<div style="text-align: center">
				<div id="main" style="margin-top: 10px">
					<h1>Hello world!</h1>

					<P>The time on the server is ${serverTime}.</P>
					<P>Client IP is ${clientIP}.</P>
				</div>
			</div>
		</div>
		<div>
			<div>
				<jsp:include page="footer.jsp"></jsp:include>
			</div>
		</div>
	</div>

</body>
</html>
