<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>지원서 작성</title>
<link rel="stylesheet" href="./css/applicants.css">
<link rel="stylesheet" href="./css/skin.css">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script src="./js/certification.js" ></script>
<script src="./js/registResume.js" ></script>
<script src="/js/loginValidator.min.js" ></script>
</head>
<body class="type-07">
	<div id="wrap">
		<link rel="stylesheet"	href="./css/noticePopup.css">

		<form id="frm" method="post" data-step="2" data-type="save">
			<header id="header">
				<h1 class="recruitNoticeTitle">2020년 상반기 신입사원 공개채용</h1>
				<nav id="tab">
					<div class="active">
						<button type="submit" data-step="1">기본 정보</button>
					</div>
					<div class="">
						<button type="submit" data-step="2">교육 및 경험</button>
					</div>
					<div class="">
						<button type="submit" data-step="3">자격 및 기타</button>
					</div>
					<div class="">
						<button type="submit" data-step="4">자기소개서</button>
					</div>
					<div class="">
						<button type="submit" data-step="5">최종제출</button>
					</div>
				</nav>
			</header>
			<input type="hidden" name="resumeSn" value="3444130"> <input
				type="hidden" name="recruitNoticeSn" value="23003"> <input
				type="hidden" name="step" value=""> <input type="hidden"
				name="appsiteType" value="null"> <input type="hidden"
				name="colorClass" value="type-07"> <input type="hidden"
				name="fontClass" value="font-malgungothic"> <input
				type="hidden" name="isJobfairRecruitNotice" value="false"> <input
				type="hidden" name="serverTime" value="2020.03.06 15:40:49">
			<input type="hidden" id="systemKindCode" name="systemKindCode"
				value="">
			<div id="wrapResume">
				<section class="writeResume" data-code="11">
					<header>
						<h1 class="h1">기본정보</h1>
					</header>
					<div class="subject">
						<h2 class="h2 ">지원자</h2>
						<div class="row in-span no-margin">
							<div class="span per100">
								<span class="text">김경은</span>
							</div>
						</div>
						<div class="wrapGuide">
							<div class="guide hasTitle englishName">*여권에 기재되어 있는 이름으로
								입력해 주시기 바랍니다. (ex. Gil Dong Hong)</div>
						</div>
						<div class="row in-span half-margin">
							<label class="span per15  title" for="englishName">영문이름</label> <label
								class="span per30"><input type="text" class="text"
								maxlength="64" name="englishName" id="englishName" value=""></label>
						</div>
						<div class="row in-span half-margin">
							<label class="span per15 required title" for="genderFlag">성별</label>
							<div class="span per30 radio">
								<label><input type="radio" name="genderFlag" value="M"
									required="" id="genderFlag"><span class="label">남</span></label>
								<label><input type="radio" name="genderFlag" value="F"
									required=""><span class="label">여</span></label>
							</div>
							<label class="span per20 devider required title" for="birthday">생년월일</label>
							<label class="span per20"><input type="text"
								data-dates="birthday:YMD" class="text date" name="birthday"
								id="birthday" value="" required=""></label>
						</div>
					</div>
					<div class="subject">
						<h2 class="h2 required">지원분야</h2>
						<div class="wrapGuide">
							<div class="guide hasTitle applySector">*채용공고의 상세모집요강을
								확인바랍니다.</div>
						</div>
						<div class="row in-span no-margin" data-recruitsector="">
							<label class="span per25 select"><select
								name="applySector[0].depth0" required=""
								data-type="recruitField" data-depth="0">
									<option value="">직무1</option>
									<option value="">-------------------------</option>
									<option value="127420" data-downcode="">연구개발</option>
									<option value="127416" data-downcode="">제품개발</option>
									<option value="127417" data-downcode="">제품설계</option>
									<option value="164569" data-downcode="">제품설계/품질</option>
									<option value="127418" data-downcode="">생산</option>
									<option value="127419" data-downcode="">영업</option>
									<option value="127445" data-downcode="">경영지원</option>
							</select></label><label class="span per25 select"><select
								name="applySector[0].depth1" required=""
								data-type="recruitField" data-depth="1"><option
										value="">직무2</option>
									<option value="">-------------------------</option>
									<option value="127433">SW(PLC/HMI/Motion/Drive)</option>
									<option value="164567">회로설계</option></select></label><label
								class="span per25 select"><select
								name="applySector[0].depth2" required=""
								data-type="recruitField" data-depth="2"><option
										value="">지역</option>
									<option value="">-------------------------</option>
									<option value="61861">안양</option></select></label>
						</div>
					</div>
					<div class="subject">
						<h2 class="h2 required">지원경로</h2>
						<div class="row in-span no-margin">
							<label class="span per35 select"><select
								name="applyChannel.applyChannelCodeSn"
								data-rel-id="applyChannel" data-rel-type="with"
								data-rel-value="" required="">
									<option value="">지원경로를 선택하세요.</option>
									<option value="60823">잡코리아</option>
									<option value="60824">사람인</option>
									<option value="60825">인쿠르트</option>
									<option value="60826">커리어</option>
									<option value="60827">워크넷</option>
									<option value="60833">자소설닷컴</option>
									<option value="60828">취업카페</option>
									<option value="60829">지인소개</option>
									<option value="60831">서칭입력</option>
									<option value="60832">기타경로</option>
							</select></label>
							<div class="span per65" data-rel-target="applyChannel"
								data-rel-hide="true" style="display: none">
								<input type="text" maxlength="20000"
									name="applyChannel.textInput" value="" required="" class="text"
									data-rel-target="applyChannel" placeholder="상세 경로를 입력하세요."
									disabled="">
							</div>
						</div>
					</div>
				</section>
				<section class="writeResume" data-code="13">
					<header>
						<h1 class="h1">인적사항</h1>
					</header>
					<div class="subject photo">
						<h2 class="h2 required">지원서 사진등록 (권장사이즈 : 가로 160px X 세로 200px
							혹은 가로 4 : 세로 5 비율)</h2>
						<div id="wrapPhoto" class="wrapPhoto M">
							<label><input type="file" name="" value=""
								data-type="photo"></label> <img src="" width="160" height="200"
								alt="" id="photo">
						</div>
						<div class="row">
							<div class="wrapGuide photo">
								<div class="guide">*최근 3개월 내 촬영 *jpg, gif, png 파일</div>
							</div>
							<div class="btn-group">
								<input type="text" class="hidden" name="pictureFile" value=""
									required="">
								<button type="button" class="btn" data-button="addPhoto">사진등록</button>
								<button type="button" class="btn btn-ng"
									data-button="removePhoto">삭제</button>
							</div>
						</div>
					</div>
					<div class="subject">
						<h2 class="h2 required">국적</h2>
						<div class="row in-span no-margin">
							<label class="span per35 select"><select
								name="nationality" required="">
									<option value="">국가를 선택하세요.</option>
									<option value="GH">가나</option>
									<option value="GA">가봉</option>
									<option value="GY">가이아나</option>
									<option value="GM">감비아</option>
									<option value="GP">과들루프</option>
									<option value="GT">과테말라</option>
									<option value="GU">괌</option>
									<option value="GD">그레나다</option>
									<option value="GR">그리스</option>
									<option value="GL">그린란드</option>
									<option value="GN">기니</option>
									<option value="GW">기니비사우</option>
									<option value="NA">나미비아</option>
									<option value="NR">나우루</option>
									<option value="NG">나이지리아</option>
									<option value="AQ">남극</option>
									<option value="ZA">남아공</option>
									<option value="NL">네덜란드</option>
									<option value="AN">네덜란드령 안틸레스</option>
									<option value="NP">네팔</option>
									<option value="NO">노르웨이</option>
									<option value="NF">노퍽 섬</option>
									<option value="NC">누벨칼레도니</option>
									<option value="NZ">뉴질랜드</option>
									<option value="NU">니우에</option>
									<option value="NE">니제르</option>
									<option value="NI">니카라과</option>
									<option value="TW">대만</option>
									<option value="KR" selected="">대한민국</option>
									<option value="DK">덴마크</option>
									<option value="DO">도미니카 공화국</option>
									<option value="DM">도미니카 연방</option>
									<option value="DE">독일</option>
									<option value="TL">동티모르</option>
									<option value="LA">라오스</option>
									<option value="LR">라이베리아</option>
									<option value="LV">라트비아</option>
									<option value="RU">러시아</option>
									<option value="LB">레바논</option>
									<option value="LS">레소토</option>
									<option value="RE">레위니옹</option>
									<option value="RO">루마니아</option>
									<option value="LU">룩셈부르크</option>
									<option value="RW">르완다</option>
									<option value="LY">리비아</option>
									<option value="LT">리투아니아</option>
									<option value="LI">리히텐슈타인</option>
									<option value="MG">마다가스카르</option>
									<option value="MQ">마르티니크</option>
									<option value="MH">마셜 제도</option>
									<option value="YT">마요트</option>
									<option value="MO">마카오</option>
									<option value="MK">마케도니아 공화국</option>
									<option value="MW">말라위</option>
									<option value="MY">말레이시아</option>
									<option value="ML">말리</option>
									<option value="IM">맨 섬</option>
									<option value="MX">멕시코</option>
									<option value="MC">모나코</option>
									<option value="MA">모로코</option>
									<option value="MU">모리셔스</option>
									<option value="MR">모리타니</option>
									<option value="MZ">모잠비크</option>
									<option value="ME">몬테네그로</option>
									<option value="MS">몬트세랫</option>
									<option value="MD">몰도바</option>
									<option value="MV">몰디브</option>
									<option value="MT">몰타</option>
									<option value="MN">몽골</option>
									<option value="US">미국</option>
									<option value="UM">미국령 군소 제도</option>
									<option value="VI">미국령 버진아일랜드</option>
									<option value="MM">미얀마</option>
									<option value="FM">미크로네시아 연방</option>
									<option value="VU">바누아투</option>
									<option value="BH">바레인</option>
									<option value="BB">바베이도스</option>
									<option value="VA">바티칸 시국</option>
									<option value="BS">바하마</option>
									<option value="BD">방글라데시</option>
									<option value="BM">버뮤다</option>
									<option value="BJ">베냉</option>
									<option value="VE">베네수엘라</option>
									<option value="VN">베트남</option>
									<option value="BE">벨기에</option>
									<option value="BY">벨라루스</option>
									<option value="BZ">벨리즈</option>
									<option value="BA">보스니아 헤르체고비나</option>
									<option value="BW">보츠와나</option>
									<option value="BO">볼리비아</option>
									<option value="BI">부룬디</option>
									<option value="BF">부르키나파소</option>
									<option value="BV">부베 섬</option>
									<option value="BT">부탄</option>
									<option value="MP">북마리아나 제도</option>
									<option value="BG">불가리아</option>
									<option value="BR">브라질</option>
									<option value="BN">브루나이</option>
									<option value="WS">사모아</option>
									<option value="SA">사우디아라비아</option>
									<option value="GS">사우스조지아 사우스샌드위치 제도</option>
									<option value="SM">산마리노</option>
									<option value="ST">상투메 프린시페</option>
									<option value="PM">생피에르 미클롱</option>
									<option value="EH">서사하라</option>
									<option value="SN">세네갈</option>
									<option value="RS">세르비아</option>
									<option value="SC">세이셸</option>
									<option value="LC">세인트루시아</option>
									<option value="VC">세인트빈센트 그레나딘</option>
									<option value="KN">세인트키츠 네비스</option>
									<option value="SH">세인트헬레나</option>
									<option value="SO">소말리아</option>
									<option value="SB">솔로몬 제도</option>
									<option value="SD">수단</option>
									<option value="SR">수리남</option>
									<option value="LK">스리랑카</option>
									<option value="SJ">스발바르 얀마옌</option>
									<option value="SZ">스와질란드</option>
									<option value="SE">스웨덴</option>
									<option value="CH">스위스</option>
									<option value="ES">스페인</option>
									<option value="SK">슬로바키아</option>
									<option value="SI">슬로베니아</option>
									<option value="SY">시리아</option>
									<option value="SL">시에라리온</option>
									<option value="SG">싱가포르</option>
									<option value="AE">아랍에미리트</option>
									<option value="AW">아루바</option>
									<option value="AM">아르메니아</option>
									<option value="AR">아르헨티나</option>
									<option value="AS">아메리칸사모아</option>
									<option value="IS">아이슬란드</option>
									<option value="HT">아이티</option>
									<option value="IE">아일랜드</option>
									<option value="AZ">아제르바이잔</option>
									<option value="AF">아프가니스탄</option>
									<option value="AD">안도라</option>
									<option value="AL">알바니아</option>
									<option value="DZ">알제리</option>
									<option value="AO">앙골라</option>
									<option value="AG">앤티가 바부다</option>
									<option value="AI">앵귈라</option>
									<option value="ER">에리트레아</option>
									<option value="EE">에스토니아</option>
									<option value="EC">에콰도르</option>
									<option value="ET">에티오피아</option>
									<option value="SV">엘살바도르</option>
									<option value="GB">영국</option>
									<option value="VG">영국령 버진아일랜드</option>
									<option value="IO">영국령 인도양 지역</option>
									<option value="YE">예멘</option>
									<option value="OM">오만</option>
									<option value="AT">오스트리아</option>
									<option value="HN">온두라스</option>
									<option value="AX">올란드 제도</option>
									<option value="WF">왈리스 퓌튀나</option>
									<option value="JO">요르단</option>
									<option value="UG">우간다</option>
									<option value="UY">우루과이</option>
									<option value="UZ">우즈베키스탄</option>
									<option value="UA">우크라이나</option>
									<option value="EU">유럽연합</option>
									<option value="IQ">이라크</option>
									<option value="IR">이란</option>
									<option value="IL">이스라엘</option>
									<option value="EG">이집트</option>
									<option value="IT">이탈리아</option>
									<option value="IN">인도</option>
									<option value="ID">인도네시아</option>
									<option value="JP">일본</option>
									<option value="JM">자메이카</option>
									<option value="ZM">잠비아</option>
									<option value="JE">저지 섬</option>
									<option value="GQ">적도 기니</option>
									<option value="KP">조선민주주의인민공화국</option>
									<option value="GE">조지아</option>
									<option value="CN">중국</option>
									<option value="CF">중앙아프리카 공화국</option>
									<option value="DJ">지부티</option>
									<option value="GI">지브롤터</option>
									<option value="ZW">짐바브웨</option>
									<option value="TD">차드</option>
									<option value="CZ">체코</option>
									<option value="CL">칠레</option>
									<option value="CM">카메룬</option>
									<option value="CV">카보베르데</option>
									<option value="KZ">카자흐스탄</option>
									<option value="QA">카타르</option>
									<option value="KH">캄보디아</option>
									<option value="CA">캐나다</option>
									<option value="KE">케냐</option>
									<option value="KY">케이맨 제도</option>
									<option value="KM">코모로</option>
									<option value="CR">코스타리카</option>
									<option value="CC">코코스 제도</option>
									<option value="CI">코트디부아르</option>
									<option value="CO">콜롬비아</option>
									<option value="CG">콩고 공화국</option>
									<option value="CD">콩고 민주 공화국</option>
									<option value="CU">쿠바</option>
									<option value="KW">쿠웨이트</option>
									<option value="CK">쿡 제도</option>
									<option value="HR">크로아티아</option>
									<option value="CX">크리스마스 섬</option>
									<option value="KG">키르기스스탄</option>
									<option value="KI">키리바시</option>
									<option value="CY">키프로스</option>
									<option value="TH">타이</option>
									<option value="TJ">타지키스탄</option>
									<option value="TZ">탄자니아</option>
									<option value="TC">터크스 케이커스 제도</option>
									<option value="TR">터키</option>
									<option value="TG">토고</option>
									<option value="TK">토켈라우</option>
									<option value="TO">통가</option>
									<option value="TM">투르크메니스탄</option>
									<option value="TV">투발루</option>
									<option value="TN">튀니지</option>
									<option value="TT">트리니다드 토바고</option>
									<option value="PA">파나마</option>
									<option value="PY">파라과이</option>
									<option value="PK">파키스탄</option>
									<option value="PG">파푸아 뉴기니</option>
									<option value="PW">팔라우</option>
									<option value="PS">팔레스타인</option>
									<option value="FO">페로 제도</option>
									<option value="PE">페루</option>
									<option value="PT">포르투갈</option>
									<option value="FK">포클랜드 제도</option>
									<option value="PL">폴란드</option>
									<option value="PR">푸에르토리코</option>
									<option value="FR">프랑스</option>
									<option value="GF">프랑스령 기아나</option>
									<option value="TF">프랑스령 남부와 남극 지역</option>
									<option value="PF">프랑스령 폴리네시아</option>
									<option value="FJ">피지</option>
									<option value="FI">핀란드</option>
									<option value="PH">필리핀</option>
									<option value="PN">핏케언 제도</option>
									<option value="HM">허드 맥도널드 제도</option>
									<option value="HU">헝가리</option>
									<option value="AU">호주</option>
									<option value="HK">홍콩</option>
							</select></label>
						</div>
					</div>
					<div class="subject">
						<h2 class="h2 required">주소</h2>
						<div class="wrapGuide">
							<div class="guide hasTitle address">*실제 거주하고 있는 곳의 현 주소를 기재
								바랍니다.</div>
						</div>
						<div data-row="address" class="row in-span no-margin address">
							<label class="span per15  title" for="">현주소</label>
							<div class="span per85">
								<div class="row in-span no-margin">
									<div class="span per100 addresszipcode">
										<button type="button" class="btn btn-add"
											data-type="currentAddress">우편번호</button>
										<span class="postCode" data-type="currentAddress"
											data-span="postcode"></span> <input type="text"
											class="hidden" required="" name="currentAddress.zipCode"
											maxlength="126" value="">
									</div>
								</div>
								<div class="row in-span half-margin">
									<div class="span per40">
										<label><input type="text" required=""
											name="currentAddress.address" maxlength="128" value=""
											class="text" readonly=""></label>
									</div>
									<div class="span per60">
										<input type="text" required=""
											name="currentAddress.detailAddress" maxlength="128" value=""
											class="text">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="subject">
						<h2 class="h2 required">연락처</h2>
						<div class="wrapGuide">
							<div class="guide hasTitle contact">*연락처/이메일 기재오류가 있거나 미기재
								시 결과 발표에 누락 될 수 있사오니 정확히 기재 바랍니다.</div>
						</div>
						<div class="row in-span no-margin">
							<label class="span per15 title" for="">이메일주소</label>
							<div class="span per85">
								<span class="text">rlaruddms33@gmail.com</span>
							</div>
						</div>
						<div class="row in-span half-margin">
							<label class="span per15 title" for="">핸드폰번호</label>
							<div class="span per85">
								<span class="text">010-2332-0264</span>
							</div>
						</div>
					</div>
					<div class="subject">
						<h2 class="h2 ">장애여부</h2>
						<div class="wrapGuide">
							<div class="guide hasTitle handicap">*취업보호대상자(보훈 및 장애인)는
								관계법령에 의거 우대합니다.</div>
						</div>
						<div class="row in-span no-margin">
							<div class="span per20 radio" data-rel-id="handicap"
								data-rel-type="with" data-rel-value="true">
								<label><input type="radio" name="handicap.handicapYn"
									value="false" checked=""><span class="label">비대상</span></label>
								<label><input type="radio" name="handicap.handicapYn"
									value="true"><span class="label">대상</span></label>
							</div>
							<label class="span per20 select"><select
								name="handicap.handicapGradeCode" data-rel-target="handicap"
								disabled="">
									<option value="">등급</option>
									<option value="100">중증(기존 1~3급)</option>
									<option value="200">경증(기존 4~6급)</option>
							</select></label> <label class="span per20 select"><select
								name="handicap.handicapContentsCode" data-rel-target="handicap"
								disabled="">
									<option value="">내용</option>
									<option value="01">간장애</option>
									<option value="02">뇌전증장애(간질장애)</option>
									<option value="03">뇌병변장애</option>
									<option value="05">시각장애</option>
									<option value="06">신장장애</option>
									<option value="07">심장장애</option>
									<option value="08">안면변형장애</option>
									<option value="11">장루/요루장애</option>
									<option value="12">정신장애</option>
									<option value="15">청각장애</option>
									<option value="16">호흡기장애</option>
									<option value="17">지체장애</option>
									<option value="18">언어장애</option>
									<option value="19">지적장애(정신박약/정신지체)</option>
									<option value="20">자폐성장애(발달장애)</option>
									<option value="99">기타장애</option>
							</select></label>
						</div>
					</div>
					<div class="subject">
						<h2 class="h2 ">보훈여부</h2>
						<div class="wrapGuide">
							<div class="guide hasTitle patriot">*취업보호대상자(보훈 및 장애인)는
								관계법령에 의거 우대합니다.</div>
						</div>
						<div class="row in-span no-margin">
							<div class="span per20 radio" data-rel-id="patriot"
								data-rel-type="with" data-rel-value="true">
								<label><input type="radio" name="patriot.patriotYn"
									value="false" checked=""><span class="label">비대상</span></label>
								<label><input type="radio" name="patriot.patriotYn"
									value="true"><span class="label">대상</span></label>
							</div>
							<div class="span per20">
								<input type="text" maxlength="64" name="patriot.patriotNumber"
									value="" data-rel-target="patriot" class="text"
									placeholder="보훈번호" disabled="">
							</div>
							<div class="span per20">
								<input type="text" maxlength="64" name="patriot.relationship"
									value="" data-rel-target="patriot" class="text"
									placeholder="관계" disabled="">
							</div>
							<label class="span per20 select"><select
								name="patriot.patriotRate" data-rel-target="patriot" disabled="">
									<option value="">보훈비율</option>
									<option value="5">5%</option>
									<option value="10">10%</option>
							</select></label>
						</div>
					</div>
					<div class="subject">
						<h2 class="h2 required">병역사항</h2>
						<div class="row in-span no-margin">
							<label class="span per15 title " id="militaryType">병역구분</label>
							<div class="span per50 radio" data-rel-id="military noneMilitary"
								data-rel-type="complex" data-rel-value="01,04 03">
								<label><input type="radio"
									name="military.militaryTypeCode" id="militaryType" value="00"
									required=""><span class="label">비대상</span></label> <label><input
									type="radio" name="military.militaryTypeCode" value="01"
									required=""><span class="label">군필</span></label> <label><input
									type="radio" name="military.militaryTypeCode" value="02"
									required=""><span class="label">미필</span></label> <label><input
									type="radio" name="military.militaryTypeCode" value="03"
									required=""><span class="label">면제</span></label> <label><input
									type="radio" name="military.militaryTypeCode" value="04"
									required=""><span class="label">복무중</span></label>
							</div>
							<div class="span per35" style="display: none"
								data-rel-target="noneMilitary" data-rel-hide="true">
								<input type="text" maxlength="512"
									name="military.exemptionReason" value="" class="text"
									placeholder="면제사유를 입력하세요." data-rel-target="noneMilitary"
									disabled="">
							</div>
						</div>
						<div class="row in-span half-margin">
							<label class="span per15 title ">계급</label> <label
								class="span per25 select"><select
								name="military.militaryPositionCode" required=""
								data-rel-target="military" disabled="">
									<option value="">계급을 선택하세요.</option>
									<option value="01">이병</option>
									<option value="02">일병</option>
									<option value="03">상병</option>
									<option value="04">병장</option>
									<option value="05">하사</option>
									<option value="06">중사</option>
									<option value="07">상사</option>
									<option value="08">원사</option>
									<option value="09">준위</option>
									<option value="10">소위</option>
									<option value="11">중위</option>
									<option value="12">대위</option>
									<option value="13">소령</option>
									<option value="14">중령</option>
									<option value="15">대령</option>
									<option value="16">준장</option>
									<option value="17">소장</option>
									<option value="18">중장</option>
									<option value="19">대장</option>
									<option value="20">원수</option>
							</select></label> <label class="span per20 title devider ">복무기간</label> <label
								class="span per35 date"> <input type="text"
								data-dates="military.militaryDate:YM"
								name="military.militaryStartDate" value="" required=""
								class="text date start" data-rel-target="military" disabled="">
								<input type="text" data-dates="military.militaryDate:END"
								name="military.militaryEndDate" value="" required=""
								class="text date end" data-rel-target="military" disabled="">
							</label>
						</div>
						<div class="row in-span half-margin">
							<label class="span per15 title ">제대구분</label> <label
								class="span per25 select"><select
								name="military.militaryDischargeCode" required=""
								data-rel-id="militaryDischargeCode" data-rel-type="with"
								data-rel-value="99" data-rel-target="military" disabled="">
									<option value="">제대구분을 선택하세요.</option>
									<option value="01">만기제대</option>
									<option value="02">소집해제</option>
									<option value="03">의가사제대</option>
									<option value="04">의병제대</option>
									<option value="05">불명예제대</option>
									<option value="06">상이제대</option>
									<option value="99">직접입력</option>
							</select></label> <label class="span per60"
								data-rel-target="militaryDischargeCode" data-rel-hide="true"
								style="display: none;"> <input type="text"
								name="military.dischargeReason" value="" required=""
								class="text" maxlength="512" placeholder="제대구분을 입력하세요."
								data-rel-target="militaryDischargeCode" disabled="">
							</label>
						</div>
					</div>
					<div class="subject">
						<h2 class="h2 ">추가질문</h2>
						<div class="row in-span no-margin">
							<div class="span per100 title required">본인의 해당하는 항목에
								체크바랍니다. (최소 1개 이상 선택)</div>
							<div class="span per50 dropdown" data-dropdown="" data-min="1"
								data-required="true">
								<button type="button">답변을 선택하세요.</button>
								<div class="dropdown-menu"
									data-rel-id="personalInfo[0].selectedItem" data-rel-type="with"
									data-rel-value="undefined">
									<label class="checkbox ellipsis"><input type="checkbox"
										name="personalInfo[0].selectedItem" value="133499"
										data-checked="" data-textinput="false" data-others="false"><span
										class="label">해외거주 6년 이상 거주 경험이 있는 자</span></label> <label
										class="checkbox ellipsis"><input type="checkbox"
										name="personalInfo[0].selectedItem" value="133500"
										data-checked="" data-textinput="false" data-others="false"><span
										class="label">해외에서 학사/석사/박사 자격을 취득한 자</span></label> <label
										class="checkbox ellipsis"><input type="checkbox"
										name="personalInfo[0].selectedItem" value="133501"
										data-checked="" data-textinput="false" data-others="false"><span
										class="label">국내 외국인 유학생</span></label> <label
										class="checkbox ellipsis"><input type="checkbox"
										name="personalInfo[0].selectedItem" value="133498"
										data-checked="" data-textinput="false" data-others="true"><span
										class="label">해당사항없음</span></label>
								</div>
							</div>
							<div class="span per50"
								data-rel-target="personalInfo[0].selectedItem">
								<label class="selectedCheckbox"><input type="checkbox"
									data-name="personalInfo[0].selectedItem" value="133499"><span
									class="label">해외거주 6년 이상 거주 경험이 있는 자</span></label><label
									class="selectedCheckbox"><input type="checkbox"
									data-name="personalInfo[0].selectedItem" value="133500"><span
									class="label">해외에서 학사/석사/박사 자격을 취득한 자</span></label><label
									class="selectedCheckbox"><input type="checkbox"
									data-name="personalInfo[0].selectedItem" value="133501"><span
									class="label">국내 외국인 유학생</span></label><label class="selectedCheckbox"><input
									type="checkbox" data-name="personalInfo[0].selectedItem"
									value="133498"><span class="label">해당사항없음</span></label> <input
									type="text" name="personalInfo[0].textInput" value=""
									class="text" maxlength="20000" placeholder="기타 답변을 입력하세요."
									data-rel-target="personalInfo[0].selectedItem"
									data-rel-hide="true" required="" disabled=""
									style="display: none">
							</div>
							<input type="hidden" name="personalInfo[0].resumeBuilderSn"
								value="182465">
						</div>
					</div>
				</section>
			</div>
			<div id="wrapSessionArea">
				<div id="sessionArea" class="sessionArea">
					<div class="clock">
						<div class="point"></div>
					</div>
					<dl>
						<dt class="login">로그인 세션 남은 시간</dt>
						<dd class="login">
							<span id="countTime" class="count">29분 12초</span><span
								id="countTimeTotal" class="countTotal"> / 30분</span>
							<button type="button" class="btn btn-mini"
								data-button="keepLogin">연장</button>
							<button type="button" class="btn btn-mini btn-ng"
								data-tooltip="session">?</button>
							<div id="sessionTooltip" class="sessionTooltip hide">
								<strong>30분 이내</strong> 저장하지 않으면, 세션이 종료되어 로그인 정보가 사라집니다.<br>
								<strong>30분마다 임시저장</strong>을 해주세요.
							</div>
						</dd>
						<dt class="regist">접수기간</dt>
						<dd class="regist" id="deadlineTime">2020.02.24(월) 10:00 ~
							2020.03.15(일) 23:59</dd>
					</dl>
					<div class="btnGroup">
						<button type="button" data-type="tempSave"
							class="btn btn-great btn-ng">임시저장</button>
						<button type="submit" data-step="2" class="btn btn-great"
							style="display: inline-block;">다음</button>
					</div>
				</div>
			</div>
			<div id="guideTooltip" class="sessionTooltip hide"></div>
		</form>
		<script
			src="/resources-2.0.3a/scripts/app/custom/popUp.js?v=200302180728"></script>

		<script
			src="/resources-2.0.3a/mrs2/release/js/applicant/writeResume/timeline.js?v=200302180728"></script>

		<script
			src="/resources-2.0.3a/mrs2/release/js/applicant/modalAgreement.js?v=200302180728"></script>

		<script
			src="/resources-2.0.3a/mrs2/release/js/applicant/writeResume/writeResume.js?v=200302180728"></script>

		<script
			src="/resources-2.0.3a/mrs2/release/js/applicant/writeResume/writeResumeTemplate.js?v=200302180728"></script>

		<script
			src="/resources-2.0.3a/mrs2/release/js/applicant/writeResume/writeResumeTimer.js?v=200302180728"></script>


	</div>
	<!--//wrap-->





	<link rel="stylesheet" type="text/css" href="./css/post/search.css">
</body>
</html>