'use strict';

var WriteResumeTimer = function () {
	var fn = void 0,
	    keyData = void 0,
	    isLoggedIn = void 0,
	    sessionTime = void 0,
	    fullSessionTime = void 0;
	keyData = {
		recruitNoticeSn: $('input[name="recruitNoticeSn"]').val(),
		systemKindCode: 'MRS2'
	};

	fullSessionTime = 1800; // 30분
	isLoggedIn = true;

	fn = {
		init: function init(applyStartTime, applyEndTime) {
			fn.setApplyEndTime(applyStartTime, applyEndTime);
			fn.resetTime();
			fn.setTimer();
			fn.event();
		},
		event: function event() {
			$('button[data-button="keepLogin"]').click(fn.keepLogin);
		},
		setApplyEndTime: function setApplyEndTime(applyStartTime, applyEndTime) {
			$('#deadlineTime').html(D.date(applyStartTime, 'yyyy.MM.dd(E) HH:mm') + ' ~ ' + D.date(applyEndTime, 'yyyy.MM.dd(E) HH:mm')); // 접수마감시각 설정
		},

		// 타이머 인터벌 세팅
		setTimer: function setTimer() {
			setInterval(fn.updateTimer, 1000);
		},

		// 1초마다 정보 업데이트
		updateTimer: function updateTimer() {
			fn.updateSessionTimer();
		},
		updateSessionTimer: function updateSessionTimer() {
			var minute = void 0,
			    second = void 0;
			minute = parseInt(sessionTime / 60) % 60;
			second = sessionTime % 60;

			if (sessionTime >= 0) {
				sessionTime--;
				$('#countTime').html(fn.lpad(minute, 2) + '\uBD84 ' + fn.lpad(second, 2) + '\uCD08');
				if (sessionTime === 90 || sessionTime === 60 || sessionTime === 30) {
					//자동로그아웃 안내
					setTimeout(fn.beforeLogout, 500);
				} else if (sessionTime === 299) {
					// 종료 5분전 세션연장 말풍선 띄움
					$('#sessionArea').append(fn.loadTimerWarring());
				}
			} else {
				fn.logout();
			}
		},

		// 시간을 30분으로 리셋
		resetTime: function resetTime() {
			sessionTime = fullSessionTime; // 30분으로 리셋
			isLoggedIn = true;
			//저장버튼 보여줌
			$('#sessionArea .btnGroup button[type="submit"]').css({ 'display': 'inline-block' });
		},

		// 로그아웃 되기전에 레이어팝업 호출
		beforeLogout: function beforeLogout() {
			Common.modal({
				title: '자동로그아웃 안내',
				width: '500',
				height: '316',
				btnTitle: '로그인 연장',
				btnEvent: function btnEvent() {
					//로그인 연장
					fn.keepLogin();
					return true;
				},
				callback: function callback() {
					var objTimer = $('#autoLogoutTimer');
					var autoLogoutTimer = setInterval(function () {
						if (sessionTime >= 0) {
							objTimer.val(sessionTime + '\uCD08');
						} else {
							// 0초가 되면 안내창 닫음
							$('button[data-button="modalClose"]').click();
							clearInterval(autoLogoutTimer);
						}
					}, 1000);
				},

				content: function () {
					var t = [];
					t.push('<div style="font-size:14px;text-align:center">지원자 정보의 안전한 보호를 위해<br/>로그인 후 <strong>약 30분</strong> 동안 서비스 이용이 없어 <b style="color:#e23250">로그아웃</b> 됩니다.</div>');
					t.push('<div style="margin:25px 0;text-align:center"><span style="margin-right:10px;font-size:18px;">자동 로그아웃 남은 시간</span><input id="autoLogoutTimer" type="text" class="text center" readonly value="__초" style="font-size:19px;" size="5" /></div>');
					t.push('<div style="font-size:14px;text-align:center">로그인 시간을 연장하시겠습니까?</div>');
					return t.join('');
				}()
			});
		},

		// 로그인 연장
		keepLogin: function keepLogin() {
			// 말풍선 없앰
			$('#timerWarring').remove();

			if (isLoggedIn) {
				$.get('/app/applicant/keepLogin');
				fn.resetTime();
			} else {
				fn.logoutPop();
			}
		},

		// 로그인상태를 해제 후 로그아웃 윈도우 팝업 띄움
		logout: function logout() {
			if (isLoggedIn) {
				isLoggedIn = false;
				$.get('/app/applicant/logout');
				fn.logoutPop();
			}
		},
		logoutPop: function logoutPop() {
			//저장버튼 숨김
			$('#sessionArea .btnGroup button[type="submit"]').css({ 'display': 'none' });
			// 말풍선 없앰
			$('#timerWarring').remove();

			Common.modal({
				title: '자동로그아웃 안내',
				width: '400',
				height: '233',
				btnTitle: '다시 로그인',
				enabledCancel: false,
				btnEvent: function btnEvent() {
					fn.loginPop();
					return true;
				},

				content: function () {
					var t = [];
					t.push('<div class="modalLogoutMsg" style="font-size:15px;text-align:center">지원자 정보의 안전한 보호를 위해<br/>로그인 후 <strong>약 30분</strong> 동안 서비스 이용이 없어<br/><b style="color:#e23250">자동 로그아웃</b> 되었습니다.</div>');
					return t.join('');
				}()
			});
		},
		loginPop: function loginPop() {
			var pop = window.open('/app/applicant/popLogin?jobnoticeSn=' + keyData.recruitNoticeSn + '&systemKindCode=' + keyData.systemKindCode, 'popLogin', 'width=500,height=407,scrollbars=no,resizable=0');
			pop.focus();
		},
		lpad: function lpad(str, len) {
			str = '' + str;
			while (str.length < len) {
				str = '0' + str;
			}return str;
		},
		loadTimerWarring: function loadTimerWarring() {
			var t = [];

			t.push('<div id="timerWarring" class="wrapTimerWarring">');
			t.push('	<div class="wrapTimerWarringTop"><div class="timerWarringTop"></div></div>');
			t.push('	<div class="wrapTimerWarringBottom">');
			t.push('		<div class="timerWarringBottom">');
			t.push('			<div class="msgTop"><b>5분</b> <span>후 세션종료!</span></div>');
			t.push('			<div class="msgBottom">연장이 필요합니다.</div>');
			t.push('		</div>');
			t.push('	</div>');
			t.push('</div>');

			return t.join('');
		}
	};

	return {
		init: fn.init,
		resetTime: fn.resetTime,
		isLogin: function isLogin() {
			return isLoggedIn;
		},

		logoutPop: fn.logoutPop
	};
}();
//# sourceMappingURL=writeResumeTimer.js.map