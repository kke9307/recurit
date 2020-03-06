

// 지원서 작성 본인인증
let Certification = (function() {
	let fn, keyData;
	
	keyData = {
		jobnoticeSn : null,
		systemKindCode : null
	};
	
	fn = {
		init(jobnoticeSn, systemKindCode) {
            if(!jobnoticeSn || !systemKindCode) {
				$('#certification').html(fn.template({})); // 필수데이터가 안넘어오면 빈객체를 넘겨서 초기화
				return false;
            }
            
			keyData.jobnoticeSn = jobnoticeSn;
			keyData.systemKindCode = systemKindCode;
			fn.load();
			fn.event();
		},
		event() {
			// 이메일
			$('#certification button[data-button="email"]').click(fn.email);
			
			// 아이핀
			$('#certification button[data-button="ipin"]').click(fn.ipin);
			
			// SMS
			$('#certification button[data-button="sms"]').click(fn.sms);
		},
		load() {
			let param = {};
			
			param.jobnoticeSn = keyData.jobnoticeSn;
			param.systemKindCode = keyData.systemKindCode;

            $.ajax({
                type: 'post', dataType: 'json', beforeSend : Common.loading.show(),
                url: '/app/applicant/getJobnoticeAdditionalInfo',
                async : false,
                data: param
            }).always(Common.loading.countHide).fail(Common.ajaxOnfail)
			.done(function(x, e) {
				// 생년월일 기재 가이드
				$('#guideBirthday').html(fn.guide('birthday', x.birthday));

				// 성별 기재 가이드
				$('#guideGender').html(fn.guide('gender', x.genderFlag));
				
				// 인증번호 업데이트
				$('#certification').addClass('subject').html(fn.template(x.realNameCheck));
			});
		},
		guide(type, value) {
			if(value) return ''; // 값이 false면 가이드 노출
			switch(type) {
				case 'birthday' : return '※ 생년월일은 \'근로기준법 제5장 제64조(최저연령과 취직인허증)\'의 준수를 위해 확인용도로만 사용되며, 이력서 작성항목에 포함되지 않습니다.';
				case 'gender' : return '※ 성별은 \'근로기준법 제5장(여성과 소년)\'의 준수를 위해 확인 용도로만 사용되며, 이력서 작성항목에 포함되지 않습니다.';
			}
		},
		email() {
			let modalOpt, param;
			
			if(!$('#email').val()) {
				Alert('이메일 인증을 하려면 먼저 이메일을 입력하세요.', function() {
					$('#email').focus();
				});
				return false;
			}
			
			modalOpt = {
				title : '이메일 본인인증',
				width : '500',
				height : '300',
				enabledConfirm : false,
				btnTitle : '확인',
				callback() {
					$('#modalFrm input[type="text"]').on('keydown', function(e) {
						if(e.keyCode === 13) {
							e.preventDefault();
							$('[data-button="modalSubmit"]').click();
						}
					});
				},
				btnEvent : fn.emailSubmit,
				content : (function() {
					let t = [];
					t.push('<div style="font-size:14px;">');
					t.push('	<p>이메일로 인증번호가 발송완료 되었습니다.<br/>받는 메일서버의 상황에 따라 최대 5분 정도 소요됩니다.<br/>받으신 인증번호를 하단에 입력하세요.</p>');
					t.push('	<input type="text" id="emailRealNameCheckNumber" class="text text100per" style="margin-top:20px;" placeholder="인증번호 입력" data-valid="blank" title="이메일 인증번호" />');	
					t.push('</div>');
					return t.join('');
				})()
			};

			param = $('#frm').serializeArray();
			if(!$('#frm input[name="systemKindCode"]').size()) {
				// like-select에서 선택했을 경우 #frm에 input[name="systemKindCode"]가 없어서 추가해준다.
				param.push({name:'systemKindCode', value: keyData.systemKindCode});
			}
			
			// dataType이 text인것에 주의할 것
            $.ajax({ 
                type: 'post', dataType: 'text', beforeSend : Common.loading.show(),
                url: '/app/applicant/sendRealNameCheckEmail',
                async : false,
                data: param
            }).always(Common.loading.countHide).fail(Common.ajaxOnfail)
			.done(function(x, e) {
				if(x !== 'success') {
					Alert(x, function() {
						Common.modal(modalOpt);
					});
				} else Common.modal(modalOpt);
			});
		},
		emailSubmit() {
			let isSuccess = false;
			let param ={};
			
			param.jobnoticeSn = keyData.jobnoticeSn;
			param.email = $('#email').val();
			param.emailRealNameCheckNumber = $('#emailRealNameCheckNumber').val();
			
			if(!param.emailRealNameCheckNumber) {
				Alert('인증번호를 입력하세요.', function() {
					$('#emailRealNameCheckNumber').focus();
				});
				return false;
			}
			
            $.ajax({
                type: 'post', dataType: 'json', beforeSend : Common.loading.show(),
                url: '/app/applicant/performEmailRealNameCheck',
                async : false,
                data: param
            }).fail(Common.ajaxOnfail).always(Common.loading.countHide)
			.done(function(x, e) {
				Alert('인증되었습니다.');
				isSuccess = true;
			});
			
			// 버튼 옆에 인증되었다는 메세지를 뿌려줌
            fn.certificationMsg(isSuccess);
			
			return isSuccess;
		},
		ipin() {
			let ipinWindow;
			
			ipinWindow = window.open('', 'IPINWindow', 'width=450, height=500, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200');
			if(ipinWindow === null) {
				Alert(' ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.');
			}
			$('#frm').attr({target:'IPINWindow', action:'/app/applicant/beforeIpinRealNameCheck', 'data-status':'submit'}).submit().removeAttr('data-status');
		},
		sms() {
			let pccWindow;
			// 한 공고내에서 휴대전화 인증을 동일한 번호가 하루 5회를 초과하여 시도 불가처리
			pccWindow = window.open('', 'PCCV3Window', 'width=430, height=560, resizable=1, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200');
			if (pccWindow === null) {
				Alert(' ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.');
			}
			$('#frm').attr({target:'PCCV3Window', action:'/app/applicant/beforeSmsRealNameCheck', 'data-status':'submit'}).submit().removeAttr('data-status');
		},
		certificationMsg(isSuccess) {
			// 	버튼 옆에 인증되었다는 메세지를 뿌려줌	
			if(isSuccess) $('#certificationMsg').removeClass('error').addClass('ok').html('본인인증이 완료되었습니다.');
			else $('#certificationMsg').removeClass('error, ok').html('');
		},
		template(x) {
			let t = [];
			
			//본인인증을 설정하지 않았거나, 사용안함으로 설정하였을 경우 SKIP처리			
			if(x === null || !x.isUse) {
				$('#certification').removeClass('subject');
				return '';
			}
			
			t.push('<label class="h2">본인확인</label>');
			t.push('<div class="row in-span no-margin">');
			t.push('	<div class="span per100">');
			if(x.useEmail) {
				t.push('	<button type="button" data-button="email" class="btn">이메일 인증 </button>');
				t.push('	<div class="wrapLayerInfo" style="display:none">');
				t.push('		<i class="fa fa-info-circle"></i>');
				t.push('		<ul class="layerInfo">');
				t.push('			<li>이메일 인증은 주민등록번호 대체수단으로서 지원자의 주민등록번호 대신, 지원서 제출에 사용한 이메일로 인증번호를 전송하여 인증번호를 입력 후 지원서를 작성하실 수 있습니다.</li>');
				t.push('			<li>타인의 정보를 도용하여 사용하는 경우 3년 이하의 징역 또는 1천만원 이하의 벌금이 부과될 수 있으며,<br/>채용과정에서 제외될 수 있습니다.</li>');
				t.push('			<li>받는 메일서버의 사정으로 이메일 인증을 위한 인증번호를 받지 못하는 경우도 있습니다.</li>');
				t.push('			<li>이메일 인증은 인증번호 전송 후 동일한 메일주소로는 5분 동안 발송되지 않습니다.</li>');
				t.push('		</ul>');
				t.push('	</div>');
			}
			if (x.useIpin) {
				t.push('	<button type="button" data-button="ipin" class="btn">아이핀 인증 </button>');
				t.push('	<div class="wrapLayerInfo" style="display:none">');
				t.push('		<i class="fa fa-info-circle"></i>');
				t.push('		<ul class="layerInfo">');
				t.push('			<li>아이핀(i-PIN)은 주민등록번호 대체수단으로서 지원자의 주민등록번호 대신, 식별 ID를 SCI평가정보(주)로부터 발급받아 본인확인을 거쳐 지원서를 작성하실 수 있습니다.</li>');
				t.push('			<li>타인의 정보를 도용하여 사용하는 경우 3년 이하의 징역 또는 1천만원 이하의 벌금이 부과될 수 있으며,<br/>채용과정에서 제외될 수 있습니다.</li>');
				t.push('			<li>실명확인이 안되실 경우 아이핀 인증 서비스를 제공하고 있는 SCI평가정보(주)의 1577-1006로 연락주시기 바랍니다.</li>');
				t.push('		</ul>');
				t.push('	</div>');
			}
			if (x.useSms) {
				t.push('	<button type="button" data-button="sms" class="btn">SMS 인증 </button>');
				t.push('	<div class="wrapLayerInfo" style="display:none">');
				t.push('		<i class="fa fa-info-circle"></i>');
				t.push('		<ul class="layerInfo">');
				t.push('			<li>휴대전화인증(SMS)은 주민등록번호 대체수단으로서 지원자의 주민등록번호 대신, 식별 ID를 SCI평가정보(주)로부터 발급받아 본인확인을 거쳐 지원서를 작성하실 수 있습니다.</li>');
				t.push('			<li>타인의 정보를 도용하여 사용하는 경우 3년 이하의 징역 또는 1천만원 이하의 벌금이 부과될 수 있으며,<br/>채용과정에서 제외될 수 있습니다.</li>');
				t.push('			<li>통신사의 사정으로 휴대전화 인증을 위한 메시지를 받지 못하는 경우도 있습니다.</li>');
				t.push('			<li>인증번호 전송비용은 \'고객사명\'에서 부담합니다.</li>');
				t.push('			<li>휴대폰 인증은 하루에 최대 5회만 이용하실 수 있습니다.</li>');
				t.push('		</ul>');
				t.push('	</div>');
			}
			t.push('		<span id="certificationMsg" style="margin-left:10px;"></span>');
			t.push('	</div>');
			t.push('</div>');
			
			return t.join('');
		}
	};
	
	return {
		init : fn.init,
		callback : fn.certificationMsg
	};
})();