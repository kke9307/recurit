let RegistResume = (function() {
	let fn, keyData, recruitNoticeList = [], targetRecruitNotice = {}, paramData = {}, interval, modalAgreement = { canMoveNextStep: false }, blockEmailData;

	let toggleClassWhen = function(targets, boolean, defaultMsg, customMsg) { // 유효성 검사결과에 따라 input들에 class부여
		let key;
		for(key in targets) {
			if(targets[key].hasClass('ok error')) targets[key].toggleClass('ok error', boolean);
			else if(boolean) targets[key].removeClass('error').addClass('ok');
			else targets[key].removeClass('ok').addClass('error');
		}

		targets.$validMsg.html(boolean ? defaultMsg : customMsg);
	};

    keyData = {
		mode : $('#frm').attr('data-type'), // 지원서 작성 : regist, 상시채용 지원서 작성 : alwaysRegist
		jobnoticeSn : null, // 이전단계에서 jobnoticeSn을 물고 들어왔는지 확인하는 용도, param의 jobnoticeSn과는 용도가 다름,
        checkName : false, //이름 양식이 맞는지
		checkEmail : false, // 이메일 양식이 맞는지
		checkPassword : false, // 비밀번호 양식이 맞는지
		emailConfirm : false, // 이메일과 이메일 확인이 같은지
		passwordConfirm : false // 비밀번호와 비밀번호 확인이 같은지
	};
	
	// 선택된 공고설정과 Form 정보를 갖고 있는 변수
	// 채솔 1.0에서 serializeArray로 설계되어 실제로 데이터를 넘기는데 사용하진 않음
	// 각종 Modal에서 Form의 데이터를 끌어쓰는 일이 많은데 그 경우 사용하기 위해 데이터를 유지함
	paramData = {
		jobnoticeSn : null,
		name : null,
		mobile1 : null,
		mobile2 : null,
		mobile3 : null,
		email : null,
		password : null,
		systemKindCode : null, // 채용솔루션 1.0(MRS1)인지 2.0(MRS2)인지
		recruitTypeCode : null, // 채용형태가 무엇인지 (일반, 상시, 추천, 비공개채용)
		checkPrivatePassword : null // 비밀번호 사용여부(비공개채용에서만 사용하는 코드, 추천은 무조건 코드를 넣어야 해서 이 값을 사용 안 함)
	};
	
	// 사용할 수 없는 이메일 리스트
	blockEmailData = ['live.com', 'msn.com', 'hotmail.com', 'outlook.com', 'outlook.kr'];
	
	fn = {
		init() {
			$('head>title').html(keyData.mode === 'alwaysRegist' ? '상시채용 지원서 작성' : '지원서 작성'); // 헤드 수정
			keyData.jobnoticeSn = Number($('#paramJobnoticeSn').val());
			keyData.systemKindCode = $('#paramSystemKindCode').val();

			fn.load();
			fn.event();
			
			fn.privatePassword(); // 추천채용, 비공개채용 비밀번호 노출여부
			if(keyData.jobnoticeSn) fn.initJobnoticeSn(keyData.jobnoticeSn, keyData.systemKindCode); // 채용공고 시리얼넘버에 따른 초기화
		},
		load() {
			let param = {};

			param.applicantActionCode = (keyData.mode === 'regist' ? 'REGIST_RESUME' : keyData.mode === 'alwaysRegist' ? 'ALWAYS_RESUME' : null);
			if(!param.applicantActionCode) throw new Error('applicantActionCode가 잘못되었습니다.');
			if(keyData.jobnoticeSn) param.jobnoticeSn = keyData.jobnoticeSn;

            $.ajax({
                type: 'post', dataType: 'json', beforeSend : Common.loading.show(),
                url: '/app/applicant/getJobnoticeList',
                async : false,
                data: param
            }).always(Common.loading.countHide).fail(Common.ajaxOnfail)
			.done(function(x, e) {
				recruitNoticeList = x;
				if(keyData.systemKindCode) { // MRS-4142 jobnoticeSn으로만 조회하다보니 채솔1.0, 2.0 공고의 키값이 같은경우 systemKindCode를 한번더 체크해야함
                    recruitNoticeList = recruitNoticeList.filter(function(recruitNotice) {
                        if (keyData.systemKindCode === recruitNotice.systemKindCode) return true;
                    });
                } else if(!keyData.systemKindCode && keyData.jobnoticeSn) { // MRS-4197 KT단독 채용사이트 같은 곳에서 systemKindCode를 안넘기면 Ajax에서 주는 데이터로 여기서 처리
                    recruitNoticeList.forEach(function(recruitNotice) {
                        if(keyData.jobnoticeSn === recruitNotice.jobnoticeSn) keyData.systemKindCode = recruitNotice.systemKindCode;
                    });
                }

				$('#loginForm').html(fn.template());
			});
		},
		event() {
			// like-select 활성화
			$('div.like-select>button').click(function() {
				if($(this).hasClass('active')) $(this).removeClass('active');
				else {
					$(this).addClass('active');
					$(this).next('div').find('input[type="search"]').focus();
				}
			});

			// like-select 닫기
			$(document).on('mousedown', function(e) {
				if(!$(e.target).closest('div.like-select').size()) {
					$('div.like-select>button.active').removeClass('active');
				}
			});

			// like-select 선택
			$('div.like-select>button+div button').click(function() {
				let name, $wrap, value, systemKindCode;
				$wrap = $(this).closest('div.like-select[data-name]'),
				name = $wrap.attr('data-name'),
				value = $(this).attr('data-value');
				systemKindCode = $(this).attr('data-systemKindCode');

				if(!name) throw new Error('like-select에 data-name을 추가하세요.');
				if(!$wrap.find(`input[name="${name}"]`).size()) throw new Error(`적용할 input이 없습니다. : ${name}`);

				$wrap.find(`input[name="${name}"]`).val(value); // value 업데이트
				$wrap.find('>button').text($(this).text()).attr('title', $(this).text()); // 텍스트 업데이트
				$(document).mousedown(); // like-select 닫기
				fn.initJobnoticeSn(value, systemKindCode);
			});

			// like-select 키워드 검색
			$('div.like-select input[type="search"]').focus(function(e) {
				let oldKeyword = this.value, _this = this, $list = $(this).next('ul').find('button');
				interval = setInterval(function() {
					let keyword = _this.value;
					if(oldKeyword === keyword) return;
					oldKeyword = keyword;
					$list.each(function() {
						let title = $(this).attr('title');
						if(keyword === '') $(this).show();
						else if(title.indexOf(keyword) < 0) $(this).hide();
						else $(this).show();
					});
				}, 200);
			}).blur(function(e) {
				clearInterval(interval);
			}).keydown(function(e) {
				if(e.keyCode === 13) return false;
			});

			// 추천채용, 비공개채용 blur시 trim
			$('#privatePassword').blur(function() {
				this.value = this.value.trim();
			});
			
			// 휴대전화는 항상 숫자만 나오게 함
			$('input[name^="mobile"]').blur(function(e) {
				let msg = '';
				
				$('input[name^="mobile"]').each(function() {
					let obj = {};
					if(this.value) {
						obj = LoginValidator.phone(this.value);
						if(!obj.valid) {
							msg = obj.msg;
							this.value = '';
						}
					}
				});
				
				$('#phoneRegMsg').html(msg);
			});
			
			//이름 임력
			$('#name').focus(fn.checkName).blur(function() {
				clearInterval(interval);
            });
			
			// 이메일 입력
			$('#email').focus(fn.checkEmail).blur(function() {
				clearInterval(interval);
				if($(this).val() !== $('#emailConfirm').val()) $('#emailConfirm').val('');
			});
			
			// 비밀번호 입력
			$('#password').focus(fn.checkPassword).blur(function() {
				clearInterval(interval);
				if($(this).val() !== $('#passwordConfirm').val()) $('#passwordConfirm').val('');
			});
			
			// 이메일, 비밀번호 확인
			$('#emailConfirm, #passwordConfirm').focus(fn.checkConfirm).blur(function() {
				clearInterval(interval);
			});
			
			// 지원서 작성버튼 클릭
			$('#frm').submit(fn.submit);

			$('button[data-button="agreement"]').on('click', function() {
				modalAgreement = ModalAgreement(paramData.jobnoticeSn, paramData.systemKindCode, 'REGIST_RESUME', null, function() {
					fn.updateAgreementButton(true, modalAgreement.canMoveNextStep); //내용확인 버튼 ui 업데이트
				});
			});
		},
		initJobnoticeSn(jobnoticeSn, systemKindCode) {
			let tmpJobnotice;
			jobnoticeSn = parseInt(jobnoticeSn);
			recruitNoticeList.forEach(function(jobnotice) {
				tmpJobnotice = jobnotice;
				if ((tmpJobnotice['jobnoticeSn'] === jobnoticeSn) && (tmpJobnotice['systemKindCode'] === systemKindCode)) targetRecruitNotice = tmpJobnotice;
			});

			paramData.jobnoticeSn = targetRecruitNotice['jobnoticeSn'];
			paramData.systemKindCode = paramData.jobnoticeSn ? targetRecruitNotice.systemKindCode : '';
			paramData.recruitTypeCode = paramData.jobnoticeSn ? targetRecruitNotice.recruitTypeCode : '';
			paramData.checkPrivatePassword = paramData.jobnoticeSn ? targetRecruitNotice.checkPrivatePassword : '';
			$('#systemKindCode').val(paramData.systemKindCode);
			fn.privatePassword(); // 추천채용, 비공개채용 비밀번호 노출여부
			Certification.init(paramData.jobnoticeSn, paramData.systemKindCode);

			fn.updateAgreementButton(true, false);
		},
		updateAgreementButton(isJobnoticeSelected, canMoveNextStep) {
			$('[data-button="agreement"]').prop('disabled', !isJobnoticeSelected).text(canMoveNextStep ? '확인완료' : '내용확인');
			$('[data-wrap="agreement"]').removeClass('disabled', isJobnoticeSelected);
			$('#agreementRegMsg').toggleClass('hide', canMoveNextStep);
		},
		// 추천채용, 비공개채용 비밀번호 노출여부
		privatePassword() {
			if((paramData.recruitTypeCode === '91' || paramData.recruitTypeCode === 'RECOMMEND') || ((paramData.recruitTypeCode === '92' || paramData.recruitTypeCode === 'PRIVATE') && paramData.checkPrivatePassword === true)) {
				$('#privatePassword').show().prop('disabled', false);
				$('#privatePassword').attr('title', '코드');
				$('#privatePassword').attr('placeholder', (paramData.recruitTypeCode === '91' || paramData.recruitTypeCode === 'RECOMMEND') ? '추천코드' : '채용공고 비밀번호');
			} else {
				$('#privatePassword').hide().prop('disabled', true);
			}
		},
		checkName(e) {
            let obj;
            interval = setInterval(function() {
                obj = LoginValidator.name($('#name').val());
                keyData.checkName = obj.valid;
                if(obj.valid === true) $('#nameRegMsg').removeClass('error').addClass('ok').html('');
                else $('#nameRegMsg').removeClass('ok').addClass('error').html(obj.msg);
            }, 100);
		},
		checkEmail(e) {
			let obj, email;
			let targets = {
				$input : $('#email'),
				$validMsg : $('#emailRegMsg')
			};

			interval = setInterval(function() {
				let isBlockEmail = false, failMsg = '';
				email = $('#email').val();
				obj = LoginValidator.email(email);
				keyData.checkEmail = obj.valid;
				
				if(keyData.checkEmail === true) {
					blockEmailData.forEach((value, index) => {
						if(email.indexOf(value) > -1) isBlockEmail = true, keyData.checkEmail = false;
					});
				}
				
				failMsg = (isBlockEmail === true) ? 'Microsoft의 대량메일수신정책으로 Microsoft에서 제공하는 메일 주소는 수신이 원활하지 않을 수 있습니다. 다른 메일을 이용하세요.' : obj.msg;
				
				if(email === '') { targets.$validMsg.removeClass('error, ok').html(''); targets.$input.removeClass('error, ok'); }
				(isBlockEmail === true) ? $('#emailRegMsg').removeClass('per40').addClass('per100') : $('#emailRegMsg').removeClass('per100').addClass('per40');
				toggleClassWhen(targets, obj.valid === true && email !== '' && isBlockEmail === false, '올바른 이메일 양식입니다.', failMsg);
			}, 100);
		},
		checkPassword(e) {
			let obj;
			let targets = {
				$input : $('#password'),
				$validMsg : $('#passwordRegMsg')
			};
			interval = setInterval(function() {
				obj = LoginValidator.password($('#password').val());
				keyData.checkPassword = obj.valid;
				if($('#password').val() === '') { targets.$validMsg.removeClass('error, ok').html(''); targets.$input.removeClass('error, ok'); } else toggleClassWhen(targets, obj.valid === true && $('#password').val() !== '', '사용해도 좋은 비밀번호입니다.', obj.msg);
			}, 100);
		},
		checkConfirmFunc(type, value) {
			let targets = {
				$input : $(`input[data-type="${type}"]`),
				$validMsg : $(`#${type}ValidaterMsg`)
			};
			let msgTitle = (type === 'email') ? '이메일이' : '비밀번호가';

			if(value === '') { targets.$validMsg.removeClass('error, ok').html(''); targets.$input.removeClass('error, ok'); } else toggleClassWhen(targets, value === targets.$input.val(), `${msgTitle} 일치합니다.`, `${msgTitle} 일치하지 않습니다.`);

			keyData[`${type}Confirm`] = (value !== '' && value === $(`input[data-type="${type}"]`).val()) ? true : false;
		},
		checkConfirm(e) {
			let value, type;
			type = $(this).attr('data-type'),
			value = $(`#${type}`).val(),

			interval = setInterval(fn.checkConfirmFunc.bind(this, type, value), 100);
		},
		// 지원서 작성
		submit(e) {
			let status, modalOpt;

			//지원서 작성 하기 전 한번더 이메일, 비밀번호 체크를 한다.
			fn.checkConfirmFunc.call($('#passwordConfirm'), 'password', $('#password').val());
			fn.checkConfirmFunc.call($('#emailConfirm'), 'email', $('#email').val());

			status = $(this).attr('data-status');
			
			// status가 submit이 아니면 모달을 띄우고 submit이면 정말로 넘긴다
			if(status !== 'submit') {
				e.preventDefault();
				
				// 파라미터 업데이트
				fn.updateParam();
				
				// 밸리데이션
				if(fn.validation() === false) return false;

				modalOpt = {
					title : '지원 정보 확인',
					width : '500',
					height: '460',
					scroll : false,
					closeAnimation : false,
					enabledConfirm : false,
					btnTitle : '지원서 작성',
					btnEvent() {
						setTimeout(function() {
							fn.login();
						}, 100);
						return true;
					},
					content : fn.templateModalConfirm()
				};
				Common.modal(modalOpt);			
			}
		},
		validation() {
			// 추천채용, 비공개채용 처리
			if(!fn.validPrivatePassword()) {
				let inputName = (paramData.recruitTypeCode === '91' || paramData.recruitTypeCode === 'RECOMMEND') ? '추천코드' : '채용공고 비밀번호';
				Alert(`${inputName}를 올바르게 입력하세요.`, function() {
					$('#privatePassword').focus();
				});
				return false;
			}

			if(!keyData.checkName) {
				Alert('이름에는 특수문자가 포함될 수 없습니다.', function() {
					$('#name').focus();
				});
				return false;
			}

			if(!keyData.checkEmail) {
				Alert('이메일을 이메일 양식에 맞게 입력하세요.', function() {
					$('#email').focus();
				});
				return false;
			}
			
			if(!keyData.checkPassword) {
				Alert('비밀번호를 비밀번호 양식에 맞게 입력하세요.', function() {
					$('#password').focus();
				});
				return false;
			}	
			
			if(!keyData.emailConfirm) {
				Alert('이메일이 일치하지 않습니다.', function() {
					$('#emailConfirm').focus();
				});
				return false;
			}
			
			if(!keyData.passwordConfirm) {
				Alert('비밀번호가 일치하지 않습니다.', function() {
					$('#passwordConfirm').focus();
				});
				return false;
			}

			if(!modalAgreement.canMoveNextStep) {
				Alert('개인정보 제공동의를 하셔야 다음단계를 진행하실 수 있습니다.', function() {
					$('[data-button="agreement"]').focus();
				});
				return false;
			}
			
			return true;
		},
		validPrivatePassword() {
			let isSuccess = false, param = {}, url, password;
			
			password = $('#privatePassword').val();
			
			param.systemKindCode = paramData.systemKindCode;
			param.jobnoticeSn = paramData.jobnoticeSn;
			
			switch(paramData.recruitTypeCode) {
			case '91' : // 추천채용
			case 'RECOMMEND' :
				url = '/app/jobnotice/verifyRecommendCode';
				param.recommendCode = password;
				break;
			case '92' : // 비공개채용
			case 'PRIVATE' :
				url = '/app/jobnotice/verifyPassword';
				param.privatePassword = password;
				break;
			default : // 추천채용이나 비공개채용이 아닐경우 그냥 리턴함
				return true;
			}
			
            $.ajax({ // dataType이 text임
                type: 'post', dataType: 'text', beforeSend : Common.loading.show(),
                url: url,
                async : false,
                traditional : true,
                data: param
            }).always(Common.loading.countHide).fail(Common.ajaxOnfail)
			.done(function(x, e) {
				if(parseInt(x) > 0) isSuccess = true;
			});
            
            return isSuccess;
		},
		// 모델 데이터를 업데이트
		updateParam() {
			paramData.jobnoticeSn = $('#jobnoticeSn').val();
			paramData.name = $('#name').val();
			paramData.mobile1 = $('#mobile1').val();
			paramData.mobile2 = $('#mobile2').val();
			paramData.mobile3 = $('#mobile3').val();
			paramData.email = $('#email').val();
			paramData.password = $('#password').val();

			paramData.recruitTypeCode = targetRecruitNotice.recruitTypeCode;
			paramData.checkPrivatePassword = targetRecruitNotice.checkPrivatePassword;
			paramData.systemKindCode = targetRecruitNotice.systemKindCode;

			paramData.agreementLetterSn = modalAgreement ? modalAgreement.agreementLetterSn : null;
			paramData.agreementItemSnSet = modalAgreement ? modalAgreement.agreementItemSnSet : null;
		},
		login() {
			let serializedArray = $('#frm').serializeArray();
			if(!$('input[name="systemKindCode"]').val()) serializedArray.push({name: 'systemKindCode', value: paramData.systemKindCode});
			serializedArray.push({name: 'agreementLetterSn', value: modalAgreement.agreementLetterSn});
			serializedArray.push({name: 'agreementItemSnSet', value: modalAgreement.agreementItemSnSet.join()});

            $.ajax({
                type: 'post', dataType: 'json', beforeSend : Common.loading.show(),
                url: 'loginForRegist',
                async : false,
                data: serializedArray
            }).always(Common.loading.countHide).fail(Common.ajaxOnfail)
			.done(function(x, e) {
				// 에러메세지가 넘어오면 중지
				if(x.message !== '') {
					Alert(x.message);
					return false;
				}

				switch(x.loginCheckResult) {
				// STEP1. 모든 정보가 일치하는 경우 지원서를 수정
				case 'RESUME_MODIFY' :
					Confirm(x.loginCheckMessage, function() {
						$('#frm').attr({target:'_self', action:'writeResume', 'data-status':'submit'}).submit();
					});
					break;
				// STEP2. 유사지원자가 존재할 경우 화면에 보여줌
				case 'RESUME_EXIST' :
					fn.modalSimilar(x);
					break;
				default :
					if(x.dupApplyInspect !== null && x.dupApplyInspect.dupApplyList !== null && x.dupApplyInspect.dupApplyList.length !== 0) {
						// STEP3.중복지원 불가조건을 체크
						fn.modalNotAllowRegist(x); // 너 지원 못한다는 모달을 띄운다.
					} else {
						// STEP4. 유사지원자도 없고, 중복지원자도 없을 경우 신규생성 (STEP1과 같은 로직)
						$('#frm').attr({target:'_self', action:'writeResume', 'data-status':'submit'}).submit();
					}
					break;
				}
			});
		},
		// 유사지원자 안내
		modalSimilar(x) {
			let modalOpt, url;
			
			// 아래 조건문이 왜 있는지는 모르겠음. 현실적으로 발생하기 어려운 상황이지만 기존 코드에 있어서 추가함 
			if(x.similarApplicantList === null || x.similarApplicantList.length === 0) {
				Alert('입력한 정보와 유사한 지원자가 있어 지원이 불가능합니다.');
				return false;
			}

			switch(keyData.mode) {
				case 'regist' : url = 'modifyResume'; break;
				case 'alwaysRegist' : url = 'alwaysModifyResume'; break;
			}
			
			modalOpt = {
				title : '지원 정보 확인',
				width : '800',
				scroll : true,
				enabledConfirm : false,
				btnTitle : '지원서 수정',
				btnEvent() {
					// 지원서수정
					$('#frm').attr({target:'_self', action:url, 'data-status':'submit'}).submit();
				},
				content : fn.templateModalSimilar(x)
			};
			
			//두번째 버튼 커스터마이징
			modalOpt.enabledSecondBtn = true;
			modalOpt.secondBtnTitle = '지원서 삭제';
			modalOpt.secondBtnConfirmMsg = '지원서 삭제메뉴로 이동하시겠습니까?';
			modalOpt.secondBtnEvent = function() {
				//지원서 삭제
				$('#frm').attr({target:'_self', action:url, 'data-status':'submit'}).submit();
			};
			
			Common.modal(modalOpt);
		},
		// 중복지원 불가 안내
		modalNotAllowRegist(x) {
			let modalOpt;
			
			modalOpt = {
				title : '중복지원 불가 안내',
				width : '700',
				height : '500',
				enabledConfirm : false,
				enabledCancel : false,
				btnTitle : '확인',
				btnEvent() {
					return true;
				},
				content : fn.templateModalNotAllowRegist(x)
			};
			
			Common.modal(modalOpt);
		},
		template() {
			let t = [], i, d;

			if(keyData.mode === 'alwaysRegist') { // 상시채용은 공고명 노출하지 않고 폼만 들고 있음
				d = recruitNoticeList[0];
				t.push(`<input type="hidden" id="jobnoticeSn" name="jobnoticeSn" value="${d.jobnoticeSn}" />`);
				t.push(`<input type="hidden" id="systemKindCode" name="systemKindCode" value="${d.systemKindCode}" />`);
			} else { // 일반채용
				t.push('<div class="subject collapsed">');
				t.push('	<label for="jobnoticeSn" class="h2">공고명</label>');
				t.push('	<div class="row in-span no-margin">');
				if(keyData.jobnoticeSn) {
					d = recruitNoticeList[0];
					t.push('	<div class="span per70 text">');
					t.push(d.jobnoticeName);
					t.push(`		<input type="hidden" id="jobnoticeSn" name="jobnoticeSn" value="${d.jobnoticeSn}" />`);
					t.push(`		<input type="hidden" id="systemKindCode" name="systemKindCode" value="${d.systemKindCode}" />`);
					t.push('	</div>');
					t.push('	<div class="span per30"><input type="password" id="privatePassword" class="text" /></div>');
				} else {
					t.push('	<div class="span per80 like-select" data-name="jobnoticeSn">');
					t.push('		<input type="text" name="jobnoticeSn" id="jobnoticeSn" class="hidden" title="공고명" required />');
					t.push('		<input type="hidden" name="systemKindCode" id="systemKindCode" />');
					t.push('		<button type="button" class="ellipsis">공고명을 선택하세요.</button>');
					t.push('		<div>');
					t.push('			<input type="search" placeholder="검색" />');
					t.push('			<ul>');
					t.push('				<li></li>');
					for(i=0; i<recruitNoticeList.length; i++) {
						d = recruitNoticeList[i];
						t.push(`			<li><button type="button" class="ellipsis" data-value="${d.jobnoticeSn}" data-systemKindCode="${d.systemKindCode}" title="${d.jobnoticeName}">${d.jobnoticeName}</button></li>`);
					}
					t.push('			</ul>');
					t.push('		</div>');
					t.push('	</div>');
					t.push('	<input type="hidden"/>');
					t.push('	<div class="span per20"><input type="password" id="privatePassword" class="text" /></div>');
				}
				t.push('	</div>');
				t.push('</div>');

				
				// t.push('<div class="subject">');
				// t.push('	<label for="동의" class="h2">개인정보 제공동의</label>');
				// t.push('	<div class="row in-span no-margin">');
				// t.push('		<div class="span per80 like-select" data-name="jobnoticeSn">');
				// t.push('			<button>내용확인</button>');
				// t.push('			<span>필수 개인정보 제공에 동의해주세요.</span>');
				// t.push('		</div>');
				// t.push('	</div>');
				// t.push('</div>');
			}
			t.push('<div class="subject collapsed disabled" data-wrap="agreement">');
			t.push('		<label for="jobnoticeSn" class="h2">개인정보 제공동의</label>');
			t.push('	<div class="row in-span no-margin">');
			t.push('		<div class="span per10"><button class="btn" data-button="agreement" type="button" disabled>내용확인</button></div>');
			t.push('		<div class="span per85 text" id="agreementRegMsg" style="margin-left:30px;">필수 개인정보 제공에 동의해주세요</div>');
			t.push('	</div>');
			t.push('</div>');
			t.push('<hr/>');
			t.push('<div class="subject">');
			t.push('	<label for="name" class="h2">성명</label>');
			t.push('	<div class="row in-span no-margin">');
			t.push('		<div class="span per40"><input id="name" name="name" class="text" title="성명" required /></div>');
            t.push('		<div class="span per60 text" id="nameRegMsg"></div>');
			t.push('	</div>');
			t.push('	<div class="wrapGuide">');
			t.push('		<div class="guide">※ 공백 없이 입력하세요.</div>');
			t.push('	</div>');
			t.push('</div>');
			t.push('<div class="subject">');
			t.push('	<label for="mobile1" class="h2">휴대전화</label>');
			t.push('	<div class="row in-span no-margin">');
			t.push('		<div>');
			t.push('			<div class="span per10 mobile"><input maxlength="3" type="text" id="mobile1" name="mobile1" maxlength="3" class="text" title="휴대전화 첫번째 자리" required /></div>');
			t.push('			<div class="span per10 mobile"><input maxlength="4" type="text" id="mobile2" name="mobile2" maxlength="4" class="text" title="휴대전화 두번째 자리" required /></div>');
			t.push('			<div class="span per10 mobile"><input maxlength="4" type="text" id="mobile3" name="mobile3" maxlength="4" class="text" title="휴대전화 세번째 자리" required /></div>');
			t.push('			<div class="span per60 text error" id="phoneRegMsg"></div>');
			t.push('		</div>');
			t.push('	</div>');
			t.push('	<div class="wrapGuide">');
			t.push('		<div class="guide">※ 전형결과 알림에 사용되오니, 반드시 연결가능한 번호를 입력하세요. (본인 미보유시, 가족 핸드폰 입력)</div>');
			t.push('	</div>');
			t.push('</div>');
			t.push('<div class="subject">');
			t.push('	<label for="email" class="h2">이메일</label>');
			t.push('	<div class="row in-span no-margin collapsed">');
			t.push('		<div class="span per60"><input type="email" id="email" name="email" placeholder="이메일을 입력해주세요." title="이메일" class="text" required /></div>');
			t.push('		<div class="span per40 text" id="emailRegMsg"></div>');
			t.push('	</div>');
			t.push('	<div class="row in-span no-margin collapsed">');
			t.push('		<div class="span per60"><input type="email" id="emailConfirm" placeholder="이메일 확인을 위해 다시 한번 입력해주세요." data-type="email" title="이메일" class="text" required /></div>');
			t.push('		<div class="span per40 text" id="emailValidaterMsg"></div>');
			t.push('	</div>');
			t.push('	<div class="wrapGuide">');
			t.push('		<div class="guide">※ 비밀번호 찾기 및 전형결과 알림에 사용되오니, 반드시 자주 사용하는 메일 주소를 입력해주세요. </div>');
			t.push('	</div>');
			t.push('</div>');
			t.push('<div class="subject">');
			t.push('	<label for="password" class="h2">비밀번호</label>');
			t.push('	<div class="row in-span no-margin collapsed">');
			t.push('		<div class="span per60"><input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요." maxlength="16" class="text" autocomplete="off" required /></div>');
			t.push('		<div class="span per40 text" id="passwordRegMsg"></div>');
			t.push('	</div>');
			t.push('	<div class="row in-span no-margin collapsed">');
			t.push('		<div class="span per60"><input type="password" id="passwordConfirm" maxlength="16" placeholder="비밀번호 확인을 위해 다시 한번 입력해주세요." data-type="password" class="text" autocomplete="off" required /></div>');
			t.push('		<div class="span per40 text" id="passwordValidaterMsg"></div>');
			t.push('	</div>');
			t.push('	<div class="wrapGuide">');
			t.push('		<div class="guide">※ 8~9자 영문 대문자/소문자/특수문자/숫자 중 3종류, 혹은 10자 이상 영문/숫자/특수문자 중 2종류를 사용하세요.</div>');
			t.push('	</div>');
			t.push('</div>');
			t.push('<div id="certification"></div>');
			
			return t.join('');
		},
		// 지원서 작성 기초정보 확인
		templateModalConfirm() {
			let t = [];
			
			t.push('<div class="modalConfirm">');
            t.push('	<p>');
            t.push('	입력하신 기초정보를 확인하세요.<br>');
            t.push('	<b>이름, 생년월일 등과 같은 지원자의 기초정보는 한 번 입력시 수정이 불가능 합니다.</b><br>');
            t.push('	아래의 정보를 꼼꼼히 확인하신 후, 지원서를 작성하세요.');
            t.push('	</p>');

            t.push('	<div class="identity">');
            t.push(`    	<div class="row">이름 : ${paramData.name}</div>`);
            t.push(`		<div class="row">휴대전화 : ${paramData.mobile1}${paramData.mobile2}${paramData.mobile3}</div>`);
            t.push(`		<div class="row">이메일 : ${paramData.email}</div>`);
            t.push('    </div>');

            t.push('	<div class="confirm center"><strong>지원서 작성 페이지로 이동하시겠습니까?</strong>\n');
            t.push('		하단의 작성버튼 클릭시, 기초정보 수정이 불가능합니다.');
            t.push('	</div>');
			t.push('</div>');
			
			return t.join('');
		},
		// 유사지원자 안내 템플릿
		templateModalSimilar(x) {
			let i, d, t = [], jobnoticeName;

			jobnoticeName = `'${targetRecruitNotice.jobnoticeName}'`;

			t.push('<div class="modalConfirm">');
            t.push('	<ul class="noticeList">');
            t.push(`		<li>현재 지원하고자 하는 ${jobnoticeName}에 아래와 같이 <strong>유사한 지원서가 작성 중</strong>에 있습니다.</li>`);
            t.push('		<li>지원 정보를 확인 후, 해당 지원서의 작성자가 본인이 맞는 경우, 지원서 수정 메뉴를 통해서 지원서를 이어서 작성해주시기 바랍니다.</li>');
            t.push('		<li>또는 하단의 지원서 삭제버튼을 통해, 기존 지원서를 삭제하신 후 신규로 작성해주시기 바랍니다.</li>');
            t.push('		<li>해당 공고에 지원한 적이 없음에도 불구하고, 위와 같은 메시지가 나오는 경우에는 별도 문의 주시기 바랍니다.</li>');
            t.push('	</ul>');

			t.push('	<h3 class="h3" style="margin-top:10px; font-weight:400">입력 정보</h3>');
            t.push('	<div class="identity">');
            t.push(`    	<div class="row">성명 : ${paramData.name}</div>`);
            t.push(`		<div class="row">이메일 : ${paramData.email}</div>`);
            t.push(`		<div class="row">휴대전화 : ${paramData.mobile1}${paramData.mobile2}${paramData.mobile3}</div>`);
            t.push('    </div>');

			t.push('<h3 class="h3" style="margin-top:20px; font-weight:400;">기존 지원서 정보</h3>');
			for(i=0; i<x.similarApplicantList.length; i++) {
				d = x.similarApplicantList[i];
                t.push('<div class="identity">');
                t.push(`	<div class="row">성명 : ${d.name}</div>`);
                t.push(`	<div class="row">이메일 : ${d.email}</div>`);
                t.push(`	<div class="row">휴대전화 : ${d.mobile}</div>`);
                t.push('</div>');
			}
			t.push('	<div class="confirm"><strong>이 공고는 중복해서 지원할 수 없습니다.</strong>\n');
			t.push('	<p><b>중복적으로 최종 입사지원 할 경우,</b> 선의의 피해자 발생 및 채용업무에 혼선을\n');
			t.push('	야기하므로, 이러한 행위에 대해서는 <b>채용절차의 중단 및 합격 취소의 조치</b>가 이루어집니다.\n');
			t.push('	또한 경우에 따라서는 법적인 책임을 물을 수 있습니다.</p>');
			t.push('	</div>');
			t.push('</div>');
			
			return t.join('');
		},
		// 중복지원 불가 안내 템플릿
		templateModalNotAllowRegist(x) {
            let i, d, t = [], headTitle;

            switch (x.dupApplyInspect.dayCount) {
                case 0 :
                    headTitle = '\'현재 접수 중인 다른 공고에 지원한 이력이 있는 경우\' ';
                    break;
                case 30 :
                    headTitle = '\'최근 1개월 이내 다른 공고에 지원한 이력이 있는 경우\' ';
                    break;
                case 90 :
                    headTitle = '\'최근 3개월 이내 다른 공고에 지원한 이력이 있는 경우\' ';
                    break;
                case 180 :
                    headTitle = '\'최근 6개월 이내 다른 공고에 지원한 이력이 있는 경우\' ';
                    break;
                case 365 :
                    headTitle = '\'최근 1년 이내 다른 공고에 지원한 이력이 있는 경우\' ';
                    break;
            }

            t.push('<div class="modalDuplicationApply">');
            t.push(`	<p style="margin-bottom:10px;">본 공고는 <b>${headTitle}</b> 지원서 작성이 불가능한 공고입니다.</p>`);
            t.push('	<div class="confirm center">');
            t.push('		<h3 style="margin-bottom:3px;font-size: 20px;margin-top: 0px;font-weight: 400;">중복지원 이력</h3>');
            t.push('		<ul style="font-size:13px">');
            for (i = 0; i < x.dupApplyInspect.dupApplyList.length; i++) {
                d = x.dupApplyInspect.dupApplyList[i];
                t.push(`		<li>${d.jobnoticeName}(${D.date(d.applyDate, 'yyyy.MM.dd HH:mm:ss')} 지원)</li>`);
            }
            t.push('		</ul>');
            t.push('	</div>');
            t.push('	<p style="margin:10px 0;">해당 공고에 지원한 적이 없음에도 불구하고, 위와 같은 메세지가 나오는 경우에는 별도 문의 주시기 바랍니다.</br>감사합니다.</p>');
            t.push('</div>');

            return t.join('');
        }
	};
	
	fn.init();
})();