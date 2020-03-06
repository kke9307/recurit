'use strict';

var WriteResumeTemplate = {
    applicant: function applicant(d) {
        // 지원자
        var t = [],
            allRequired = void 0;

        if (d['105'] || d['106']) allRequired = WriteResumeUtil.isAllRequired(d['105'], d['106']);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uC9C0\uC6D0\uC790</h2>');
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per100">');
        t.push('\t\t\t<span class="text">' + (d['101'].value || '이름') + '</span>');
        t.push('		</div>');
        t.push('	</div>');

        if (d['105'] && d['105'].guideContents || d['106'] && d['106'].guideContents) {
            t.push('<div class="wrapGuide">');
            if (d['105'] && d['105'].guideContents) t.push('<div class="guide hasTitle englishName">' + d['105'].guideContents + '</div>');
            if (d['106'] && d['106'].guideContents) t.push('<div class="guide hasTitle chineseName">' + d['106'].guideContents + '</div>');
            t.push('</div>');
        }

        t.push('	<div class="row in-span half-margin">');
        if (d['105']) {
            t.push('\t<label class="span per15 ' + (!allRequired && d['105'].isRequired ? 'required' : '') + ' title" for="englishName">\uC601\uBB38\uC774\uB984</label>');
            t.push('\t<label class="span per30"><input type="text"  class="text" maxlength="64" name="englishName" id="englishName" value="' + d['105'].value + '" ' + (d['105'].isRequired ? 'required' : '') + ' /></label>');
        }
        if (d['106']) {
            t.push('\t<label class="span per' + (d['105'] ? '20 devider' : '15') + ' ' + (!allRequired && d['106'].isRequired ? 'required' : '') + ' title" for="chineseName">\uD55C\uBB38\uC774\uB984</label>');
            t.push('\t<label class="span per35"><input type="text" maxlength="32" class="text" name="chineseName" id="chineseName" value="' + d['106'].value + '" ' + (d['106'].isRequired ? 'required' : '') + ' /></label>');
        }
        t.push('	</div>');
        t.push('	<div class="row in-span half-margin">');
        if (d['102']) {
            t.push('\t<label class="span per15 ' + (!allRequired && d['102'].isRequired ? 'required' : '') + ' title" for="genderFlag">\uC131\uBCC4</label>');
            t.push('	<div class="span per30 radio">');
            t.push('\t\t<label><input type="radio" name="genderFlag" value="M" ' + (d['102'].value === 'M' ? 'checked' : '') + ' ' + (d['102'].isRequired ? 'required' : '') + ' id="genderFlag" /><span class="label">\uB0A8</span></label>');
            t.push('\t\t<label><input type="radio" name="genderFlag" value="F" ' + (d['102'].value === 'F' ? 'checked' : '') + ' ' + (d['102'].isRequired ? 'required' : '') + ' /><span class="label">\uC5EC</span></label>');
            t.push('	</div>');
        }
        if (d['103']) {
            t.push('\t<label class="span per' + (d['102'] ? '20 devider' : '15') + ' ' + (!allRequired && d['103'].isRequired ? 'required' : '') + ' title" for="birthday">\uC0DD\uB144\uC6D4\uC77C</label>');
            t.push('\t<label class="span per20"><input type="text" data-dates="birthday:YMD" class="text date" name="birthday" id="birthday" value="' + D.date(d['103'].value, 'yyyy.MM.dd') + '" ' + (d['103'].isRequired ? 'required' : '') + ' /></label>');
        }
        t.push('	</div>');
        if (d['102'] && d['102'].guideContents || d['103'] && d['103'].guideContents) {
            t.push('<div class="wrapGuide">');
            if (d['102'] && d['102'].guideContents) t.push('<div class="guide hasTitle genderFlag">' + d['102'].guideContents + '</div>');
            if (d['103'] && d['103'].guideContents) t.push('<div class="guide hasTitle birthday">' + d['103'].guideContents + '</div>');
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },
    recruitField: function recruitField(data) {
        // 지원분야
        var _f = void 0,
            t = [],
            i = void 0,
            j = void 0,
            k = void 0,
            l = void 0,
            width = void 0,
            iterator = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
        var v = void 0,
            len = void 0,
            orderedCurrentArray = void 0,
            children = void 0,
            selected = void 0,
            required = void 0;
        var currentArray = {},
            userSelected = void 0;

        //javascript 연관배열 기능으로 쉽게 처리하려고 했으나 순서가 보장이 안되어서
        //순서를 저장하는 연관배열을 하나더 만듬 (recruitSecotrAssoArrayInOrder)
        data.recruitSectorAssoArray = {};
        data.recruitSecotrAssoArrayInOrder = [];

        data.ncsYn = data.ncsYn || false;

        //지원분야 연관배열 만들기 / 지원분야갯수만큼 depth를 가짐
        _f = function f(array, _this, i) {
            if (!_this[array[i]]) {
                _this[array[i]] = {};
                _this[array[i]].order = iterator[i]++;
            }

            if (i === data.recruitSectorHeader.length - 1) return 0;
            _f(array, _this[array[i]], i + 1);
        };

        data.recruitSectorDetailList.forEach(function (v, i) {
            var splited = v.split(',');
            _f(splited, data.recruitSectorAssoArray, 0);
        });

        width = data.recruitSectorHeader.length < 4 ? 25 : 20;

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (data.applyPermitNumber === data.mandatoryApplyNumber ? 'required' : '') + '">\uC9C0\uC6D0\uBD84\uC57C</h2>');

        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle applySector">' + data.guideContents + '</div>');
            t.push('</div>');
        }

        for (i = 0; i < data.applyPermitNumber; i++) {
            // 몇 지망인지 세로로 루프
            required = i < data.mandatoryApplyNumber; //필수 지망 갯수 체크
            currentArray = data.recruitSectorAssoArray || {}; //현재 depth의 연관 배열을 뜻함
            userSelected = []; // i지망에 선택한 지원분야

            t.push('<div class="row in-span ' + (i > 0 ? 'half' : 'no') + '-margin" data-recruitSector>');
            if (data.applyPermitNumber !== 1) t.push('<label class="span per15 title ' + (required ? 'required' : '') + '" for="">' + (i + 1) + '\uC9C0\uB9DD</label>');

            if (data.applySectorList[i]) data.applySectorList[i].map(function (v, i) {
                userSelected.push(v.recruitCodeSn);
            });
            data.userSelected = userSelected.join(',');

            for (j = 0; j < data.recruitSectorHeader.length; j++) {
                //지원분야에 대해 가로로 루프
                v = data.userSelected.split(',')[j]; //현재 target value
                len = currentArray ? Object.keys(currentArray).length : 0;
                if ('order' in currentArray) len = len - 1; //순서를 뜻하는 order는 길이에 포함시키면안됨

                t.push('<label class="span per' + width + ' select"><select name="applySector[' + i + '].depth' + j + '" ' + (required ? 'required' : '') + ' data-type="recruitField" data-depth="' + j + '" ' + (data.ncsYn && data.applySectorList && data.applySectorList.length === 1 ? 'disabled title="ncs에 관련된 항목을 입력하여 지원분야를 수정할 수 없습니다. 지원분야를 삭제하시려면 ncs관련 작성내용을 모두 지워주세요." ' : '') + '>');
                t.push('\t<option value="">' + data.recruitSectorHeader[j] + '</option>');
                t.push('    <option value="">-------------------------</option>');

                orderedCurrentArray = {}; //순서가 보장된 array로 변환시켜준당

                for (l = 0; l < len; l++) {
                    orderedCurrentArray[currentArray[Object.keys(currentArray)[l]].order] = {};
                    orderedCurrentArray[currentArray[Object.keys(currentArray)[l]].order].code = Object.keys(currentArray)[l]; //companyRecruitCodeSn
                    orderedCurrentArray[currentArray[Object.keys(currentArray)[l]].order].name = data.recruitSectorDetailNames[Object.keys(currentArray)[l]]; //분야명칭
                }

                for (k in orderedCurrentArray) {
                    children = currentArray[v] ? Object.keys(currentArray[v]).join(',') : ''; //다음 depth의 Sn들
                    selected = v === orderedCurrentArray[k].code ? 'selected' : ''; //사용자가 선택한 Sn인가
                    t.push('<option value="' + orderedCurrentArray[k].code + '" data-downcode="' + children + '" ' + selected + '>' + orderedCurrentArray[k].name + '</option>');
                }
                t.push('</select></label>');

                currentArray = currentArray[v] ? currentArray[v] : []; //다음 depth 로 배열을 옮겨준다
            }

            if (data.ncsYn === true && data.applySectorList && data.applySectorList.length === 1) {
                //ncs는 무조건 applySectorList가 1개인걸 보장합니다. 그래도 혹시 모르니까 처리
                for (i = 0; i < data.applySectorList[0].length; i++) {
                    t.push('<input type="text" class="hidden" name="applySector[0].depth' + i + '" value="' + data.applySectorList[0][i].recruitCodeSn + '">');
                }
            }
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },
    pay: function pay(d) {
        // 연봉
        var t = [],
            allRequired = void 0;

        if (!d['107'] && !d['108']) return '';

        allRequired = WriteResumeUtil.isAllRequired(d['107'], d['108']);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uC5F0\uBD09</h2>');

        if (d['107'] && d['107'].guideContents || d['108'] && d['108'].guideContents) {
            t.push('<div class="wrapGuide">');
            if (d['107'] && d['107'].guideContents) t.push('<div class="guide hasTitle hopeSalary">' + d['107'].guideContents + '</div>');
            if (d['108'] && d['108'].guideContents) t.push('<div class="guide hasTitle latestSalary">' + d['108'].guideContents + '</div>');
            t.push('</div>');
        }

        t.push('	<div class="row in-span no-margin">');
        if (d['107']) {
            t.push('\t<label class="span per15 ' + (!allRequired && d['107'].isRequired ? 'required' : '') + ' title" for="hopeSalary">\uD76C\uB9DD\uC5F0\uBD09</label>');
            t.push('\t<label class="span per30 label money"><input type="number" step="1" min="0" max="210000000" class="text" name="hopeSalary" id="hopeSalary" value="' + d['107'].value + '" ' + (d['107'].isRequired ? 'required' : '') + ' /></label>');
        }
        if (d['108']) {
            t.push('\t<label class="span per' + (d['107'] ? '20 devider' : '15') + ' ' + (!allRequired && d['108'].isRequired ? 'required' : '') + ' title" for="latestSalary">\uC9C1\uC804\uC5F0\uBD09</label>');
            t.push('\t<label class="span per35 label money"><input type="number" step="1" min="0" max="210000000" class="text" name="latestSalary" id="latestSalary" value="' + d['108'].value + '" ' + (d['108'].isRequired ? 'required' : '') + ' /></label>');
        }
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    join: function join(d) {
        // 입사관련
        var t = [],
            index = 0,
            allRequired = void 0;

        if (!d['109'] && !d['110'] && !d['111']) return '';

        allRequired = WriteResumeUtil.isAllRequired(d['109'], d['110'], d['111']);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uC785\uC0AC\uAD00\uB828</h2>');

        if (d['109'] && d['109'].guideContents || d['110'] && d['110'].guideContents || d['111'] && d['111'].guideContents) {
            t.push('<div class="wrapGuide">');
            if (d['109'] && d['109'].guideContents) t.push('<div class="guide hasTitle hopePosition">' + d['109'].guideContents + '</div>');
            if (d['110'] && d['110'].guideContents) t.push('<div class="guide hasTitle joinPossibleDate">' + d['110'].guideContents + '</div>');
            if (d['111'] && d['111'].guideContents) t.push('<div class="guide hasTitle regionWorkYn">' + d['111'].guideContents + '</div>');
            t.push('</div>');
        }

        if (d['109']) {
            t.push('<div class="row in-span no-margin">');
            t.push('\t<label class="span per20 ' + (!allRequired && d['109'].isRequired ? 'required' : '') + ' title" for="hopePosition">\uD76C\uB9DD\uC9C1\uAE09</label>');
            t.push('\t<label class="span per35"><input type="text" maxlength="64" class="text" name="hopePosition" id="hopePosition" value="' + d['109'].value + '" ' + (d['109'].isRequired ? 'required' : '') + ' /></label>');
            t.push('</div>');
            index++;
        }
        if (d['110']) {
            t.push('<div class="row in-span ' + (index > 0 ? 'half' : 'no') + '-margin">');
            t.push('\t<label class="span per20 ' + (!allRequired && d['110'].isRequired ? 'required' : '') + ' title" for="joinPossibleDate">\uC785\uC0AC\uAC00\uB2A5\uC77C\uC790</label>');
            t.push('\t<label class="span per20"><input type="text" data-dates="joinPossibleDate:YMD future" class="text date" name="joinPossibleDate" id="joinPossibleDate" value="' + D.date(d['110'].value, 'yyyy.MM.dd') + '" ' + (d['110'].isRequired ? 'required' : '') + ' /></label>');
            t.push('</div>');
            index++;
        }
        if (d['111']) {
            t.push('<div class="row in-span ' + (index > 0 ? 'half' : 'no') + '-margin">');
            t.push('\t<label class="span per20 ' + (!allRequired && d['111'].isRequired ? 'required' : '') + ' title" for="regionWorkYn">\uC9C0\uBC29\uADFC\uBB34 \uAC00\uB2A5\uC5EC\uBD80</label>');
            t.push('	<div class="span per20 radio">');
            t.push('\t\t<label><input type="radio" name="regionWorkYn" id="regionWorkYn" value="false" ' + (D.bool(d['111'].value) === false ? 'checked' : '') + ' ' + (d['111'].isRequired ? 'required' : '') + ' id="regionWork" /><span class="label">\uBD88\uAC00\uB2A5</span></label>');
            t.push('\t\t<label><input type="radio" name="regionWorkYn" value="true" ' + (D.bool(d['111'].value) === true ? 'checked' : '') + ' ' + (d['111'].isRequired ? 'required' : '') + ' /><span class="label">\uAC00\uB2A5</span></label>');
            t.push('	</div>');
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },
    interviewArea: function interviewArea(data) {
        // 면접가능 지역
        var t = [],
            d = void 0,
            i = void 0,
            allRequired = void 0;

        if (!data) return '';

        allRequired = WriteResumeUtil.isAllRequired(data);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '"">\uBA74\uC811\uAC00\uB2A5\uC9C0\uC5ED</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle interviewArea">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<label class="span per35 select"><select name="interviewAreaCodeSn" id="interviewAreaCodeSn" ' + allRequired + '>');
        t.push('			<option value="">면접가능지역을 선택하세요.</option>');
        for (i = 0; i < data.interviewAreas.length; i++) {
            d = data.interviewAreas[i];
            t.push('<option value="' + d.recruitCodeSn + '" ' + (parseInt(data.value) === d.recruitCodeSn ? 'selected' : '') + '>' + d.recruitCodeName + '</option>');
        }
        t.push('		</select></label>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    recommend: function recommend(d) {
        // 추천인
        var t = [];

        if (!d) return '';

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (d.isRequired ? 'required' : '') + '">\uCD94\uCC9C\uC778</h2>');
        if (d.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle recommender">' + d.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<label class="span per15 title" for="recommender.name">성명</label>');
        t.push('\t\t<label class="span per25"><input type="text" class="text" name="recommender.name" id="recommender.name" data-rel-id="recommender.name" maxlength="32" value="' + d.name + '" ' + (d.isRequired ? 'required' : '') + ' /></label>');
        t.push('		<label class="span per25 devider title" for="recommender.relationship">추천인과의 관계</label>');
        t.push('\t\t<label class="span per35"><input type="text" class="text" name="recommender.relationship" data-rel-target="recommender.name" id="recommender.relationship" maxlength="64" value="' + d.relationship + '" ' + (d.isRequired ? 'required' : '') + ' /></label>');
        t.push('	</div>');
        t.push('	<div class="row in-span half-margin">');
        t.push('		<label class="span per15 title" for="recommender.contact">추천인 연락처</label>');
        t.push('		<div class="span per35 middle-set">'); // 원래는 45
        t.push('\t\t\t<input type="text" name="recommender.contact" id="recommender.contact" value="' + d.contact + '" maxlength="64" class="text" ' + (d.isRequired ? 'required' : '') + '  data-rel-target="recommender.name" />');
        t.push('		</div>');
        t.push('	</div>');
        t.push('	<div class="row in-span half-margin">');
        t.push('		<label class="span per15 title" for="recommender.department">추천인 소속</label>');
        t.push('\t\t<div class="span per35"><input type="text" class="text" name="recommender.department" id="recommender.department" maxlength="128" value="' + d.department + '" ' + (d.isRequired ? 'required' : '') + '  data-rel-target="recommender.name" /></div>');
        t.push('		<label class="span per15 title devider" for="recommender.comment">비고</label>');
        t.push('\t\t<div class="span per35"><input type="text" name="recommender.comment" id="recommender.comment" value="' + d.comment + '" maxlength="20000" class="text" ' + (d.isRequired ? 'required' : '') + '  data-rel-target="recommender.name" /></div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    applyChannel: function applyChannel(data) {
        // 지원경로
        var t = [],
            i = void 0,
            d = void 0,
            rel = [],
            option = [];

        if (!data) return '';

        // linkedForm을 미리 작업해야 해서 for를 미리 돈다
        for (i = 0; i < data.applyChannel.length; i++) {
            d = data.applyChannel[i];
            if (d.useTextInputYn) rel.push(d.recruitCodeSn);
            option.push('<option value="' + d.recruitCodeSn + '" ' + (data.applyChannelCode === d.recruitCodeSn ? 'selected' : '') + '>' + d.recruitCodeName + '</option>');
        }

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (data.isRequired ? 'required' : '') + '">\uC9C0\uC6D0\uACBD\uB85C</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle applyChannel">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<label class="span per35 select"><select name="applyChannel.applyChannelCodeSn" data-rel-id="applyChannel" data-rel-type="with" data-rel-value="' + rel.join() + '" ' + (data.isRequired ? 'required' : '') + '>');
        t.push('			<option value="">지원경로를 선택하세요.</option>');
        t.push(option.join(''));
        t.push('		</select></label>');
        t.push('	    <div class="span per65" data-rel-target="applyChannel" data-rel-hide="true" style="display:none">');
        t.push('\t    \t<input type="text" maxlength="20000" name="applyChannel.textInput" value="' + data.textInput + '" ' + (data.isRequired ? 'required' : '') + ' class="text" data-rel-target="applyChannel" placeholder="\uC0C1\uC138 \uACBD\uB85C\uB97C \uC785\uB825\uD558\uC138\uC694." />');
        t.push('	    </div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    additionalCode: function additionalCode(d) {
        // 가점코드
        var t = [],
            allRequired = void 0;

        if (!d) return '';

        allRequired = WriteResumeUtil.isAllRequired(d);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uAC00\uC810\uCF54\uB4DC</h2>');
        if (d.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle addpointCode">' + d.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per35">');
        t.push('\t\t\t<input type="text" name="addpointCode" maxlength="64" value="' + d.value + '" class="text" placeholder="\uC9C0\uAE09\uBC1B\uC740 \uAC00\uC810\uCF54\uB4DC\uAC00 \uC788\uB2E4\uBA74 \uC785\uB825\uD558\uC138\uC694." ' + allRequired + ' />');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    photo: function photo(d) {
        var t = [];

        if (!d) return '';

        t.push('<div class="subject photo">');
        t.push('\t<h2 class="h2 ' + (d.isRequired ? 'required' : '') + '">\uC9C0\uC6D0\uC11C \uC0AC\uC9C4\uB4F1\uB85D (\uAD8C\uC7A5\uC0AC\uC774\uC988 : \uAC00\uB85C 160px X \uC138\uB85C 200px \uD639\uC740 \uAC00\uB85C 4 : \uC138\uB85C 5 \uBE44\uC728)</h2>');
        t.push('\t<div id="wrapPhoto" class="wrapPhoto ' + (d.genderFlag || 'M') + '">');
        t.push('		<label><input type="file" name="" value=""  data-type="photo"/></label>');
        t.push('\t\t<img src="' + (d.value ? '/mrs2/attachFile/showFile?fileUid=' + d.value : '') + '" width="160" height="200" alt="" id="photo" />');
        t.push('	</div>');
        t.push('	<div class="row">');
        t.push('		<div class="wrapGuide photo">');
        t.push('\t\t\t<div class="guide">' + d.guideContents + '</div>');
        t.push('		</div>');
        t.push('        <div class="btn-group">');
        t.push('\t\t    <input type="text" class="hidden" name="pictureFile" value="' + d.value + '" ' + (d.isRequired ? 'required' : '') + '>');
        t.push('		    <button type="button" class="btn" data-button="addPhoto">사진등록</button>');
        t.push('		    <button type="button" class="btn btn-ng" data-button="removePhoto">삭제</button>');
        t.push('        </div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    country: function country(data) {
        var t = [],
            i = void 0,
            d = void 0,
            allRequired = void 0;

        if (!data) return '';

        allRequired = WriteResumeUtil.isAllRequired(data);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uAD6D\uC801</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle nationality">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<label class="span per35 select"><select name="nationality" ' + allRequired + '>');
        t.push('			<option value="">국가를 선택하세요.</option>');
        for (i = 0; i < data.list.length; i++) {
            d = data.list[i];
            t.push('<option value="' + d.countryCode + '" ' + (data.value === d.countryCode || !data.value && d.countryCode === 'KR' ? 'selected' : '') + '>' + d.countryName + '</option>');
        }
        t.push('		</select></label>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    address: function address(data) {
        // 주소
        var t = [],
            allRequired = void 0,
            i = void 0,
            d = void 0,
            arr = void 0,
            disabled = void 0;

        if (!data) return '';

        arr = {
            '1001': 'currentAddress',
            '1002': 'residentAddress',
            '1003': 'parentAddress',
            '1004': 'familyAddress'
        };

        disabled = 'disabled';

        allRequired = WriteResumeUtil.isAllRequired(data.items);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uC8FC\uC18C</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle address">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        for (i = 0; i < data.items.length; i++) {
            d = data.items[i];

            if (i === 0 && d && d.address && d.address.zipCode) disabled = ''; //상동버튼은 주소하위질문중 첫번째 항목에 값이 있을때만 클릭 가능함
            t.push('<div data-row="address" class="row in-span ' + (i > 0 ? 'half' : 'no') + '-margin address">');
            t.push('\t<label class="span per15 ' + (!allRequired && d.isRequired ? 'required' : '') + ' title" for="">');
            t.push(d.codeName);
            if (i >= 1) t.push('<button type="button" class="btn btn-mini block" data-button="copyAddress" ' + disabled + '>\uC0C1\uB3D9</button>');
            t.push('</label>');
            t.push('	<div class="span per85">');
            t.push('		<div class="row in-span no-margin">');
            t.push('			<div class="span per100 addresszipcode" >');
            t.push('\t\t\t\t<button type="button" class="btn btn-add" data-type="' + arr[d.code] + '">\uC6B0\uD3B8\uBC88\uD638</button>');
            t.push('                <span class="postCode" data-type="' + arr[d.code] + '" data-span="postcode">' + d.address.zipCode + '</span>');
            t.push(d.address.zipCode ? '<button type="button" class="resetAddressResult" data-button="resetAddressResult"></button>' : '');
            t.push('\t\t\t\t<input type="text" class="hidden" ' + (d.isRequired ? 'required' : '') + '  name="' + arr[d.code] + '.zipCode" maxlength="126" value="' + d.address.zipCode + '" />');
            t.push('			</div>');
            t.push('		</div>');

            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<div class="span per40"><label><input type="text" ' + (d.isRequired ? 'required' : '') + ' name="' + arr[d.code] + '.address" maxlength="128" value="' + (d.address.address || '') + '" class="text" readonly /></label></div>');
            t.push('\t\t\t<div class="span per60"><input type="text" ' + (d.isRequired ? 'required' : '') + ' name="' + arr[d.code] + '.detailAddress" maxlength="128" value="' + (d.address.detailAddress || '') + '" class="text"/></div>');
            t.push('		</div>');
            t.push('	</div>');
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },
    contact: function contact(data) {
        var t = [],
            allRequired = void 0,
            i = void 0,
            d = void 0,
            arr = void 0;

        if (!data) return '';

        arr = {
            '1007': 'contact',
            '1008': 'emergencyContact'
        };

        allRequired = WriteResumeUtil.isAllRequired(data.items);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uC5F0\uB77D\uCC98</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle contact">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        for (i = 0; i < data.items.length; i++) {
            d = data.items[i];
            t.push('<div class="row in-span ' + (i > 0 ? 'half' : 'no') + '-margin">');
            if (d.code === 1005 || d.code === 1006) {
                t.push('<label class="span per15 title" for="">' + d.codeName + '</label>');
                t.push('<div class="span per85"><span class="text">' + d.contact.contact + '</span></div>');
            } else {
                t.push('<label class="span per15 ' + (!allRequired && d.isRequired ? 'required' : '') + ' title" for="">' + d.codeName + '</label>');
                t.push('<div class="span per30">');
                t.push('\t<input type="text" data-validType="PHONE" maxlength="64" name="' + arr[d.code] + '.contact" value="' + d.contact.contact + '" class="text" ' + (d.isRequired ? 'required' : '') + ' />');
                t.push('</div>');
                if (d.code === 1008) {
                    t.push('<div class="span"><input type="text" name="' + arr[d.code] + '.comment" value="' + d.contact.comment + '" ' + (d.isRequired ? 'required' : '') + ' class="text" maxlength="20000" placeholder="\uC9C0\uC6D0\uC790\uC640\uC758 \uAD00\uACC4" /></div>');
                }
            }
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },
    homepage: function homepage(data) {
        // 홈페이지/블로그
        var t = [],
            allRequired = void 0,
            i = void 0,
            d = void 0,
            arr = void 0;

        if (!data || !data.items) return '';

        arr = {
            '1009': 'homepage',
            '1010': 'blog',
            '1011': 'facebook',
            '1012': 'instagram',
            '1013': 'otherSNS'
        };

        allRequired = WriteResumeUtil.isAllRequired(data.items);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uD648\uD398\uC774\uC9C0/\uBE14\uB85C\uADF8</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle homepage">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        for (i = 0; i < data.items.length; i++) {
            d = data.items[i];
            t.push('<div class="row in-span ' + (i > 0 ? 'half' : 'no') + '-margin">');
            t.push('\t<label class="span per15 ' + (!allRequired && d.isRequired ? 'required' : '') + ' title" for="' + arr[d.code] + '">' + d.codeName + '</label>');
            t.push('\t<label class="span per85"><input maxlength="128" type="text" class="text" name="' + arr[d.code] + '" id="' + arr[d.code] + '" value="' + d.value + '" ' + (d.isRequired ? 'required' : '') + ' /></label>');
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },
    religion: function religion(data) {
        var t = [],
            i = void 0,
            d = void 0,
            allRequired = void 0;

        if (!data) return '';

        allRequired = WriteResumeUtil.isAllRequired(data);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uC885\uAD50</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle religion">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<label class="span per20 select"><select name="religionCode" data-rel-id="religion" data-rel-type="with" data-rel-value="99" ' + (data.isRequired ? 'required' : '') + '>');
        t.push('				<option value="">종교선택</option>');
        for (i = 0; i < data.religion.length; i++) {
            d = data.religion[i];
            t.push('<option value="' + d.code + '" ' + (data.religionCode === d.code ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('		</select></label>');
        t.push('\t\t<div class="span per30" data-rel-target="religion" data-rel-hide="true" style="display:none"><input type="text" maxlength="128" name="religionName" value="' + data.religionName + '" data-rel-target="religion" class="text" ' + (data.isRequired ? 'required' : '') + ' /></div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    speciality: function speciality(d) {
        var t = [];

        if (!d) return '';

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (d.isRequired ? 'required' : '') + '">\uD2B9\uAE30</h2>');
        if (d.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle specialAbility">' + d.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<div class="span per100"><input type="text" maxlength="128" name="specialAbility" value="' + d.value + '" class="text" ' + (d.isRequired ? 'required' : '') + ' /></div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    hobby: function hobby(d) {
        var t = [];

        if (!d) return '';

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (d.isRequired ? 'required' : '') + '">\uCDE8\uBBF8</h2>');
        if (d.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle hobby">' + d.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<div class="span per100"><input type="text" maxlength="128" name="hobby" value="' + d.value + '" class="text" ' + (d.isRequired ? 'required' : '') + ' /></div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    body: function body(data) {
        var t = [],
            i = void 0,
            d = void 0,
            allRequired = void 0,
            count = void 0;

        if (!data || !data['124'] && !data['125'] && !data['126'] && !data['127'] && !data['128'] && !data['129']) return '';

        count = 0;
        allRequired = WriteResumeUtil.isAllRequired(data['124'], data['125'], data['126'], data['127'], data['128'], data['129']);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uC2E0\uCCB4\uC815\uBCF4</h2>');

        if (data['124'] && data['124'].guideContents || data['125'] && data['125'].guideContents || data['126'] && data['126'].guideContents || data['127'] && data['127'].guideContents || data['128'] && data['128'].guideContents || data['129'] && data['129'].guideContents) {
            t.push('<div class="wrapGuide">');
            if (data['124'] && data['124'].guideContents) t.push('<div class="guide hasTitle bloodType">' + data['124'].guideContents + '</div>');
            if (data['125'] && data['125'].guideContents) t.push('<div class="guide hasTitle height">' + data['125'].guideContents + '</div>');
            if (data['126'] && data['126'].guideContents) t.push('<div class="guide hasTitle weight">' + data['126'].guideContents + '</div>');
            if (data['128'] && data['128'].guideContents) t.push('<div class="guide hasTitle physicalRemark">' + data['128'].guideContents + '</div>');
            if (data['129'] && data['129'].guideContents) t.push('<div class="guide hasTitle colorWeakness">' + data['129'].guideContents + '</div>');
            if (data['127'] && data['127'].guideContents) t.push('<div class="guide hasTitle sight">' + data['127'].guideContents + '</div>');
            t.push('</div>');
        }

        if (data['124'] || data['125'] || data['126']) {
            t.push('<div class="row in-span no-margin">');
            if (data['124']) {
                t.push('\t<label class="span per15 title ' + (!allRequired && data['124'].isRequired ? 'required ' : '') + '" for="bloodType">\uD608\uC561\uD615</label>');
                t.push('\t<label class="span per15 select"><select name="bloodType" id="bloodType" ' + (data['124'].isRequired ? 'required ' : '') + '>');
                t.push('		<option value="">혈액형</option>');
                for (i = 0; i < data['124'].list.length; i++) {
                    d = data['124'].list[i];
                    t.push('\t<option value="' + d.code + '" ' + (data['124'].value === d.code ? 'selected' : '') + '>' + d.name + '</option>');
                }
                t.push('	</select></label>');
            }
            if (data['125']) {
                t.push('<label class="span per15 title ' + (!allRequired && data['125'].isRequired ? 'required ' : '') + ' ' + (data['124'] ? 'devider' : '') + '" for="height">\uC2E0\uC7A5</label>');
                t.push('<label class="span per15 label height "><input type="number" name="height" max="999" step="0.01" id="height" value="' + data['125'].value + '" class="text" ' + (data['125'].isRequired ? 'required ' : '') + ' /></label>');
            }
            if (data['126']) {
                t.push('<label class="span per15 title ' + (!allRequired && data['126'].isRequired ? 'required ' : '') + ' ' + (data['124'] || data['125'] ? 'devider' : '') + '" for="weight">\uCCB4\uC911</label>');
                t.push('<label class="span per15 label weight"><input type="number" name="weight" max="999" id="weight" step="0.01" value="' + data['126'].value + '" class="text" ' + (data['126'].isRequired ? 'required ' : '') + ' /></label>');
            }

            t.push('</div>');
            count++;
        }
        if (data['128']) {
            t.push('<div class="row in-span ' + (count > 0 ? 'half' : 'no') + '-margin">');
            t.push('\t<label class="span per15 title ' + (!allRequired && data['128'].isRequired ? 'required ' : '') + '">\uC2E0\uCCB4 \uD2B9\uC774\uC0AC\uD56D</label>');
            t.push('\t<div class="span per85"><input type="text" name="physicalRemark" maxlength="128" value="' + data['128'].value + '" class="text" ' + (data['128'].isRequired ? 'required ' : '') + ' /></div>');
            t.push('</div>');
            count++;
        }
        if (data['127'] || data['129']) {
            t.push('<div class="row in-span ' + (count > 0 ? 'half' : 'no') + '-margin">');
            if (data['129']) {
                t.push('<label class="span per15 title ' + (!allRequired && data['129'].isRequired ? 'required ' : '') + '">\uC0C9\uC57D\uC5EC\uBD80</label>');
                t.push('<div class="span per20 radio" data-rel-id="colorWeakness" data-rel-type="with" data-rel-value="true">');
                t.push('\t<label><input type="radio" name="colorWeaknessYn" value="false" ' + (D.bool(data['129'].colorWeaknessYn) === false ? 'checked' : '') + ' ' + (data['129'].isRequired ? 'required' : '') + ' /><span class="label">\uC5C6\uC74C</span></label>');
                t.push('\t<label><input type="radio" name="colorWeaknessYn" value="true" ' + (D.bool(data['129'].colorWeaknessYn) === true ? 'checked' : '') + ' ' + (data['129'].isRequired ? 'required' : '') + ' /><span class="label">\uC788\uC74C</span></label>');
                t.push('</div>');
                t.push('<div class="span per35" data-rel-target="colorWeakness" data-rel-hide="true" style="display:none">');
                t.push('\t<label class="checkbox"><input type="checkbox" name="redWeaknessYn" ' + (data['129'].redWeaknessYn ? 'checked' : '') + ' data-rel-target="colorWeakness" value="true" /><span class="label"> \uC801\uC0C9\uC57D</span></label>');
                t.push('\t<label class="checkbox"><input type="checkbox" name="greenWeaknessYn" ' + (data['129'].greenWeaknessYn ? 'checked' : '') + ' data-rel-target="colorWeakness" value="true" /><span class="label"> \uB179\uC0C9\uC57D</span></label>');
                t.push('\t<label class="checkbox"><input type="checkbox" name="blueWeaknessYn" ' + (data['129'].blueWeaknessYn ? 'checked' : '') + ' data-rel-target="colorWeakness" value="true" /><span class="label"> \uCCAD\uC0C9\uC57D</span></label>');
                t.push('</div>');
            }
            if (data['127']) {
                t.push('<label class="span per15 ' + (data['129'] ? 'devider' : '') + ' title ' + (!allRequired && data['127'].isRequired ? 'required ' : '') + '">\uC2DC\uB825</label>');
                t.push('<div class="span per15">');
                t.push('\t<input type="number" step="0.1" min="-10" max="10" data-limit="decimal(3,1)" name="leftSight" value="' + data['127'].leftSight + '" ' + (data['127'].isRequired ? 'required ' : '') + ' class="text" placeholder="\uC88C" style="padding-right:0px;width:50px;" /><input type="number" min="-10" max="10" step="0.1" name="rightSight" value="' + data['127'].rightSight + '" ' + (data['127'].isRequired ? 'required ' : '') + ' class="text" placeholder="\uC6B0" style="padding-right:0px;width:50px;margin-left:10px;" />'); // 이 줄은 합치지 않으면 레이아웃 깨짐
                t.push('</div>');
            }
            t.push('</div>');
            count++;
        }
        t.push('</div>');

        return t.join('');
    },
    smoking: function smoking(d) {
        var t = [];

        if (!d) return '';
        d.value = D.bool(d.value);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (d.isRequired ? 'required' : '') + '">\uD761\uC5F0\uC5EC\uBD80</h2>');
        if (d.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle smoking">' + d.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per100 radio">');
        t.push('\t\t\t<label><input type="radio" name="smokingYn" value="false" ' + (d.value === false ? 'checked' : '') + ' ' + (d.isRequired ? 'required' : '') + ' /><span class="label">\uBE44\uD761\uC5F0</span></label>');
        t.push('\t\t\t<label><input type="radio" name="smokingYn" value="true" ' + (d.value === true ? 'checked' : '') + ' ' + (d.isRequired ? 'required' : '') + ' /><span class="label">\uD761\uC5F0</span></label>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    marriage: function marriage(d) {
        var t = [];

        if (!d) return '';
        d.value = D.bool(d.value);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (d.isRequired ? 'required' : '') + '">\uACB0\uD63C\uC5EC\uBD80</h2>');
        if (d.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle marriage">' + d.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per100 radio">');
        t.push('\t\t\t<label><input type="radio" name="marriageYn" value="false" ' + (d.value === false ? 'checked' : '') + ' ' + (d.isRequired ? 'required' : '') + ' /><span class="label">\uBBF8\uD63C</span></label>');
        t.push('\t\t\t<label><input type="radio" name="marriageYn" value="true" ' + (d.value === true ? 'checked' : '') + ' ' + (d.isRequired ? 'required' : '') + ' /><span class="label">\uAE30\uD63C</span></label>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    family: function family(d) {
        var t = [],
            i = void 0,
            allRequired = void 0;

        if (!d) return '';

        allRequired = WriteResumeUtil.isAllRequired(d.items);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uAC00\uC871\uC0AC\uD56D</h2>');
        if (d.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle family">' + d.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<label class="span per15 title ' + (d.isRequired ? 'required' : '') + '">\uD615\uC81C\uAD00\uACC4</label>');
        t.push('\t\t<label class="span per10 label brother"><input type="number" name="family.brotherNumber"  data-rel-id="brotherSisterRank"  value="' + d.brotherNumber + '" ' + (d.isRequired ? 'required' : '') + ' class="text" min="0" max="128"/></label>');
        t.push('\t\t<label class="span per10 label sister"><input type="number" name="family.sisterCount"  data-rel-target="brotherSisterRank" value="' + d.sisterCount + '" required class="text" min="0" max="128"/></label>');
        t.push('\t\t<label class="span per15 label brotherSisterRank"><input type="number" name="family.familySequence" data-rel-target="brotherSisterRank"  value="' + d.familySequence + '" required class="text" min="0" max="128"/></label>');
        t.push('	</div>');
        t.push('	<div class="subject" data-wrap="familyLoop">');
        if (!d.familyRelation.length) t.push(WriteResumeTemplate.familyLoop(null));else for (i = 0; i < d.familyRelation.length; i++) {
            t.push(WriteResumeTemplate.familyLoop(d.familyRelation[i], i));
        }t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    familyLoop: function familyLoop(data, index) {
        var t = [],
            i = void 0,
            d = void 0,
            items = void 0,
            familyData = void 0,
            loopName = void 0,
            disabled = void 0,
            allRequired = void 0;

        loopName = 'familyRelation'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        familyData = WriteResume.fullData()[1].items['132']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(familyData.items); // items를 array에서 object로 변경
        allRequired = WriteResumeUtil.isAllRequired(familyData.items); // 전체 필수인지 체크

        data = data || {
            familyRelationSn: '',
            name: '',
            familyRelationCode: '',
            age: '',
            finalAcademicCode: '',
            schoolName: '',
            majorName: '',
            company: '',
            position: '',
            workStartDate: '',
            workEndDate: '',
            togetherYn: null,
            comment: ''
        };

        disabled = data.familyRelationCode ? '' : 'disabled'; // linkedForm 적용하기 위해서 작업

        t.push('<div class="row loop" data-loop="' + loopName + '">');
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per25 btn">');
        t.push('\t\t\t<label class="title ' + (!allRequired && familyData.isRequired ? 'required' : '') + '">\uAD00\uACC4</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].familyRelationSn" value="' + data.familyRelationSn + '"/>');
        t.push('		</div>');
        t.push('\t\t<label class="span per15 select"><select name="' + loopName + '[' + index + '].familyRelationCode" data-rel-id="familyRelation[' + index + ']" ' + (familyData.isRequired ? 'required' : '') + ' data-rel-type="without" data-rel-value="90">');
        t.push('			<option value="">관계</option>');
        for (i = 0; i < items['1014'].list.length; i++) {
            d = items['1014'].list[i];
            t.push('\t\t<option value="' + d.code + '" ' + (d.code === data.familyRelationCode ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('		</select></label>');
        if (items['1015']) {
            t.push('\t<label class="span per15 title devider ' + (!allRequired && items['1015'].isRequired ? 'required' : '') + '">\uC131\uBA85</label>');
            t.push('\t<label class="span per15"><input type="text" maxlength="32" name="' + loopName + '[' + index + '].name" value="' + data.name + '" class="text" placeholder="\uC131\uBA85" data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1015'].isRequired ? 'required' : '') + ' /></label>');
        }
        if (items['1016']) {
            t.push('\t<label class="span per15 title devider ' + (!allRequired && items['1016'].isRequired ? 'required' : '') + '">\uC5F0\uB839</label>');
            t.push('\t<label class="span per15 label age"><input type="number" min="0" max="32768" name="' + loopName + '[' + index + '].age" value="' + data.age + '" class="text" data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1016'].isRequired ? 'required' : '') + ' /></label>');
        }
        t.push('	</div>');
        if (items['1017']) {
            t.push('<div class="row in-span line">');
            t.push('\t<label class="span per25 title ' + (!allRequired && items['1017'].isRequired ? 'required' : '') + '">\uCD5C\uC885\uD559\uB825</label>');
            t.push('\t<label class="span per35 select"><select data-rel-value="00" data-rel-type="without" data-rel-id="' + loopName + '[' + index + '].finalAcademicCode" name="' + loopName + '[' + index + '].finalAcademicCode" data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1017'].isRequired ? 'required' : '') + '>');
            t.push('		<option value="">최종학력 선택</option>');
            for (i = 0; i < items['1017'].finalAcademicCodeList.length; i++) {
                d = items['1017'].finalAcademicCodeList[i];
                t.push('\t<option value="' + d.code + '" ' + (d.code === data.finalAcademicCode ? 'selected' : '') + '>' + d.name + '</option>');
            }
            t.push('	</select></label>');
            t.push('</div>');
        }
        if (items['1018'] || items['1019']) {
            t.push('<div class="row in-span half-margin">');
            if (items['1018']) {
                t.push('<label class="span per25 title ' + (!allRequired && items['1018'].isRequired ? 'required' : '') + '">\uCD5C\uC885\uD559\uB825 \uD559\uAD50\uBA85</label>');
                t.push('<label class="span per35"><input type="text" name="' + loopName + '[' + index + '].schoolName" value="' + data.schoolName + '" class="text" placeholder="\uCD5C\uC885\uD559\uB825 \uD559\uAD50\uBA85" maxlength="128" data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1018'].isRequired ? 'required' : '') + ' /></label>');
            }
            if (items['1019']) {
                t.push('<label class="span per' + (items['1018'] ? '20 devider' : '25') + ' title ' + (!allRequired && items['1019'].isRequired ? 'required' : '') + '">\uCD5C\uC885\uD559\uB825 \uC804\uACF5</label>');
                t.push('<label class="span per20"><input type="text" name="' + loopName + '[' + index + '].majorName" value="' + data.majorName + '" class="text" placeholder="\uCD5C\uC885\uD559\uB825 \uC804\uACF5" maxlength="128"  data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1019'].isRequired ? 'required' : '') + ' /></label>');
            }
            t.push('</div>');
        }
        if (items['1020'] || items['1021']) {
            t.push('<div class="row in-span line">');
            if (items['1020']) {
                t.push('<label class="span per25 title ' + (!allRequired && items['1020'].isRequired ? 'required' : '') + '">\uCD5C\uC885\uC9C1\uC7A5\uBA85</label>');
                t.push('<label class="span per35"><input type="text" name="' + loopName + '[' + index + '].company" value="' + data.company + '" class="text" placeholder="\uCD5C\uC885\uC9C1\uC7A5\uBA85" maxlength="128" data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1020'].isRequired ? 'required' : '') + ' /></label>');
            }
            if (items['1021']) {
                t.push('<label class="span per' + (items['1020'] ? '20 devider' : '25') + ' title ' + (!allRequired && items['1021'].isRequired ? 'required' : '') + '">\uCD5C\uC885\uC9C1\uC7A5 \uC9C1\uC704</label>');
                t.push('<label class="span per20"><input type="text" name="' + loopName + '[' + index + '].position" value="' + data.position + '" class="text" placeholder="\uCD5C\uC885\uC9C1\uC7A5 \uC9C1\uC704" maxlength="64" data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1021'].isRequired ? 'required' : '') + ' /></label>');
            }
            t.push('</div>');
        }
        if (items['1022']) {
            t.push('<div class="row in-span half-margin">');
            t.push('\t<label class="span per25 title ' + (!allRequired && items['1022'].isRequired ? 'required' : '') + '">\uCD5C\uC885\uC9C1\uC7A5 \uC7AC\uC9C1\uAE30\uAC04</label>');
            t.push('	<label class="span per35 date">');
            t.push('\t\t<input type="text" data-dates="' + loopName + '[' + index + '].workDate:YMD" name="' + loopName + '[' + index + '].workStartDate" value="' + D.date(data.workStartDate, 'yyyy.MM.dd') + '" class="text date start" data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1022'].isRequired ? 'required' : '') + ' />');
            t.push('\t\t<input type="text" data-dates="' + loopName + '[' + index + '].workDate:END" name="' + loopName + '[' + index + '].workEndDate" value="' + D.date(data.workEndDate, 'yyyy.MM.dd') + '" class="text date end" data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1022'].isRequired ? 'required' : '') + ' />');
            t.push('	</label>');
            t.push('</div>');
        }
        if (items['1023'] || items['1024']) {
            t.push('<div class="row in-span line">');
            if (items['1023']) {
                data.togetherYn = D.bool(data.togetherYn);
                t.push('<label class="span per25 title ' + (!allRequired && items['1023'].isRequired ? 'required' : '') + '">\uB3D9\uAC70\uC5EC\uBD80</label>');
                t.push('<div class="span per20 radio">');
                t.push('\t<label><input type="radio" name="' + loopName + '[' + index + '].togetherYn" value="true" ' + (data.togetherYn === true ? 'checked' : '') + ' data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1023'].isRequired ? 'required' : '') + ' /><span class="label">\uC608</span></label>');
                t.push('\t<label><input type="radio" name="' + loopName + '[' + index + '].togetherYn" value="false" ' + (data.togetherYn === false ? 'checked' : '') + ' data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1023'].isRequired ? 'required' : '') + ' /><span class="label">\uC544\uB2C8\uC624</span></label>');
                t.push('</div>');
            }
            if (items['1024']) {
                t.push('<label maxlength="65535" class="span per' + (items['1023'] ? '20 devider' : '25') + ' title ' + (!allRequired && items['1024'].isRequired ? 'required' : '') + '">\uBE44\uACE0</label>');
                t.push('<label class="span per35"><input type="text" name="' + loopName + '[' + index + '].comment" value="' + data.comment + '" class="text" maxlength="20000" data-rel-target="familyRelation[' + index + ']" ' + disabled + ' ' + (items['1024'].isRequired ? 'required' : '') + ' /></label>');
            }
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },
    handicap: function handicap(data) {
        var t = [],
            i = void 0,
            d = void 0;

        if (!data) return '';
        data.handicapYn = D.bool(data.handicapYn);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (data.isRequired ? 'required' : '') + '">\uC7A5\uC560\uC5EC\uBD80</h2>');

        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle handicap">' + data.guideContents + '</div>');
            t.push('</div>');
        }

        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per20 radio" data-rel-id="handicap" data-rel-type="with" data-rel-value="true">');
        t.push('\t\t\t<label><input type="radio" name="handicap.handicapYn" value="false" ' + (data.handicapYn === false ? 'checked' : '') + ' ' + (data.isRequired ? 'required' : '') + ' /><span class="label">\uBE44\uB300\uC0C1</span></label>');
        t.push('\t\t\t<label><input type="radio" name="handicap.handicapYn" value="true" ' + (data.handicapYn === true ? 'checked' : '') + ' ' + (data.isRequired ? 'required' : '') + ' /><span class="label">\uB300\uC0C1</span></label>');
        t.push('		</div>');
        t.push('\t\t<label class="span per20 select"><select name="handicap.handicapGradeCode" ' + (data.isRequired ? 'required' : '') + ' data-rel-target="handicap" disabled>');
        t.push('				<option value="">등급</option>');
        for (i = 0; i < data.handicapGradeList.length; i++) {
            d = data.handicapGradeList[i];
            t.push('<option value="' + d.code + '" ' + (d.code === data.handicapGradeCode ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('		</select></label>');
        t.push('\t\t<label class="span per20 select"><select name="handicap.handicapContentsCode" ' + (data.isRequired ? 'required' : '') + ' data-rel-target="handicap" disabled>');
        t.push('				<option value="">내용</option>');
        for (i = 0; i < data.handicapContentsList.length; i++) {
            d = data.handicapContentsList[i];
            t.push('<option value="' + d.code + '" ' + (d.code === data.handicapContentsCode ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('		</select></label>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    patriot: function patriot(data) {
        var t = [],
            i = void 0,
            d = void 0;

        if (!data) return '';
        data.patriotYn = D.bool(data.patriotYn);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (data.isRequired ? 'required' : '') + '">\uBCF4\uD6C8\uC5EC\uBD80</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle patriot">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per20 radio" data-rel-id="patriot" data-rel-type="with" data-rel-value="true">');
        t.push('\t\t\t<label><input type="radio" name="patriot.patriotYn" value="false" ' + (data.patriotYn === false ? 'checked' : '') + ' ' + (data.isRequired ? 'required' : '') + ' /><span class="label">\uBE44\uB300\uC0C1</span></label>');
        t.push('\t\t\t<label><input type="radio" name="patriot.patriotYn" value="true" ' + (data.patriotYn === true ? 'checked' : '') + ' ' + (data.isRequired ? 'required' : '') + ' /><span class="label">\uB300\uC0C1</span></label>');
        t.push('		</div>');
        t.push('\t\t<div class="span per20"><input type="text" maxlength="64" name="patriot.patriotNumber" value="' + data.patriotNumber + '" data-rel-target="patriot" class="text" placeholder="\uBCF4\uD6C8\uBC88\uD638" ' + (data.isRequired ? 'required' : '') + ' disabled/></div>');
        t.push('\t\t<div class="span per20"><input type="text" maxlength="64" name="patriot.relationship" value="' + data.relationship + '" data-rel-target="patriot" class="text" placeholder="\uAD00\uACC4" ' + (data.isRequired ? 'required' : '') + ' maxlength="64" disabled/></div>');
        t.push('\t\t<label class="span per20 select"><select name="patriot.patriotRate" ' + (data.isRequired ? 'required' : '') + ' data-rel-target="patriot" disabled>');
        t.push('				<option value="">보훈비율</option>');
        for (i = 0; i < data.patriotRateCodeList.length; i++) {
            d = data.patriotRateCodeList[i];
            t.push('<option value="' + d.code + '" ' + (d.code === data.patriotRate ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('		</select></label>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    lowIncome: function lowIncome(data) {
        var t = [],
            i = void 0,
            j = void 0,
            d = void 0,
            checked = void 0,
            len = void 0;

        if (!data) return '';
        data.lowIncomeYn = D.bool(data.lowIncomeYn);
        data.lowIncomeCategoryCode = data.lowIncomeCategoryCode.split(',');
        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (data.isRequired ? 'required' : '') + '">\uC800\uC18C\uB4DD\uCE35 \uC5EC\uBD80</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle lowIncome">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per20 radio" data-rel-id="lowIncome" data-rel-type="with" data-rel-value="true">');
        t.push('\t\t\t<label><input type="radio" name="lowIncomeYn" value="false" ' + (data.lowIncomeYn === false ? 'checked' : '') + ' ' + (data.isRequired ? 'required' : '') + ' /><span class="label">\uBE44\uB300\uC0C1</span></label>');
        t.push('\t\t\t<label><input type="radio" name="lowIncomeYn" value="true" ' + (data.lowIncomeYn === true ? 'checked' : '') + ' ' + (data.isRequired ? 'required' : '') + ' /><span class="label">\uB300\uC0C1</span></label>');
        t.push('		</div>');
        t.push('		<div class="span per80" style="width : 410px;display:none" data-rel-target="lowIncome" data-rel-hide="true" data-rel-id="lowIncomeIncomeRealtionship"  data-rel-type="with" data-rel-value="01,02,03">');

        for (i = 0, len = data.lowIncomeCategoryCodeList.length; i < len; i++) {
            d = data.lowIncomeCategoryCodeList[i];
            checked = false;
            for (j = 0; j < data.lowIncomeCategoryCode.length; j++) {
                if (d.code === data.lowIncomeCategoryCode[j]) checked = true;
            }t.push('\t\t<label class="checkbox"><input type="checkbox" name="lowIncomeCategoryCode" ' + (checked ? 'checked' : '') + ' data-rel-target="lowIncome" value="' + d.code + '" /><span class="label"> ' + d.name + '</span></label>');
        }
        t.push('		</div>');
        t.push('		<div class="span per25 devider"  data-rel-target="lowIncome" data-rel-hide="true"  style="display:none" >');
        t.push('\t\t    <input type="text"  data-rel-target="lowIncome"  name="lowIncomeRelationship" value="' + (data.lowIncomeRelationship || '') + '" class="text" maxlength="64" placeholder="\uAD00\uACC4" disabled required/>');
        t.push('        </div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    housingType: function housingType(data) {
        var t = [],
            i = void 0,
            d = void 0;

        if (!data) return '';

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (data.isRequired ? 'required' : '') + '">\uC8FC\uAC70\uD615\uD0DC</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle residenceTypeCode">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per100 radio">');
        for (i = 0; i < data.residenceTypeCodeList.length; i++) {
            d = data.residenceTypeCodeList[i];
            t.push('\t\t<label><input type="radio" name="residenceTypeCode" value="' + d.code + '" ' + (data.value === d.code ? 'checked' : '') + ' ' + (data.isRequired ? 'required' : '') + ' /><span class="label">' + d.name + '</span></label>');
        }
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    motto: function motto(d) {
        var t = [];

        if (!d) return '';

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (d.isRequired ? 'required' : '') + '">\uC88C\uC6B0\uBA85</h2>');
        if (d.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle motto">' + d.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<div class="span per100"><input type="text" name="motto" value="' + d.value + '" maxlength="128" class="text" ' + (d.isRequired ? 'required' : '') + ' /></div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    military: function military(data) {
        var t = [],
            i = void 0,
            d = void 0,
            items = void 0,
            allRequired = void 0;

        if (!data) return '';

        items = WriteResumeUtil.objectGenerator(data.items);
        allRequired = WriteResumeUtil.isAllRequired(data.items);

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + allRequired + '">\uBCD1\uC5ED\uC0AC\uD56D</h2>');
        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle military">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<label class="span per15 title ' + (!allRequired ? 'required' : '') + '" id="militaryType">\uBCD1\uC5ED\uAD6C\uBD84</label>');
        t.push('		<div class="span per50 radio" data-rel-id="military noneMilitary" data-rel-type="complex" data-rel-value="01,04 03">');
        for (i = 0; i < items['1025'].list.length; i++) {
            d = items['1025'].list[i];
            t.push('\t\t<label><input type="radio" name="military.militaryTypeCode" ' + (i === 0 ? 'id="militaryType"' : '') + ' value="' + d.code + '" ' + (data.militaryTypeCode === d.code ? 'checked' : '') + ' required /><span class="label">' + d.name + '</span></label>');
        }
        t.push('		</div>');
        t.push('		<div class="span per35" style="display:none" data-rel-target="noneMilitary" data-rel-hide="true">');
        t.push('\t\t\t<input type="text" maxlength="512" name="military.exemptionReason" value="' + data.exemptionReason + '" class="text" placeholder="\uBA74\uC81C\uC0AC\uC720\uB97C \uC785\uB825\uD558\uC138\uC694." data-rel-target="noneMilitary" />');
        t.push('		</div>');
        t.push('	</div>');
        if (items['1029'] || items['1030']) {
            t.push('<div class="row in-span half-margin">');
            if (items['1029']) {
                t.push('<label class="span per15 title ' + (!allRequired && items['1029'].isRequired ? 'required' : '') + '" for="militaryBranchCode">\uAD70\uBCC4</label>');
                t.push('<label class="span per25 select"><select name="military.militaryBranchCode" id="militaryBranchCode" ' + (items['1029'].isRequired ? 'required' : '') + ' data-rel-target="military" disabled>');
                t.push('	<option value="">군별을 선택하세요.</option>');
                for (i = 0; i < items['1029'].list.length; i++) {
                    d = items['1029'].list[i];
                    t.push('<option value="' + d.code + '" ' + (d.code === data.militaryBranchCode ? 'selected' : '') + '>' + d.name + '</option>');
                }
                t.push('</select></label>');
            }
            if (items['1030']) {
                t.push('<label class="span per' + (items['1029'] ? '20 devider' : '15') + ' title ' + (!allRequired && items['1030'].isRequired ? 'required' : '') + '" for="militaryRole">\uBCD1\uACFC</label>');
                t.push('<label class="span per40"><input type="text" maxlength="64" name="military.militaryRole" id="militaryRole" value="' + data.militaryRole + '" ' + (items['1030'].isRequired ? 'required' : '') + ' class="text" placeholder="\uBCD1\uACFC\uB97C \uC785\uB825\uD558\uC138\uC694." data-rel-target="military" disabled/></label>');
            }
            t.push('</div>');
        }
        t.push('	<div class="row in-span half-margin">');
        t.push('\t\t<label class="span per15 title ' + (!allRequired && items['1028'].isRequired ? 'required' : '') + '">\uACC4\uAE09</label>');
        t.push('\t\t<label class="span per25 select"><select name="military.militaryPositionCode" ' + (items['1028'].isRequired ? 'required' : '') + '  data-rel-target="military" disabled>');
        t.push('			<option value="">계급을 선택하세요.</option>');
        for (i = 0; i < items['1028'].list.length; i++) {
            d = items['1028'].list[i];
            t.push('\t\t<option value="' + d.code + '" ' + (d.code === data.militaryPositionCode ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('		</select></label>');
        t.push('\t\t<label class="span per20 title devider ' + (!allRequired && items['1026'].isRequired ? 'required' : '') + '">\uBCF5\uBB34\uAE30\uAC04</label>');
        t.push('		<label class="span per35 date">');
        t.push('\t\t\t<input type="text" data-dates="military.militaryDate:' + Common.dateFormat(data['dateInputFormat']).name + '" name="military.militaryStartDate" value="' + D.date(data.startDate, Common.dateFormat(data['dateInputFormat']).format) + '" ' + (items['1026'].isRequired ? 'required' : '') + ' class="text date start" data-rel-target="military" disabled/>');
        t.push('\t\t\t<input type="text" data-dates="military.militaryDate:END" name="military.militaryEndDate" value="' + D.date(data.endDate, Common.dateFormat(data['dateInputFormat']).format) + '" ' + (items['1026'].isRequired ? 'required' : '') + ' class="text date end" data-rel-target="military" disabled/>');
        t.push('		</label>');
        t.push('	</div>');
        t.push('	<div class="row in-span half-margin">');
        t.push('\t\t<label class="span per15 title ' + (!allRequired && items['1027'].isRequired ? 'required' : '') + '">\uC81C\uB300\uAD6C\uBD84</label>');
        t.push('\t\t<label class="span per25 select"><select name="military.militaryDischargeCode" ' + (items['1027'].isRequired ? 'required' : '') + ' data-rel-id="militaryDischargeCode" data-rel-type="with" data-rel-value="99" data-rel-target="military" disabled>');
        t.push('			<option value="">제대구분을 선택하세요.</option>');

        for (i = 0; i < items['1027'].list.length; i++) {
            d = items['1027'].list[i];
            t.push('\t\t<option value="' + d.code + '" ' + (d.code === data.militaryDischargeCode ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('		</select></label>');
        t.push('		<label class="span per60" data-rel-target="militaryDischargeCode" data-rel-hide="true">');
        t.push('\t\t\t<input type="text" name="military.dischargeReason" value="' + data.dischargeReason + '" ' + (items['1027'].isRequired ? 'required' : '') + ' class="text" maxlength="512" placeholder="\uC81C\uB300\uAD6C\uBD84\uC744 \uC785\uB825\uD558\uC138\uC694." data-rel-target="militaryDischargeCode" disabled/>');
        t.push('		</label>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    highschool: function highschool(data) {
        var t = [],
            i = void 0,
            d = void 0,
            items = void 0,
            v = void 0,
            disabled = void 0,
            allRequired = void 0;

        items = WriteResumeUtil.objectGenerator(data.items);
        v = data.highschool[0];

        v = v || {
            academyActivitySn: '',
            academyName: '',
            academyCode: '',
            locationCode: '',
            dayOrNight: '',
            graduationTypeCode: '',
            highschoolCategoryCode: '',
            entranceDate: '',
            graduationDate: '',
            rankPercentage: ''
        };

        // 필수가 아닐 경우 미체크 항목 추가(템플릿을 추가하는게 아니라 이렇게 데이터를 추가해야함)
        if (!data.isRequired) {
            items['1033'].graduationTypeCodeList.unshift({
                categoryId: 'graduation_type_code',
                code: '',
                name: '작성안함',
                explanation: null,
                priority: null,
                value1: null
            });
        }

        disabled = v.graduationTypeCode ? '' : 'disabled';

        if (data.guideContents) {
            t.push('<div class="wrapGuide topGuide">');
            t.push('\t<div class="guide">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (data.isRequired ? 'required' : '') + '">\uC878\uC5C5\uAD6C\uBD84</h2>');
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per100 radio" data-rel-id="highschool">');
        for (i = 0; i < items['1033'].graduationTypeCodeList.length; i++) {
            d = items['1033'].graduationTypeCodeList[i];
            t.push('\t\t<label><input type="radio" name="highschool.graduationTypeCode" value="' + d.code + '" ' + (data.isRequired ? 'required' : '') + ' ' + (v.graduationTypeCode === d.code ? 'checked' : '') + ' /><span class="label">' + d.name + '</span></label>');
        }
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        allRequired = WriteResumeUtil.isAllRequired(data, items['1031'], items['1034'], items['1035'], items['1036']);

        if (items['1031'] || items['1034'] || items['1035'] || items['1036']) {
            t.push('<div class="subject">');
            t.push('\t<h2 class="h2 ' + (allRequired ? 'required' : '') + '">\uD559\uAD50\uAD00\uB828</h2>');
            if (items['1031']) {
                t.push('	<div class="row in-span no-margin">');
                if (items['1031'] && (items['1034'] || items['1035'] || items['1036'])) {
                    t.push('\t<label class="span per15 title ' + (!allRequired && items['1031'].isRequired ? 'required' : '') + '">\uD559\uAD50\uBA85</label>');
                }
                t.push('		<div class="span per85 middle-set">');
                t.push('\t\t\t<div class="search"><label><input type="search" class="text" data-type="highschool" data-rel-target="highschool" ' + disabled + ' maxlength="256" placeholder="\uD0A4\uC6CC\uB4DC \uC785\uB825 \uD6C4 &quot;Enter&quot;\uB85C \uAC80\uC0C9"/><span class="label">\uD559\uAD50\uAC80\uC0C9</span></label><div class="searchResult"></div></div>');
                t.push('\t\t\t<input type="hidden" name="highschool.academyActivitySn" value="' + v.academyActivitySn + '" data-rel-target="highschool" />');
                t.push('\t\t\t<input type="hidden" name="highschool.academyName" value="' + v.academyName + '" maxlength="256" data-rel-target="highschool" /><span class="searchResultName">' + (v.academyName ? '<span>' + v.academyName + '</span><button type="button" class="resetSearchResult" data-button="resetSearchResult"></button>' : '') + '</span>');
                t.push('\t\t\t<input type="text" name="highschool.academyCode" value="' + v.academyCode + '" data-rel-target="highschool" ' + disabled + ' class="hidden" ' + (items['1031'].isRequired ? 'required' : '') + ' />');
                t.push('		</div>');
                t.push('	</div>');
            }

            if (items['1034'] || items['1035'] || items['1036']) {
                t.push('\t<div class="row in-span ' + (items['1031'] ? 'half-margin' : 'no-margin') + '">');
                if (items['1034']) {
                    t.push('\t<label class="span per15 title ' + (!allRequired && items['1034'].isRequired ? 'required' : '') + '">\uD559\uAD50\uC18C\uC7AC\uC9C0</label>');
                    t.push('\t<label class="span per15 select"><select name="highschool.locationCode" data-rel-target="highschool" ' + disabled + ' ' + (items['1034'].isRequired ? 'required' : '') + '>');
                    t.push('		<option value="">학교소재지</option>');
                    for (i = 0; i < items['1034'].locationCodeList.length; i++) {
                        d = items['1034'].locationCodeList[i];
                        t.push('\t<option value="' + d.code + '" ' + (d.code === v.locationCode ? 'selected' : '') + '>' + d.name + '</option>');
                    }
                    t.push('	</select></label>');
                }
                if (items['1035']) {
                    t.push('\t<label class="span per15 title ' + (!allRequired && items['1035'].isRequired ? 'required' : '') + ' ' + (items['1034'] ? 'devider' : '') + '">\uACC4\uC5F4</label>');
                    t.push('\t<label class="span per15 select"><select name="highschool.highschoolCategoryCode" data-rel-target="highschool" ' + disabled + ' ' + (items['1035'].isRequired ? 'required' : '') + '>');
                    t.push('		<option value="">계열</option>');
                    for (i = 0; i < items['1035'].highschoolCategoryCodeList.length; i++) {
                        d = items['1035'].highschoolCategoryCodeList[i];
                        t.push('\t<option value="' + d.code + '" ' + (d.code === v.highschoolCategoryCode ? 'selected' : '') + '>' + d.name + '</option>');
                    }
                    t.push('	</select></label>');
                }
                if (items['1036']) {
                    t.push('\t<label class="span per20 title ' + (!allRequired && items['1036'].isRequired ? 'required' : '') + ' ' + (items['1034'] || items['1035'] ? 'devider' : '') + '">\uC8FC\uAC04/\uC57C\uAC04</label>');
                    t.push('	<div class="span per20 radio">');
                    for (i = 0; i < items['1036'].daytimeTypeCodeList.length; i++) {
                        d = items['1036'].daytimeTypeCodeList[i];
                        t.push('\t<label><input type="radio" name="highschool.dayOrNight" value="' + d.code + '" data-rel-target="highschool" ' + disabled + ' ' + (v.dayOrNight === d.code ? 'checked' : '') + ' ' + (items['1036'].isRequired ? 'required' : '') + ' /><span class="label">' + d.name + '</span></label>');
                    }
                    t.push('	</div>');
                }
                t.push('</div>');
            }
            t.push('</div>');
        }
        if (items['1032']) {
            t.push('<div class="subject">');
            t.push('	<h2 class="h2 required">재학기간</h2>');
            t.push('	<div class="row in-span no-margin">');
            t.push('		<label class="span per35 date">');
            t.push('\t\t\t<input type="text" data-dates="highschoolDate:YM highschool graduationCriteriaDate" name="highschool.entranceDate" title="\uC785\uD559\uC77C" value="' + D.date(v.entranceDate, 'yyyy.MM') + '" required class="text date start" placeholder="\uC785\uD559\uC77C" data-rel-target="highschool" ' + disabled + ' />');
            t.push('\t\t\t<input type="text" data-dates="highschoolDate:END" name="highschool.graduationDate" title="\uC878\uC5C5\uC77C" value="' + D.date(v.graduationDate, 'yyyy.MM') + '" required class="text date end" placeholder="\uC878\uC5C5\uC77C" data-rel-target="highschool" ' + disabled + ' />');
            t.push('		</label>');
            if (items['1032'].graduationCriteriaDate) t.push('<div class="span per65 msg"><strong>' + D.date(items['1032'].graduationCriteriaDate) + '</strong> \uC774\uC804 \uC878\uC5C5(\uC608\uC815)\uB9CC \uCD5C\uC885\uD559\uB825\uC73C\uB85C \uC778\uC815</div>');
            t.push('	</div>');
            t.push('</div>');
        }
        if (items['1037']) {
            t.push('<div class="subject">');
            t.push('\t<h2 class="h2 ' + (items['1037'].isRequired ? 'required' : '') + '">\uD559\uC5C5\uC131\uC801</h2>');
            t.push('	<div class="row in-span no-margin">');
            t.push('		<label class="span per25 label rank">');
            t.push('\t\t\t<input type="number" min="1" max="100" name="highschool.rankPercentage" value="' + v.rankPercentage + '" ' + (items['1037'].isRequired ? 'required' : '') + ' class="text" data-rel-target="highschool" ' + disabled + ' />');
            t.push('		</label>');
            t.push('	</div>');
            t.push('</div>');
        }

        return t.join('');
    },
    college: function college(data, loopName) {
        var t = [],
            i = void 0;
        if (data.guideContents) {
            t.push('<div class="wrapGuide topGuide">');
            t.push('\t<div class="guide">' + data.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('<div class="wrapCollege" data-wrap="collegeLoop" data-type="' + loopName + '" data-required="' + data.isRequired + '">');
        if (!data[loopName] || !data[loopName].length) t.push(WriteResumeTemplate.collegeLoop(null, loopName));
        for (i = 0; i < data[loopName].length; i++) {
            t.push(WriteResumeTemplate.collegeLoop(data[loopName][i], loopName, i));
        }t.push('</div>');
        t.push('<div class="collegeBtnSet clearfix">');
        t.push('\t<button type="button" class="btnRemoveCollege" data-button="removeCollege" data-loopName="' + loopName + '">\uC0AD\uC81C</button>');
        t.push('\t<button type="button" class="btnAddCollege" data-button="addCollege" data-loopName="' + loopName + '">\uCD94\uAC00</button>');
        t.push('</div>');

        return t.join('');
    },
    collegeLoop: function collegeLoop(data, loopName, index) {
        var t = [],
            i = void 0,
            d = void 0,
            items = void 0,
            arr = void 0,
            obj = void 0,
            disabled = void 0,
            code = void 0,
            isEnabled = void 0,
            marginIndex = void 0;

        index = index || $('div[data-loop="' + loopName + '"]').size();
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(loopName === 'college' ? obj['141'].items : obj['142'].items);

        data = data || {
            academyActivitySn: '',
            academyCode: '',
            academyName: '',
            collegeCategoryCode: '',
            degreeTypeCode: '',
            entranceDate: '',
            graduationDate: '',
            graduationTypeCode: '',
            headOrBranch: '',
            locationCode: '',
            major: [],
            majorAverageScore: '',
            majorCredits: '',
            majorPerfectScore: '',
            majorSubject: [],
            perfectScore: '',
            score: '',
            semester: []
        };

        disabled = data.academyCode ? '' : 'disabled';

        if (loopName !== 'college') {
            data.lab = data.lab || '';
            data.academicAdviser = data.academicAdviser || '';
        }

        t.push('<div class="wrapSubject" data-loop="' + loopName + '" data-index="' + index + '">');
        t.push('\t<div class="subject" data-code="' + (loopName === 'college' ? '141' : '142') + '">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].academyActivitySn" value="' + data.academyActivitySn + '"/>');
        code = loopName === 'college' ? '141' : '142'; // 무조건 1개 이상 입력필수인지 체크
        t.push('\t\t<h2 class="h2 ' + (obj[code].isRequired ? 'required' : '') + '">\uD559\uC704\uAD6C\uBD84</h2>');
        t.push('		<div class="row in-span no-margin">');
        t.push('\t\t\t<div class="span per100 radio" data-rel-id="' + loopName + '[' + index + ']">');
        arr = loopName === 'college' ? items['1038'] : items['1052'];
        for (i = 0; i < arr.degreeTypeCodeList.length; i++) {
            d = arr.degreeTypeCodeList[i];
            t.push('\t\t\t<label><input type="radio"  name="' + loopName + '[' + index + '].degreeTypeCode" value="' + d.code + '" ' + (d.code === data.degreeTypeCode ? 'checked' : '') + ' ' + (obj[code].isRequired ? 'required' : '') + ' /><span class="label">' + d.name + '</span></label>');
        }
        t.push('			</div>');
        t.push('		</div>');
        t.push('	</div>');

        if (loopName === 'college') isEnabled = items['1042'] || items['1043'] || items['1044']; // 대학교라면 학교명/학교소재지/본교분교
        else isEnabled = items['1056'] || items['1057'] || items['1058'] || items['1065'] || items['1066']; // 대학원이라면 지도교수과 랩실까지 확인

        if (isEnabled) {
            marginIndex = 0;

            t.push('<div class="subject">');
            t.push('	<h2 class="h2">학교관련</h2>');

            // 학교명
            code = loopName === 'college' ? '1042' : '1056';
            if (items[code]) {
                t.push('<div class="row in-span no-margin">');
                t.push('\t<label class="span per15 title ' + (items[code].isRequired ? 'required' : '') + '">\uD559\uAD50\uBA85</label>');
                t.push('	<div class="span per80 middle-set">');
                t.push('\t\t<div class="search"><label><input type="search" class="text" data-type="college" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' maxlength="256" placeholder="\uD0A4\uC6CC\uB4DC \uC785\uB825 \uD6C4 &quot;Enter&quot;\uB85C \uAC80\uC0C9"/><span class="label">\uD559\uAD50\uAC80\uC0C9</span></label><div class="searchResult"></div></div>');
                t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].academyName" maxlength="256" value="' + data.academyName + '" /><span class="searchResultName">' + (data.academyName ? '<span>' + data.academyName + '</span><button type="button" class="resetSearchResult" data-button="resetSearchResult"></button>' : '') + '</span>');
                t.push('\t\t<input type="text" name="' + loopName + '[' + index + '].academyCode" value="' + data.academyCode + '" class="hidden" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items[code].isRequired ? 'required' : '') + ' />');
                t.push('	</div>');
                t.push('</div>');
                marginIndex++;
            }

            // 학교소재지/본교분교
            if (loopName === 'college') isEnabled = items['1043'] || items['1044'];else isEnabled = items['1057'] || items['1058'];

            if (isEnabled) {
                t.push('<div class="row in-span ' + (marginIndex === 0 ? 'no' : 'half') + '-margin">');

                // 학교소재지
                code = loopName === 'college' ? '1043' : '1057';
                if (items[code]) {
                    t.push('<label class="span per15 title ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '">\uD559\uAD50\uC18C\uC7AC\uC9C0</label>');
                    t.push('<label class="span per25 select"><select name="' + loopName + '[' + index + '].locationCode" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '>');
                    t.push('	<option value="">학교소재지</option>');
                    for (i = 0; i < items[code].locationCodeList.length; i++) {
                        d = items[code].locationCodeList[i];
                        t.push('<option value="' + d.code + '" ' + (d.code === data.locationCode ? 'selected' : '') + '>' + d.name + '</option>');
                    }
                    t.push('</select></label>');
                }

                // 본교/분교
                code = loopName === 'college' ? '1044' : '1058';
                if (items[code]) {
                    t.push('<label class="span per20 title ' + (items[loopName === 'college' ? '1043' : '1057'] ? 'devider' : '') + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '">\uBCF8\uAD50/\uBD84\uAD50</label>');
                    t.push('<div class="span per20 radio">');
                    for (i = 0; i < items[code].branchTypeCodeList.length; i++) {
                        d = items[code].branchTypeCodeList[i];
                        t.push('<label><input type="radio" name="' + loopName + '[' + index + '].headOrBranch" value="' + d.code + '" data-rel-target="' + loopName + '[' + index + ']" ' + (d.code === data.headOrBranch ? 'checked' : '') + ' ' + disabled + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + ' /><span class="label">' + d.name + '</span></label>');
                    }
                    t.push('</div>');
                }
                t.push('</div>');
            }
            if (loopName !== 'college' && (items['1065'] || items['1066'])) {
                t.push('<div class="row in-span ' + (marginIndex === 0 ? 'no' : 'half') + '-margin">');
                code = '1065';
                if (items[code]) {
                    t.push('<label class="span per15 title ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '">\uC9C0\uB3C4\uAD50\uC218\uBA85</label>');
                    t.push('<div class="span per25"><input type="text" maxlength="128" name="' + loopName + '[' + index + '].academicAdviser" value="' + data.academicAdviser + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + ' class="text" /></div>');
                }
                code = '1066';
                if (items[code]) {
                    t.push('<label class="span per20 title ' + (items['1065'] ? 'devider' : '') + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '">\uC18C\uC18D \uC5F0\uAD6C\uC2E4\uBA85</label>');
                    t.push('<div class="span per40"><input type="text" maxlength="128" name="' + loopName + '[' + index + '].lab" value="' + data.lab + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + ' class="text" /></div>');
                }
                t.push('</div>');
            }
            t.push('</div>');
        } // 학교관련 끝

        code = loopName === 'college' ? '1039' : '1053'; // 재학기간
        if (items[code]) {
            t.push('<div class="subject">');
            t.push('	<h2 class="h2 required">재학기간</h2>');
            t.push('	<div class="row in-span no-margin">');
            t.push('		<label class="span per35 date">');
            t.push('\t\t\t<input type="text" data-dates="' + loopName + '[' + index + '].date:YM college graduationCriteriaDate" name="' + loopName + '[' + index + '].entranceDate" value="' + D.date(data.entranceDate, 'yyyy.MM') + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text date start" placeholder="\uC785\uD559\uC77C" required />');
            t.push('\t\t\t<input type="text" data-dates="' + loopName + '[' + index + '].date:END" name="' + loopName + '[' + index + '].graduationDate" value="' + D.date(data.graduationDate, 'yyyy.MM') + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text date end" placeholder="\uC878\uC5C5\uC77C" required />');
            t.push('		</label>');
            if (items[code].graduationCriteriaDate) t.push('<div class="span per65 msg"><strong>' + D.date(items[code].graduationCriteriaDate) + '</strong> \uC774\uC804 \uC878\uC5C5(\uC608\uC815)\uB9CC \uCD5C\uC885\uD559\uB825\uC73C\uB85C \uC778\uC815</div>');
            t.push('	</div>');
            t.push('</div>');
        }

        code = loopName === 'college' ? '1040' : '1054'; // 입학구분
        if (items[code]) {
            t.push('<div class="subject">');
            t.push('\t<h2 class="h2 ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '">\uC785\uD559\uAD6C\uBD84</h2>');
            t.push('	<div class="row in-span no-margin">');
            t.push('		<div class="span per100 radio">');
            for (i = 0; i < items[code].entranceTypeCodeList.length; i++) {
                d = items[code].entranceTypeCodeList[i];
                t.push('\t\t<label><input type="radio" name="' + loopName + '[' + index + '].entranceTypeCode" value="' + d.code + '" ' + (d.code === data.entranceTypeCode ? 'checked' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '/><span class="label">' + d.name + '</span></label>');
            }
            t.push('		</div>');
            t.push('	</div>');
            t.push('</div>');
        }

        code = loopName === 'college' ? '1041' : '1055'; // 졸업구분
        t.push('	<div class="subject">');
        t.push('		<h2 class="h2 required">졸업구분</h2>');
        t.push('		<div class="row in-span no-margin">');
        t.push('			<div class="span per100 radio">');
        for (i = 0; i < items[code].graduationTypeCodeList.length; i++) {
            d = items[code].graduationTypeCodeList[i];
            t.push('\t\t\t<label><input type="radio" name="' + loopName + '[' + index + '].graduationTypeCode" value="' + d.code + '" ' + (d.code === data.graduationTypeCode ? 'checked' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' required /><span class="label">' + d.name + '</span></label>');
        }
        t.push('			</div>');
        t.push('		</div>');
        t.push('	</div>');

        // 학과/전공
        if (loopName === 'college') isEnabled = items['1045'] || items['1047'];else isEnabled = items['1059'] || items['1061'];

        if (isEnabled) {
            code = loopName === 'college' ? '1045' : '1059'; // 학과계열
            t.push('<div class="subject">');
            t.push('	<h2 class="h2">학과/전공</h2>');
            if (items[code]) {
                t.push('<div class="row in-span no-margin">');
                t.push('\t<label class="span per10 title ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '">\uD559\uACFC\uACC4\uC5F4</label>');
                t.push('\t<label class="span per35 select"><select name="' + loopName + '[' + index + '].collegeCategoryCode" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '>');
                t.push('		<option value="">학과계열을 선택하세요.</option>');
                for (i = 0; i < items[code].collegeCategoryCodeList.length; i++) {
                    d = items[code].collegeCategoryCodeList[i];
                    t.push('\t<option value="' + d.code + '" ' + (d.code === data.collegeCategoryCode ? 'selected' : '') + '>' + d.name + '</option>');
                }
                t.push('	</select></label>');
                t.push('</div>');
            }
            code = loopName === 'college' ? '1047' : '1061'; // 전공
            if (items[code]) {
                t.push('<div class="subject" data-wrap="major">');
                if (!data.major.length) t.push(WriteResumeTemplate.major(null, loopName, index, null, disabled));
                for (i = 0; i < data.major.length; i++) {
                    t.push(WriteResumeTemplate.major(data.major[i], loopName, index, i, disabled));
                }t.push('</div>');
            }
            t.push('</div>');
        }

        // 성적
        if (loopName === 'college') isEnabled = items['1046'] || items['1048'];else isEnabled = items['1060'] || items['1062'];

        if (isEnabled) {
            t.push('<div class="subject">');
            t.push('	<h2 class="h2">성적</h2>');
            code = loopName === 'college' ? '1046' : '1060'; // 평점
            if (items[code]) {
                t.push('<div class="row in-span no-margin">');
                t.push('\t<label class="span per10 title ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '">\uD3C9\uC810</label>');
                t.push('	<div class="span per90 middle-set">');
                t.push('\t\t<input type="number" step="0.01" name="' + loopName + '[' + index + '].score" value="' + data.score + '" data-rel-id="' + loopName + '[' + index + '].perfectScore" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + ' class="text" title="\uD3C9\uC810" size="7" placeholder="\uD3C9\uC810" data-limit="decimal(5,2)" step="0.01"/> <span style="margin:0px 5px;">/</span>');
                t.push('\t\t<label class="select"><select name="' + loopName + '[' + index + '].perfectScore" data-rel-target="' + loopName + '[' + index + '].perfectScore" disabled required>');
                t.push('			<option value="">만점기준</option>');
                for (i = 0; i < items[code].perfectGradeCodeList.length; i++) {
                    d = items[code].perfectGradeCodeList[i];
                    t.push('\t\t\t<option value="' + d.code + '" ' + (Number(d.code) === Number(data.perfectScore) ? 'selected' : '') + '>' + d.name + '</option>');
                }
                t.push('		</select></label>');
                t.push('	</div>');
                t.push('</div>');
            }
            code = loopName === 'college' ? '1048' : '1062'; // 학기별
            if (items[code]) {
                t.push('<div class="subject" data-wrap="grade">');
                if (!data.semester.length) t.push(WriteResumeTemplate.grade(null, loopName, index, null, disabled));
                for (i = 0; i < data.semester.length; i++) {
                    t.push(WriteResumeTemplate.grade(data.semester[i], loopName, index, i, disabled));
                }t.push('</div>');
            }
            t.push('</div>');
        }

        // 전공성적
        if (loopName === 'college') isEnabled = items['1049'] || items['1050'];else isEnabled = items['1063'] || items['1064'];

        if (isEnabled) {
            t.push('<div class="subject">');
            t.push('	<h2 class="h2">전공학점</h2>');
            code = loopName === 'college' ? '1049' : '1063'; // 전공이수학점/평점
            if (items[code]) {
                t.push('<div class="row in-span no-margin">');
                t.push('\t<label class="span per15 title ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '">\uC774\uC218\uD559\uC810</label>');
                t.push('\t<label class="span per20 label credit"><input type="number" title="\uC774\uC218\uD559\uC810" step="any" data-validType="INTEGER" data-validLength="5" min="0" max="1000" data-limit="decimal(5)"  name="' + loopName + '[' + index + '].majorCredits" value="' + data.majorCredits + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + ' class="text" /></label>');
                t.push('\t<label class="span per15 devider title ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + '">\uD3C9\uC810</label>');
                t.push('	<div class="span per50 middle-set">');
                t.push('\t\t<input type="number" min="0" max="1000" title="\uD3C9\uC810" name="' + loopName + '[' + index + '].majorAverageScore" value="' + data.majorAverageScore + '" data-rel-id="' + loopName + '[' + index + '].majorPerfectScore" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (D.bool(items[code].isRequired) === true ? 'required' : '') + ' class="text" size="7" title="\uD3C9\uC810" placeholder="\uD3C9\uC810" data-limit="decimal(5,2)" step="0.01"/> <span style="margin:0px 5px;">/</span>');
                t.push('\t\t<label class="select"><select name="' + loopName + '[' + index + '].majorPerfectScore" data-rel-target="' + loopName + '[' + index + '].majorPerfectScore" disabled required>');
                t.push('			<option value="">만점기준</option>');
                for (i = 0; i < items[code].perfectGradeCodeList.length; i++) {
                    d = items[code].perfectGradeCodeList[i];
                    t.push('\t\t\t<option value="' + d.code + '" ' + (Number(d.code) === Number(data.majorPerfectScore) ? 'selected' : '') + '>' + d.name + '</option>');
                }
                t.push('		</select></label>');
                t.push('	</div>');
                t.push('</div>');
            }

            code = loopName === 'college' ? '1050' : '1064'; // 전공과목별 평점
            if (items[code]) {
                t.push('<div class="subject" data-wrap="majorGrade" data-code="' + code + '" data-type="collegeMajorSubject">');
                if (!data.majorSubject.length) t.push(WriteResumeTemplate.majorGrade(null, loopName, index, null, disabled));
                for (i = 0; i < data.majorSubject.length; i++) {
                    t.push(WriteResumeTemplate.majorGrade(data.majorSubject[i], loopName, index, i, disabled));
                }t.push('</div>');
            }
            t.push('</div>');
        }
        t.push('</div>'); // wrapSubject

        return t.join('');
    },
    major: function major(data, loopName1, index1, index2, disabled1) {
        var t = [],
            i = void 0,
            d = void 0,
            loopName2 = void 0,
            obj = void 0,
            itemsAll = void 0,
            itemsMajor = void 0,
            itemsRank = void 0,
            disabled = void 0;

        obj = WriteResume.fullDataObject();
        itemsAll = WriteResumeUtil.objectGenerator(loopName1 === 'college' ? obj['141'].items : obj['142'].items);
        itemsMajor = loopName1 === 'college' ? itemsAll['1047'] : itemsAll['1061'];
        if (loopName1 === 'college') itemsRank = itemsAll['1051'];

        loopName2 = 'collegeMajor'; // loop를 대표하는 이름
        index2 = index2 || $('div[data-loop="' + loopName1 + '"][data-index="' + index1 + '"] div[data-loop="' + loopName2 + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        data = data || {
            collegeMajorSn: '',
            majorCode: '',
            majorName: '',
            majorTypeCode: '',
            majorCategoryCode: '',
            dayOrNight: '',
            ranking: '',
            headcount: ''
        };

        disabled = data.majorCode ? '' : 'disabled';

        t.push('<div class="row loop" data-loop="' + loopName2 + '">');
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<div class="span per20 btn ' + (itemsMajor.isRequired ? 'required' : '') + '">');
        t.push('\t\t\t\uC804\uACF5<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + '></button><button type="button" class="btn btn-icon btn-remove" data-button="remove" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + '></button><button type="button" class="btn btn-icon btn-reset" data-button="reset" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + '></button></div>');
        t.push('		</div>');
        t.push('		<div class="span per80">');
        t.push('			<div class="row in-span no-margin">');
        t.push('				<div class="span per100 middle-set">');
        t.push('\t\t\t\t\t<div class="search"><label><input type="search" class="text" data-type="major" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + ' maxlength="128" placeholder="\uD0A4\uC6CC\uB4DC \uC785\uB825 \uD6C4 &quot;Enter&quot;\uB85C \uAC80\uC0C9"/><span class="label">\uC804\uACF5\uAC80\uC0C9</span></label><div class="searchResult"></div></div>');
        t.push('\t\t\t\t\t<input type="hidden" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].collegeMajorSn" value="' + data.collegeMajorSn + '" />');
        t.push('\t\t\t\t\t<input type="hidden" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorName" value="' + data.majorName + '" maxlength="128" /><span class="searchResultName">' + (data.majorName ? '<span>' + data.majorName + '</span><button type="button" class="resetSearchResult" data-button="resetSearchResult"></button>' : '') + '</span>');
        t.push('\t\t\t\t\t<input type="text" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorCode" value="' + data.majorCode + '" data-rel-target="' + loopName1 + '[' + index1 + ']" data-rel-id="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + (itemsMajor.isRequired ? 'required' : '') + ' class="hidden" ' + disabled1 + '/>');
        t.push('				</div>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        t.push('				<div class="span per40 radio">');
        for (i = 0; i < itemsMajor.majorTypeCodeList.length; i++) {
            d = itemsMajor.majorTypeCodeList[i];
            t.push('\t\t\t\t<label><input type="radio" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorTypeCode" value="' + d.code + '" ' + (d.code === data.majorTypeCode ? 'checked' : '') + ' data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled + ' required /><span class="label">' + d.name + '</span></label>');
        }
        t.push('				</div>');
        t.push('\t\t\t\t<label class="span per35 select"><select name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorCategoryCode" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled + ' required data-rel-id="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorCategoryCode" data-rel-type="with" data-rel-value="125,126,127,128">');
        t.push('					<option value="">전공계열을 선택하세요.</option>');
        for (i = 0; i < itemsMajor.majorCategoryCodeList.length; i++) {
            d = itemsMajor.majorCategoryCodeList[i];
            t.push('\t\t\t\t<option value="' + d.code + '" ' + (d.code === data.majorCategoryCode ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('				</select></label>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        t.push('				<div class="span per25 radio">');
        for (i = 0; i < itemsMajor.daytimeTypeCodeList.length; i++) {
            d = itemsMajor.daytimeTypeCodeList[i];
            t.push('\t\t\t\t<label><input type="radio" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].dayOrNight" value="' + d.code + '" ' + (d.code === data.dayOrNight ? 'checked' : '') + ' data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled + ' required /><span class="label">' + d.name + '</span></label>');
        }
        t.push('				</div>');

        if (itemsRank) {
            // 석차(대학교이며 전공계열이 의약계열일 때만 노출)
            t.push('\t\t    <div class="span per20 btn ' + (itemsRank.isRequired ? 'required' : '') + '" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorCategoryCode" data-rel-hide="true" style="display:none">\uC11D\uCC28</div>');
            t.push('\t\t\t<div class="span per55 devider" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorCategoryCode" data-rel-hide="true" style="display:none">');
            t.push('\t\t\t\t<input type="number" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].ranking" value="' + data.ranking + '" data-rel-id="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].ranking" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorCategoryCode" ' + (itemsRank.isRequired ? 'required' : '') + ' class="text" size="7" placeholder="\uC11D\uCC28" max="9999"/> <span style="margin:0px 5px;">/</span>');
            t.push('\t\t\t\t<input type="number" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].headcount" value="' + data.headcount + '" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].ranking" required class="text" size="7" placeholder="\uC804\uCCB4\uC778\uC6D0" max="9999"/>');
            t.push('			</div>');
        }
        t.push('			</div>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    grade: function grade(data, loopName1, index1, index2, disabled1) {
        var t = [],
            i = void 0,
            d = void 0,
            loopName2 = void 0,
            obj = void 0,
            itemsAll = void 0,
            items = void 0,
            disabled = void 0;

        obj = WriteResume.fullDataObject();
        itemsAll = WriteResumeUtil.objectGenerator(loopName1 === 'college' ? obj['141'].items : obj['142'].items);
        items = loopName1 === 'college' ? itemsAll['1048'] : itemsAll['1062'];

        loopName2 = 'collegeSemester'; // loop를 대표하는 이름
        index2 = index2 || $('div[data-loop="' + loopName1 + '"][data-index="' + index1 + '"] div[data-loop="' + loopName2 + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        data = data || {
            collegeSemesterSn: '',
            academicYear: '',
            semester: '',
            majorAverageScore: '',
            majorPerfectScore: ''
        };

        disabled = data.academicYear ? '' : 'disabled';

        t.push('<div class="row loop no-devider" data-loop="' + loopName2 + '">');
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<div class="span per20 btn ' + (items.isRequired ? 'required' : '') + '">');
        t.push('\t\t\t\uD559\uAE30\uBCC4<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + '></button><button type="button" class="btn btn-icon btn-remove" data-button="remove" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + '></button><button type="button" class="btn btn-icon btn-reset" data-button="reset" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + '></button></div>');
        t.push('		</div>');
        t.push('		<div class="span per80">');
        t.push('			<div class="row in-span no-margin">');
        t.push('				<div class="span per30 middle-set">');
        t.push('\t\t\t\t\t<input type="hidden" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].collegeSemesterSn" value="' + data.collegeSemesterSn + '"/>');
        t.push('\t\t\t\t\t<input type="number" max="32" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].academicYear" value="' + data.academicYear + '" data-rel-target="' + loopName1 + '[' + index1 + ']" data-rel-id="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled1 + ' class="text" size="3" ' + (items.isRequired ? 'required' : '') + ' /> <span style="margin:0px 10px 0px 5px">\uD559\uB144</span>');
        t.push('\t\t\t\t\t<input type="number" max="32" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].semester" value="' + data.semester + '" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled + ' class="text" size="3" required /> <span style="margin-left:5px;">\uD559\uAE30</span>');
        t.push('				</div>');
        t.push('				<div class="span per45 devider middle-set">');
        t.push('\t\t\t\t\t<input type="number" step="0.01" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorAverageScore" value="' + data.majorAverageScore + '" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled + ' step="0.01" class="text" title="\uD3C9\uC810" size="7" placeholder="\uD3C9\uC810" required data-limit="decimal(5,2)"/> <span style="margin:0px 5px;">/</span>');
        t.push('\t\t\t\t\t<label class="select"><select name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorPerfectScore" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled + ' required>');
        t.push('						<option value="">만점기준</option>');
        for (i = 0; i < items.perfectGradeCodeList.length; i++) {
            d = items.perfectGradeCodeList[i];
            t.push('\t\t\t\t\t<option value="' + d.code + '" ' + (Number(d.code) === Number(data.majorPerfectScore) ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('					</select></label>');
        t.push('				</div>');
        t.push('			</div>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    majorGrade: function majorGrade(data, loopName1, index1, index2, disabled1) {
        var t = [],
            i = void 0,
            d = void 0,
            loopName2 = void 0,
            obj = void 0,
            itemsAll = void 0,
            items = void 0,
            disabled = void 0;

        obj = WriteResume.fullDataObject();
        itemsAll = WriteResumeUtil.objectGenerator(loopName1 === 'college' ? obj['141'].items : obj['142'].items);
        items = loopName1 === 'college' ? itemsAll['1050'] : itemsAll['1064'];

        loopName2 = 'collegeMajorSubject'; // loop를 대표하는 이름
        index2 = index2 || $('div[data-loop="' + loopName1 + '"][data-index="' + index1 + '"] div[data-loop="' + loopName2 + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        data = data || {
            majorCourseSn: '',
            majorCourseName: '',
            majorCredits: '',
            score: '',
            perfectScore: ''
        };

        disabled = data.majorCourseName ? '' : 'disabled';

        t.push('<div class="row loop no-devider" data-loop="' + loopName2 + '">');
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<div class="span per20 btn ' + (items.isRequired ? 'required' : '') + '">');
        t.push('\t\t\t\uACFC\uBAA9\uBCC4<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + '></button><button type="button" class="btn btn-icon btn-remove" data-button="remove" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + '></button><button type="button" class="btn btn-icon btn-reset" data-button="reset" data-rel-target="' + loopName1 + '[' + index1 + ']" ' + disabled1 + '></button></div>');
        t.push('		</div>');
        t.push('		<div class="span per80">');
        t.push('			<div class="row in-span no-margin">');
        t.push('\t\t\t\t<input type="hidden" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorCourseSn" value="' + data.majorCourseSn + '"/>');
        t.push('\t\t\t\t<div class="span per30"><input type="text" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorCourseName" value="' + data.majorCourseName + '" data-rel-target="' + loopName1 + '[' + index1 + ']" data-rel-id="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled1 + ' class="text" maxlength="64" placeholder="\uC804\uACF5\uACFC\uBAA9\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items.isRequired ? 'required' : '') + ' /></div>');
        t.push('\t\t\t\t<label class="span per20 label credit"><input data-validType="INTEGER" data-validLength="5" data-limit="decimal(5)" step="any" type="number" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].majorCredits" title="\uACFC\uBAA9\uBCC4 \uD559\uC810" value="' + data.majorCredits + '" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled + ' class="text" required /></label>');
        t.push('				<div class="span per45 devider middle-set">');
        t.push('\t\t\t\t\t<input type="number" data-limit="decimal(5,2)" step="0.01" name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].score" value="' + data.score + '" data-rel-id="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].perfectScore" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + ']" ' + disabled + ' class="text" title="\uC804\uACF5 \uCDE8\uB4DD\uC131\uC801" size="7" placeholder="\uCDE8\uB4DD\uC131\uC801" required  data-limit="decimal(5,2)" step="0.01"/> <span style="margin:0px 5px;">/</span>');
        t.push('\t\t\t\t\t<label class="select"><select name="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].perfectScore" data-rel-target="' + loopName1 + '[' + index1 + '].' + loopName2 + '[' + index2 + '].perfectScore" ' + disabled + ' required>');
        t.push('						<option value="">만점기준</option>');
        for (i = 0; i < items.perfectGradeCodeList.length; i++) {
            d = items.perfectGradeCodeList[i];
            t.push('\t\t\t\t\t<option value="' + d.code + '" ' + (Number(d.code) === Number(data.perfectScore) ? 'selected' : '') + '>' + d.name + '</option>');
        }
        t.push('					</select></label>');
        t.push('				</div>');
        t.push('			</div>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '143': function _(d) {
        // 성적증명서 첨부
        var t = [],
            items = void 0,
            transcriptFileData = void 0,
            obj = void 0,
            loopName = 'transcriptFile';

        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['14'].items);
        transcriptFileData = items['143']; // items를 구하기 위해 fullData를 불러옴

        if (d.transcriptFile[0]) d.transcriptFile[0].name = loopName + '[0].fileUid';

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (transcriptFileData.isRequired ? 'required' : '') + '">\uC131\uC801\uC99D\uBA85\uC11C \uCCA8\uBD80</h2>');
        if (d.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle transcriptFile">' + d.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin file">');
        t.push('		<label class="span per50 title ellipsis">파일첨부 버튼을 클릭하여 성적증명서를 첨부하세요.</label>');
        t.push('\t\t<div class="span per50 middle-set span-file" data-type="' + loopName + '" data-required="' + transcriptFileData.isRequired + '" style="text-align:right">');
        t.push('			<div class="formFileBtnSet">');
        if (d.transcriptFile[0] && d.transcriptFile[0]['fileUid']) {
            t.push(WriteResumeTemplate.attachFile(d.transcriptFile[0], 80, 20));
        } else {
            t.push(WriteResumeTemplate.detachFile(loopName, transcriptFileData.isRequired));
        }
        t.push('			</div>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    '144': function _(data) {
        // 논문 첨부
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            attachData = void 0,
            obj = void 0;

        loopName = 'paper';
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['14'].items);
        attachData = items['144']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject" data-wrap="thesisAttach" data-numOfRow="' + attachData.paper.length + '">');
        t.push('	<h2 class="h2" data-h2="thesisAttach">논문 첨부</h2>');
        t.push('	<div class="row in-span no-margin">');
        t.push('		<label class="span per80 title">대학교 및 대학원에서 작성한 학위논문이 있습니까?</label>');
        t.push('		<div class="span per20 radio circle" style="text-align:right">');
        t.push('\t\t\t<label><input type="radio" name="' + loopName + '.existYn" value="true" ' + (attachData.paper.length > 0 ? 'checked' : '') + '  /><span class="circle">\uC608</span></label>');
        t.push('\t\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (attachData.paper.length <= 0 ? 'checked' : '') + ' /><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('		</div>');
        t.push('	</div>');
        for (i = 0; i < attachData.paper.length; i++) {
            t.push(WriteResumeTemplate.thesisAttach(attachData.paper[i], i));
        }t.push('</div>');

        return t.join('');
    },
    thesisAttach: function thesisAttach(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            attachData = void 0,
            disabled = void 0,
            obj = void 0;

        loopName = 'paper';
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['14'].items);
        attachData = items['144']; // items를 구하기 위해 fullData를 불러옴
        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업

        d = d || {
            paperSn: '',
            degreeTypeCode: '',
            title: '',
            contents: ''
        };

        t.push('<div class="row loop" data-loop="' + loopName + '">');
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per20 btn">');
        t.push('			<label class="">논문</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('		<div class="span per80">');
        t.push('			<div class="row in-span no-margin">');
        t.push('\t\t\t\t<div class="span per100 radio"  data-rel-id="' + loopName + '[' + index + ']" >');
        t.push('\t\t\t\t\t<label class="hidden"><input type="hidden" name="' + loopName + '[' + index + '].paperSn" value="' + d.paperSn + '"/><input type="radio" name="' + loopName + '[' + index + '].degreeTypeCode" value="" /></label>');
        for (i = 0; i < attachData.degreeTypeCodeList.length; i++) {
            t.push('\t\t\t\t<label><input type="radio" name="' + loopName + '[' + index + '].degreeTypeCode" class="radio" value="' + attachData.degreeTypeCodeList[i].code + '" ' + (d.degreeTypeCode === attachData.degreeTypeCodeList[i].code ? 'checked' : '') + '/><span class="label">' + attachData.degreeTypeCodeList[i].name + '</span></label>');
        }
        t.push('				</div>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        t.push('\t\t\t\t<div class="span per100"><input type="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' name="' + loopName + '[' + index + '].title" value="' + d.title + '" class="text" placeholder="\uB17C\uBB38\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694." maxlength="256" /></div>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        t.push('				    <div class="span per100">');
        t.push('                        <textarea  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' name="' + loopName + '[' + index + '].contents" class="textarea" rows="5" placeholder="\uB17C\uBB38\uC694\uC57D\uC744 \uC785\uB825\uD558\uC138\uC694." maxlength="20000">' + d.contents + '</textarea>');
        t.push('\t                    <div class="pull-right limitLength"><b>' + (d.contents ? d.contents.length : '') + '</b></div>');
        t.push('                    </div>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        t.push('\t\t\t\t<div class="span per100 middle-set span-file" data-type="' + loopName + '" data-required="' + attachData.isRequired + '" style="text-align:right">');
        t.push('				    <div class="formFileBtnSet">');
        if (d.fileUid) {
            d.name = loopName + '[' + index + '].fileUid';
            t.push(WriteResumeTemplate.attachFile(d, 85, 15));
        } else {
            t.push(WriteResumeTemplate.detachFile(loopName, attachData.isRequired));
        }
        t.push('				    </div>');
        t.push('				</div>');
        t.push('			</div>');
        if (attachData.guideContents) {
            t.push('		<div class="wrapGuide">');
            t.push('\t\t\t<div class="guide hasTitle thesisAttach">' + attachData.guideContents + '</div>');
            t.push('		</div>');
        }
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '145': function _(data) {
        // 학력사항 추가질문 설정
        return WriteResumeTemplate.additionalQuestion(data, 'educationBuilder'); // 추가사항
    },
    '146': function _(d) {
        // 연구실적 충족여부
        var t = [],
            loopName = void 0,
            items = void 0,
            paperData = void 0,
            obj = void 0;
        loopName = 'researchSatisfy'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);

        paperData = items['146']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject no-padding" >');
        if (d.guideContents) {
            t.push('<div class="wrapGuide" style="margin-top:3px;">');
            t.push('\t<div class="guide hasTitle researchSatisfy">' + paperData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('\t<h2 class="h2 ' + (d.isRequiredisRequired ? 'required' : '') + '">\uC5F0\uAD6C\uC2E4\uC801 \uC790\uACA9\uC744 \uBAA8\uB450 \uCDA9\uC871\uD569\uB2C8\uAE4C?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="true" ' + (d.research && D.bool(d.research.existYn) === true ? 'checked' : '') + '  required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (d.research && D.bool(d.research.existYn) === false ? 'checked' : '') + '  required/><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');
        t.push('</div>');
        return t.join('');
    },
    '147': function _(d) {
        // 학술지 게재
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            paperData = void 0,
            allRequired = void 0,
            obj = void 0;

        loopName = 'researchPaper'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);

        paperData = items['147']; // items를 구하기 위해 fullData를 불러옴
        allRequired = WriteResumeUtil.isAllRequired(paperData.items); // 전체 필수인지 체크

        t.push('<div class="subject no-padding" data-wrap="paper" data-code="147" data-type="researchPaper" data-numOfRow="' + (d.research && d.research.existYn ? d.research.researchPaper.length : 0) + '">');
        t.push('\t<h2 class="h2 ' + (allRequired && paperData.isRequired ? 'required' : '') + '">\uC5F0\uAD6C\uB17C\uBB38 \uAC8C\uC7AC \uC2E4\uC801\uC774 \uC788\uC2B5\uB2C8\uAE4C?</h2>');

        t.push('	<div class="radio circle" style="text-align:right">');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="true" ' + (d.research && D.bool(d.research.existYn) === true ? 'checked' : '') + '  required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (d.research && D.bool(d.research.existYn) === false ? 'checked' : '') + '  required/><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');

        if (d.research && d.research.existYn) for (i = 0; i < d.research.researchPaper.length; i++) {
            t.push(WriteResumeTemplate.paper(d.research.researchPaper[i], i));
        }t.push('</div>');

        return t.join('');
    },
    paper: function paper(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            paperData = void 0,
            allRequired = void 0,
            selected = void 0,
            disabled = void 0,
            obj = void 0,
            file = void 0;

        loopName = 'researchPaper'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);

        paperData = items['147']; // items를 구하기 위해 fullData를 불러옴
        // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(paperData.items); // items를 array에서 object로 변경
        allRequired = WriteResumeUtil.isAllRequired(paperData.items); // 전체 필수인지 체크

        d = d || {
            researchPaperSn: '',
            existYn: '',
            paperPublishCode: '',
            paperKindCode: '',
            title: '',
            journalName: '',
            paperRoleCode: '',
            ranking: '',
            headcount: '',
            publishDate: '',
            organization: '',
            comment: '',
            issn: '',
            impactFactor: ''

        };

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업
        t.push('\t<div class="row in-span loop" data-loop="' + loopName + '">');
        t.push('		<div class="span per10 btn">');
        t.push('			<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('		<div class="span per90 middle-set">');
        t.push('			<div class="row in-span no-margin">');

        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1067'].isRequired ? 'required' : '') + '">\uAC8C\uC7AC\uAD6C\uBD84</label>');
        t.push('\t\t\t\t<div class="span per20 radio" data-rel-id="' + loopName + '[' + index + ']" >');
        t.push('\t\t\t\t\t<label class="hidden"><input type="hidden" name="' + loopName + '[' + index + '].researchPaperSn" value="' + d.researchPaperSn + '"/><input type="radio" value="" name="' + loopName + '[' + index + '].paperPublishCode" /></label>');
        //제출 : 100 / 게재 : 200
        for (i = 0; i < items['1067'].publishCodeList.length; i++) {
            t.push('\t\t\t\t<label><input type="radio" value="' + items['1067'].publishCodeList[i].code + '" name="' + loopName + '[' + index + '].paperPublishCode" ' + (d.paperPublishCode === items['1067'].publishCodeList[i].code ? 'checked' : '') + ' ' + (items['1067'].isRequired ? 'required' : '') + '/><span class="label">' + items['1067'].publishCodeList[i].name + '</span></label>');
        }
        t.push('				</div>');
        t.push('\t\t\t\t<label class="span per15 title devider ' + (!allRequired && items['1068'].isRequired ? 'required' : '') + '">\uB17C\uBB38\uAD6C\uBD84</label>');
        t.push('\t\t\t\t<label class="span per50 select"><select name="' + loopName + '[' + index + '].paperKindCode" ' + (items['1068'].isRequired ? 'required' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '>');
        t.push('					<option value="">논문구분을 선택하세요.</option>');
        for (i = 0; i < items['1068'].kindCodeList.length; i++) {
            selected = '';
            if (d.paperKindCode === items['1068'].kindCodeList[i].code) selected = 'selected';
            t.push('\t\t\t\t<option value="' + items['1068'].kindCodeList[i].code + '" ' + selected + '>' + items['1068'].kindCodeList[i].name + '</option>');
        }
        t.push('				</select></label>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        //1069
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1069'].isRequired ? 'required' : '') + '">\uB17C\uBB38\uC81C\uBAA9</label>');
        t.push('\t\t\t\t<div class="span per85"><input type="text" value="' + d.title + '" class="text"  name="' + loopName + '[' + index + '].title"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uB17C\uBB38\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1069'].isRequired ? 'required' : '') + ' maxlength="256" /></div>');
        t.push('			</div>');
        //1070
        t.push('			<div class="row in-span half-margin">');
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1070'].isRequired ? 'required' : '') + '">\uAC8C\uC7AC\uC9C0\uBA85</label>');
        t.push('\t\t\t\t<div class="span per85"><input type="text"  value="' + d.journalName + '" class="text" name="' + loopName + '[' + index + '].journalName"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uAC8C\uC7AC\uC9C0\uBA85 \uAD8C, \uD638, \uAC8C\uC7AC Page, \uBC1C\uD589\uB144\uB3C4\uB97C \uD568\uAED8 \uC785\uB825\uD558\uC138\uC694." maxlength="256" ' + (items['1070'].isRequired ? 'required' : '') + ' /></div>');
        t.push('			</div>');

        if (items['1074'] || items['1072']) {
            t.push('		<div class="row in-span half-margin">');
            //1074

            if (items['1074']) {
                t.push('\t\t<label class="span per15 title ' + (!allRequired && items['1074'].isRequired ? 'required' : '') + '">\uBC1C\uD589\uAE30\uAD00</label>');
                t.push('\t\t<div class="span per50"><input type="text"  value="' + d.organization + '" class="text" name="' + loopName + '[' + index + '].organization"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uBC1C\uD589\uAE30\uAD00\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." maxlength="64" ' + (items['1074'].isRequired ? 'required' : '') + ' /></div>');
            }

            if (items['1072']) {
                t.push('\t\t<label class="span title ' + (items['1074'] ? 'devider' : '') + ' ' + (!allRequired && items['1074'] ? 'per20' : 'per15') + ' ' + (!allRequired && items['1072'].isRequired ? 'required' : '') + '">\uAC8C\uC7AC\uC77C\uC790</label>');
                t.push('\t\t<label class="span per15"><input type="text" data-dates="' + loopName + '[' + index + '].publishDate:YMD"  value="' + D.date(d.publishDate) + '" class="text date"  name="' + loopName + '[' + index + '].publishDate" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="" ' + (items['1072'].isRequired ? 'required' : '') + ' /></label>');
            }

            t.push('		</div>');
        }
        t.push('			<div class="row in-span half-margin">');
        //1073
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1073'].isRequired ? 'required' : '') + '">\uC800\uC790\uC21C\uC704</label>');
        t.push('				<div class="span per30">');
        t.push('\t\t\t\t\t<input type="number" min="0" max="32768" class="text" value="' + d.ranking + '"  size="8" name="' + loopName + '[' + index + '].ranking"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uC800\uC790\uC21C\uC704" ' + (items['1073'].isRequired ? 'required' : '') + ' /> / ');
        t.push('\t\t\t\t\t<input type="number" min="0" max="32768"  class="text" value="' + d.headcount + '" size="10" name="' + loopName + '[' + index + '].headcount" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uC5F0\uAD6C \uCC38\uC5EC\uC790\uC218" ' + (items['1073'].isRequired ? 'required' : '') + ' />');
        t.push('				</div>');
        //1071
        t.push('\t\t\t\t<label class="span per20 title devider ' + (!allRequired && items['1071'].isRequired ? 'required' : '') + '">\uC5ED\uD560</label>');
        t.push('\t\t\t\t<label class="span per35 select"><select  name="' + loopName + '[' + index + '].paperRoleCode"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1071'].isRequired ? 'required' : '') + '>');
        t.push('					<option value="">참여역할을 선택하세요.</option>');
        for (i = 0; i < items['1071'].roleCodeList.length; i++) {
            t.push('\t\t\t\t<option value="' + items['1071'].roleCodeList[i].code + '" ' + (d.paperRoleCode === items['1071'].roleCodeList[i].code ? 'selected' : '') + '>' + items['1071'].roleCodeList[i].name + '</option>');
        }
        t.push('				</select></label>');
        t.push('			</div>');

        if (items['1188'] || items['1189']) {
            t.push('		<div class="row in-span half-margin">');
            if (items['1188']) {
                t.push('\t\t<label class="span per15 title ' + (!allRequired && items['1188'].isRequired ? 'required' : '') + '">ISSN \uBC88\uD638</label>');
                t.push('\t\t<div class="span per30"><input type="text"  value="' + d.issn + '" class="text" name="' + loopName + '[' + index + '].issn"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="ISSN\uC744 \uC785\uB825\uD558\uC138\uC694." maxlength="16" ' + (items['1188'].isRequired ? 'required' : '') + '/></div>');
            }
            if (items['1189']) {
                t.push('\t\t<label class="span title ' + (!allRequired && items['1074'] ? 'per20 devider' : 'per15') + ' ' + (!allRequired && items['1189'].isRequired ? 'required' : '') + '">\uD53C\uC778\uC6A9\uC9C0\uC218</label>');
                t.push('\t\t<div class="span per35"><input type="text"  value="' + d.impactFactor + '" class="text" name="' + loopName + '[' + index + '].impactFactor"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uD53C\uC778\uC6A9\uC9C0\uC218\uB97C \uC785\uB825\uD558\uC138\uC694." maxlength="128" ' + (items['1189'].isRequired ? 'required' : '') + '/></div>');
            }
            t.push('		</div>');
        }

        //1075
        if (items['1075']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1075'].isRequired ? 'required' : '') + '">\uBE44\uACE0</label>');
            t.push('\t\t\t<div class="span per85"><input type="text" value="' + d.comment + '"  name="' + loopName + '[' + index + '].comment" class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' maxlength="20000" placeholder="\uCD94\uAC00\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1075'].isRequired ? 'required' : '') + ' /></div>');
            t.push('		</div>');
        }

        if (items['1076']) {
            t.push('		<div class="row in-span half-margin file">');
            t.push('\t\t\t<label class="span per50 title ellipsis ' + (!allRequired && items['1076'].isRequired ? 'required' : '') + '">\uB17C\uBB38\uCCA8\uBD80</label>');
            t.push('\t\t\t<div class="span per50 middle-set span-file" data-type="' + loopName + '" data-required="' + items['1076'].isRequired + '" style="text-align:right">');
            t.push('                <div class="formFileBtnSet">');
            if (d.fileUid) {
                file = {};
                file.fileUid = d.fileUid;
                file.fileName = d.fileName;
                file.name = loopName + '[' + index + '].fileUid';
                t.push(WriteResumeTemplate.attachFile(file, 80, 20));
            } else {
                t.push(WriteResumeTemplate.detachFile(loopName, items['1076'].isRequired));
            }
            t.push('                </div>');
            t.push('            </div>');
            t.push('	    </div>');
        }
        if (paperData.guideContents) {
            t.push('	<div class="wrapGuide row">');
            t.push('\t\t<div class="guide hasTitle paper">' + paperData.guideContents + '</div>');
            t.push('	</div>');
        }
        t.push('		</div>');
        t.push('	</div>');

        return t.join('');
    },

    '148': function _(d) {
        // 학술논문 발표
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            presentData = void 0,
            allRequired = void 0,
            obj = void 0;

        loopName = 'researchPresent'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);
        presentData = items['148']; // items를 구하기 위해 fullData를 불러옴
        allRequired = WriteResumeUtil.isAllRequired(presentData.items); // 전체 필수인지 체크

        t.push('<div class="subject no-padding" data-wrap="present" data-code="148" data-type="researchPresent" data-numOfRow="' + (d.research && d.research.existYn ? d.research.researchPresent.length : 0) + '">');
        t.push('\t<h2 class="h2 ' + (allRequired && presentData.isRequired ? 'required' : '') + '">\uD559\uC220\uB17C\uBB38 \uBC1C\uD45C \uC2E4\uC801\uC774 \uC788\uC2B5\uB2C8\uAE4C?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" ' + (d.research && D.bool(d.research.existYn) === true ? 'checked' : '') + ' value="true" required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" ' + (d.research && D.bool(d.research.existYn) === false ? 'checked' : '') + ' value="false" required/><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');

        if (d.research && d.research.existYn) for (i = 0; i < d.research.researchPresent.length; i++) {
            t.push(WriteResumeTemplate.present(d.research.researchPresent[i], i));
        }t.push('</div>');

        return t.join('');
    },
    present: function present(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            presentData = void 0,
            allRequired = void 0,
            selected = void 0,
            disabled = void 0,
            obj = void 0,
            file = void 0;

        loopName = 'researchPresent'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);

        presentData = items['148']; // items를 구하기 위해 fullData를 불러옴
        // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(presentData.items); // items를 array에서 object로 변경
        allRequired = WriteResumeUtil.isAllRequired(presentData.items); // 전체 필수인지 체크

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업

        d = d || {
            researchPresentSn: '',
            existYn: '',
            presentKindCode: '',
            organization: '',
            conference: '',
            title: '',
            role: '',
            ranking: '',
            headcount: '',
            presentDate: '',
            presentPlace: '',
            presenter: '',
            comment: ''
        };

        t.push('\t<div class="row in-span loop" data-loop="' + loopName + '">');
        t.push('		<div class="span per10 btn">');
        t.push('			<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('		<div class="span per90 middle-set">');
        t.push('			<div class="row in-span no-margin">');
        t.push('\t\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].researchPresentSn" value="' + d.researchPresentSn + '"/>');
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1077'].isRequired ? 'required' : '') + '">\uBC1C\uD45C\uAD6C\uBD84</label>');
        t.push('\t\t\t\t<div class="span per85 radio" data-rel-id="' + loopName + '[' + index + ']">');
        t.push('\t\t\t\t\t<label class="hidden"><input type="radio" value="" name="' + loopName + '[' + index + '].presentKindCode" /></label>');
        for (i = 0; i < items['1077'].kindCodeList.length; i++) {
            t.push('\t\t\t\t<label><input type="radio"  name="' + loopName + '[' + index + '].presentKindCode"  value="' + items['1077'].kindCodeList[i].code + '" ' + (d.presentKindCode === items['1077'].kindCodeList[i].code ? 'checked' : '') + ' ' + (items['1077'].isRequired ? 'required' : '') + '/><span class="label">' + items['1077'].kindCodeList[i].name + '</span></label>');
        }
        t.push('				</div>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        //1079
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1079'].isRequired ? 'required' : '') + '">\uB300\uD68C\uBA85</label>');
        t.push('\t\t\t\t<div class="span per85"><input type="text" ' + (items['1079'].isRequired ? 'required' : '') + '  value="' + d.conference + '" name="' + loopName + '[' + index + '].conference"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uD559\uC220\uB300\uD68C \uB610\uB294 \uD68C\uC758\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." maxlength="128" /></div>');
        t.push('			</div>');
        //1078
        t.push('			<div class="row in-span half-margin">');
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1078'].isRequired ? 'required' : '') + '">\uC8FC\uCD5C\uAE30\uAD00</label>');
        t.push('\t\t\t\t<div class="span per85"><input type="text" ' + (items['1078'].isRequired ? 'required' : '') + ' value="' + d.organization + '" name="' + loopName + '[' + index + '].organization"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uC8FC\uCD5C\uAE30\uAD00\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." maxlength="128" /></div>');
        t.push('			</div>');
        //1080
        t.push('			<div class="row in-span half-margin">');
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1080'].isRequired ? 'required' : '') + '">\uBC1C\uD45C\uC81C\uBAA9</label>');
        t.push('\t\t\t\t<div class="span per85"><input type="text" ' + (items['1080'].isRequired ? 'required' : '') + ' value="' + d.title + '" name="' + loopName + '[' + index + '].title"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uBC1C\uD45C\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694." maxlength="256" /></div>');
        t.push('			</div>');
        //1084
        if (items['1084'] || items['1082']) {
            t.push('		<div class="row in-span half-margin">');
            if (items['1084']) {
                t.push('\t\t<label class="span per15 title ' + (!allRequired && items['1084'].isRequired ? 'required' : '') + '">\uBC1C\uD45C\uC7A5\uC18C</label>');
                t.push('\t\t<div class="span per50"><input type="text" ' + (items['1084'].isRequired ? 'required' : '') + ' value="' + d.presentPlace + '" name="' + loopName + '[' + index + '].presentPlace"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uBC1C\uD45C\uC7A5\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694." maxlength="128" /></div>');
            }
            //1082
            if (items['1082']) {
                t.push('\t\t<label class="span title ' + (!allRequired && items['1084'] && items['1082'] ? 'per20 devider' : 'per15') + ' ' + (!allRequired && items['1082'].isRequired ? 'required' : '') + '">\uBC1C\uD45C\uC77C\uC790</label>');
                t.push('\t\t<label class="span per15"><input type="text" ' + (items['1082'].isRequired ? 'required' : '') + '   data-dates="' + loopName + '[' + index + '].presentDate:YMD" value="' + D.date(d.presentDate) + '" name="' + loopName + '[' + index + '].presentDate"  class="text date" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="" /></label>');
            }
            t.push('		</div>');
        }

        t.push('			<div class="row in-span half-margin">');
        //1083
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1083'].isRequired ? 'required' : '') + '">\uC800\uC790\uC21C\uC704</label>');
        t.push('				<div class="span per30">');
        t.push('\t\t\t\t\t<input type="number" min="0" max="32768"  ' + (items['1083'].isRequired ? 'required' : '') + ' min="0" max="32768" value="' + d.ranking + '" name="' + loopName + '[' + index + '].ranking"  class="text" size="8" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uC800\uC790\uC21C\uC704" /> / ');
        t.push('\t\t\t\t\t<input type="number" min="0" max="32768"  ' + (items['1083'].isRequired ? 'required' : '') + ' min="0" max="32768" value="' + d.headcount + '" name="' + loopName + '[' + index + '].headcount"  class="text" size="10" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uC5F0\uAD6C \uCC38\uC5EC\uC790\uC218" />');
        t.push('				</div>');
        //1081
        t.push('\t\t\t\t<label class="span per15 title devider ' + (!allRequired && items['1081'].isRequired ? 'required' : '') + '">\uC5ED\uD560</label>');
        t.push('\t\t\t\t<label class="span per30 select"><select ' + (items['1081'].isRequired ? 'required' : '') + '   name="' + loopName + '[' + index + '].role"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '>');
        t.push('					<option value="">참여역할을 선택하세요.</option>');
        for (i = 0; i < items['1081'].roleCodeList.length; i++) {
            selected = '';
            if (d.role === items['1081'].roleCodeList[i].code) selected = 'selected';
            t.push('\t\t\t\t<option value="' + items['1081'].roleCodeList[i].code + '" ' + selected + '>' + items['1081'].roleCodeList[i].name + '</option>');
        }
        t.push('				</select></label>');
        t.push('			</div>');

        //1085
        if (items['1085']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1085'].isRequired ? 'required' : '') + '">\uBC1C\uD45C\uC790</label>');
            t.push('\t\t\t<div class="span per85"><input type="text" ' + (items['1085'].isRequired ? 'required' : '') + '   value="' + d.presenter + '" name="' + loopName + '[' + index + '].presenter"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uBC1C\uD45C\uC790\uBA85\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694. (\uC27C\uD45C\uB85C \uAD6C\uBD84)" maxlength="128" /></div>');
            t.push('		</div>');
        }

        if (items['1086']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1086'].isRequired ? 'required' : '') + '">\uBE44\uACE0</label>');
            t.push('\t\t\t<div class="span per85"><input type="text" ' + (items['1086'].isRequired ? 'required' : '') + '   value="' + d.comment + '" name="' + loopName + '[' + index + '].comment"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' maxlength="20000" placeholder="\uCD94\uAC00\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694." /></div>');
            t.push('		</div>');
        }

        if (items['1087']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per50 title ellipsis ' + (!allRequired && items['1087'].isRequired ? 'required' : '') + '">\uD30C\uC77C\uCCA8\uBD80</label>');
            t.push('\t\t\t<div class="span per50 middle-set span-file" data-type="' + loopName + '" data-required="' + items['1087'].isRequired + '" style="text-align:right">');
            t.push('			    <div class="formFileBtnSet">');

            if (d.fileUid) {
                file = {};
                file.fileUid = d.fileUid;
                file.fileName = d.fileName;
                file.name = loopName + '[' + index + '].fileUid';
                t.push(WriteResumeTemplate.attachFile(file, 80, 20));
            } else {
                t.push(WriteResumeTemplate.detachFile(loopName, items['1087'].isRequired));
            }
            t.push('				</div>');

            t.push('			</div>');
            t.push('		</div>');
        }

        if (presentData.guideContents) {
            t.push('	<div class="wrapGuide row">');
            t.push('\t\t<div class="guide hasTitle present">' + presentData.guideContents + '</div>');
            t.push('	</div>');
        }
        t.push('		</div>');
        t.push('	</div>');

        return t.join('');
    },

    '149': function _(d) {
        // 지식재산권
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            iprData = void 0,
            allRequired = void 0,
            obj = void 0;

        loopName = 'researchIPR'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);
        iprData = items['149']; // items를 구하기 위해 fullData를 불러옴
        allRequired = WriteResumeUtil.isAllRequired(iprData.items); // 전체 필수인지 체크

        t.push('<div class="subject no-padding" data-wrap="ipr" data-code="149" data-type="researchIPR" data-numOfRow="' + (d.research && d.research.existYn ? d.research.researchIPR.length : 0) + '">');
        t.push('\t<h2 class="h2 ' + (allRequired && iprData.isRequired ? 'required' : '') + '">\uC9C0\uC2DD\uC7AC\uC0B0\uAD8C \uCD9C\uC6D0 \uB610\uB294 \uB4F1\uB85D \uC2E4\uC801\uC774 \uC788\uC2B5\uB2C8\uAE4C?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="true" ' + (d.research && D.bool(d.research.existYn) === true ? 'checked' : '') + '  required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (d.research && D.bool(d.research.existYn) === false ? 'checked' : '') + '  required/><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');

        if (d.research && d.research.existYn) for (i = 0; i < d.research.researchIPR.length; i++) {
            t.push(WriteResumeTemplate.ipr(d.research.researchIPR[i], i));
        }t.push('</div>');

        return t.join('');
    },
    ipr: function ipr(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            iprData = void 0,
            allRequired = void 0,
            selected = void 0,
            disabled = void 0,
            obj = void 0,
            file = void 0;

        loopName = 'researchIPR'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);

        iprData = items['149'];
        // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(iprData.items); // items를 array에서 object로 변경
        allRequired = WriteResumeUtil.isAllRequired(iprData.items); // 전체 필수인지 체크

        d = d || {
            researchIprSn: '',
            iprKindCode: '',
            iprStatusCode: '',
            iprName: '',
            registNumber: '',
            countryCode: '',
            iprRoleCode: '',
            ranking: '',
            headcount: '',
            registDate: '',
            comment: ''
        };

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업
        t.push('<div class="row in-span loop" data-loop="' + loopName + '">');
        t.push('	<div class="span per10 btn">');
        t.push('		<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per90 middle-set">');
        t.push('		<div class="row in-span no-margin">');
        t.push('\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].researchIprSn" value="' + d.researchIprSn + '"/>');
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1089'].isRequired ? 'required' : '') + '">\uC0C1\uD0DC\uAD6C\uBD84</label>');
        t.push('\t\t\t\t<div class="span per20 radio" value="' + d.iprStatusCode + '">');
        t.push('\t\t\t\t\t<label class="hidden"><input type="radio" value="" name="' + loopName + '[' + index + '].iprStatusCode" /></label>');
        for (i = 0; i < items['1089'].statusCodeList.length; i++) {
            t.push('\t\t\t\t<label><input type="radio" name="' + loopName + '[' + index + '].iprStatusCode" data-rel-id="' + loopName + '[' + index + ']"  value="' + items['1089'].statusCodeList[i].code + '" ' + (d.iprStatusCode === items['1089'].statusCodeList[i].code ? 'checked' : '') + ' ' + (items['1089'].isRequired ? 'required' : '') + '/><span class="label">' + items['1089'].statusCodeList[i].name + '</span></label>');
        }
        t.push('				</div>');

        t.push('\t\t\t<label class="span per15 title devider ' + (!allRequired && items['1088'].isRequired ? 'required' : '') + '">\uBD84\uB958\uAD6C\uBD84</label>');
        t.push('\t\t\t<label class="span per50 select"><select name="' + loopName + '[' + index + '].iprKindCode" data-rel-target="' + loopName + '[' + index + ']"  id="" ' + disabled + ' ' + (items['1088'].isRequired ? 'required' : '') + '>');
        t.push('				<option value="">분류구분을 선택하세요.</option>');
        for (i = 0; i < items['1088'].kindCodeList.length; i++) {
            selected = '';
            if (d.iprKindCode === items['1088'].kindCodeList[i].code) selected = 'selected';
            t.push('\t\t\t<option value="' + items['1088'].kindCodeList[i].code + '" ' + selected + '>' + items['1088'].kindCodeList[i].name + '</option>');
        }
        t.push('				</select>');
        t.push('			</label>');
        t.push('		</div>');
        //1090
        t.push('		<div class="row in-span half-margin">');
        t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1090'].isRequired ? 'required' : '') + '">\uBA85\uCE6D</label>');
        t.push('\t\t\t<div class="span per85"><input type="text" value="' + d.iprName + '"  name="' + loopName + '[' + index + '].iprName" class="text" placeholder="\uC9C0\uC2DD\uC7AC\uC0B0\uAD8C \uBA85\uCE6D\uC744 \uC785\uB825\uD558\uC138\uC694." data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1090'].isRequired ? 'required' : '') + ' maxlength="256" /></div>');
        t.push('		</div>');
        t.push('		<div class="row in-span half-margin">');
        //1092
        t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1092'].isRequired ? 'required' : '') + '">\uCD9C\uC6D0\uAD6D\uAC00</label>');
        t.push('\t\t\t<label class="span per85 select"><select  name="' + loopName + '[' + index + '].countryCode" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1092'].isRequired ? 'required' : '') + '>');
        t.push('				<option value="">출원국가를 선택하세요.</option>');
        for (i = 0; i < items['1092'].countryCodeList.length; i++) {
            selected = '';
            if (d.countryCode === items['1092'].countryCodeList[i].countryCode || !d.countryCode && items['1092'].countryCodeList[i].countryCode === 'KR') selected = 'selected';
            t.push('\t\t\t\t<option value="' + items['1092'].countryCodeList[i].countryCode + '" ' + selected + '>' + items['1092'].countryCodeList[i].countryName + '</option>');
        }
        t.push('				</select>');
        t.push('			</label>');

        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        //1091
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1091'].isRequired ? 'required' : '') + '"maxlength="64" >\uCD9C\uC6D0\uBC88\uD638</label>');
        t.push('\t\t\t\t<div class="span per55"><input type="text" value="' + d.registNumber + '"  name="' + loopName + '[' + index + '].registNumber" class="text" placeholder="\uC9C0\uC2DD\uC7AC\uC0B0\uAD8C \uCD9C\uC6D0/\uB4F1\uB85D\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694." maxlength="64" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1091'].isRequired ? 'required' : '') + '/></div>');
        //1094
        t.push('\t\t\t\t<label class="span per15 title devider ' + (!allRequired && items['1094'].isRequired ? 'required' : '') + '">\uB4F1\uB85D\uC77C</label>');
        t.push('\t\t\t\t<label class="span per15"><input type="text" data-dates="' + loopName + '[' + index + '].registDate:YMD" value="' + D.date(d.registDate) + '"  name="' + loopName + '[' + index + '].registDate" class="text date" placeholder=""  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1094'].isRequired ? 'required' : '') + '/></label>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        //1095
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1095'].isRequired ? 'required' : '') + '">\uBC1C\uBA85\uC790\uC21C\uC704</label>');
        t.push('				<div class="span per30">');
        t.push('\t\t\t\t\t<input type="number" min="0" max="32768" value="' + d.ranking + '"  name="' + loopName + '[' + index + '].ranking" class="text" size="8" placeholder="\uC21C\uC704"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1095'].isRequired ? 'required' : '') + '/> / ');
        t.push('\t\t\t\t\t<input type="number" min="0" max="32768" value="' + d.headcount + '"  name="' + loopName + '[' + index + '].headcount" class="text" size="10" placeholder="\uBC1C\uBA85 \uCC38\uC5EC\uC790\uC218" max="9999" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '  ' + (items['1095'].isRequired ? 'required' : '') + '/>');
        t.push('				</div>');
        //1093
        t.push('\t\t\t\t<label class="span per15 title devider ' + (!allRequired && items['1093'].isRequired ? 'required' : '') + '">\uC5ED\uD560</label>');
        t.push('\t\t\t\t<label class="span per30 select"><select name="' + loopName + '[' + index + '].iprRoleCode" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1093'].isRequired ? 'required' : '') + '>');
        t.push('					<option value="">참여역할을 선택하세요.</option>');
        for (i = 0; i < items['1093'].roleCodeList.length; i++) {
            t.push('\t\t\t\t<option value="' + items['1093'].roleCodeList[i].code + '" ' + (d.iprRoleCode === items['1093'].roleCodeList[i].code ? 'selected' : '') + '>' + items['1093'].roleCodeList[i].name + '</option>');
        }
        t.push('				</select></label>');
        t.push('			</div>');
        if (items['1096']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1096'].isRequired ? 'required' : '') + '">\uBE44\uACE0</label>');
            t.push('\t\t\t<div class="span per85"><input type="text" value="' + d.comment + '"  name="' + loopName + '[' + index + '].comment" class="text" maxlength="20000" placeholder="\uCD94\uAC00\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694." data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '  ' + (items['1096'].isRequired ? 'required' : '') + '/></div>');
            t.push('		</div>');
        }

        if (items['1097']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per50 title ellipsis ' + (!allRequired && items['1097'].isRequired ? 'required' : '') + '">\uD30C\uC77C\uCCA8\uBD80</label>');
            t.push('\t\t\t<div class="span per50 middle-set span-file" data-type="' + loopName + '" data-required="' + items['1097'].isRequired + '" style="text-align:right">');
            t.push('                <div class="formFileBtnSet">');
            if (d.fileUid) {
                file = {};
                file.fileUid = d.fileUid;
                file.fileName = d.fileName;
                file.name = loopName + '[' + index + '].fileUid';

                t.push(WriteResumeTemplate.attachFile(file, 80, 20));
            } else {
                t.push(WriteResumeTemplate.detachFile(loopName, items['1097'].isRequired));
            }
            t.push('			    </div>');
            t.push('			</div>');
            t.push('		</div>');
        }
        if (iprData.guideContents) {
            t.push('	<div class="wrapGuide row">');
            t.push('\t\t\t<div class="guide hasTitle ipr">' + iprData.guideContents + '</div>');
            t.push('	</div>');
        }
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '150': function _(d) {
        // 연구과제참여실적
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            involveData = void 0,
            allRequired = void 0,
            obj = void 0;

        loopName = 'researchInvolve'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);
        involveData = items['150']; // items를 구하기 위해 fullData를 불러옴
        allRequired = WriteResumeUtil.isAllRequired(involveData.items); // 전체 필수인지 체크

        t.push('<div class="subject no-padding" data-wrap="involve" data-code="150" data-type="researchInvolve" data-numOfRow="' + (d.research && d.research.existYn ? d.research.researchInvolve.length : 0) + '">');
        t.push('\t<h2 class="h2 ' + (allRequired && involveData.isRequired ? 'required' : '') + '">\uC5F0\uAD6C\uACFC\uC81C \uCC38\uC5EC\uC2E4\uC801\uC774 \uC788\uC2B5\uB2C8\uAE4C?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="true" ' + (d.research && D.bool(d.research.existYn) === true ? 'checked' : '') + '  required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (d.research && D.bool(d.research.existYn) === false ? 'checked' : '') + '  required /><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');

        if (d.research && d.research.existYn) for (i = 0; i < d.research.researchInvolve.length; i++) {
            t.push(WriteResumeTemplate.involve(d.research.researchInvolve[i], i));
        }t.push('</div>');

        return t.join('');
    },
    involve: function involve(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            involveData = void 0,
            allRequired = void 0,
            disabled = void 0,
            obj = void 0,
            file = void 0;

        loopName = 'researchInvolve'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);

        involveData = items['150']; // items를 구하기 위해 fullData를 불러옴
        // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(involveData.items); // items를 array에서 object로 변경
        allRequired = WriteResumeUtil.isAllRequired(involveData.items); // 전체 필수인지 체크

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업
        d = d || {
            researchInvolveSn: '',
            title: '',
            organization: '',
            amt: '',
            director: '',
            role: '',
            ratio: '',
            headcount: '',
            startDate: '',
            endDate: '',
            comment: ''
        };

        t.push('\t<div class="row in-span loop" data-loop="' + loopName + '">');
        t.push('		<div class="span per10 btn">');
        t.push('			<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('		<div class="span per90 middle-set">');
        t.push('			<div class="row in-span no-margin">');
        t.push('\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].researchInvolveSn" value="' + d.researchInvolveSn + '"/>');
        //1098
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1098'].isRequired ? 'required' : '') + '">\uACFC\uC81C\uBA85</label>');
        t.push('\t\t\t\t<div class="span per85"><input type="text" maxlength="256" value="' + d.title + '"  name="' + loopName + '[' + index + '].title"  class="text" data-rel-id="' + loopName + '[' + index + ']"  placeholder="\uC5F0\uAD6C\uACFC\uC81C\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694."  ' + (items['1098'].isRequired ? 'required' : '') + ' max-length="256" /></div>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        //1099
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1099'].isRequired ? 'required' : '') + '">\uBC1C\uC8FC\uAE30\uAD00\uBA85</label>');
        t.push('\t\t\t\t<div class="span per85"><input type="text" value="' + d.organization + '"  name="' + loopName + '[' + index + '].organization"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uACFC\uC81C \uBC1C\uC8FC\uAE30\uAD00 \uBA85\uCE6D\uC744 \uC120\uD0DD\uD558\uC138\uC694." maxlength="64" ' + (items['1099'].isRequired ? 'required' : '') + ' /></div>');
        t.push('			</div>');
        //1101
        if (items['1101'] || items['1102']) {
            t.push('		<div class="row in-span half-margin">');
            if (items['1101']) {
                t.push('\t\t<label class="span per15 title ' + (!allRequired && items['1101'].isRequired ? 'required' : '') + '">\uACFC\uC81C\uCC45\uC784\uC790</label>');
                t.push('\t\t<div class="span per50"><input type="text" value="' + d.director + '"  name="' + loopName + '[' + index + '].director"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uACFC\uC81C\uCC45\uC784\uC790\uB97C \uC785\uB825\uD558\uC138\uC694." maxlength="32" ' + (items['1101'].isRequired ? 'required' : '') + ' /></div>');
            }
            if (items['1102']) {
                t.push('\t\t<label class="span title ' + (items['1101'] ? 'per15 devider' : 'per10') + ' ' + (!allRequired && items['1102'].isRequired ? 'required' : '') + '">\uC9C0\uC6D0\uAE08\uC561</label>'); //1102
                t.push('\t\t<label class="span per20 label money"><input type="text" value="' + d.amt + '"  name="' + loopName + '[' + index + '].amt"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" placeholder="" ' + (items['1102'].isRequired ? 'required' : '') + ' /></label>');
            }
            t.push('		</div>');
        }

        if (items['1103']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1103'].isRequired ? 'required' : '') + '">\uC5ED\uD560</label>'); //1103
            t.push('\t\t\t<div class="span per85"><input type="text" value="' + d.role + '"  name="' + loopName + '[' + index + '].role"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" placeholder="\uCC38\uC5EC\uC5ED\uD560\uC744 \uC785\uB825\uD558\uC138\uC694." maxlength="128" ' + (items['1103'].isRequired ? 'required' : '') + ' /></div>');
            t.push('		</div>');
        }

        if (items['1105'] || items['1104']) {
            t.push('		<div class="row in-span half-margin">');
            if (items['1105']) {
                t.push('\t\t<label class="span per15 title ' + (!allRequired && items['1105'].isRequired ? 'required' : '') + '">\uCC38\uC5EC\uC778\uB825\uC218</label>'); //1105
                t.push('\t\t<label class="span per15 label people total"><input type="number" value="' + d.headcount + '"  name="' + loopName + '[' + index + '].headcount"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" ' + (items['1105'].isRequired ? 'required' : '') + ' /></label>');
            }
            if (items['1104']) {
                t.push('\t\t<label class="span title ' + (items['1105'] ? 'per15 devider' : 'per10') + ' ' + (!allRequired && items['1104'].isRequired ? 'required' : '') + '">\uCC38\uC5EC\uBE44\uC728</label>'); //1104
                t.push('\t\t<label class="span per15 label percent"><input type="number" value="' + d.ratio + '"  name="' + loopName + '[' + index + '].ratio"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" ' + (items['1104'].isRequired ? 'required' : '') + ' /></label>');
            }
            t.push('		</div>');
        }
        //1100

        t.push('			<div class="row in-span half-margin">');
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1100'].isRequired ? 'required' : '') + '">\uC5F0\uAD6C\uAE30\uAC04</label>');
        t.push('				<label class="span per35 date">');
        t.push('\t\t\t\t\t<input type="text" data-dates="' + loopName + '[' + index + '].involveDate:YMD" value="' + D.date(d.startDate) + '"  name="' + loopName + '[' + index + '].startDate"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text date start" ' + (items['1100'].isRequired ? 'required' : '') + ' />');
        t.push('\t\t\t\t\t<input type="text" data-dates="' + loopName + '[' + index + '].involveDate:END" value="' + D.date(d.endDate) + '"  name="' + loopName + '[' + index + '].endDate"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text date end"  ' + (items['1100'].isRequired ? 'required' : '') + '/>');
        t.push('				</label>');
        t.push('			</div>');
        //1106
        if (items['1106']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1106'].isRequired ? 'required' : '') + '">\uBE44\uACE0</label>');
            t.push('\t\t\t<div class="span per85"><input type="text" value="' + d.comment + '"  name="' + loopName + '[' + index + '].comment"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" maxlength="20000" placeholder="\uCD94\uAC00\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694."  ' + (items['1106'].isRequired ? 'required' : '') + '/></div>');
            t.push('		</div>');
        }

        if (items['1107']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per50 title ellipsis ' + (!allRequired && items['1107'].isRequired ? 'required' : '') + '">\uD30C\uC77C\uCCA8\uBD80</label>');
            t.push('\t\t\t<div class="span per50 middle-set span-file" data-type="' + loopName + '" data-required="' + items['1107'].isRequired + '" style="text-align:right" >');
            t.push('                <div class="formFileBtnSet">');
            if (d.fileUid) {
                file = {};
                file.fileUid = d.fileUid;
                file.fileName = d.fileName;
                file.name = loopName + '[' + index + '].fileUid';

                t.push(WriteResumeTemplate.attachFile(file, 80, 20));
            } else {
                t.push(WriteResumeTemplate.detachFile(loopName, items['1107'].isRequired));
            }
            t.push('			    </div>');
            t.push('			</div>');
            t.push('		</div>');
        }
        if (involveData.guideContents) {
            t.push('		<div class="wrapGuide row">');
            t.push('\t\t\t<div class="guide hasTitle involve">' + involveData.guideContents + '</div>');
            t.push('		</div>');
        }
        t.push('		</div>');
        t.push('	</div>');

        return t.join('');
    },

    '151': function _(d) {
        // 저서 및 기타
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            writingData = void 0,
            allRequired = void 0,
            obj = void 0;

        loopName = 'researchWriting'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);
        writingData = items['151']; // items를 구하기 위해 fullData를 불러옴
        allRequired = WriteResumeUtil.isAllRequired(writingData.items); // 전체 필수인지 체크

        t.push('<div class="subject no-padding" data-wrap="writing" data-code="151" data-type="researchWriting" data-numOfRow="' + (d.research && d.research.existYn ? d.research.researchWriting.length : 0) + '">');
        t.push('\t<h2 class="h2 ' + (allRequired && writingData.isRequired ? 'required' : '') + '">\uC800\uC11C(\uAE30\uD0C0) \uC2E4\uC801\uC774 \uC788\uC2B5\uB2C8\uAE4C?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="true" ' + (d.research && D.bool(d.research.existYn) === true ? 'checked' : '') + '  required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (d.research && D.bool(d.research.existYn) === false ? 'checked' : '') + '  required/><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');
        if (d.research && d.research.existYn) for (i = 0; i < d.research.researchWriting.length; i++) {
            t.push(WriteResumeTemplate.writing(d.research.researchWriting[i], i));
        }t.push('</div>');

        return t.join('');
    },
    writing: function writing(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            writingData = void 0,
            allRequired = void 0,
            disabled = void 0,
            obj = void 0,
            file = void 0;

        loopName = 'researchWriting'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['15'].items);

        writingData = items['151']; // items를 구하기 위해 fullData를 불러옴
        // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(writingData.items); // items를 array에서 object로 변경
        allRequired = WriteResumeUtil.isAllRequired(writingData.items); // 전체 필수인지 체크

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업
        d = d || {
            researchWritingSn: '',
            writingKindCode: '',
            organization: '',
            title: '',
            contents: '',
            writerTypeCode: '',
            ranking: '',
            headcount: '',
            publishDate: '',
            comment: ''
        };

        t.push('<div class="row in-span loop" data-loop="' + loopName + '">');
        t.push('	<div class="span per10 btn">');
        t.push('		<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per90 middle-set">');
        t.push('		<div class="row in-span no-margin">');
        t.push('\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].researchWritingSn" value="' + d.researchWritingSn + '"/>');
        t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1108'].isRequired ? 'required' : '') + '">\uBD84\uB958\uAD6C\uBD84</label>');
        t.push('\t\t\t<label class="span per30 select"><select name="' + loopName + '[' + index + '].writingKindCode"  data-rel-id="' + loopName + '[' + index + ']"  ' + (items['1108'].isRequired ? 'required' : '') + '>');
        t.push('				<option value="">분류구분을 선택하세요.</option>');
        for (i = 0; i < items['1108'].writingKindCodeList.length; i++) {
            t.push('\t\t\t<option value="' + items['1108'].writingKindCodeList[i].code + '" ' + (d.writingKindCode === items['1108'].writingKindCodeList[i].code ? 'selected' : '') + '>' + items['1108'].writingKindCodeList[i].name + '</option>');
        }
        t.push('				</select>');
        t.push('			</label>');

        //1112
        t.push('\t\t\t\t<label class="span per20 title devider ' + (!allRequired && items['1112'].isRequired ? 'required' : '') + '">\uACF5\uB3D9\uC9D1\uD544 \uC5EC\uBD80</label>');
        t.push('				<div class="span per20 radio" >');
        for (i = 0; i < items['1112'].writerTypeCodeList.length; i++) {
            if (items['1112'].writerTypeCodeList[i].code === '100') items['1112'].writerTypeCodeList[i].name = '단독';else if (items['1112'].writerTypeCodeList[i].code === '200') items['1112'].writerTypeCodeList[i].name = '공동';
            t.push('\t\t\t\t<label><input type="radio" name="' + loopName + '[' + index + '].writerTypeCode"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' value="' + items['1112'].writerTypeCodeList[i].code + '" ' + (d.writerTypeCode === items['1112'].writerTypeCodeList[i].code ? 'checked' : '') + ' ' + (items['1112'].isRequired ? 'required' : '') + '/><span class="label">' + items['1112'].writerTypeCodeList[i].name + '</span></label>');
        }
        t.push('				</div>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1110'].isRequired ? 'required' : '') + '">\uC800\uC11C\uBA85</label>'); ///1110
        t.push('\t\t\t\t<div class="span per85"><input type="text" value="' + d.title + '"  name="' + loopName + '[' + index + '].title"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" placeholder="\uC800\uC11C \uBA85\uCE6D\uC744 \uC785\uB825\uD558\uC138\uC694."  ' + (items['1110'].isRequired ? 'required' : '') + ' maxlength="256" /></div>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1109'].isRequired ? 'required' : '') + '">\uBC1C\uD589\uAE30\uAD00</label>'); //1109
        t.push('\t\t\t\t<div class="span per55"><input type="text" value="' + d.organization + '"  name="' + loopName + '[' + index + '].organization"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" maxlength="64" placeholder="\uBC1C\uD589\uAE30\uAD00\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1109'].isRequired ? 'required' : '') + ' /></div>');
        t.push('\t\t\t\t<label class="span per15 title devider ' + (!allRequired && items['1111'].isRequired ? 'required' : '') + '">\uBC1C\uD589\uC77C\uC790</label>'); //1111
        t.push('\t\t\t\t<label class="span per15"><input type="text"  data-dates="' + loopName + '[' + index + '].writingDate:YMD"  value="' + D.date(d.publishDate) + '"  name="' + loopName + '[' + index + '].publishDate"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text date" placeholder="" ' + (items['1111'].isRequired ? 'required' : '') + ' /></label>');
        t.push('			</div>');
        t.push('			<div class="row in-span half-margin">');
        t.push('\t\t\t\t<label class="span per15 title ' + (!allRequired && items['1113'].isRequired ? 'required' : '') + '">\uC800\uC790\uC21C\uC704</label>'); //1113
        t.push('				<div class="span per30">');
        t.push('\t\t\t\t\t<input type="number" min="0" max="32768" value="' + d.ranking + '"  name="' + loopName + '[' + index + '].ranking"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" size="8" placeholder="\uC800\uC790\uC21C\uC704"  ' + (items['1113'].isRequired ? 'required' : '') + '/> / ');
        t.push('\t\t\t\t\t<input type="number" min="0" max="32768" value="' + d.headcount + '"  name="' + loopName + '[' + index + '].headcount"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" size="10" placeholder="\uCC38\uC5EC\uC790\uC218" ' + (items['1113'].isRequired ? 'required' : '') + ' />');
        t.push('				</div>');
        t.push('			</div>');
        if (items['1114']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per15 title ' + (!allRequired && items['1114'].isRequired ? 'required' : '') + '">\uBE44\uACE0</label>');
            t.push('\t\t\t<div class="span per85"><input type="text" value="' + d.comment + '"  name="' + loopName + '[' + index + '].comment" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" maxlength="20000" placeholder="\uCD94\uAC00\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1114'].isRequired ? 'required' : '') + ' /></div>');
            t.push('		</div>');
        }
        if (items['1115']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per50 title ellipsis ' + (!allRequired && items['1115'].isRequired ? 'required' : '') + '">\uD30C\uC77C\uCCA8\uBD80</label>');
            t.push('\t\t\t<div class="span per50 middle-set span-file" data-type="' + loopName + '" data-required="' + items['1115'].isRequired + '" style="text-align:right">');
            t.push('				<div class="formFileBtnSet">');

            if (d.fileUid) {
                file = {};
                file.fileUid = d.fileUid;
                file.fileName = d.fileName;
                file.name = loopName + '[' + index + '].fileUid';
                t.push(WriteResumeTemplate.attachFile(file, 80, 20));
            } else {
                t.push(WriteResumeTemplate.detachFile(loopName, items['1115'].isRequired));
            }
            t.push('			    </div>');
            t.push('			</div>');
            t.push('		</div>');
        }
        if (writingData.guideContents) {
            t.push('		<div class="wrapGuide row">');
            t.push('\t\t\t<div class="guide hasTitle writing">' + writingData.guideContents + '</div>');
            t.push('		</div>');
        }
        t.push('		</div>');
        t.push('	</div>');

        return t.join('');
    },

    '152': function _(data) {
        // 연구실적 추가질문 설정
        return WriteResumeTemplate.additionalQuestion(data, 'researchBuilder'); // 추가사항
    },
    '153': function _(d) {
        // 직장경력사항
        var t = [],
            items = void 0,
            i = void 0,
            carrerData = void 0,
            obj = void 0;

        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['16'].items);
        carrerData = items['153']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject" data-wrap="career" data-code="153" data-type="career">');
        t.push('\t<h2 class="h2 ' + (carrerData.isRequired ? 'required' : '') + '">\uC9C1\uC7A5\uACBD\uB825</h2>');
        if (!d.career.length) t.push(WriteResumeTemplate.career(null));else for (i = 0; i < d.career.length; i++) {
            t.push(WriteResumeTemplate.career(d.career[i], i));
        }t.push('</div>');

        return t.join('');
    },
    career: function career(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            careerData = void 0,
            allRequired = void 0,
            disabled = void 0,
            obj = void 0;

        loopName = 'career'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['16'].items);

        careerData = items['153']; // items를 구하기 위해 fullData를 불러옴
        // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(careerData.items); // items를 array에서 object로 변경
        allRequired = WriteResumeUtil.isAllRequired(careerData.items); // 전체 필수인지 체크

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업

        d = d || {
            annualSales: '',
            assignedTask: '',
            careerCriteriaCodeSn: '',
            comment: '',
            company: '',
            department: '',
            entranceDate: '',
            headcount: '',
            leavingDate: '',
            position: '',
            resumeSn: '',
            retirementReason: '',
            salary: '',
            workingStatusCode: ','
        };

        t.push('<div class="row loop" data-loop="' + loopName + '">');
        if (careerData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle career">' + careerData.guideContents + '</div>');
            t.push('</div>');
        }

        t.push('	<div class="row in-span no-margin" >');
        t.push('		<div class="span per20 btn">');
        t.push('\t\t\t<label class="title ' + (!allRequired && items['1116'].isRequired ? 'required' : '') + '">\uACE0\uC6A9\uD615\uD0DC</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('\t\t<label class="span per25 select"><select name="' + loopName + '[' + index + '].careerCriteriaCodeSn" data-rel-id="' + loopName + '[' + index + ']" ' + (items['1116'].isRequired && careerData.isRequired ? 'required' : '') + '>');
        t.push('			<option value="">고용형태를 선택하세요.</option>');

        for (i = 0; i < items['1116'].careerCriteriaCodeList.length; i++) {
            t.push('\t\t\t\t<option value="' + items['1116'].careerCriteriaCodeList[i].recruitCodeSn + '"  ' + (items['1116'].careerCriteriaCodeList[i].recruitCodeSn === d.careerCriteriaCodeSn ? 'selected' : '') + '>' + items['1116'].careerCriteriaCodeList[i].recruitCodeName + '</option>');
        }
        t.push('		</select></label>');
        t.push('	</div>');

        if (items['1117'] || items['1124']) {
            t.push('<div class="row in-span half-margin">');
            if (items['1117']) {
                t.push('<label class="span per20 title ' + (!allRequired && items['1117'].isRequired ? 'required' : '') + '">\uD68C\uC0AC\uBA85</label>');
                t.push('<div class="span per40"><input type="text" maxlength="128" name="' + loopName + '[' + index + '].company"  value="' + d.company + '"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" placeholder="\uD68C\uC0AC\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1117'].isRequired ? 'required' : '') + ' /></div>');
            }
            if (items['1124']) {
                t.push('<label class="span per20 title devider ' + (!allRequired && items['1124'].isRequired ? 'required' : '') + '">\uC9C1\uC6D0\uC218</label>');
                t.push('<label class="span per20 label people"><input max="32768" min="0" type="number" name="' + loopName + '[' + index + '].headcount"  value="' + d.headcount + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" ' + (items['1124'].isRequired ? 'required' : '') + ' /></label>');
            }
            t.push('</div>');
        }

        t.push('	<div class="row in-span half-margin">');
        t.push('\t\t<label class="span per20 title ' + (!allRequired && items['1118'].isRequired ? 'required' : '') + '">\uADFC\uBB34\uAE30\uAC04</label>');
        t.push('\t\t<div class="span per20 radio" data-rel-id="' + loopName + '[' + index + '].workingStatusCode" data-rel-type="with" data-rel-value="LEAVE">');
        for (i = 0; i < items['1118'].workingStatusCodeList.length; i++) {
            t.push('\t\t<label><input type="radio" ' + (items['1118'].workingStatusCodeList[i].code === d.workingStatusCode ? 'checked' : '') + ' value="' + items['1118'].workingStatusCodeList[i].code + '" name="' + loopName + '[' + index + '].workingStatusCode" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '  ' + (items['1118'].isRequired ? 'required' : '') + '/><span class="label">' + items['1118'].workingStatusCodeList[i].name + '</span></label>');
        }
        t.push('		</div>');
        t.push('		<label class="span per5 devider title"></label>'); //1118
        t.push('		<label class="span per35 date">');
        t.push('\t\t\t<input type="text" data-rel-target="' + loopName + '[' + index + ']" data-dates="' + loopName + '[' + index + '].careerDate:' + Common.dateFormat(careerData['dateInputFormat']).name + ' forbiddenAfterToday" name="' + loopName + '[' + index + '].entranceDate" value="' + D.date(d.entranceDate, Common.dateFormat(careerData['dateInputFormat']).format) + '" ' + disabled + ' class="text date start"  ' + (items['1118'].isRequired ? 'required' : '') + '/>');
        t.push('\t\t\t<input type="text" data-rel-target="' + loopName + '[' + index + '].workingStatusCode" data-dates="' + loopName + '[' + index + '].careerDate:END forbiddenAfterToday"  name="' + loopName + '[' + index + '].leavingDate" ' + disabled + ' value="' + D.date(d.leavingDate, Common.dateFormat(careerData['dateInputFormat']).format) + '" class="text date end"  ' + (items['1118'].isRequired ? 'required' : '') + '/>');
        t.push('		</label>');
        t.push('	</div>');

        if (items['1119'] || items['1120']) {
            t.push('<div class="row in-span half-margin">');
            if (items['1119']) {
                t.push('<label class="span per20 title ' + (!allRequired && items['1119'].isRequired ? 'required' : '') + '">\uBD80\uC11C</label>'); //1119
                t.push('<div class="span per40"><input type="text" maxlength="128" name="' + loopName + '[' + index + '].department" value="' + d.department + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" placeholder="\uBD80\uC11C\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1119'].isRequired ? 'required' : '') + ' /></div>');
            }
            if (items['1120']) {
                t.push('<label class="span title ' + (items['1119'] ? 'devider per20' : 'per20') + ' ' + (!allRequired && items['1120'].isRequired ? 'required' : '') + '">\uC9C1\uAE09</label>'); //1120
                t.push('<div class="span per20"><input type="text" maxlength="64" name="' + loopName + '[' + index + '].position" value="' + d.position + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" ' + (items['1120'].isRequired ? 'required' : '') + ' /></div>');
            }
            t.push('</div>');
        }

        if (items['1121']) {
            t.push('<div class="row in-span half-margin">'); //1121
            t.push('\t<label class="span per20 title ' + (!allRequired && items['1121'].isRequired ? 'required' : '') + '">\uB2F4\uB2F9\uC5C5\uBB34</label>');
            t.push('\t<div class="span per80"><input type="text" maxlength="216" name="' + loopName + '[' + index + '].assignedTask" value="' + d.assignedTask + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" placeholder="\uB2F4\uB2F9\uC5C5\uBB34\uB97C \uC785\uB825\uD558\uC138\uC694."  ' + (items['1121'].isRequired ? 'required' : '') + '/></div>');
            t.push('</div>');
        }

        if (items['1123'] || items['1125']) {
            t.push('<div class="row in-span half-margin">');

            if (items['1123']) {
                t.push('<label class="span per20 title ' + (!allRequired && items['1123'].isRequired ? 'required' : '') + '">\uC5F0\uBD09</label>'); //1123
                t.push('<label class="span per20 label money"><input max="2147483648" type="number" name="' + loopName + '[' + index + '].salary" value="' + d.salary + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '  class="text"  ' + (items['1123'].isRequired ? 'required' : '') + '/></label>');
            }
            if (items['1125']) {
                t.push('<label class="span title ' + (items['1123'] ? 'devider per20' : 'per20') + ' ' + (!allRequired && items['1125'].isRequired ? 'required' : '') + '">\uB9E4\uCD9C\uC561</label>');
                t.push('<label class="span per20 label money million"><input type="number" max="2147483648" name="' + loopName + '[' + index + '].annualSales" value="' + d.annualSales + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '  class="text"  ' + (items['1125'].isRequired ? 'required' : '') + '/></label>');
            }
            t.push('</div>');
        }

        if (items['1122']) {
            t.push('<div class="row in-span half-margin">');
            t.push('\t<label class="span per20 title ' + (!allRequired && items['1122'].isRequired ? 'required' : '') + '">\uD1F4\uC9C1\uC0AC\uC720</label>'); //1122
            t.push('\t<div class="span per80"><input type="text" maxlength="512" name="' + loopName + '[' + index + '].retirementReason" value="' + d.retirementReason + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '  class="text" placeholder="\uD1F4\uC9C1\uC0AC\uC720\uB97C \uC785\uB825\uD558\uC138\uC694."  ' + (items['1122'].isRequired ? 'required' : '') + '/></div>');
            t.push('</div>');
        }

        if (items['1126']) {
            t.push('<div class="row in-span half-margin">');
            //1126
            t.push('\t<label class="span per20 title ' + (!allRequired && items['1126'].isRequired ? 'required' : '') + '">\uBE44\uACE0</label>');
            t.push('\t<div class="span per80"><input type="text" maxlength="20000" name="' + loopName + '[' + index + '].comment" value="' + d.comment + '" data-rel-target="' + loopName + '[' + index + ']" ' + (items['1126'].isRequired ? 'required' : '') + ' ' + disabled + '  class="text" placeholder="\uCD94\uAC00\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694." /></div>');
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },

    '154': function _(d) {
        // 프로젝트
        var t = [],
            items = void 0,
            i = void 0,
            projectData = void 0,
            obj = void 0;

        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['16'].items);

        projectData = items['154']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject" data-wrap="project" data-code="154" data-type="project">');
        t.push('\t<h2 class="h2 ' + (projectData.isRequired ? 'required' : '') + '">\uD504\uB85C\uC81D\uD2B8</h2>');

        if (!d.project.length) t.push(WriteResumeTemplate.project(null));else for (i = 0; i < d.project.length; i++) {
            t.push(WriteResumeTemplate.project(d.project[i], i));
        }t.push('</div>');

        return t.join('');
    },
    project: function project(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            projectData = void 0,
            allRequired = void 0,
            disabled = void 0,
            obj = void 0,
            file = void 0;

        loopName = 'project'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['16'].items);

        projectData = items['154']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(projectData.items); // items를 array에서 object로 변경
        allRequired = WriteResumeUtil.isAllRequired(projectData.items); // 전체 필수인지 체크

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업

        d = d || {
            projectName: '',
            clientName: '',
            workplace: '',
            startDate: '',
            endDate: '',
            contributionRate: '',
            role: '',
            performWork: '',
            comment: ''
        };

        t.push('<div class="row loop" data-loop="' + loopName + '">');
        if (projectData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle project">' + projectData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per20 btn">');
        t.push('\t\t\t<label class="title ' + (!allRequired && items['1127'].isRequired ? 'required' : '') + '">\uD504\uB85C\uC81D\uD2B8\uBA85</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('\t\t<div class="span per80"><input type="text" maxlength="128"  name="' + loopName + '[' + index + '].projectName" data-rel-id="' + loopName + '[' + index + ']" value="' + d.projectName + '" class="text" placeholder="\uD504\uB85C\uC81D\uD2B8\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (projectData.isRequired && items['1127'].isRequired ? 'required' : '') + '/></div>');
        t.push('	</div>');
        t.push('	<div class="row in-span half-margin">');
        t.push('\t\t<label class="span per20 title ' + (!allRequired && items['1128'].isRequired ? 'required' : '') + '">\uBC1C\uC8FC\uCC98</label>');
        t.push('\t\t<div class="span per30"><input type="text" maxlength="128"  name="' + loopName + '[' + index + '].clientName"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' value="' + d.clientName + '" class="text" placeholder="\uBC1C\uC8FC\uCC98\uB97C \uC785\uB825\uD558\uC138\uC694." ' + (items['1128'].isRequired ? 'required' : '') + ' /></div>');
        t.push('\t\t<label class="span per20 title devider ' + (!allRequired && items['1129'].isRequired ? 'required' : '') + '">\uADFC\uBB34\uCC98</label>');
        t.push('\t\t<div class="span per30"><input type="text" maxlength="128" name="' + loopName + '[' + index + '].workplace"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' value="' + d.workplace + '" class="text" placeholder="\uADFC\uBB34\uCC98\uB97C \uC785\uB825\uD558\uC138\uC694." ' + (items['1129'].isRequired ? 'required' : '') + ' /></div>');
        t.push('	</div>');
        t.push('	<div class="row in-span half-margin">');
        t.push('\t\t<label class="span per20 title ' + (!allRequired && items['1130'].isRequired ? 'required' : '') + '" ' + (items['1130'].isRequired ? 'required' : '') + '>\uAE30\uAC04</label>');
        t.push('		<label class="span per35 date">');
        t.push('\t\t\t<input type="text" class="text date start" value="' + D.date(d.startDate) + '" data-dates="' + loopName + '[' + index + '].projectDate:YMD"  name="' + loopName + '[' + index + '].startDate"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1130'].isRequired ? 'required' : '') + '/>');
        t.push('\t\t\t<input type="text" class="text date end" value="' + D.date(d.endDate) + '" data-dates="' + loopName + '[' + index + '].projectDate:END"  name="' + loopName + '[' + index + '].endDate"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1130'].isRequired ? 'required' : '') + '/>');
        t.push('		</label>');
        t.push('	</div>');
        if (items['1131'] || items['1132']) {
            t.push('<div class="row in-span half-margin">');
            if (items['1131']) {
                t.push('<label class="span per20 title ' + (!allRequired && items['1131'].isRequired ? 'required' : '') + '">\uAE30\uC5EC\uB3C4</label>');
                t.push('<label class="span per20 label percent"><input type="number" max="100" step="1" value="' + d.contributionRate + '"   name="' + loopName + '[' + index + '].contributionRate"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" ' + (items['1131'].isRequired ? 'required' : '') + ' /></label>');
            }
            if (items['1132']) {
                t.push('<label class="span per20 title ' + (items['1131'] ? 'devider' : '') + ' ' + (!allRequired && items['1132'].isRequired) + '">\uCC38\uC5EC\uC5ED\uD560</label>');
                t.push('<div class="span per40"><input type="text" maxlength="128" value="' + d.role + '"   name="' + loopName + '[' + index + '].role"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" placeholder="\uCC38\uC5EC\uC5ED\uD560\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1132'].isRequired ? 'required' : '') + '/></div>');
            }
            t.push('</div>');
        }

        if (items['1133']) {
            t.push('<div class="row in-span half-margin">');
            t.push('\t<label class="span per20 title ' + (!allRequired && items['1133'].isRequired ? 'required' : '') + '">\uC8FC\uC694\uC131\uACFC</label>');
            t.push('\t<div class="span per80"><input type="text" maxlength="512" value="' + d.performWork + '"  name="' + loopName + '[' + index + '].performWork"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" placeholder="\uC8FC\uC694\uC131\uACFC\uB97C \uC785\uB825\uD558\uC138\uC694." ' + (items['1133'].isRequired ? 'required' : '') + '/></div>');
            t.push('</div>');
        }
        if (items['1135']) {
            t.push('<div class="row in-span half-margin">');
            t.push('\t<label class="span per20 title ' + (!allRequired && items['1135'].isRequired ? 'required' : '') + '">\uBE44\uACE0</label>');
            t.push('\t<div class="span per80"><input type="text" maxlength="20000" value="' + d.comment + '"  name="' + loopName + '[' + index + '].comment"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' class="text" placeholder="\uCD94\uAC00\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1135'].isRequired ? 'required' : '') + '/></div>');
            t.push('</div>');
        }
        if (items['1134']) {
            t.push('<div class="row in-span half-margin">');
            t.push('\t<label class="span per50 title ellipsis ' + (!allRequired && items['1134'].isRequired ? 'required' : '') + '">\uD30C\uC77C\uCCA8\uBD80</label>');
            t.push('\t<div class="span per50 middle-set span-file" data-required="' + items['1134'].isRequired + '" data-type="' + loopName + '[' + index + ']" data-rel-target="' + loopName + '[' + index + ']" style="text-align:right">');
            t.push('        <div class="formFileBtnSet">');

            if (d.fileUid) {
                file = {};
                file.fileUid = d.fileUid;
                file.fileName = d.fileName;
                file.name = loopName + '[' + index + '].fileUid';

                t.push(WriteResumeTemplate.attachFile(file, 80, 20));
            } else {
                t.push(WriteResumeTemplate.detachFile(loopName, items['1134'].isRequired, loopName + '[' + index + ']'));
            }

            t.push('	    </div>');
            t.push('	</div>');
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },

    '155': function _(data) {
        // 경험 및 경력기술서
        data.builder[0].isRequired = data.isRequired; // 경력기술서는 빌더 필수를 설정하지 않기 때문에 상위 필수여부를 빌더 필수 값에 넣어줘야 한다
        return WriteResumeTemplate.additionalQuestion(data, 'experienceBuilder');
    },
    '156': function _(d) {
        // 포트폴리오첨부
        var t = [],
            loopName = void 0,
            index = void 0,
            obj = void 0,
            items = void 0,
            portfolioData = void 0;

        loopName = 'portfolioFile'; // loop를 대표하는 이름
        index = $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['16'].items);

        portfolioData = items['156']; // items를 구하기 위해 fullData를 불러옴

        // 포트폴리오 파일 이름값 저장
        if (d.portfolioFile.length > 0) {
            d.portfolioFile[0].name = 'portfolioFile[' + index + '].fileUid';
        }

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (portfolioData.isRequired ? 'required' : '') + ' ">\uD3EC\uD2B8\uD3F4\uB9AC\uC624</h2>');

        if (portfolioData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle portfolio">' + portfolioData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin file">');
        t.push('		<label class="span per50 title ellipsis ">파일첨부</label>');
        t.push('\t\t<div class="span per50 middle-set span-file" data-required="' + portfolioData.isRequired + '" data-type="' + loopName + '" style="text-align:right">');
        t.push('			<div class="formFileBtnSet">');
        if (d.portfolioFile[0] && d.portfolioFile[0]['fileUid']) {
            t.push(WriteResumeTemplate.attachFile(d.portfolioFile[0], 80, 20));
        } else {
            t.push(WriteResumeTemplate.detachFile(loopName, portfolioData.isRequired));
        }
        t.push('		    </div>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    '157': function _(d) {
        // 경력기술서첨부
        var t = [],
            obj = void 0,
            items = void 0,
            careerFileData = void 0,
            loopName = 'careerFile';

        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['16'].items);

        careerFileData = items['157']; // items를 구하기 위해 fullData를 불러옴
        if (d.form[0]) {
            d.form[0].name = 'careerFile[0].fileUid';
            d.form[0].type = 'careerFile';
            d.form[0].resumeAttachSn = d.form[0] && d.form[0].resumeAttachSn ? d.form[0].resumeAttachSn : '';
            d.form[0].index = 0;
        }

        t.push('<div class="subject">');
        t.push('\t<h2 class="h2 ' + (careerFileData.isRequired ? 'required' : '') + '">\uACBD\uB825\uAE30\uC220\uC11C \uCCA8\uBD80</h2>');

        if (careerFileData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle careerFile">' + careerFileData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row file in-span no-margin">');
        t.push('		<label class="span per50 title ellipsis">파일첨부</label>');
        t.push('\t\t<div class="span per50 middle-set span-file" data-required="' + careerFileData.isRequired + '" data-resumeAttachSn="' + (d.form[0] && d.form[0].resumeAttachSn ? d.form[0].resumeAttachSn : '') + '" data-type="' + loopName + '" style="text-align:right">');
        if (d.form[0] && d.form[0]['formFileUid']) t.push('<a class="btn btn-add btn-filedown" data-button="downloadForm" type="button" data-formFileUid="' + d.form[0].formFileUid + '">\uC591\uC2DD \uB2E4\uC6B4\uB85C\uB4DC</a>');
        t.push('			<div class="formFileBtnSet">');
        if (d.form[0] && d.form[0]['fileUid']) {
            t.push(WriteResumeTemplate.attachFile(d.form[0], 80, 20));
        } else {
            t.push(WriteResumeTemplate.detachFile(loopName, careerFileData.isRequired));
        }
        t.push('			</div>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    '158': function _(data) {
        //경력사항 추가질문 설정
        return WriteResumeTemplate.additionalQuestion(data, 'careerBuilder'); // 추가사항
    },
    '159': function _(data) {
        // NCS 교육사항 학교교육
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            eduData = void 0,
            obj = void 0;

        loopName = 'ncsAcademyEdu'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);
        eduData = items['159'];

        t.push('<div class="subject no-padding" data-wrap="ncsAcademyEdu" data-code="159" data-type="ncsAcademyEdu">');
        t.push('\t<h2 class="h2 ' + (eduData.isRequired ? 'required' : '') + '">\uC9C0\uC6D0\uD558\uB294 \uC9C1\uBB34\uC640 \uAD00\uB828\uB41C <strong>\uD559\uAD50\uAD50\uC721 \uACFC\uBAA9</strong>\uC744 \uC774\uC218\uD55C \uACBD\uD5D8\uC774 \uC788\uC2B5\uB2C8\uAE4C?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');
        t.push('\t\t<label><input type="radio"  name="' + loopName + '.existYn" value="true" ' + (eduData.ncsItems && D.bool(eduData.ncsItems.existYn) === true ? 'checked' : '') + ' required /><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (eduData.ncsItems && D.bool(eduData.ncsItems.existYn) === false ? 'checked' : '') + '  required /><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');
        if (eduData.ncsItems && eduData.ncsItems.ncsAcademyEdu) for (i = 0; i < eduData.ncsItems.ncsAcademyEdu.length; i++) {
            t.push(WriteResumeTemplate.ncsAcademyEdu(eduData.ncsItems.ncsAcademyEdu[i], i));
        }t.push('</div>');

        return t.join('');
    },
    ncsAcademyEdu: function ncsAcademyEdu(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            j = void 0,
            eduData = void 0,
            allRequired = void 0,
            selected = void 0,
            disabled = void 0,
            obj = void 0,
            relValue = void 0;

        loopName = 'ncsAcademyEdu'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);

        eduData = items['159'];
        items = WriteResumeUtil.objectGenerator(eduData.items);
        allRequired = WriteResumeUtil.isAllRequired(eduData.items); // 전체 필수인지 체크

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업

        d = d || {
            educationActivitySn: '',
            ncsCodeSn: [],
            credits: '',
            startDate: '',
            endDate: '',
            credit: '',
            score: '',
            perfectScore: '',
            contents: ''
        };

        t.push('<div class="row in-span loop" data-loop="' + loopName + '">');
        if (eduData.guideContents) {
            t.push('	<div class="wrapGuide">');
            t.push('\t\t<div class="guide hasTitle ncsEdu">' + eduData.guideContents + '</div>');
            t.push('	</div>');
        }
        t.push('\t<div class="span per10 btn ' + (allRequired ? 'required' : '') + '">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].educationActivitySn" value="' + d.educationActivitySn + '"/>');
        t.push('		<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per90 middle-set">');
        t.push('		<div class="row in-span no-margin">');
        t.push('\t\t\t<label class="span per10 title ' + (!allRequired ? 'required' : '') + '">\uB2A5\uB825\uB2E8\uC704</label>');

        relValue = [];

        for (j = 0; j < obj['17'].ncsCodeList.length; j++) {
            relValue.push(obj['17'].ncsCodeList[j].recruitCodeSn);
        } // linkedForm value값 지정
        relValue = relValue.join(',');
        t.push('	<div class="span per25 dropdown" data-dropdown>');
        t.push('		<button type="button">능력단위를 선택하세요.</button>');
        t.push('\t\t<div class="dropdown-menu" data-rel-id="' + loopName + '[' + index + ']" data-rel-type="with" data-rel-value="' + relValue + '">');

        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('<label class="checkbox ellipsis"><input type="checkbox" name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + '/><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('		</div>');
        t.push('	</div>');
        t.push('\t<div class="span per60"  data-rel-target="' + loopName + '[' + index + ']" >');
        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('<label class="selectedCheckbox"><input type="checkbox" data-name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + ' /><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('	</div>');
        t.push('</div>');

        t.push('<div class="row in-span half-margin">');
        t.push('\t<label class="span per10 title ' + (!allRequired ? 'required' : '') + '">\uACFC\uBAA9\uBA85</label>');
        t.push('\t\t<div class="span ' + (items['1195'] ? 'per35' : 'per90') + '"><input type="text" maxlength="128" name="' + loopName + '[' + index + '].credits" value="' + d.credits + '" class="text" placeholder="\uD559\uAD50\uAD50\uC721 \uACFC\uBAA9\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." required data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' /></div>');
        if (items['1195']) {
            t.push('\t\t<label class="span per15 title devider ' + (!allRequired && items['1195'].isRequired ? 'required' : '') + '">\uC774\uC218\uAE30\uAC04</label>');
            t.push('		<label class="span per35 date">');
            t.push('\t\t\t<input type="text" data-dates="' + loopName + '[' + index + '].ncsAcademEduDate:YMD" name="' + loopName + '[' + index + '].startDate" value="' + D.date(d.startDate) + '" class="text date start" ' + (items['1195'].isRequired ? 'required' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' />');
            t.push('\t\t\t<input type="text" data-dates="' + loopName + '[' + index + '].ncsAcademEduDate:END" name="' + loopName + '[' + index + '].endDate" value="' + D.date(d.endDate) + '" class="text date end" ' + (items['1195'].isRequired ? 'required' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' />');
            t.push('		</label>');
        }
        t.push('		</div>');

        if (items['1196']) {
            t.push('	<div class="row in-span half-margin">');
            t.push('\t\t<label class="span per10 title ' + (!allRequired && items['1196'].isRequired ? 'required' : '') + '">\uC8FC\uC694\uB0B4\uC6A9</label>');
            t.push('\t\t<div class="span per90"><input type="text" maxlength="20000" value="' + d.contents + '" name="' + loopName + '[' + index + '].contents"  class="text" ' + (items['1196'].isRequired ? 'required' : '') + ' placeholder="\uD574\uB2F9\uACFC\uBAA9 \uC8FC\uC694\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694." data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' /></div>');
            t.push('	</div>');
        }

        if (items['1197'] || items['1198']) {
            t.push('	<div class="row in-span half-margin">');
            t.push('\t\t<label class="span per10 title ' + (!allRequired && (items['1197'] && items['1197'].isRequired || items['1198'] && items['1198'].isRequired) ? 'required' : '') + '">\uD559\uC810</label>');
            if (items['1197']) {
                t.push('\t\t<label class="span per20 label credit"><input data-validType="INTEGER" type="number" min="0" max="1000" value="' + d.credit + '"  name="' + loopName + '[' + index + '].credit" ' + (items['1197'].isRequired ? 'required' : '') + ' class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' /></label>');
            }
            if (items['1198']) {
                t.push('\t\t<div class="span per45 ' + (items['1197'] ? 'devider' : '') + ' middle-set">');
                t.push('\t\t\t<input name="' + loopName + '[' + index + '].score" data-rel-id="' + loopName + '[' + index + '].score" value="' + d.score + '" class="text" size="7" placeholder="\uD3C9\uC810" title="\uD3C9\uC810" min="0" max="1000" type="number"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '  data-limit="decimal(5,2)" step="0.01" ' + (items['1198'].isRequired ? 'required' : '') + '><span style="margin:0px 5px;">/</span>');
                t.push('\t\t\t<label class="select"><select  name="' + loopName + '[' + index + '].perfectScore" ' + (items['1198'].isRequired ? 'required' : '') + '  data-rel-target="' + loopName + '[' + index + '].score" ' + disabled + '>');
                t.push('				<option value="">만점기준</option>');
                for (i = 0; i < eduData.perfectGradeCodeList.length; i++) {
                    t.push('\t\t\t\t<option value="' + eduData.perfectGradeCodeList[i].code + '" ' + (Number(eduData.perfectGradeCodeList[i].code) === Number(d.perfectScore) ? 'selected' : '') + '>' + eduData.perfectGradeCodeList[i].name + '</option>');
                }
                t.push('			</select></label>');
                t.push('		</div>');
            }
            t.push('	</div>');
        }
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '160': function _(d) {
        // NCS 교육사항 직업교육
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            jobData = void 0,
            obj = void 0;

        loopName = 'ncsJobEdu'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);

        jobData = items['160'];

        t.push('<div class="subject no-padding" data-wrap="ncsJobEdu" data-code="160" data-type="ncsJobEdu">');
        t.push('	<h2 class="h2">지원하는 직무와 관련된 <strong>직업교육 과정</strong>을 이수한 경험이 있습니까?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');

        t.push('\t\t<label><input type="radio"  name="' + loopName + '.existYn" value="true" ' + (jobData.ncsItems && D.bool(jobData.ncsItems.existYn) === true ? 'checked' : '') + ' required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (jobData.ncsItems && D.bool(jobData.ncsItems.existYn) === false ? 'checked' : '') + '  required/><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');
        if (jobData.ncsItems && jobData.ncsItems.ncsJobEdu) for (i = 0; i < jobData.ncsItems.ncsJobEdu.length; i++) {
            t.push(WriteResumeTemplate.ncsJobEdu(jobData.ncsItems.ncsJobEdu[i], i));
        }t.push('</div>');

        return t.join('');
    },
    ncsJobEdu: function ncsJobEdu(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            jobData = void 0,
            allRequired = void 0,
            selected = void 0,
            disabled = void 0,
            obj = void 0,
            j = void 0,
            relValue = void 0;

        loopName = 'ncsJobEdu'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);

        jobData = items['160'];
        items = WriteResumeUtil.objectGenerator(jobData.items);
        allRequired = WriteResumeUtil.isAllRequired(jobData.items); // 전체 필수인지 체크

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업

        d = d || {
            educationActivitySn: '',
            ncsCodeSn: [],
            credits: '',
            startDate: '',
            endDate: '',
            contents: '',
            organization: '',
            time: ''
        };

        t.push('<div class="row in-span loop" data-loop="' + loopName + '">');
        if (jobData.guideContents) {
            t.push('	<div class="wrapGuide">');
            t.push('\t\t<div class="guide hasTitle ncsJob">' + jobData.guideContents + '</div>');
            t.push('	</div>');
        }
        t.push('\t<div class="span per10 btn ' + (allRequired ? 'required' : '') + '">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].educationActivitySn" value="' + d.educationActivitySn + '"/>');
        t.push('		<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per90 middle-set">');
        t.push('		<div class="row in-span no-margin">');
        t.push('\t\t\t<label class="span per10 title ' + (!allRequired ? 'required' : '') + '">\uB2A5\uB825\uB2E8\uC704</label>');

        relValue = [];

        for (j = 0; j < obj['17'].ncsCodeList.length; j++) {
            relValue.push(obj['17'].ncsCodeList[j].recruitCodeSn);
        } // linkedForm value값 지정
        relValue = relValue.join(',');
        t.push('			<div class="span per25 dropdown" data-dropdown>');
        t.push('				<button type="button">능력단위를 선택하세요.</button>');
        t.push('\t\t\t<div class="dropdown-menu" data-rel-id="' + loopName + '[' + index + ']" data-rel-type="with" data-rel-value="' + relValue + '">');

        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('\t\t\t<label class="checkbox ellipsis"><input type="checkbox" name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + '/><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('			</div>');
        t.push('		</div>');
        t.push('\t\t<div class="span per60"  data-rel-target="' + loopName + '[' + index + ']" >');
        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('\t<label class="selectedCheckbox"><input type="checkbox" data-name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + ' /><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('		</div>');
        t.push('	</div>');

        t.push('	<div class="row in-span half-margin">');
        t.push('\t\t<label class="span per10 title ' + (!allRequired ? 'required' : '') + '">\uACFC\uC815\uBA85</label>');
        t.push('\t\t<div class="span ' + (items['1201'] ? 'per40' : 'per90') + '"><input maxlength="128" type="text" value="' + d.credits + '" name="' + loopName + '[' + index + '].credits"  class="text" placeholder="\uC9C1\uC5C5\uAD50\uC721 \uACFC\uC815\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694."  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' required/></div>');
        if (items['1201']) {
            t.push('\t\t<label class="span per15 title devider ' + (!allRequired && items['1201'].isRequired ? 'required' : '') + '">\uC774\uC218\uAE30\uAC04</label>');
            t.push('		<label class="span per35 date">');
            t.push('\t\t\t<input type="text" value="' + D.date(d.startDate) + '"  data-dates="' + loopName + '[' + index + '].ncsJobEduDate:YMD"   name="' + loopName + '[' + index + '].startDate"  class="text date start" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1201'].isRequired ? 'required' : '') + '/>');
            t.push('\t\t\t<input type="text" value="' + D.date(d.endDate) + '"   data-dates="' + loopName + '[' + index + '].ncsJobEduDate:END"   name="' + loopName + '[' + index + '].endDate"  class="text date end" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1201'].isRequired ? 'required' : '') + '/>');
            t.push('		</label>');
        }
        t.push('		</div>');

        if (items['1202']) {
            t.push('	<div class="row in-span half-margin">');
            t.push('\t\t<label class="span per10 title ' + (!allRequired && items['1202'].isRequired ? 'required' : '') + '">\uC8FC\uC694\uB0B4\uC6A9</label>');
            t.push('\t\t<div class="span per90"><input maxlength="20000" type="text" value="' + d.contents + '"  name="' + loopName + '[' + index + '].contents"  class="text" placeholder="\uD574\uB2F9\uACFC\uC815 \uC8FC\uC694\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694."  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1202'].isRequired ? 'required' : '') + '/></div>');
            t.push('	</div>');
        }

        if (items['1203'] || items['1204']) {
            t.push('		<div class="row in-span half-margin">');
            if (items['1203']) {
                t.push('\t\t<label class="span per10 title ' + (!allRequired && items['1203'].isRequired ? 'required' : '') + '">\uAD50\uC721\uAE30\uAD00</label>');
                t.push('\t\t<label class="span per20"><input type="text" maxlength="64" value="' + d.organization + '" name="' + loopName + '[' + index + '].organization" placeholder="\uAD50\uC721\uAE30\uAD00\uC744 \uC785\uB825\uD558\uC138\uC694." class="text"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1203'].isRequired ? 'required' : '') + '/></label>');
            }
            if (items['1204']) {
                t.push('\t\t<label class="span title ' + (items['1203'] ? 'devider per15' : 'per10') + ' ' + (!allRequired && items['1204'].isRequired ? 'required' : '') + '">\uAD50\uC721\uC2DC\uAC04</label>');
                t.push('\t\t<label class="span per20 label time"><input type="number" min="0" max="999999" value="' + d.time + '"  name="' + loopName + '[' + index + '].time"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1204'].isRequired ? 'required' : '') + '/></label>'); //time은 maxlength 가 4이얌
            }
            t.push('		</div>');
        }
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '161': function _(data) {
        // NCS 직무관련 경력사항
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            carrerData = void 0,
            obj = void 0;

        loopName = 'ncsCareer'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);

        carrerData = items['161']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject no-padding" data-wrap="ncsCareer" data-code="161" data-type="ncsCareer">');
        t.push('	<h2 class="h2">지원하는 직무와 관련된 <strong>경력사항</strong>이 있습니까?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');

        t.push('\t\t<label><input type="radio"  name="' + loopName + '.existYn" value="true" ' + (carrerData.ncsItems && D.bool(carrerData.ncsItems.existYn) === true ? 'checked' : '') + ' required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (carrerData.ncsItems && D.bool(carrerData.ncsItems.existYn) === false ? 'checked' : '') + ' required/><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');
        if (carrerData.ncsItems && carrerData.ncsItems.ncsCareer) for (i = 0; i < carrerData.ncsItems.ncsCareer.length; i++) {
            t.push(WriteResumeTemplate.ncsCareer(carrerData.ncsItems.ncsCareer[i], i));
        }t.push('</div>');

        return t.join('');
    },
    ncsCareer: function ncsCareer(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            careerData = void 0,
            allRequired = void 0,
            selected = void 0,
            disabled = void 0,
            obj = void 0,
            j = void 0,
            relValue = void 0;

        loopName = 'ncsCareer'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);

        careerData = items['161']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(careerData.items);
        allRequired = WriteResumeUtil.isAllRequired(careerData.items); // 전체 필수인지 체크

        d = d || {
            ncsCodeSn: [],
            careerActivitySn: '',
            employmentTypeCode: '',
            company: '',
            startDate: '',
            endDate: '',
            department: '',
            position: '',
            assignedTask: '',
            retirementReason: ''
        };

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업
        t.push('<div class="row in-span loop" data-loop="' + loopName + '">');
        if (careerData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle ncsCareer">' + careerData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('\t<div class="span per10 btn ' + (allRequired ? 'required' : '') + '">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].careerActivitySn" value="' + d.careerActivitySn + '"/>');
        t.push('		<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per90 middle-set">');
        t.push('		<div class="row in-span no-margin">');
        t.push('\t\t\t<label class="span per10 title ' + (!allRequired ? 'required' : '') + '">\uB2A5\uB825\uB2E8\uC704</label>');

        relValue = [];

        for (j = 0; j < obj['17'].ncsCodeList.length; j++) {
            relValue.push(obj['17'].ncsCodeList[j].recruitCodeSn);
        } // linkedForm value값 지정
        relValue = relValue.join(',');
        t.push('			<div class="span per25 dropdown" data-dropdown>');
        t.push('			<button type="button">능력단위를 선택하세요.</button>');
        t.push('\t\t\t<div class="dropdown-menu" data-rel-id="' + loopName + '[' + index + ']" data-rel-type="with" data-rel-value="' + relValue + '">');

        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('\t\t\t<label class="checkbox ellipsis"><input type="checkbox" name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + '/><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('			</div>');
        t.push('		</div>');
        t.push('\t\t<div class="span per60"  data-rel-target="' + loopName + '[' + index + ']" >');
        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('<label class="selectedCheckbox"><input type="checkbox" data-name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + ' /><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('		</div>');
        t.push('	</div>');
        t.push('		<div class="row in-span half-margin">');
        t.push('\t\t\t<label class="span per10 title ' + (!allRequired ? 'required' : '') + '">\uACE0\uC6A9\uD615\uD0DC</label>');
        t.push('\t\t\t<label class="span per25 select"><select name="' + loopName + '[' + index + '].employmentTypeCode"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' required>');
        t.push('				<option value="">고용형태를 선택하세요.</option>');
        for (i = 0; i < careerData.careerCriteriaCodeList.length; i++) {
            t.push('\t\t\t<option value="' + careerData.careerCriteriaCodeList[i].recruitCodeSn + '"  ' + (careerData.careerCriteriaCodeList[i].recruitCodeSn === parseInt(d.employmentTypeCode) ? 'selected' : '') + '>' + careerData.careerCriteriaCodeList[i].recruitCodeName + '</option>');
        }
        t.push('			</select></label>');
        if (items['1207']) {
            t.push('\t\t<label class="span per15 title devider ' + (!allRequired && items['1207'].isRequired ? 'required' : '') + '">\uADFC\uBB34\uAE30\uAC04</label>');
            t.push('		<label class="span per35 date">');
            t.push('\t\t\t<input type="text" data-dates="' + loopName + '[' + index + '].ncsCareerDate:YMD forbiddenAfterToday"  value="' + D.date(d.startDate) + '"  name="' + loopName + '[' + index + '].startDate"  class="text date start"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1207'].isRequired ? 'required' : '') + ' />');
            t.push('\t\t\t<input type="text" data-dates="' + loopName + '[' + index + '].ncsCareerDate:END forbiddenAfterToday"  value="' + D.date(d.endDate) + '"  name="' + loopName + '[' + index + '].endDate"  class="text date end" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1207'].isRequired ? 'required' : '') + ' />');
            t.push('		</label>');
        }
        t.push('		</div>');

        if (items['1208'] || items['1209'] || items['1210']) {
            t.push('		<div class="row in-span half-margin">');
            if (items['1208']) {
                t.push('\t\t<label class="span per10 title ' + (!allRequired && items['1208'].isRequired ? 'required' : '') + '">\uD68C\uC0AC\uBA85</label>');
                t.push('\t\t<div class="span per25"><input maxlength="128" type="text" value="' + d.company + '"  name="' + loopName + '[' + index + '].company"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uD68C\uC0AC\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1208'].isRequired ? 'required' : '') + '/></div>');
            }
            if (items['1209']) {
                t.push('\t\t<label class="span title ' + (!allRequired && items['1209'].isRequired ? 'required' : '') + ' ' + (items['1208'] ? 'per15 devider' : 'per10') + '">\uBD80\uC11C\uBA85</label>');
                t.push('\t\t<div class="span per20"><input maxlength="128" type="text" value="' + d.department + '"  name="' + loopName + '[' + index + '].department"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uBD80\uC11C\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1209'].isRequired ? 'required' : '') + '/></div>');
            }
            if (items['1210']) {
                t.push('\t\t<label class="span title ' + (!allRequired && items['1210'].isRequired ? 'required' : '') + ' ' + (items['1208'] || items['1209'] ? 'devider per15' : 'per10') + '">\uC9C1\uAE09</label>');
                t.push('\t\t<div class="span per15"><input maxlength="64" type="text" value="' + d.position + '"  name="' + loopName + '[' + index + '].position"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1210'].isRequired ? 'required' : '') + '/></div>');
            }
            t.push('		</div>');
        }

        if (items['1211']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per10 title ' + (!allRequired && items['1211'].isRequired ? 'required' : '') + '">\uB2F4\uB2F9\uC5C5\uBB34</label>');
            t.push('\t\t\t<div class="span per90"><input type="text" maxlength="256" value="' + d.assignedTask + '"   name="' + loopName + '[' + index + '].assignedTask"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uB2F4\uB2F9\uC5C5\uBB34 \uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1211'].isRequired ? 'required' : '') + '/></div>');
            t.push('		</div>');
        }
        if (items['1212']) {
            t.push('		<div class="row in-span half-margin">');
            t.push('\t\t\t<label class="span per10 title ' + (!allRequired && items['1212'].isRequired ? 'required' : '') + '">\uD1F4\uC0AC\uC0AC\uC720</label>');
            t.push('\t\t\t<div class="span per90"><input type="text" maxlength="512" value="' + d.retirementReason + '"   name="' + loopName + '[' + index + '].retirementReason"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uD1F4\uC0AC\uC0AC\uC720\uB97C \uC785\uB825\uD558\uC138\uC694." ' + (items['1212'].isRequired ? 'required' : '') + '/></div>');
            t.push('		</div>');
        }
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '162': function _(data) {
        // NCS 직무관련 기타활동
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            activityData = void 0,
            obj = void 0;

        loopName = 'ncsActivity'; // loop를 대표하는 이름
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);

        activityData = items['162']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject no-padding" data-wrap="ncsActivity" data-code="162" data-type="ncsActivity">');
        t.push('	<h2 class="h2">지원하는 직무와 관련된 <strong>경험사항</strong>이 있습니까?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');

        t.push('\t\t<label><input type="radio"  name="' + loopName + '.existYn" value="true" ' + (activityData.ncsItems && D.bool(activityData.ncsItems.existYn) === true ? 'checked' : '') + ' required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (activityData.ncsItems && D.bool(activityData.ncsItems.existYn) === false ? 'checked' : '') + ' required/><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');
        if (activityData.ncsItems && activityData.ncsItems.ncsActivity) for (i = 0; i < activityData.ncsItems.ncsActivity.length; i++) {
            t.push(WriteResumeTemplate.ncsActivity(activityData.ncsItems.ncsActivity[i], i));
        }t.push('</div>');

        return t.join('');
    },
    ncsActivity: function ncsActivity(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            activityData = void 0,
            allRequired = void 0,
            selected = void 0,
            disabled = void 0,
            obj = void 0,
            j = void 0,
            relValue = void 0;

        loopName = 'ncsActivity'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);

        activityData = items['162']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(activityData.items);
        allRequired = WriteResumeUtil.isAllRequired(activityData.items); // 전체 필수인지 체크

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업

        d = d || {
            ncsCodeSn: [],
            activitySn: '',
            activityCategorySn: '',
            organization: '',
            startDate: '',
            endDate: '',
            role: '',
            assignedTask: ''
        };

        t.push('<div class="row in-span loop" data-loop="' + loopName + '">');
        if (activityData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle ncsActivity">' + activityData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('\t<div class="span per10 btn ' + (allRequired ? 'required' : '') + '">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].activitySn" value="' + d.activitySn + '"/>');
        t.push('		<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per90 middle-set">');
        t.push('		<div class="row in-span no-margin">');
        t.push('\t\t\t<label class="span per10 title ' + (!allRequired ? 'required' : '') + '">\uB2A5\uB825\uB2E8\uC704</label>');

        relValue = [];

        for (j = 0; j < obj['17'].ncsCodeList.length; j++) {
            relValue.push(obj['17'].ncsCodeList[j].recruitCodeSn);
        } // linkedForm value값 지정
        relValue = relValue.join(',');
        t.push('		<div class="span per25 dropdown" data-dropdown>');
        t.push('			<button type="button">능력단위를 선택하세요.</button>');
        t.push('\t\t\t<div class="dropdown-menu" data-rel-id="' + loopName + '[' + index + ']" data-rel-type="with" data-rel-value="' + relValue + '">');

        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('\t\t<label class="checkbox ellipsis"><input type="checkbox" name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + '/><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('		</div>');
        t.push('	</div>');
        t.push('\t<div class="span per60"  data-rel-target="' + loopName + '[' + index + ']" >');
        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('<label class="selectedCheckbox"><input type="checkbox" data-name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + ' /><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('	</div>');
        t.push('</div>');

        t.push('<div class="row in-span half-margin">');
        t.push('\t<label class="span per10 title ' + (!allRequired ? 'required' : '') + '">\uD65C\uB3D9\uAD6C\uBD84</label>');
        t.push('\t<label class="span per25 select"><select name="' + loopName + '[' + index + '].activityCategorySn"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' required>');
        t.push('		<option value="">활동구분을 선택하세요.</option>');
        for (i = 0; i < activityData.activityRecruitCodeList.length; i++) {
            t.push('\t\t\t\t<option value="' + activityData.activityRecruitCodeList[i].recruitCodeSn + '" ' + (d.activityCategorySn === activityData.activityRecruitCodeList[i].recruitCodeSn ? 'selected' : '') + '>' + activityData.activityRecruitCodeList[i].recruitCodeName + '</option>');
        }
        t.push('		</select></label>');
        if (items['1215']) {
            t.push('\t\t<label class="span per20 title ' + (!allRequired && items['1215'].isRequired ? 'required' : '') + ' devider">\uAE30\uAD00 \uBC0F \uC870\uC9C1\uBA85</label>');
            t.push('\t\t<div class="span per45"><input type="text" maxlength="64" value="' + d.organization + '" name="' + loopName + '[' + index + '].organization"  class="text"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uAE30\uAD00 \uBC0F \uC870\uC9C1\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1215'].isRequired ? 'required' : '') + '/></div>');
        }
        t.push('</div>');

        if (items['1216'] || items['1217']) {
            t.push('<div class="row in-span half-margin">');
            if (items['1216']) {
                t.push('\t<label class="span per10 title ' + (!allRequired && items['1216'].isRequired ? 'required' : '') + '">\uC5ED\uD560</label>');
                t.push('\t<div class="span per40"><input type="text" maxlength="128" value="' + d.role + '"  name="' + loopName + '[' + index + '].role"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uC9C1\uC704 \uB610\uB294 \uC5ED\uD560\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1216'].isRequired ? 'required' : '') + '/></div>');
            }
            if (items['1217']) {
                t.push('\t<label class="span per15 title ' + (items['1216'] ? 'devider' : '') + ' ' + (!allRequired && items['1217'].isRequired ? 'required' : '') + '">\uD65C\uB3D9\uAE30\uAC04</label>');
                t.push('	<label class="span per35 date">');
                t.push('\t\t<input type="text"  data-dates="' + loopName + '[' + index + '].ncsActivityDate:YMD"  value="' + D.date(d.startDate) + '" name="' + loopName + '[' + index + '].startDate"  class="text date start" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1217'].isRequired ? 'required' : '') + '/>');
                t.push('\t\t<input type="text"  data-dates="' + loopName + '[' + index + '].ncsActivityDate:END"  value="' + D.date(d.endDate) + '" name="' + loopName + '[' + index + '].endDate"  class="text date end" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1217'].isRequired ? 'required' : '') + '/>');
                t.push('	</label>');
            }
            t.push('</div>');
        }

        if (items['1218']) {
            t.push('<div class="row in-span half-margin">');
            t.push('\t<label class="span per10 title ' + (!allRequired && items['1218'].isRequired ? 'required' : '') + '">\uD65C\uB3D9\uB0B4\uC6A9</label>');
            t.push('\t<div class="span per90"><input type="text" maxlength="256" value="' + d.assignedTask + '"  name="' + loopName + '[' + index + '].assignedTask"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uD65C\uB3D9 \uBC0F \uC5C5\uBB34 \uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (items['1218'].isRequired ? 'required' : '') + '/></div>');
            t.push('</div>');
        }
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '163': function _(data) {
        // NCS 직무관련 자격증
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            licenseData = void 0,
            obj = void 0;

        loopName = 'ncsLicense'; // loop를 대표하는 이름

        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);

        licenseData = items['163']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject no-padding" data-wrap="ncsLicense" data-code="163" data-type="ncsLicense">');
        t.push('	<h2 class="h2">지원하는 직무와 관련된 <strong>자격증</strong>이 있습니까?</h2>');
        t.push('	<div class="radio circle" style="text-align:right">');

        t.push('\t\t<label><input type="radio"  name="' + loopName + '.existYn" value="true" ' + (licenseData.ncsItems && D.bool(licenseData.ncsItems.existYn) === true ? 'checked' : '') + ' required/><span class="circle">\uC608</span></label>');
        t.push('\t\t<label><input type="radio" name="' + loopName + '.existYn" value="false" ' + (licenseData.ncsItems && D.bool(licenseData.ncsItems.existYn) === false ? 'checked' : '') + '  required/><span class="circle">\uC544\uB2C8\uC624</span></label>');
        t.push('	</div>');
        if (licenseData.ncsItems && licenseData.ncsItems.ncsLicense) for (i = 0; i < licenseData.ncsItems.ncsLicense.length; i++) {
            t.push(WriteResumeTemplate.ncsLicense(licenseData.ncsItems.ncsLicense[i], i));
        }t.push('</div>');

        return t.join('');
    },
    ncsLicense: function ncsLicense(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            licenseData = void 0,
            licenseList = {},
            allRequired = void 0,
            selected = void 0,
            disabled = void 0,
            obj = void 0,
            j = void 0,
            tmp = void 0,
            relValue = void 0;

        loopName = 'ncsLicense'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        obj = WriteResume.fullDataObject();
        items = WriteResumeUtil.objectGenerator(obj['17'].items);

        licenseData = items['163']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(licenseData.items);
        allRequired = WriteResumeUtil.isAllRequired(licenseData.items); // 전체 필수인지 체크

        for (i = 0; i < licenseData.licenseCodeList.length; i++) {
            tmp = licenseData.licenseCodeList[i];
            licenseList[tmp.licenseCode] = tmp;
        }

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업

        d = d || {
            ncsCodeSn: [],
            licenseActivitySn: '',
            licenseCode: '',
            organization: '',
            registNumber: '',
            acquireDate: '',
            licenseName: '',
            score: '',
            perfectScore: ''
        };

        licenseList[''] = {
            licenseName: '',
            licenseCode: '',
            organization: '',
            registNumber: '',
            acquireDate: ''
        };

        t.push('<div class="row in-span loop" data-loop="' + loopName + '" >');
        if (licenseData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle ncsLicense">' + licenseData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('\t<div class="span per10 btn ' + (allRequired ? 'required' : '') + '">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].licenseActivitySn" value="' + d.licenseActivitySn + '"/>');
        t.push('		<div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per90 middle-set">');
        t.push('		<div class="row in-span no-margin">');

        t.push('\t\t\t<label class="span per10 title ' + (!allRequired ? 'required' : '') + '">\uB2A5\uB825\uB2E8\uC704</label>');

        relValue = [];

        for (j = 0; j < obj['17'].ncsCodeList.length; j++) {
            relValue.push(obj['17'].ncsCodeList[j].recruitCodeSn);
        } // linkedForm value값 지정
        relValue = relValue.join(',');
        t.push('		<div class="span per25 dropdown" data-dropdown>');
        t.push('			<button type="button">능력단위를 선택하세요.</button>');
        t.push('\t\t\t<div class="dropdown-menu" data-rel-id="' + loopName + '[' + index + ']" data-rel-type="with" data-rel-value="' + relValue + '">');

        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('\t\t\t<label class="checkbox ellipsis"><input type="checkbox" name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + '/><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('		</div>');
        t.push('	</div>');
        t.push('\t<div class="span per60"  data-rel-target="' + loopName + '[' + index + ']" >');
        for (i = 0; i < obj['17'].ncsCodeList.length; i++) {
            selected = '';
            for (j = 0; j < d.ncsCodeSn.length; j++) {
                if (d.ncsCodeSn[j] === obj['17'].ncsCodeList[i].recruitCodeSn) selected = 'selected';
            }t.push('\t<label class="selectedCheckbox"><input type="checkbox" data-name="' + loopName + '[' + index + '].ncsCodeSn" value="' + obj['17'].ncsCodeList[i].recruitCodeSn + '" ' + (selected === 'selected' ? 'checked' : '') + ' /><span class="label">' + obj['17'].ncsCodeList[i].recruitCodeName + '</span></label>');
        }
        t.push('	</div>');
        t.push('</div>');

        t.push('		<div class="row in-span half-margin">');
        t.push('\t\t\t<label class="span per15 title ' + (!allRequired ? 'required' : '') + '">\uC790\uACA9\uC99D \uAC80\uC0C9</label>');
        t.push('			<div class="span per85">');
        t.push('\t\t\t\t<div class="search"><label><input type="search" class="text" maxlength="256" data-type="license"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uD0A4\uC6CC\uB4DC \uC785\uB825 \uD6C4 &quot;Enter&quot;\uB85C \uAC80\uC0C9"/><span class="label">\uC790\uACA9\uC99D\uAC80\uC0C9</span></label><div class="searchResult"></div></div>');
        t.push('\t\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].licenseName"  value="' + d.licenseName + '" maxlength="256" /><span class="searchResultName">' + (d.licenseName ? d.licenseName : '') + (d.licenseName ? '<button type="button" class="resetSearchResult" data-button="resetSearchResult"></button>' : '') + '</span>');
        t.push('\t\t\t\t<input type="text" class="hidden" name="' + loopName + '[' + index + '].licenseCode"  value="' + d.licenseCode + '"  value="" required />');
        t.push('			</div>');
        t.push('		</div>');
        if (items['1221'] && items['1222']) {
            t.push('	<div class="row in-span half-margin">');
            if (items['1221']) {
                t.push('\t\t<label class="span per10 title ' + (!allRequired && items['1221'].isRequired ? 'required' : '') + '">\uBC1C\uAE09\uAE30\uAD00</label>');
                t.push('\t\t<label class="span per35"><input maxlength="64" type="text" value="' + d.organization + '"  name="' + loopName + '[' + index + '].organization"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uBC1C\uAE09\uAE30\uAD00" ' + (items['1221'].isRequired ? 'required' : '') + '/></label>');
            }
            if (items['1222']) {
                t.push('\t\t<label class="span per15 title ' + (!allRequired && items['1222'].isRequired ? 'required' : '') + ' ' + (items['1221'] ? 'devider' : '') + '">\uB4F1\uB85D\uBC88\uD638</label>');
                t.push('\t\t<label class="span per40"><input maxlength="64" type="text" value="' + d.registNumber + '"  name="' + loopName + '[' + index + '].registNumber"  class="text" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' placeholder="\uB4F1\uB85D\uBC88\uD638" ' + (items['1222'].isRequired ? 'required' : '') + '/></label>');
            }
            t.push('	</div>');
        }
        t.push('		<div class="row in-span half-margin">');

        if (items['1223']) {
            t.push('\t\t<label class="span per10 title ' + (!allRequired && items['1223'].isRequired ? 'required' : '') + '">\uBC1C\uAE09\uC77C</label>');
            t.push('\t\t<label class="span per15"><input type="text" data-dates="' + loopName + '[' + index + '].ncsLicenseDate:YMD" value="' + D.date(d.acquireDate) + '"   name="' + loopName + '[' + index + '].acquireDate"  class="text date" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1223'].isRequired ? 'required' : '') + '/></label>');
        }
        t.push('    \t    <label class="span per15 title ' + (items['1223'] ? 'devider' : '') + '" style="display:' + (d.useScore ? 'block' : 'none') + '">\uCDE8\uB4DD\uC810\uC218</label>');
        t.push('    \t\t<div class="span per35 middle-set" style="display:' + (d.useScore ? 'block' : 'none') + '">');
        t.push('    \t\t\t<input type="number" data-limit="decimal(5,1)" class="text" size="7" name="' + loopName + '[' + index + '].score" title="\uCDE8\uB4DD\uC810\uC218"  placeholder="\uCDE8\uB4DD\uC810\uC218"  value="' + d.score + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (d.isRequired ? 'block' : 'none') + ' /> <span style="margin:0px 5px;">/</span>');
        t.push('    \t\t\t<input type="number" class="text" size="7" name="' + loopName + '[' + index + '].perfectScore"  placeholder="\uB9CC\uC810\uAE30\uC900" title="\uB9CC\uC810\uAE30\uC900"  value="' + d.perfectScore + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (d.isRequired ? 'block' : 'none') + '/>');
        t.push('		</div>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '164': function _(data) {
        // NCS 추가질문설정
        return WriteResumeTemplate.additionalQuestion(data, 'ncsBuilder'); // 추가사항
    },
    '165': function _(d) {
        // 공인외국어시험
        var t = [],
            languageExamData = void 0,
            items = void 0,
            i = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);
        languageExamData = items['165']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject" data-wrap="foreignExam" data-code="165" data-type="languageExam">');
        t.push('\t<h2 class="h2 ' + (languageExamData.isRequired ? 'required' : '') + '">');
        t.push('        공인외국어시험');
        t.push('        <span class="guide" style="font-size: 12px;position: absolute;left: 54px;top: 52px;"><span style="color:#fe5a5c">' + D.date(languageExamData.foreignExamCriteriaDate, 'yy.MM.dd') + '</span> \uC774\uD6C4 \uC810\uC218\uB9CC \uC778\uC815</span>');
        t.push('    </h2>');

        if (!d.foreignExam.length) t.push(WriteResumeTemplate.foreignExam(null));else for (i = 0; i < d.foreignExam.length; i++) {
            t.push(WriteResumeTemplate.foreignExam(d.foreignExam[i], i));
        }t.push('</div>');

        return t.join('');
    },
    foreignExam: function foreignExam(d, index) {
        var t = [],
            loopName = void 0,
            languageExamData = void 0,
            items = void 0,
            i = void 0,
            languageList = void 0;

        loopName = 'languageExam';
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);
        languageExamData = items['165']; // items를 구하기 위해 fullData를 불러옴
        languageList = items['165'].foreignExamCodeList;
        items = WriteResumeUtil.objectGenerator(languageExamData.items); // items를 array에서 object로 변경

        d = d || {
            languageExamSn: '',
            registNumber: '',
            examDate: '',
            languageExamCode: '',
            languageExamName: '',
            gradeCode: '',
            gradeName: '',
            gradeCodeList: {},
            gradeFlag: false,
            score: '',
            scoreFlag: false,
            perfectScore: '',
            setupCode: '',
            certificationYn: false
        };

        // 시험이름이 DB에 저장이 안되기 때문에 이런 식으로 데이터를 업데이트 해야함
        if (d.languageExamCode) {
            for (i = 0; i < languageList.length; i++) {
                if (languageList[i].foreignExamCode === d.languageExamCode) {
                    d.languageExamName = languageList[i].foreignExamName;
                    d.setupCode = languageList[i].setupCode;
                }
            }
        }
        t.push('<div class="row in-span loop" data-loop="' + loopName + '" data-index="' + index + '">');
        if (languageExamData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle languageExam">' + languageExamData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="span per20 btn">');
        t.push('		<label class="title">시험</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per80 middle-set">');
        t.push('		<div class="search"><label><input type="search" class="text" data-type="foreignExam" maxlength="20000" placeholder="키워드 입력 후 &quot;Enter&quot;로 검색"/><span class="label">시험검색</span></label><div class="searchResult"></div></div>');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].languageExamName" value="' + d.languageExamName + '" maxlength="20000" /><span class="searchResultName">' + (d.languageExamName ? '<span>' + d.languageExamName + '</span><button type="button" class="resetSearchResult" data-button="resetSearchResult"></button>' : '') + '</span>');
        t.push('\t\t<input type="text" name="' + loopName + '[' + index + '].languageExamCode" value="' + d.languageExamCode + '" class="hidden" data-rel-id="' + loopName + '[' + index + ']" data-rel-value="00030" data-rel-target="without" ' + (languageExamData.isRequired ? 'required' : '') + '  />');
        t.push('        <span class="devider ybmValidateDone ' + (d['certificationYn'] ? '' : 'hide') + '" title="YBM \uD55C\uAD6D \uD1A0\uC775 \uC704\uC6D0\uD68C \uC778\uC99D\uC644\uB8CC"></span>');

        t.push('		<div class="row in-span half-margin" data-template="detail">');
        t.push(WriteResumeTemplate.foreignExamDetail('add', d, index)); //맨처음 생성의 경우 TOEIC이 추가되면서 아래 항목을 입력 못하도록 했음
        t.push('        </div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },
    foreignExamDetail: function foreignExamDetail(method, d, index) {
        var t = [],
            loopName = void 0,
            languageExamData = void 0,
            items = void 0,
            i = void 0,
            disabled = void 0,
            readonly = void 0;

        // +버튼을 눌러 추가하면 add, 시험이름을 선택해서 세부항목이 바뀌면 change
        if (method !== 'add' && method !== 'change') throw new Error('method를 add나 change로 입력하세요.');

        loopName = 'languageExam';

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);
        languageExamData = items['165']; // items를 구하기 위해 fullData를 불러옴

        items = WriteResumeUtil.objectGenerator(languageExamData.items); // items를 array에서 object로 변경

        disabled = method === 'add' ? 'disabled' : '';
        readonly = d['setupCode'] === 'EXAM_CODE' ? 'readonly' : ''; //현재는 setupCode-EXAM_CODE(ybm인증) 만 취급

        d = d || {
            registNumber: '',
            examDate: '',
            gradeCode: '',
            gradeName: '',
            gradeCodeList: [],
            gradeFlag: false,
            score: '',
            scoreFlag: false,
            perfectScore: '',
            languageExamCode: ''
        };

        $.ajax({
            type: 'post', dataType: 'json',
            url: '/com/code/retrieveForeignExamGradeList',
            data: { foreignExamCode: d.languageExamCode },
            async: false
        }).fail(Common.ajaxOnfail).done(function (x) {
            d.gradeCodeList = x;
        });

        if (items['1164'] && (d.gradeFlag || d.scoreFlag)) t.push('<label class="span per40"><input type="text" maxlength="64" class="text" placeholder="\uB4F1\uB85D\uBC88\uD638" name="' + loopName + '[' + index + '].registNumber" value="' + d.registNumber + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + readonly + ' ' + (items['1164'].isRequired ? 'required' : '') + '/></label>');
        if (items['1165'] && (d.gradeFlag || d.scoreFlag)) t.push('<label class="span per25"><input type="text" class="text date" placeholder="\uC751\uC2DC\uC77C" ' + (readonly ? '' : ' data-dates="' + loopName + '[' + index + '].foreignExamDate:YMD foreignExamCriteriaDate" ') + ' name="' + loopName + '[' + index + '].examDate" value="' + D.date(d.examDate) + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + readonly + ' ' + (items['1165'].isRequired ? 'required' : '') + '/></label>'); //현재 data-dates 가 read-only일때도 계속 나오기때문에 아예 html코드상에서 없애버림

        // 해당 공인 외국어 시험의 등급 코드의 존재여부에 따라 UI가 변함
        if (d.gradeFlag) {
            // 외국어 시험이 등급제이고 기존에 저장한 내역이 없으면
            t.push('<label class="span per35 select"><select name="' + loopName + '[' + index + '].gradeCode" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + readonly + ' required>');
            t.push('	<option value="">등급선택</option>');
            for (i = 0; i < d.gradeCodeList.length; i++) {
                t.push('<option value="' + d.gradeCodeList[i].gradeCode + '" ' + (d.gradeCodeList[i].gradeCode === d.gradeCode ? 'selected' : '') + '>' + d.gradeCodeList[i].gradeName + '</option>');
            }
            t.push('</select></label>');
        }
        if (d.gradeFlag && d.scoreFlag) t.push('<div class="span per65" style="margin-top:10px"></div>'); // 신HSK처럼 등급과 점수가 같이 있다면 공백을 넣어줌
        if (d.scoreFlag) {
            t.push('<div class="span per16 middle-set" ' + (d.gradeFlag ? 'style="margin-top:10px;"' : '') + '>');
            t.push('\t<input type="number" class="text" min="0" max="9999" required name="' + loopName + '[' + index + '].score"  placeholder="\uCDE8\uB4DD\uC810\uC218" value="' + d.score + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + readonly + ' />');
            t.push('</div>');
            t.push('<div class="span per3 text" style="text-align:center;' + (d.gradeFlag ? 'margin-top:10px' : '') + '">/</div>');
            t.push('<div class="span per16 middle-set" ' + (d.gradeFlag ? 'style="margin-top:10px;"' : '') + '>');
            t.push('\t<input type="number" class="text" min="0" max="9999" required name="' + loopName + '[' + index + '].perfectScore"  placeholder="\uB9CC\uC810\uAE30\uC900"  value="' + d.perfectScore + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + readonly + '/>');
            t.push('</div>');
        }

        t.push('<input type="hidden" name="' + loopName + '[' + index + '].languageExamSn" value="' + (d.languageExamSn || '') + '"/>');

        return t.join('');
    },

    '166': function _(d) {
        // 외국어활용능력
        var t = [],
            foreignAbilityData = void 0,
            items = void 0,
            i = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);
        foreignAbilityData = items['166']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject" data-wrap="foreignAbility" data-code="166" data-type="languageSkill">');
        t.push('\t<h2 class="h2 ' + (foreignAbilityData.isRequired ? 'required' : '') + '">\uC678\uAD6D\uC5B4\uD65C\uC6A9\uB2A5\uB825</h2>');
        if (!d.foreignLanguage.length) t.push(WriteResumeTemplate.foreignAbility(null));else for (i = 0; i < d.foreignLanguage.length; i++) {
            t.push(WriteResumeTemplate.foreignAbility(d.foreignLanguage[i], i));
        }t.push('</div>');

        return t.join('');
    },
    foreignAbility: function foreignAbility(d, index) {
        var t = [],
            loopName = void 0,
            foreignAbilityData = void 0,
            items = void 0,
            i = void 0,
            selected = void 0,
            disabled = void 0;

        loopName = 'languageSkill'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        foreignAbilityData = items['166']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(foreignAbilityData.items); // items를 array에서 object로 변경

        disabled = 'disabled';
        d = d || {
            languageSkillSn: '',
            languageCode: '',
            speakingLevelCodeSn: '',
            writingLevelCodeSn: '',
            readingLevelCodeSn: ''
        };

        t.push('\t<div class="row in-span loop" data-loop="' + loopName + '">');
        if (foreignAbilityData.guideContents) {
            t.push('		<div class="wrapGuide">');
            t.push('\t\t\t<div class="guide hasTitle foreignAbility">' + foreignAbilityData.guideContents + '</div>');
            t.push('		</div>');
        }
        t.push('		<div class="span per20 btn">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].languageSkillSn" value="' + d.languageSkillSn + '"/>');
        t.push('			<lable class="title">외국어</lable><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('		<div class="span per80 middle-set">');
        t.push('			<div class="row in-span no-margin">');

        t.push('\t\t\t\t<label class="span per40 select"><select name="' + loopName + '[' + index + '].languageCode"  data-rel-id="' + loopName + '[' + index + ']" ' + (foreignAbilityData.isRequired ? 'required' : '') + ' >');
        t.push('					<option value="">활용가능한 외국어를 선택하세요.</option>');
        for (i = 0; i < foreignAbilityData.foreignLanguageCodeList.length; i++) {
            t.push('<option value="' + foreignAbilityData.foreignLanguageCodeList[i].code + '" ' + (d.languageCode === foreignAbilityData.foreignLanguageCodeList[i].code ? 'selected' : '') + '>' + foreignAbilityData.foreignLanguageCodeList[i].name + '</option>');
        }
        t.push('				</select></label>');

        if (items['1168']) {
            t.push('\t\t\t\t<label class="span per20 select"><select  name="' + loopName + '[' + index + '].speakingLevelCodeSn"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1168'].isRequired ? 'required' : '') + ' ' + disabled + '>');
            t.push('					<option value="">회화수준</option>');
            for (i = 0; i < items['1168'].speakingLevelCodeList.length; i++) {
                t.push('<option value="' + items['1168'].speakingLevelCodeList[i].recruitCodeSn + '" ' + (d.speakingLevelCodeSn === items['1168'].speakingLevelCodeList[i].recruitCodeSn ? 'selected' : '') + '>' + items['1168'].speakingLevelCodeList[i].recruitCodeName + '</option>');
            }
            t.push('				</select></label>');
        }

        if (items['1169']) {
            t.push('\t\t\t\t<label class="span per20 select"><select name="' + loopName + '[' + index + '].writingLevelCodeSn" data-rel-target="' + loopName + '[' + index + ']" ' + (items['1169'].isRequired ? 'required' : '') + ' ' + disabled + '>');
            t.push('					<option value="">작문수준</option>');
            for (i = 0; i < items['1169'].writingLevelCodeList.length; i++) {
                selected = '';
                if (d.writingLevelCodeSn === items['1169'].writingLevelCodeList[i].recruitCodeSn) selected = 'selected';
                t.push('<option value="' + items['1169'].writingLevelCodeList[i].recruitCodeSn + '" ' + selected + '>' + items['1169'].writingLevelCodeList[i].recruitCodeName + '</option>');
            }
            t.push('				</select></label>');
        }

        if (items['1170']) {
            t.push('\t\t\t\t<label class="span per20 select"><select name="' + loopName + '[' + index + '].readingLevelCodeSn" data-rel-target="' + loopName + '[' + index + ']" ' + (items['1170'].isRequired ? 'required' : '') + ' ' + disabled + '>');
            t.push('					<option value="">독해수준</option>');
            for (i = 0; i < items['1170'].readingLevelCodeList.length; i++) {
                selected = '';
                if (d.readingLevelCodeSn === items['1170'].readingLevelCodeList[i].recruitCodeSn) selected = 'selected';
                t.push('<option value="' + items['1170'].readingLevelCodeList[i].recruitCodeSn + '" ' + selected + '>' + items['1170'].readingLevelCodeList[i].recruitCodeName + '</option>');
            }
            t.push('				</select></label>');
        }
        t.push('			</div>');
        t.push('		</div>');
        t.push('	</div>');

        return t.join('');
    },

    '167': function _(d) {
        // 해외경험
        var t = [],
            items = void 0,
            i = void 0,
            abroadData = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        abroadData = items['167']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(abroadData.items); // items를 array에서 object로 변경

        if (items['1171'] && items['1171'].abroadPurposeCodeList) {
            t.push('<div class="subject" data-wrap="abroad" data-code="167" data-type="overseaExperience">');
            t.push('\t<h2 class="h2 ' + (abroadData.isRequired ? 'required' : '') + '">\uD574\uC678\uACBD\uD5D8</h2>');
            if (!d.overseaExperience.length) t.push(WriteResumeTemplate.abroad(null));else for (i = 0; i < d.overseaExperience.length; i++) {
                t.push(WriteResumeTemplate.abroad(d.overseaExperience[i], i));
            }t.push('</div>');
        }

        return t.join('');
    },
    abroad: function abroad(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            abroadData = void 0,
            selected = void 0,
            disabled = void 0;

        loopName = 'overseaExperience'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지
        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);
        abroadData = items['167']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(abroadData.items); // items를 array에서 object로 변경

        disabled = 'disabled';

        d = d || {
            overseaExperienceSn: '',
            overseaPurposeCodeSn: '',
            overseaCountryCode: '',
            departureDate: '',
            returnDate: '',
            comment: ''
        };

        t.push('<div class="row in-span loop" data-loop="' + loopName + '">');
        if (abroadData.guideContents) {
            t.push('	<div class="wrapGuide">');
            t.push('\t\t<div class="guide hasTitle abroad">' + abroadData.guideContents + '</div>');
            t.push('	</div>');
        }
        t.push('	<div class="span per20 btn">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].overseaExperienceSn" value="' + d.overseaExperienceSn + '"/>');
        t.push('		<label class="title">해외경험</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per80 middle-set">');
        t.push('		<div class="row in-span no-margin">');
        t.push('\t\t\t<label class="span per40 select"><select name="' + loopName + '[' + index + '].overseaPurposeCodeSn"   data-rel-id="' + loopName + '[' + index + ']" ' + (abroadData.isRequired ? 'required' : '') + ' >');
        t.push('				<option value="">해외경험 목적</option>');
        if (items['1171'].abroadPurposeCodeList) {
            for (i = 0; i < items['1171'].abroadPurposeCodeList.length; i++) {
                t.push('\t\t\t<option value="' + items['1171'].abroadPurposeCodeList[i].recruitCodeSn + '" ' + (d.overseaPurposeCodeSn === items['1171'].abroadPurposeCodeList[i].recruitCodeSn ? 'selected' : '') + '>' + items['1171'].abroadPurposeCodeList[i].recruitCodeName + '</option>');
            }
        }
        t.push('				</select></label>');
        t.push('		</div>');
        t.push('		<div class="row in-span half-margin">');
        t.push('\t\t\t<label class="span per40 select"><select name="' + loopName + '[' + index + '].overseaCountryCode" data-rel-target="' + loopName + '[' + index + ']" ' + 'required' + (' ' + disabled + '>'));
        t.push('				<option value="">해외경험 국가선택</option>');
        for (i = 0; i < items['1172'].countryCodeList.length; i++) {
            selected = '';
            if (d.overseaCountryCode === items['1172'].countryCodeList[i].countryCode) selected = 'selected';
            t.push('\t\t\t<option value="' + items['1172'].countryCodeList[i].countryCode + '" ' + selected + '>' + items['1172'].countryCodeList[i].countryName + '</option>');
        }
        t.push('			</select></label>');
        t.push('\t\t\t<label class="span per45 date"><input type="text"  data-dates="' + loopName + '[' + index + '].overseaDate:YMD" value="' + D.date(d.departureDate) + '" name="' + loopName + '[' + index + '].departureDate" class="text date start" placeholder="\uCD9C\uAD6D\uC77C" data-rel-target="' + loopName + '[' + index + ']" ' + (items['1173'].isRequired ? 'required' : '') + ' ' + disabled + '/><input type="text"  data-dates="' + loopName + '[' + index + '].overseaDate:END"  value="' + D.date(d.returnDate) + '" class="text date end" name="' + loopName + '[' + index + '].returnDate' + ('" placeholder="\uC785\uAD6D\uC77C"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1173'].isRequired ? 'required' : '') + ' ' + disabled + '/></label>'));
        t.push('		</div>');
        t.push('		<div class="row in-span half-margin">');
        t.push('\t\t\t<div class="span per100"><input maxlength="20000" type="text" name="' + loopName + '[' + index + '].comment' + ('" value="' + d.comment + '" class="text" placeholder="\uD574\uC678\uACBD\uD5D8 \uB0B4\uC6A9\uAE30\uC220"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1174'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>'));
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '168': function _(d, index) {
        // 자격증
        var t = [],
            items = void 0,
            i = void 0,
            licenseData = void 0,
            licenseList = void 0,
            obj = {},
            tmp = void 0,
            allRequired = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);
        licenseData = items['168']; // items를 구하기 위해 fullData를 불러옴
        allRequired = WriteResumeUtil.isAllRequired(licenseData.items);
        items = WriteResumeUtil.objectGenerator(licenseData.items); // items를 array에서 object로 변경

        for (i = 0; i < items['1136'].licenseCodeList.length; i++) {
            tmp = items['1136'].licenseCodeList[i];
            obj[tmp.licenseCode] = tmp;
        }

        licenseList = obj;

        t.push('<div class="subject" data-wrap="license" data-code="168" data-type="license">');
        t.push('\t<h2 class="h2 ' + (allRequired && licenseData.isRequired ? 'required' : '') + '">\uC790\uACA9\uC99D</h2>');
        if (!d.license.length) t.push(WriteResumeTemplate.license(null));else for (i = 0; i < d.license.length; i++) {
            t.push(WriteResumeTemplate.license(d.license[i], i, licenseList));
        }t.push('</div>');

        return t.join('');
    },
    license: function license(d, index, licenseList) {
        var t = [],
            loopName = void 0,
            items = void 0,
            licenseData = void 0,
            disabled = void 0,
            allRequired = void 0;

        loopName = 'license';
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        licenseData = items['168']; // items를 구하기 위해 fullData를 불러옴
        allRequired = WriteResumeUtil.isAllRequired(licenseData.items);
        items = WriteResumeUtil.objectGenerator(licenseData.items); // items를 array에서 object로 변경

        disabled = 'disabled';

        licenseList = licenseList || {};
        licenseList[''] = {
            licenseName: '',
            licenseCode: '',
            organization: '',
            registNumber: '',
            acquireDate: '',
            score: '',
            perfectScore: ''
        };

        d = d || {
            licenseActivitySn: '',
            licenseName: '',
            licenseCode: '',
            organization: '',
            registNumber: '',
            acquireDate: '',
            score: '',
            perfectScore: ''
        };

        d.licenseCode = d.licenseCode || '';
        t.push('<div class="row loop" data-loop="' + loopName + '">');
        if (licenseData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle license">' + licenseData.guideContents + '</div>');
            t.push('</div>');
        }

        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per20 btn">');
        t.push('\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].licenseActivitySn" value="' + d.licenseActivitySn + '"/>');
        t.push('\t\t\t<label class="title ' + (!allRequired && items['1136'].isRequired ? 'required' : '') + '">\uC790\uACA9\uC99D\uBA85</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('		<div class="span per80 middle-set">');
        t.push('			<div class="search"><label><input type="search" class="text" data-type="license" maxlength="60" placeholder="키워드 입력 후 &quot;Enter&quot;로 검색"/><span class="label">자격증검색</span></label><div class="searchResult"></div></div>');

        t.push('\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].licenseName" value="' + d.licenseName + '" maxlength="60"  /><span class="searchResultName">' + (d.licenseName ? '<span>' + d.licenseName + '</span><button type="button" class="resetSearchResult" data-button="resetSearchResult"></button>' : '') + '</span>');
        t.push('\t\t\t<input type="text" name="' + loopName + '[' + index + '].licenseCode" value="' + d.licenseCode + '" class="hidden" data-rel-id="' + loopName + '[' + index + ']" ' + (licenseData.isRequired ? 'required' : '') + '/>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('	<div class="row in-span half-margin">');
        t.push('\t\t<label class="span per20 title ' + (!allRequired && items['1137'].isRequired ? 'required' : '') + '">\uBC1C\uAE09\uAE30\uAD00</label>');
        t.push('\t\t<div class="span per35"><input type="text" maxlength="64" class="text" name="' + loopName + '[' + index + '].organization"  placeholder="\uBC1C\uAE09\uAE30\uAD00" value="' + d.organization + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1137'].isRequired ? 'required' : '') + '/></div>');
        t.push('\t\t<label class="span per20 title devider ' + (!allRequired && items['1138'].isRequired ? 'required' : '') + '">\uB4F1\uB85D\uBC88\uD638</label>');
        t.push('\t\t<div class="span per25"><input type="text" maxlength="64" class="text" name="' + loopName + '[' + index + '].registNumber" placeholder="\uB4F1\uB85D\uBC88\uD638" value="' + d.registNumber + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' ' + (items['1138'].isRequired ? 'required' : '') + '/></div>');
        t.push('	</div>');
        t.push('	<div class="row in-span half-margin">');
        t.push('\t\t<label class="span per20 title ' + (!allRequired && items['1139'].isRequired ? 'required' : '') + '">\uCDE8\uB4DD\uC77C</label>');
        t.push('\t\t<div class="span per20"><input type="text"  data-dates="' + loopName + '[' + index + '].licenseDate:YMD" class="text date" name="' + loopName + '[' + index + '].acquireDate" value="' + D.date(d.acquireDate) + '"  placeholder="\uCDE8\uB4DD\uC77C" ' + (items['1139'].isRequired ? 'required' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '/></div>');
        if (items['1140']) {
            t.push('\t<label class="span per20 title devider ' + (!allRequired && items['1140'].isRequired ? 'required' : '') + '" style="display:' + (d.useScore ? 'block' : 'none') + '">\uCDE8\uB4DD\uC810\uC218</label>');
            t.push('\t<div class="span per35 middle-set" style="display:' + (d.useScore ? 'block' : 'none') + '">');
            t.push('\t\t<input type="number" step="0.1" max="9999" data-limit="decimal(5,1)" class="text" size="7" name="' + loopName + '[' + index + '].score"  placeholder="\uCDE8\uB4DD\uC810\uC218"  value="' + d.score + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' /> <span style="margin:0px 5px;">/</span>');
            t.push('\t\t<input type="text" maxlength="4" class="text" size="7" name="' + loopName + '[' + index + '].perfectScore"  placeholder="\uB9CC\uC810\uAE30\uC900"  value="' + d.perfectScore + '" data-rel-target="' + loopName + '[' + index + ']" ' + disabled + ' />');
            t.push('	</div>');
        }
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '169': function _(d, index) {
        // 컴퓨터활용능력
        var t = [],
            items = void 0,
            i = void 0,
            softwareData = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        softwareData = items['169']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(softwareData.items); // items를 array에서 object로 변경

        if (items['1175'] && items['1175'].softwareTypeCodeList) {
            t.push('<div class="subject" data-wrap="software" data-code="169" data-type="softwareSkill">');
            t.push('\t<h2 class="h2 ' + (softwareData.isRequired ? 'required' : '') + '">\uCEF4\uD4E8\uD130\uD65C\uC6A9\uB2A5\uB825</h2>');
            if (!d.softwareSkill.length) t.push(WriteResumeTemplate.software(null));else for (i = 0; i < d.softwareSkill.length; i++) {
                t.push(WriteResumeTemplate.software(d.softwareSkill[i], i));
            }t.push('</div>');
        }

        return t.join('');
    },
    software: function software(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            softwareData = void 0,
            selected = void 0,
            disabled = void 0;

        loopName = 'softwareSkill'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        softwareData = items['169']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(softwareData.items); // items를 array에서 object로 변경

        disabled = 'disabled';
        d = d || {
            softwareSkillSn: '',
            softwareCategoryCodeSn: '',
            softwareLevelCodeSn: '',
            usedPeriod: '',
            softwareName: ''
        };

        t.push('<div class="row in-span loop" data-loop="' + loopName + '">');
        if (softwareData.guideContents) {
            t.push('	<div class="wrapGuide">');
            t.push('\t\t<div class="guide hasTitle software">' + softwareData.guideContents + '</div>');
            t.push('	</div>');
        }
        t.push('	<div class="span per20 btn">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].softwareSkillSn" value="' + d.softwareSkillSn + '"/>');
        t.push('		<label class="title">컴퓨터활용</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('	</div>');
        t.push('	<div class="span per80 middle-set">');
        t.push('		<div class="row in-span no-margin">');
        t.push('\t\t\t<label class="span per25 select"><select name="' + loopName + '[' + index + '].softwareCategoryCodeSn"  data-rel-id="' + loopName + '[' + index + ']" ' + (softwareData.isRequired ? 'required' : '') + '>');
        t.push('				<option value="">활용능력 구분</option>');
        if (items['1175']) {
            for (i = 0; i < items['1175'].softwareTypeCodeList.length; i++) {
                selected = '';
                if (d.softwareCategoryCodeSn === items['1175'].softwareTypeCodeList[i].recruitCodeSn) selected = 'selected';
                t.push('\t<option value="' + items['1175'].softwareTypeCodeList[i].recruitCodeSn + '" ' + selected + '>' + items['1175'].softwareTypeCodeList[i].recruitCodeName + '</option>');
            }
        }
        t.push('			</select></label>');

        if (items['1176']) {
            t.push('\t\t<div class="span per75"><input maxlength="128" type="text" name="' + loopName + '[' + index + '].softwareName" value="' + d.softwareName + '" class="text" placeholder="\uD504\uB85C\uADF8\uB7A8\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694."  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1176'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>');
        }
        t.push('		</div>');

        t.push('		<div class="row in-span half-margin">');

        if (items['1177']) {
            t.push('\t\t<label class="span per25 select"><select name="' + loopName + '[' + index + '].softwareLevelCodeSn" data-rel-target="' + loopName + '[' + index + ']" ' + (items['1177'].isRequired ? 'required' : '') + ' ' + disabled + '>');
            t.push('			<option value="">활용수준 선택</option>');
            for (i = 0; i < items['1177'].softwareLevelCodeList.length; i++) {
                selected = '';
                if (d.softwareLevelCodeSn === items['1177'].softwareLevelCodeList[i].recruitCodeSn) selected = 'selected';
                t.push('\t\t<option value="' + items['1177'].softwareLevelCodeList[i].recruitCodeSn + '" ' + selected + '>' + items['1177'].softwareLevelCodeList[i].recruitCodeName + '</option>');
            }
            t.push('		</select></label>');
        }

        if (items['1178']) {
            t.push('\t\t<label class="span per40 select"><select name="' + loopName + '[' + index + '].usedPeriod"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1178'].isRequired ? 'required' : '') + ' ' + disabled + '>');
            t.push('			<option value="">사용기간 선택</option>');
            for (i = 0; i < items['1178'].softwareUsedCodeList.length; i++) {
                selected = '';
                if (d.usedPeriod === items['1178'].softwareUsedCodeList[i].code) selected = 'selected';
                t.push('\t\t<option value="' + items['1178'].softwareUsedCodeList[i].code + '" ' + selected + '>' + items['1178'].softwareUsedCodeList[i].name + '</option>');
            }
            t.push('		</select></label>');
        }

        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    '170': function _(d) {
        // 수상경력
        var t = [],
            items = void 0,
            i = void 0,
            awardData = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        awardData = items['170']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(awardData.items); // items를 array에서 object로 변경

        t.push('<div class="subject" data-wrap="award" data-code="170" data-type="award">');
        t.push('\t<h2 class="h2 ' + (awardData.isRequired ? 'required' : '') + '">\uC218\uC0C1\uACBD\uB825</h2>');
        if (!d.award.length) t.push(WriteResumeTemplate.award(null));else for (i = 0; i < d.award.length; i++) {
            t.push(WriteResumeTemplate.award(d.award[i], i));
        }t.push('</div>');

        return t.join('');
    },
    award: function award(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            disabled = void 0,
            awardData = void 0;
        loopName = 'award';
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        awardData = items['170']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(awardData.items); // items를 array에서 object로 변경

        disabled = 'disabled';

        d = d || {
            awardSn: '',
            awardName: '',
            organization: '',
            awardDate: '',
            comment: ''
        };

        t.push('<div class="row loop" data-loop="award">');
        if (awardData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle award">' + awardData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per20 btn">');
        t.push('\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].awardSn" value="' + d.awardSn + '"/>');
        t.push('			<label class="title">상훈명</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('\t\t<div class="span per80 middle-set"><input type="text" maxlength="64" name="' + loopName + '[' + index + '].awardName" value="' + d.awardName + '" class="text" placeholder="\uC0C1\uD6C8\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694."  data-rel-id="' + loopName + '[' + index + ']" ' + (awardData.isRequired ? 'required' : '') + '/></div>');
        t.push('	</div>');

        if (items['1180'] || items['1181']) {
            t.push('<div class="row in-span half-margin">');

            if (items['1180']) {
                t.push('<label class="span per20 title">수여기관</label>');
                t.push('<div class="span per40"><input maxlength="64" type="text" name="' + loopName + '[' + index + '].organization" value="' + d.organization + '" class="text" placeholder="\uC218\uC5EC\uAE30\uAD00\uC744 \uC785\uB825\uD558\uC138\uC694."  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1180'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>');
            }
            if (items['1181']) {
                t.push('<label class="span per20 title ' + (items['1180'] ? 'devider' : '') + '">\uC218\uC0C1\uC77C\uC790</label>');
                t.push('<label class="span per20"><input type="text"  data-dates="' + loopName + '[' + index + '].awardDate:YMD"  name="' + loopName + '[' + index + '].awardDate" value="' + D.date(d.awardDate) + '" class="text date"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1181'].isRequired ? 'required' : '') + ' ' + disabled + '/></label>');
            }
            t.push('</div>');
        }

        if (items['1182']) {
            t.push('<div class="row in-span half-margin">');
            t.push('	<label class="span per20 title">수상내역</label>');
            t.push('\t<div class="span per80"><input maxlength="20000" type="text" name="' + loopName + '[' + index + '].comment" value="' + d.comment + '" class="text" placeholder="\uC218\uC0C1\uB0B4\uC5ED\uC744 \uC0C1\uC138\uD788 \uC785\uB825\uD558\uC138\uC694."  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1182'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>');
            t.push('</div>');
        }

        t.push('</div>');

        return t.join('');
    },

    '171': function _(d) {
        // 교육이수사항
        var t = [],
            items = void 0,
            educationData = void 0,
            i = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);
        educationData = items['171']; // items를 구하기 위해 fullData를 불러옴

        t.push('<div class="subject" data-wrap="education" data-code="171" data-type="education">');
        t.push('\t<h2 class="h2 ' + (educationData.isRequired ? 'required' : '') + '">\uAD50\uC721\uC774\uC218\uC0AC\uD56D</h2>');
        if (!d.education.length) t.push(WriteResumeTemplate.education(null));else for (i = 0; i < d.education.length; i++) {
            t.push(WriteResumeTemplate.education(d.education[i], i));
        }t.push('</div>');

        return t.join('');
    },
    education: function education(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            educationData = void 0,
            disabled = void 0;

        loopName = 'education'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        educationData = items['171']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(educationData.items); // items를 array에서 object로 변경
        disabled = 'disabled';

        d = d || {
            educationActivitySn: '',
            educationName: '',
            startDate: '',
            endDate: '',
            organization: '',
            time: '',
            comment: ''
        };

        t.push('<div class="row loop" data-loop="' + loopName + '">');

        if (educationData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle education">' + educationData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('<div class="row in-span no-margin">');
        t.push('<div class="span per20 btn">');
        t.push('\t<input type="hidden" name="' + loopName + '[' + index + '].educationActivitySn" value="' + d.educationActivitySn + '"/>');
        t.push('	<label class="title">과정명</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('</div>');

        t.push('<div class="span per35"><input maxlength="128" type="text" name="' + loopName + '[' + index + '].educationName" value="' + d.educationName + '" class="text" placeholder="\uAD50\uC721 \uACFC\uC815\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." ' + (educationData.isRequired ? 'required' : '') + ' data-rel-id="' + loopName + '[' + index + ']" /></div>');

        if (items['1185']) {
            t.push('<label class="span per20 title ' + (items['1183'] ? 'devider' : '') + '">\uAD50\uC721\uAE30\uAD00</label>');
            t.push('<div class="span per25"><input maxlength="64" type="text" class="text" name="' + loopName + '[' + index + '].organization"  value="' + d.organization + '" placeholder="\uAD50\uC721 \uAE30\uAD00\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694."' + (items['1185'].isRequired ? 'required' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '/></div>');
        }
        t.push('	</div>');

        if (items['1184'] || items['1186']) {
            t.push('<div class="row in-span half-margin">');

            if (items['1184']) {
                t.push('<label class="span per20 title">이수기간</label>');
                t.push('<label class="span per35 date">');
                t.push('\t<input type="text"  data-dates="' + loopName + '[' + index + '].educationDate:YMD"  name="' + loopName + '[' + index + '].startDate" value="' + D.date(d.startDate) + '" class="text date start" ' + (items['1184'].isRequired ? 'required' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '/>');
                t.push('\t<input type="text"  data-dates="' + loopName + '[' + index + '].educationDate:END"  name="' + loopName + '[' + index + '].endDate" value="' + D.date(d.endDate) + '" class="text date end" ' + (items['1184'].isRequired ? 'required' : '') + '  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '/>');
                t.push('</label>');
            }

            if (items['1186']) {
                t.push('<label class="span per20 title ' + (items['1184'] ? 'devider' : '') + '">\uAD50\uC721\uC2DC\uAC04</label>');
                t.push('<label class="span per25 label time"><input type="number" class="text" min="0" max="9999" name="' + loopName + '[' + index + '].time" value="' + d.time + '" ' + (items['1186'].isRequired ? 'required' : '') + ' maxlength="4"  data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '/></label>');
            }
            t.push('</div>');
        }

        if (items['1187']) {
            t.push('<div class="row in-span half-margin">');
            t.push('	<label class="span per20 title">주요내용</label>');
            t.push('\t<div class="span per80"><input type="text" maxlength="20000"  name="' + loopName + '[' + index + '].comment" value="' + d.comment + '" class="text" placeholder="\uAD50\uC721 \uACFC\uC815 \uC8FC\uC694 \uB0B4\uC6A9\uC744 \uC0C1\uC138\uD788 \uC785\uB825\uD558\uC138\uC694." ' + (items['1187'].isRequired ? 'required' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '/></div>');
            t.push('</div>');
        }
        t.push('</div>');

        return t.join('');
    },

    '172': function _(d) {
        // 학내외활동
        var t = [],
            i = void 0,
            items = void 0,
            activityData = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);
        activityData = items['172']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(activityData.items); // items를 array에서 object로 변경

        if (items['1141'] && items['1141'].activityCategoryCodeList) {
            t.push('<div class="subject" data-wrap="activity" data-code="172" data-type="activity">');
            t.push('\t<h2 class="h2 ' + (activityData.isRequired ? 'required' : '') + '">\uD559\uB0B4\uC678 \uD65C\uB3D9</h2>');
            if (!d.activity.length) t.push(WriteResumeTemplate.activity(null));else for (i = 0; i < d.activity.length; i++) {
                t.push(WriteResumeTemplate.activity(d.activity[i], i));
            }t.push('</div>');
        }

        return t.join('');
    },
    activity: function activity(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            activityData = void 0,
            selected = void 0,
            disabled = void 0;

        loopName = 'activity'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        activityData = items['172']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(activityData.items); // items를 array에서 object로 변경

        disabled = 'disabled';

        d = d || {
            activitySn: '',
            activityCategorySn: '',
            organization: '',
            startDate: '',
            endDate: '',
            role: '',
            comment: '',
            contents: ''
        };

        t.push('<div class="row loop" data-loop="' + loopName + '">');
        if (activityData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle activity">' + activityData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per20 btn">');
        t.push('\t\t<input type="hidden" name="' + loopName + '[' + index + '].activitySn" value="' + d.activitySn + '"/>');
        t.push('			<label class="title">활동구분</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');

        t.push('\t\t<label class="span per20 select" ><select name="' + loopName + '[' + index + '].activityCategorySn" id="" data-rel-id="' + loopName + '[' + index + ']" ' + (activityData.isRequired ? 'required' : '') + ' >');
        t.push('			<option value="">활동구분 선택</option>');
        for (i = 0; i < items['1141'].activityCategoryCodeList.length; i++) {
            selected = '';
            if (items['1141'].activityCategoryCodeList[i].recruitCodeSn === d.activityCategorySn) selected = 'selected';
            t.push('\t\t<option value="' + items['1141'].activityCategoryCodeList[i].recruitCodeSn + '" ' + selected + '>' + items['1141'].activityCategoryCodeList[i].recruitCodeName + '</option>');
        }
        t.push('		</select></label>');

        if (items['1142']) {
            t.push('		<label class="span per25 title devider">기관 및 조직명</label>');
            t.push('\t\t<div class="span per35"><input maxlength="64" type="text" class="text" placeholder="\uAE30\uAD00 \uBC0F \uC870\uC9C1\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." name="' + loopName + '[' + index + '].organization"  value="' + d.organization + '"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1142'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>');
        }
        t.push('	</div>');

        if (items['1145'] || items['1143']) {
            t.push('<div class="row in-span half-margin">');

            if (items['1145']) {
                t.push('<label class="span per20 title">활동기간</label>');
                t.push('<label class="span per35 date">');
                t.push('\t<input type="text" class="text date start" data-dates="' + loopName + '[' + index + '].activityDate:YMD" name="' + loopName + '[' + index + '].startDate" value="' + D.date(d.startDate) + '" data-rel-target="' + loopName + '[' + index + ']" ' + (items['1145'].isRequired ? 'required' : '') + ' ' + disabled + '/>');
                t.push('\t<input type="text" class="text date end" data-dates="' + loopName + '[' + index + '].activityDate:END" name="' + loopName + '[' + index + '].endDate"  value="' + D.date(d.endDate) + '" data-rel-target="' + loopName + '[' + index + ']" ' + (items['1145'].isRequired ? 'required' : '') + ' ' + disabled + '/>');
                t.push('</label>');
            }

            if (items['1143']) {
                t.push('<label class="span per20 title ' + (items['1145'] ? 'devider' : '') + '">\uC9C1\uC704 \uB610\uB294 \uC5ED\uD560</label>');
                t.push('<label class="span per25"><input maxlength="128" type="text" class="text" placeholder=""  name="' + loopName + '[' + index + '].role" value="' + d.role + '" ' + (items['1143'].isRequired ? 'required' : '') + ' data-rel-target="' + loopName + '[' + index + ']" ' + disabled + '/></label>');
            }
            t.push('</div>');
        }

        if (items['1144']) {
            t.push('<div class="row in-span half-margin">');
            t.push('	<label class="span per20 title">활동내역</label>');
            t.push('\t<div class="span per80"><input maxlength="20000" type="text" value="' + d.contents + '" class="text" name="' + loopName + '[' + index + '].contents" value="' + d.contents + '" placeholder="\uD65C\uB3D9 \uBC0F \uC5C5\uBB34\uB0B4\uC5ED\uC744 \uC0C1\uC138\uD788 \uC785\uB825\uD558\uC138\uC694." data-rel-target="' + loopName + '[' + index + ']"  ' + (items['1144'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>');
            t.push('</div>');
        }

        if (items['1146']) {
            t.push('<div class="row in-span half-margin">');
            t.push('	<label class="span per20 title">비고</label>');
            t.push('\t<div class="span per80"><input maxlength="20000" type="text" value="' + d.comment + '" class="text" name="' + loopName + '[' + index + '].comment" value="' + d.comment + '" placeholder="\uBE44\uACE0\uB97C \uC785\uB825\uD558\uC138\uC694." data-rel-target="' + loopName + '[' + index + ']"  ' + (items['1146'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>');
            t.push('</div>');
        }

        t.push('</div>');

        return t.join('');
    },

    '173': function _(d) {
        // 봉사활동
        var t = [],
            items = void 0,
            i = void 0,
            volunteerData = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        volunteerData = items['173']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(volunteerData.items); // items를 array에서 object로 변경

        if (items['1147'] && items['1147'].volunteerCategoryCodeList) {
            t.push('<div class="subject" data-wrap="volunteer" data-code="173" data-type="volunteerActivity">');
            t.push('\t<h2 class="h2 ' + (volunteerData.isRequired ? 'required' : '') + '">\uBD09\uC0AC\uD65C\uB3D9</h2>');
            if (!d.volunteerActivity.length) t.push(WriteResumeTemplate.volunteer(null));else for (i = 0; i < d.volunteerActivity.length; i++) {
                t.push(WriteResumeTemplate.volunteer(d.volunteerActivity[i], i));
            }t.push('</div>');
        }

        return t.join('');
    },
    volunteer: function volunteer(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            i = void 0,
            volunteerData = void 0,
            selected = void 0,
            disabled = void 0;

        loopName = 'volunteerActivity'; // loop를 대표하는 이름
        index = index || $('div[data-loop="' + loopName + '"]').size(); // 이번에 추가하는 항목이 몇 번째 배열인지

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        volunteerData = items['173']; // items를 구하기 위해 fullData를 불러옴
        items = WriteResumeUtil.objectGenerator(volunteerData.items); // items를 array에서 object로 변경

        disabled = 'disabled'; // linkedForm 적용하기 위해서 작업

        d = d || {
            volunteerActivitySn: '',
            volunteerCategoryCodeSn: '',
            organization: '',
            startDate: '',
            endDate: '',
            time: '',
            locationCode: '',
            registNumber: '',
            comment: ''
        };

        t.push('<div class="row loop" data-loop="' + loopName + '">');
        if (volunteerData.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide hasTitle volunteer">' + volunteerData.guideContents + '</div>');
            t.push('</div>');
        }
        t.push('	<div class="row in-span no-margin">');
        t.push('		<div class="span per20 btn">');
        t.push('\t\t\t<input type="hidden" name="' + loopName + '[' + index + '].volunteerActivitySn" value="' + d.volunteerActivitySn + '"/>');
        t.push('			<label class="title">봉사구분</label><div class="wrapBtn"><button type="button" class="btn btn-icon btn-add" data-button="add"></button><button type="button" class="btn btn-icon btn-remove" data-button="remove"></button><button type="button" class="btn btn-icon btn-reset" data-button="reset"></button></div>');
        t.push('		</div>');
        t.push('\t\t<label class="span per20 select"><select name="' + loopName + '[' + index + '].volunteerCategoryCodeSn" id=""  data-rel-id="' + loopName + '[' + index + ']" ' + (volunteerData.isRequired ? 'required' : '') + '>');
        t.push('			<option value="">봉사구분 선택</option>');
        for (i = 0; i < items['1147'].volunteerCategoryCodeList.length; i++) {
            selected = '';
            if (d.volunteerCategoryCodeSn === items['1147'].volunteerCategoryCodeList[i].recruitCodeSn) selected = 'selected';
            t.push('\t\t<option value="' + items['1147'].volunteerCategoryCodeList[i].recruitCodeSn + '" ' + selected + '>' + items['1147'].volunteerCategoryCodeList[i].recruitCodeName + '</option>');
        }
        t.push('		</select></label>');

        if (items['1148']) {
            t.push('	<label class="span per25 title devider">주관기관명</label>');
            t.push('\t<div class="span per35"><input maxlength="64" type="text" class="text" placeholder="\uC8FC\uAD00\uAE30\uAD00\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694." value="' + d.organization + '" name="' + loopName + '[' + index + '].organization"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1148'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>');
        }

        t.push('	</div>');

        if (items['1149'] || items['1150']) {
            t.push('<div class="row in-span half-margin">');
            if (items['1149']) {
                t.push('<label class="span per20 title">봉사기간</label>');
                t.push('<label class="span per35 date">');
                t.push('\t<input type="text" class="text date start" data-dates="' + loopName + '[' + index + '].volunteerDate:YMD" name="' + loopName + '[' + index + '].startDate" value="' + D.date(d.startDate) + '"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1149'].isRequired ? 'required' : '') + ' ' + disabled + '/>');
                t.push('\t<input type="text" class="text date end" data-dates="' + loopName + '[' + index + '].volunteerDate:END" name="' + loopName + '[' + index + '].endDate" value="' + D.date(d.endDate) + '"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1149'].isRequired ? 'required' : '') + ' ' + disabled + '/>');
                t.push('</label>');
            }
            if (items['1150']) {
                t.push('<label class="span per20 title ' + (items['1149'] ? 'devider' : '') + '" >\uBD09\uC0AC\uC2DC\uAC04</label>');
                t.push('<label class="span per25 label time"><input type="number" class="text" min="0" max="9999" name="' + loopName + '[' + index + '].time" value="' + d.time + '"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1150'].isRequired ? 'required' : '') + ' ' + disabled + '/></label>');
            }
            t.push('</div>');
        }

        if (items['1152'] || items['1153']) {
            t.push('<div class="row in-span half-margin">');
            if (items['1152']) {
                t.push('<label class="span per20 title">봉사지역</label>');
                t.push('<label class="span per35 select"><select name="' + loopName + '[' + index + '].locationCode" value="' + d.locationCode + '"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1152'].isRequired ? 'required' : '') + ' ' + disabled + '>');
                t.push('	<option value="">봉사활동 지역 선택</option>');
                for (i = 0; i < items['1152'].countryCodeList.length; i++) {
                    selected = '';
                    if (d.locationCode === items['1152'].countryCodeList[i].countryCode || !d.locationCode && items['1152'].countryCodeList[i].countryCode === 'KR') selected = 'selected';
                    t.push('\t\t<option value="' + items['1152'].countryCodeList[i].countryCode + '" ' + selected + '>' + items['1152'].countryCodeList[i].countryName + '</option>');
                }
                t.push('</select></label>');
            }

            if (items['1153']) {
                t.push('<label class="span title per20 ' + (items['1152'] ? 'devider' : '') + '">\uBC1C\uAE09\uBC88\uD638</label>');
                t.push('<div class="span ' + (items['1152'] ? 'per25' : 'per35') + '"><input maxlength="64" type="text" name="' + loopName + '[' + index + '].registNumber" value="' + d.registNumber + '" class="text" placeholder="\uBD09\uC0AC\uD65C\uB3D9 \uD655\uC778\uC11C \uBC1C\uAE09\uBC88\uD638"  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1153'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>');
            }
            t.push('</div>');
        }

        if (items['1151']) {
            t.push('<div class="row in-span half-margin">');
            t.push('	<label class="span per20 title">봉사내용</label>');
            t.push('\t<div class="span per80"><input maxlength="20000" type="text" name="' + loopName + '[' + index + '].comment" value="' + d.comment + '" class="text" placeholder="\uBD09\uC0AC\uD65C\uB3D9 \uC8FC\uC694\uB0B4\uC6A9\uC744 \uC0C1\uC138\uD788 \uC785\uB825\uD558\uC138\uC694."  data-rel-target="' + loopName + '[' + index + ']" ' + (items['1151'].isRequired ? 'required' : '') + ' ' + disabled + '/></div>');
            t.push('</div>');
        }

        t.push('</div>');

        return t.join('');
    },

    '174': function _(data) {
        // 기타서류
        var t = [],
            d = void 0,
            items = void 0,
            i = void 0,
            etcFileData = void 0,
            allRequired = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        etcFileData = items['174']; // items를 구하기 위해 fullData를 불러옴
        allRequired = WriteResumeUtil.isAllRequired(etcFileData.form); // 전체 필수인지 체크

        if (etcFileData.form.length) {
            t.push('<div class="subject" data-wrap="etcAttach" data-code="174">');
            t.push('\t<h2 class="h2 ' + (allRequired ? 'required' : '') + '">\uAE30\uD0C0\uC11C\uB958 \uCCA8\uBD80</h2>');
            if (etcFileData.guideContents) {
                t.push('<div class="wrapGuide" style="padding-left:64px;">');
                t.push('\t<div class="guide hasTitle etcFile">' + etcFileData.guideContents + '</div>');
                t.push('</div>');
            }
            // 기타서류는 파일이 여러개라서 여기서 루프를 돌아야 함
            for (i = 0; i < etcFileData.form.length; i++) {
                d = {};
                d.isRequired = etcFileData.form[i].isRequired;
                d.resumeAttachSn = etcFileData.form[i].resumeAttachSn;
                d.fileName = etcFileData.form[i].fileName;
                d.fileUid = etcFileData.form[i].fileUid;
                d.resumeAttachName = etcFileData.form[i].resumeAttachName;
                d.formFileName = etcFileData.form[i].formFileName;
                d.formFileUid = etcFileData.form[i].formFileUid;

                t.push(WriteResumeTemplate.etcAttach(d, i));
            }
            t.push('</div>');
        }

        return t.join('');
    },
    etcAttach: function etcAttach(d, index) {
        var t = [],
            loopName = void 0,
            items = void 0,
            etcFileData = void 0,
            allRequired = void 0;

        items = WriteResumeUtil.objectGenerator(WriteResume.fullData()[0].items);

        etcFileData = items['174']; // items를 구하기 위해 fullData를 불러옴
        allRequired = WriteResumeUtil.isAllRequired(etcFileData.form); // 전체 필수인지 체크
        loopName = 'etcFile';
        d.name = 'etcFile[' + index + '].fileUid';
        d.type = 'etcFile';
        d.index = index;

        t.push('<div class="row loop no-btn file">');
        t.push('	<div class="row in-span no-margin">');
        t.push('\t\t<label class="span per70 title ' + (!allRequired && d.isRequired ? 'required' : '') + '" style="line-height:1.5em;padding-top:9px">' + d.resumeAttachName + (d.formFileUid ? ' 양식을 다운 후' : '') + ' \uD30C\uC77C\uC744 \uCCA8\uBD80\uD558\uC138\uC694.</label>');

        t.push('\t\t<div class="span per30 middle-set span-file" data-required="' + d.isRequired + '" data-resumeAttachSn="' + d.resumeAttachSn + '" data-type="' + loopName + '[' + index + ']" style="text-align:right">');

        if (d.formFileUid) t.push('<a href="#" class="btn btn-add btn-filedown" data-button="downloadForm" data-formFileUid="' + d.formFileUid + '">\uC591\uC2DD \uB2E4\uC6B4\uB85C\uB4DC</a>'); //기타서류는 각각 양식에 맞는 resumeAttachSn이 필요함
        t.push('			<div class="formFileBtnSet">');

        if (d['fileUid']) {
            t.push(WriteResumeTemplate.attachFile(d, 70, 30));
        } else {
            t.push(WriteResumeTemplate.detachFile(loopName + '[' + index + ']', d.isRequired));
        }
        t.push('			</div>');
        t.push('		</div>');
        t.push('	</div>');
        t.push('</div>');

        return t.join('');
    },

    detachFile: function () {
        var cachingRequiredConstraints = {}; //각 이름에 해당되는 required 여부를 저장한다.
        var cachingDATARELVALUEConstraints = {}; //각 이름에 해당되는 data-relAttri 여부를 저장한다.
        return function (name, required, datareltarget) {
            var nameExceptIndex = void 0;
            if (!cachingRequiredConstraints[name]) cachingRequiredConstraints[name] = D.bool(required) || false;
            if (!cachingDATARELVALUEConstraints[name]) cachingDATARELVALUEConstraints[name] = datareltarget || '';

            nameExceptIndex = /\w*/.exec(name).length > 0 ? /\w*/.exec(name)[0] : name; // file[1]인경우 file만 추출
            return '<label class="file"><input type="file" data-type="' + nameExceptIndex + '" ' + (cachingRequiredConstraints[name] ? 'required' : '') + ' ' + (cachingDATARELVALUEConstraints[name] ? 'data-rel-target="' + cachingDATARELVALUEConstraints[name] + '" disabled' : ' ') + '/><span>\uD30C\uC77C\uCCA8\uBD80</span></label>';
        };
    }(),
    attachFile: function attachFile(data, linkPer, btnPer) {
        var t = [],
            d = void 0;

        if (!data) return '';

        d = data;

        t.push('<div class="row in-span no-margin file">');
        t.push('\t<div class="span per' + linkPer + ' ellipsis"><a title="' + d.fileName + '" data-button="linkFile" class="fileLink" target="_blank">' + d.fileName + '</a>');
        t.push('\t\t<input type="hidden" class="inputFileUid" value="' + d.fileUid + '" name="' + d.name + '">');
        t.push('	</div>');
        if (d.type === 'careerFile' || d.type === 'etcFile') {
            t.push('\t\t\t<input type="hidden" name="' + d.type + '[' + d.index + '].resumeAttachSn" value="' + d.resumeAttachSn + '">'); //이거는 파일이 있을때만 전송되야함
        } //이거는 파일이 있을때만 전송되야함
        t.push('\t<div class="span per' + btnPer + '" style="text-align:right"><button type="button" data-button="removeFile" class="btn btn-small btn-ng" data-fileSn="' + d.fileUid + '">\uC0AD\uC81C</button></div>');
        t.push('</div>');

        return t.join('');
    },

    '175': function _(data) {
        // 어학/자격/기타 추가질문설정
        return WriteResumeTemplate.additionalQuestion(data, 'etcBuilder'); // 추가사항
    },
    additionalQuestion: function additionalQuestion(data, type) {
        // 추가사항
        var t = [],
            i = void 0,
            d = void 0,
            d2 = void 0,
            j = void 0,
            name = void 0,
            relValue = void 0,
            textInput = void 0,
            index = void 0,
            longestText = void 0,
            isDropdown = void 0;

        if (!data) return '';

        // 항목에 따라 레이아웃 배치 및 타이틀이 다르다
        switch (type) {
            case 'introduction': // 자기소개서
            case 'competency':
                // 역량기술서
                t.push('<div class="subject no-padding ' + (data.isRequired ? 'required' : '') + '">');
                break;
            case 'experienceBuilder':
                // 경력 및 경험기술서
                t.push('<div class="subject">');
                t.push('\t<h2 class="h2 ' + (data.isRequired ? 'required' : '') + '">\uACBD\uD5D8 \uBC0F \uACBD\uB825\uAE30\uC220\uC11C</h2>');
                break;
            default:
                t.push('<div class="subject">');
                t.push('\t<h2 class="h2 ' + (data.isRequired ? 'required' : '') + '">\uCD94\uAC00\uC9C8\uBB38</h2>');
        }

        index = 0; // MULTITEXT name 정책때문에 사실상 이게 진짜 인덱스다

        if (data.guideContents) {
            t.push('<div class="wrapGuide">');
            t.push('\t<div class="guide">' + data.guideContents + '</div>');
            t.push('</div>');
        }

        for (i = 0; i < data.builder.length; i++) {
            d = data.builder[i];

            switch (d.type) {
                case 'SINGLE':
                    name = type + '[' + index + ']';
                    textInput = '';

                    for (j = 0; j < d.select.length; j++) {
                        if (d.select[j].textInputYn) relValue = d.select[j].builderItemSn;
                    } // linkedForm value값 지정

                    t.push('<div class="row in-span ' + (i === 0 ? 'no' : 'half') + '-margin">');
                    t.push('\t<div class="span per100 title ' + (d.isRequired ? 'required' : '') + '" for="' + name + '.selectedItem">' + d.question + '</div>');
                    t.push('\t<label class="span per50 select"><select name="' + name + '.selectedItem" id="' + name + '.selectedItem" ' + (d.isRequired ? 'required' : '') + ' data-rel-id="' + name + '.selectedItem" data-rel-type="with" data-rel-value="' + relValue + '">');
                    t.push('		<option value="">답변을 선택하세요.</option>');
                    for (j = 0; j < d.select.length; j++) {
                        t.push('<option value="' + d.select[j].builderItemSn + '" ' + (d.select[j].selectYn ? 'selected' : '') + '>' + d.select[j].builderItemName + '</option>');
                        if (d.select[j].textInputYn) textInput = d.select[j].textInput;
                    }
                    t.push('	</select></label>');
                    t.push('\t<div class="span per50" data-rel-target="' + name + '.selectedItem" data-rel-hide="true" style="display:none"><input type="text" name="' + name + '.textInput" value="' + (textInput || '') + '" class="text" maxlength="20000" required placeholder="\uAE30\uD0C0 \uB2F5\uBCC0\uC744 \uC785\uB825\uD558\uC138\uC694." data-rel-target="' + name + '.selectedItem" /></div>');
                    t.push('\t<input type="hidden" name="' + name + '.resumeBuilderSn" value="' + d.builderSn + '" />');
                    t.push('</div>');

                    index++;
                    break;
                case 'MULTI':
                    name = type + '[' + index + ']';

                    // 필수이고 최소값 없으면 1로 설정
                    if (d.isRequired && d.min === null) d.min = 1;

                    // 필요한 데이터 가공
                    longestText = 0;
                    for (j = 0; j < d.select.length; j++) {
                        if (d.select[j].textInputYn) relValue = d.select[j].builderItemSn; // linkedForm value값 지정
                        longestText = longestText < d.select[j].builderItemName.length ? d.select[j].builderItemName.length : longestText;
                    }

                    isDropdown = longestText > 26 ? false : true; // 글자가 26자를 넘을 경우 드랍다운을 해제한다.

                    t.push('<div class="row in-span ' + (i === 0 ? 'no' : 'half') + '-margin">');
                    t.push('\t<div class="span per100 title ' + (d.isRequired ? 'required' : '') + '">' + d.question + ' (' + (d.max || d.min ? (d.min ? '\uCD5C\uC18C ' + D.comma(d.min) + '\uAC1C' : '') + (d.max && d.min ? ', ' : '') + (d.max ? '\uCD5C\uB300 ' + D.comma(d.max) + '\uAC1C' : '') : '') + (d.min && d.max ? ' 선택가능' : d.min ? ' 이상 선택' : d.max ? '까지 선택가능' : '해당되는 항목 모두 선택가능') + ')</div>');
                    t.push('\t<div class="span ' + (isDropdown ? 'per50 dropdown' : 'per100') + '" data-dropdown ' + (d.min ? 'data-min="' + d.min + '"' : '') + ' ' + (d.max ? 'data-max="' + d.max + '"' : '') + ' data-required="' + d.isRequired + '">');
                    if (isDropdown) t.push('<button type="button">답변을 선택하세요.</button>');
                    t.push('\t\t<div class="dropdown-menu" data-rel-id="' + name + '.selectedItem" data-rel-type="with" data-rel-value="' + relValue + '">');
                    for (j = 0; j < d.select.length; j++) {
                        d2 = d.select[j];
                        if (d2.textInputYn) textInput = d2.textInput;
                        t.push('\t\t<label class="checkbox ellipsis" ' + (!isDropdown ? 'style="display:block;margin-left:0px;"' : '') + '><input type="checkbox" name="' + name + '.selectedItem" value="' + d2.builderItemSn + '" ' + (d2.selectYn ? 'checked' : '') + ' ' + (d.isRequired ? 'data-checked' : '') + ' data-textInput="' + (d2.textInputYn ? 'true' : 'false') + '" data-others="' + (d2.othersYn ? 'true' : 'false') + '" /><span class="label">' + d2.builderItemName + '</span></label>');
                    }
                    t.push('		</div>');
                    t.push('	</div>');
                    t.push('\t<div class="span per50" data-rel-target="' + name + '.selectedItem">');
                    if (isDropdown) {
                        // 드랍다운일 경우에만 노출
                        for (j = 0; j < d.select.length; j++) {
                            d2 = d.select[j];
                            if (!d2.textInputYn) t.push('<label class="selectedCheckbox"><input type="checkbox" data-name="' + name + '.selectedItem" value="' + d2.builderItemSn + '" ' + (d2.selectYn ? 'checked' : '') + ' /><span class="label">' + d2.builderItemName + '</span></label>');
                        }
                    }
                    t.push('\t\t<input type="text" name="' + name + '.textInput" value="' + (textInput ? textInput : '') + '" class="text" maxlength="20000" placeholder="\uAE30\uD0C0 \uB2F5\uBCC0\uC744 \uC785\uB825\uD558\uC138\uC694." data-rel-target="' + name + '.selectedItem" data-rel-hide="true" required disabled style="display:none" />');
                    t.push('	</div>');
                    t.push('\t<input type="hidden" name="' + name + '.resumeBuilderSn" value="' + d.builderSn + '" />');
                    t.push('</div>');

                    index++;
                    break;
                case 'TEXT':
                    name = type !== 'experienceBuilder' ? type + '[' + index + ']' : type; // 경험 및 경력기술서는 index가 필요없다.

                    t.push('<div class="row in-span ' + (i === 0 ? 'no' : 'half') + '-margin">');
                    t.push('\t<div class="span per100 title  ' + (d.isRequired ? 'required' : '') + '"><span class="title">' + d.question + '</span><span>' + (d.min || d.max ? ' (' + (d.min ? '\uCD5C\uC18C ' + D.comma(d.min) + '\uC790' : '') + (d.min && d.max ? ', ' : '') + (d.max ? '\uCD5C\uB300 ' + D.comma(d.max) + '\uC790 \uC785\uB825\uAC00\uB2A5' : '') + ')' : '') + '</span></div>');
                    t.push('	<div class="span per100">');

                    //maxlength 는 DB의 허용량인 20000자까지 가능한데/ data-maxlength 는 하단 글자 카운팅을 위한 속성인데 MRS-2061 코멘트에 따라 최대값 표시하지 않음
                    t.push('        <textarea data-maxlength="' + (d.max ? d.max : '') + '" data-minlength="' + (d.min ? d.min : '') + '" name="' + name + '.textInput" rows="5" class="textarea" ' + (d.isRequired ? 'required' : '') + ' maxlength="' + (d.max ? d.max : 20000) + '" minlength="' + (d.min ? d.min : '') + '" >' + d.textInput + '</textarea>');

                    t.push('\t<div class="pull-right limitLength"><b></b>' + (d.max ? '/' + d.max : '') + '</div>');
                    t.push('</div>');
                    t.push('\t<input type="hidden" name="' + name + '.resumeBuilderSn" value="' + d.builderSn + '" />');

                    t.push('</div>');
                    index++;
                    break;
                case 'MULTITEXT':
                    t.push('<div class="row in-span index">');
                    t.push('\t<h3 class="h3">' + d.question + '</h3>');
                    for (j = 0; j < d.builder.length; j++) {
                        name = type + '[' + index + ']';
                        t.push('<div class="span per100 title additional ' + (d.builder[j].isRequired ? 'required' : '') + '">' + d.builder[j].question + (d.builder[j].min || d.builder[j].max ? ' (' + (d.builder[j].min ? '\uCD5C\uC18C ' + D.comma(d.builder[j].min) + '\uC790' : '') + (d.builder[j].min && d.builder[j].max ? ', ' : '') + (d.builder[j].max ? '\uCD5C\uB300 ' + D.comma(d.builder[j].max) + '\uC790 \uC785\uB825\uAC00\uB2A5' : '') + ')' : '') + '</div>');
                        t.push('<div class="span per100">');

                        //maxlength 는 DB의 허용량인 20000자까지 가능한데/ data-maxlength 는 하단 글자 카운팅을 위한 속성인데 MRS-2061 코멘트에 따라 최대값 표시하지 않음
                        t.push('    <textarea name="' + name + '.textInput" rows="5" class="textarea" ' + (d.builder[j].isRequired ? 'required' : '') + ' data-maxlength="' + (d.builder[j].max ? d.builder[j].max : '') + '"  data-minlength="' + (d.builder[j].min ? d.builder[j].min : '') + '" maxlength="' + (d.builder[j].max ? d.builder[j].max : 20000) + '"  minlength="' + (d.builder[j].min ? d.builder[j].min : '') + '">' + d.builder[j].textInput + '</textarea>');

                        t.push('\t<div class="pull-right limitLength"><b></b>' + (d.builder[j].max ? '/' + d.builder[j].max : '') + '</div>');
                        t.push('</div>');
                        t.push('<input type="hidden" name="' + name + '.resumeBuilderSn" value="' + d.builder[j].builderSn + '" />');
                        index++;
                    }
                    t.push('</div>');
                    break;
            }
        }
        t.push('</div>');

        return t.join('');
    }
};
//# sourceMappingURL=writeResumeTemplate.js.map