'use strict';

var ModalAgreement = function () {
    var prevJobnoticeSn = '';
    var keyData = {
        agreementLetterSn: '',
        agreementItemSnSet: [],
        personalInfoCollectionItemList: [],
        canMoveNextStep: false //필수선택을 모두 체크하면 true
    };
    var template = function template(arr) {
        var t = [],
            i = void 0;
        t.push('<ul class="agreement">');
        for (i = 0; i < arr.length; i++) {
            t.push('\t<li data-agreementItemType="' + arr[i]['agreementItemType'] + '" >');
            t.push('		<a class="title middle-set">');
            if (arr[i]['agreementItemType'] !== 'GUIDANCE') {
                t.push('\t\t<label><input name="agreementItemSn" value="' + arr[i]['agreementItemSn'] + '" ' + (keyData.agreementItemSnSet.indexOf(arr[i]['agreementItemSn']) !== -1 ? 'checked' : '') + ' type="checkbox" /><span class="label"></span></label>');
            }
            t.push('\t\t\t<span class="agreementItemName">' + arr[i].agreementItemName + ' ' + (arr[i]['agreementItemType'] === 'OPTIONAL_AGREEMENT' ? '(선택)' : '') + '</span>');
            t.push('		</a>');
            t.push('		<div class="contents">');
            t.push(arr[i].agreementItemContents);
            t.push('		</div>');
            t.push('	</li>');
        }
        t.push('</ul>');
        return t.join('');
    };

    return function (jobnoticeSn, systemKindCode, applicantActionCode, callback, always) {
        var modalOpt = void 0;
        if (!prevJobnoticeSn || prevJobnoticeSn !== jobnoticeSn) {
            $.ajax({
                type: 'post',
                dataType: 'json',
                beforeSend: Common.loading.show(),
                url: '/app/applicant/getPersonalInfoCollection',
                async: false,
                data: {
                    jobnoticeSn: jobnoticeSn,
                    systemKindCode: systemKindCode,
                    applicantActionCode: applicantActionCode
                }
            }).always(Common.loading.countHide).fail(Common.ajaxOnfail).done(function (x, e) {
                keyData.agreementLetterSn = x.agreementLetterSn;
                keyData.personalInfoCollectionItemList = x.personalInfoCollectionItemList;
                keyData.agreementItemSnSet = [];
            });
            prevJobnoticeSn = jobnoticeSn;
        }

        modalOpt = {
            title: '개인정보 수집에 대한 동의',
            width: '700',
            height: keyData.personalInfoCollectionItemList.length * 50 + 69 + 85,
            scroll: true,
            originCenter: true,
            btnTitle: '확인',
            enabledConfirm: false,
            btnEvent: function btnEvent() {
                keyData.canMoveNextStep = $('li[data-agreementitemtype="REQUIRED_CONSENT"]').map(function () {
                    return $(this).find('input:checkbox').prop('checked');
                }).get().indexOf(false) === -1;
                keyData.agreementItemSnSet = $('input[name="agreementItemSn"]:checked').map(function () {
                    return parseInt(this.value);
                }).get().concat(keyData.personalInfoCollectionItemList.filter(function (v) {
                    return v.agreementItemType === 'GUIDANCE';
                }).map(function (v) {
                    return v.agreementItemSn;
                })); //안내일경우에도 보내야함

                if (always) always();

                if (!keyData.canMoveNextStep) {
                    Alert('필수항목에 동의를 하셔야 다음단계를 진행하실 수 있습니다.');
                    return false;
                }

                if (callback) callback();
                return true;
            },
            callback: function callback() {
                $('ul.agreement').on('click', 'label', function (e) {
                    e.stopPropagation(); //label을 클릭함으로써 li에 버블링 되는 것을ㅋ 방지
                });

                $('ul.agreement').on('click', 'li', function (e) {
                    if ($(this).hasClass('active')) {
                        $(this).find('.contents').mCustomScrollbar('destroy');
                    } else {
                        $(this).find('.contents').mCustomScrollbar({
                            snapAmount: 70,
                            keyboard: { scrollAmount: 70 },
                            mouseWheel: { deltaFactor: 70 },
                            scrollInertia: 400,
                            theme: 'dark-2'
                        });
                    }
                    $(this).toggleClass('active');
                    $(this).find('.contents').slideToggle('0.2s');
                });
            },

            content: template(keyData.personalInfoCollectionItemList)
        };
        Common.modal(modalOpt);

        return keyData;
    };
}();
//# sourceMappingURL=modalAgreement.js.map