'use strict';

var Timeline = function () {
	var fn = void 0,
	    target = void 0,
	    data = void 0,
	    viewData = void 0,
	    fontWidth = void 0,
	    blockHeight = void 0,
	    labelHeight = void 0,
	    showData = void 0;

	fontWidth = 11;

	// 화면을 그리는데 필요한 기본 데이터
	viewData = {
		startYear: null,
		endYear: null,
		yearLength: 0,
		maxWidth: 1030,
		width: 0,
		lastWidth: 0,
		lastStart: {
			index: 0,
			year: 0
		},
		headLabel: {}
	};

	// 그래프 등급별 높이
	// 레벨 0 : 수상
	// 레벨 1 : 고등학교, 인턴, 첫직장 (첫직장이 대학교 재학기간과 겹칠 수 있어서 낮춤)
	// 레벨 2 : 대학교, 직장 짝수
	// 레벨 3 : 대학원, 직장 홀수
	// 레벨 4 : 군대
	// 레벨 5 : 해외여행
	blockHeight = [0, 20, 25, 30, 35, 40];

	// 깃발 등급별 상대높이
	labelHeight = [[60, 80, 100], // 레벨 1 : 고등학교/대학교/대학원/인턴/직장
	[120, 140], // 레벨 2 : 군대/해외경험
	[160, 185, 210] // 레벨 3 : 수상
	];

	fn = {
		init: function init(_target, _data) {
			var t = [];
			if (!_target) throw new Error('타임라인을 그릴 타겟을 입력하세요.');

			target = _target;
			data = _data.graphViewList;
			showData = _data.showData;

			if (data && data.length > 0) fn.updateBlindData();

			if (!data || data.length === 0) return; // 데이터가 전혀 없는 경우

			// 데이터 정리
			fn.updateViewData();
			fn.updateRealData();

			// 템플릿 생성 후 바로 삽입
			t.push('<h2 class="finalH2 border">지원서 확인</h2>');
			t.push('<p class="finalDesc">');
			t.push('	지원서 항목 기간입력이 올바르게 되었는지 아래 인포그래픽을 참고하여 마지막으로 한 번 더 확인해 주십시오.');
			if (showData['17']) t.push('<br>NCS항목은 인포그래픽에 표현되지 않습니다.');
			t.push('</p>');

			t.push('<div class="infographic basic"><div data-type="timeline" class="timeline">' + fn.draw() + '</div></div>');

			$(target).html(t.join(''));
		},

		// blind 정보를 넣어서 데이터를 정리하기 전에 인포그래픽에 나오지 않을 정보를 선별한다.
		updateBlindData: function updateBlindData() {
			var i = void 0,
			    d = void 0;

			if (!data) return; //데이터가 없을때

			for (i = 0; i >= 0 && i < data.length; i++) {
				d = data[i];
				d.title = d.title === null ? '' : d.title;
				switch (d.code) {
					case 'HIGHSCHOOL':
						// 고등학교
						if (!showData['1031']) d.title = '-'; //학교명 프린트안함
						if (!(showData['140'] && showData['1032'])) data.splice(i, 1); // 고등학교, 재학기간 프린트 안함
						else viewData.headLabel[d.code] = true;
						break;
					case 'COLLEGE': // 전문학사
					case 'BACHELOR':
						// 학사
						if (!showData['1042']) d.title = '-'; //학교명 프린트안함
						if (!(showData['141'] && showData['1039'])) data.splice(i, 1); // 대학교, 재학기간 프린트안함
						else viewData.headLabel[d.code] = true;
						break;
					case 'MASTER': // 석사
					case 'DOCTER':
						// 박사
						if (!showData['1056']) d.title = '-'; //학교명 프린트안함
						if (!(showData['142'] && showData['1053'])) data.splice(i, 1); // 대학원, 재학기간  프린트안함
						else viewData.headLabel[d.code] = true;
						break;
					case 'INTERN': // 인턴
					case 'CAREER':
						// 경력
						if (!showData['1117']) d.title = '-'; //직장명 프린트안함
						if (!(showData['153'] && showData['1118'])) data.splice(i, 1); // 대학원, 재학기간  프린트안함
						else viewData.headLabel[d.code] = true;
						break;
					case 'MILITARY':
						// 병역
						if (!showData['138']) data.splice(i, 1); // 병역사항 프린트안함
						else viewData.headLabel[d.code] = true;
						break;
					case 'AWARD':
						// 수상이력
						if (!showData['170']) data.splice(i, 1); // 수상이력  프린트안함
						else viewData.headLabel[d.code] = true;
						break;
					case 'OVERSEA_EXPERIENCE':
						// 해외경험
						if (!showData['167']) data.splice(i, 1); // 해외경험 프린트안함
						else viewData.headLabel[d.code] = true;
						break;
				}
			}
		},

		// viewData를 업데이트한다.
		updateViewData: function updateViewData() {
			var v = void 0,
			    i = void 0,
			    d = void 0,
			    thisYear = void 0,
			    titleWidth = void 0,
			    yearWidth = void 0,
			    yearGap = void 0;

			v = viewData;

			for (i = 0; i < data.length; i++) {
				d = data[i];
				if (i === 0 || v.startYear > d.startDate) v.startYear = d.startDate;
				if (i === 0 || v.endYear < d.endDate) v.endYear = d.endDate;
				if (i === 0 || v.lastStart.year < d.startDate) {
					v.lastStart.index = i;
					v.lastStart.year = d.startDate;
				}
			}

			/********************************************
    * 출력할 년도를 정리하는 코드
    * *****************************************/
			v.startYear = Number(D.date(v.startYear, 'yyyy')); // 데이터상의 시작년도
			v.endYear = Number(D.date(v.endYear, 'yyyy')); // 데이터상의 마지막년도
			v.lastStart.year = Number(D.date(v.lastStart.year, 'yyyy')); // 마지막 항목이 시작하는 연도

			thisYear = D.date(new Date(), 'yyyy'); // 올해를 구한다
			if (v.endYear < thisYear) v.endYear = thisYear; // 마지막년도가 올해보다 빠르면 마지막년도를 올해로 바꾼다.

			v.yearLength = v.endYear - v.startYear + 1; // 해당 년도까지 포함하기 때문에 1을 더함

			data[v.lastStart.index].title = data[v.lastStart.index].title || ''; //title이 없는 항목이 있을 수 있기 때문에 처리

			/********************************************
    * 년도별 width를 정리하는 코드
    * *****************************************/
			yearWidth = v.maxWidth / v.yearLength; // 일단 단순하게 나누어서 가로를 구함
			titleWidth = data[v.lastStart.index].title.length * fontWidth; // 마지막 항목 글자 개수만큼 가로를 구함
			yearGap = Number(D.date(data[v.lastStart.index].endDate, 'yyyy')) - Number(D.date(data[v.lastStart.index].startDate, 'yyyy'));

			if (titleWidth > yearGap * yearWidth) {
				// 마지막 타이틀이 해당년도 길이보다 짧으면 년도를 1년 추가한다
				v.endYear++;
				v.yearLength++;
				yearWidth = v.maxWidth / v.yearLength;
			}

			// 소숫점이 0.5보다 크면 올려서, 작으면 버려서 년도별 가로를 정한다.
			if (yearWidth - parseInt(yearWidth) > 0.5) v.width = Math.ceil(yearWidth);else v.width = Math.floor(yearWidth);

			// 버리거나 올려서 남거나 모자란 픽셀은 마지막 년도에 배정한다.
			v.lastWidth = v.maxWidth - v.width * v.yearLength + v.width;
		},

		// 실제로 뿌릴 데이터를 정리하는 함수
		updateRealData: function updateRealData() {
			var v = void 0,
			    i = void 0,
			    d = void 0,
			    startYear = void 0,
			    endYear = void 0,
			    startMonth = void 0,
			    endMonth = void 0,
			    fullYear = void 0,
			    count = void 0,
			    countLabel = void 0;

			v = viewData;

			// 블럭이 몇 번 나왔는지 홀짝을 구하기 위한 카운트
			count = {
				college: 0, // 전문학사, 학사
				intern: 0, // 인턴, 아르바이트(아르바이트는 일단 안쓰기로 함)
				career: 0 // 직장
			};

			// 각 레벨의 라벨이 몇 번 나왔는지 카운트
			countLabel = [0, 0, 0];

			for (i = 0; i < data.length; i++) {
				d = data[i];

				if (['AWARD', 'HIGHSCHOOL', 'INTERN', 'COLLEGE', 'BACHELOR', 'MASTER', 'DOCTER', 'MILITARY', 'OVERSEA_EXPERIENCE', 'CAREER'].indexOf(d.code) === -1) {
					d.cls = '';
					d.left = 0;
					d.zIndex = 0;
					d.width = 0;
					d.height = 0;
					d.color = '';
					d.startDate = '';
					d.endDate = '';
					d.labelHeight = 0;
					d.title = '';
					continue;
				}

				startYear = Number(D.date(d.startDate, 'yyyy'));
				endYear = Number(D.date(d.endDate, 'yyyy'));
				startMonth = Number(D.date(d.startDate, 'MM'));
				endMonth = Number(D.date(d.endDate, 'MM'));
				fullYear = endYear - startYear > 1 ? endYear - startYear - 1 : 0; // 1월부터 12월까지 꽉찬 해가 몇 해인지 산출

				// 가로 위치를 구한다.
				d.left = function () {
					var left = 0;
					left += (startYear - v.startYear) * v.width;
					left += (startMonth - 1) * (v.width / 12);
					return left + 1; // 투명때문에 라벨 막대가 겹치면 선이 있는 것처럼 보여서 1픽셀 옮김
				}();

				// 실제 길이를 구한다.
				d.width = function () {
					var width = 0;
					if (d.code === 'AWARD') width = 1;else {
						if (startYear === endYear) {
							// 시작과 마감해가 같다면
							width += (endMonth - startMonth + 1) * (v.width / 12); // 시작년도 월계산
						} else {
							width += (12 - startMonth + 1) * (v.width / 12); // 시작년도 월계산
							width += fullYear * v.width; // 중간년도 년계산
							width += endMonth * (v.width / 12); // 종료년도 월계산
						}
					}
					return width - 1; // 투명때문에 라벨 막대가 겹치면 선이 있는 것처럼 보여서 1픽셀 옮김
				}();

				// 색상을 정한다
				d.color = function () {
					var color = void 0;

					switch (d.code) {
						case 'HIGHSCHOOL':
							// 고등학교
							color = 'rgba(110, 207, 227, 0.8)';
							break;
						case 'COLLEGE': // 전문학사
						case 'BACHELOR':
							// 학사
							if (count.college % 2 === 0) color = 'rgba(4, 161, 104, 0.8)';else color = 'rgba(0, 123, 78, 0.8)';
							break;
						case 'MASTER':
							// 석사
							color = 'rgba(255, 67, 193, 0.8)';
							break;
						case 'DOCTER':
							// 박사
							color = 'rgba(255, 47, 130, 0.8)';
							break;
						case 'MILITARY':
							// 병역
							color = 'rgba(123, 174, 2, 0.8)';
							break;
						case 'OVERSEA_EXPERIENCE':
							// 해외경험
							color = 'rgba(255, 197, 0, 0.8)';
							break;
						case 'AWARD':
							// 수상이력
							color = 'rgba(104, 104, 104, 0.4)';
							break;
						case 'INTERN':
							// 인턴
							if (count.intern % 2 === 0) color = 'rgba(255, 132, 0, 0.8)';else color = 'rgba(255, 103, 20, 0.8)';
							break;
						case 'CAREER':
							// 경력
							if (count.career % 2 === 0) color = 'rgba(255, 32, 55, 0.7)';else color = 'rgba(246, 0, 17, 0.8)';
							break;
					}

					return color;
				}();

				// 높이 레벨을 정한다
				d.height = function () {
					var index = void 0;

					switch (d.code) {
						case 'AWARD':
							// 수상이력
							index = 0;
							break;
						case 'HIGHSCHOOL': // 고등학교
						case 'INTERN':
							// 인턴
							index = 1;
							break;
						case 'COLLEGE': // 전문학사
						case 'BACHELOR':
							// 학사
							index = 2;
							break;
						case 'MASTER': // 석사
						case 'DOCTER':
							// 박사
							index = 3;
							break;
						case 'MILITARY':
							// 병역
							index = 4;
							break;
						case 'OVERSEA_EXPERIENCE':
							// 해외경험
							index = 5;
							break;
						case 'CAREER':
							// 경력
							if (count.career === 0) index = 1; // 첫직장은
							else if (count.career % 2) index = 2; // 짝수
								else index = 3; // 홀수
							break;
					}

					return blockHeight[index];
				}();

				// 타임라인 z-index
				d.zIndex = function () {
					var zIndex = void 0;

					switch (d.code) {
						case 'OVERSEA_EXPERIENCE':
							// 해외경험
							zIndex = 0;
							break;
						case 'MILITARY':
							// 병역
							zIndex = 1;
							break;
						case 'HIGHSCHOOL':
							// 고등학교
							zIndex = 2;
							break;
						case 'COLLEGE': // 전문학사
						case 'BACHELOR':
							// 학사
							zIndex = 3;
							break;
						case 'MASTER': // 석사
						case 'DOCTER':
							// 박사
							zIndex = 4;
							break;
						case 'INTERN':
							// 인턴
							zIndex = 5;
							break;
						case 'CAREER':
							// 경력
							zIndex = 6;
							break;
						case 'AWARD':
							// 수상이력
							zIndex = 7;
							break;
					}

					return zIndex;
				}();

				// 라벨 클래스를 정한다
				d.cls = function () {
					var cls = void 0;

					switch (d.code) {
						case 'HIGHSCHOOL':
							// 고등학교
							cls = 'highschool';
							break;
						case 'COLLEGE': // 전문학사
						case 'BACHELOR':
							// 학사
							if (!count.college % 2) cls = 'collegeOdd'; // 홀수
							else cls = 'collegeEven'; // 짝수
							break;
						case 'MASTER':
							// 석사
							cls = 'master';
							break;
						case 'DOCTER':
							// 박사
							cls = 'doctor';
							break;
						case 'INTERN':
							// 인턴
							cls = 'intern';
							break;
						case 'CAREER':
							// 경력
							if (!count.career % 2) cls = 'careerOdd'; // 홀수
							else cls = 'careerEven'; // 짝수
							break;
						case 'MILITARY':
							// 병역
							cls = 'military';
							break;
						case 'OVERSEA_EXPERIENCE':
							// 해외경험
							cls = 'foreign';
							break;
						case 'AWARD':
							// 수상이력
							cls = 'award';
							break;
					}

					return cls;
				}();

				// 라벨 높이 레벨을 정한다
				d.labelHeight = function () {
					var index = void 0,
					    height = void 0;

					switch (d.code) {
						case 'HIGHSCHOOL': // 고등학교
						case 'COLLEGE': // 전문학사
						case 'BACHELOR': // 학사
						case 'MASTER': // 석사
						case 'DOCTER': // 박사
						case 'INTERN': // 인턴
						case 'CAREER':
							// 경력
							index = 0; // labelHeight 레벨 1
							break;
						case 'MILITARY': // 병역
						case 'OVERSEA_EXPERIENCE':
							// 해외경험
							index = 1; // labelHeight 레벨 2
							break;
						case 'AWARD':
							// 수상이력
							index = 2; // labelHeight 레벨 3
							break;
					}

					height = labelHeight[index][countLabel[index] % labelHeight[index].length]; // labelHeight에서 데이터를 가져옴
					countLabel[index]++; // 라벨 카운트 업데이트

					return height;
				}();

				// 카운트를 업데이트한다
				switch (d.code) {
					case 'COLLEGE': // 전문학사
					case 'BACHELOR':
						// 학사
						count.college++;
						break;
					case 'INTERN':
						// 인턴
						count.intern++;
						break;
					case 'CAREER':
						// 경력
						count.career++;
						break;
				}
			}
		},
		drawGuide: function drawGuide() {
			var t = [],
			    t2 = [],
			    d = void 0;

			d = viewData.headLabel;

			t.push('<div class="guidelabel">');
			if (d.MILITARY) t.push('<span class="majorLabel military">병역사항</span>');
			if (d.OVERSEA_EXPERIENCE) t.push('<span class="majorLabel foreign">해외경험</span>');
			if (d.AWARD) t.push('<span class="majorLabel award">수상경력</span>');
			if (d.HIGHSCHOOL || d.BACHELOR || d.MASTER || d.DOCTER || d.INTERN || d.CAREER) {
				t.push('<span class="majorLabel schoolCareer">');
				if (d.HIGHSCHOOL || d.BACHELOR || d.MASTER || d.DOCTER) t2.push('학력사항');
				if (d.INTERN || d.CAREER) t2.push('경력사항');
				t.push(t2.join(' & '));
				t.push('</span>');
				t.push('<ul class="wrapMinorLabel">');
				if (d.HIGHSCHOOL) t.push('<li class="minorLabel highschool">고등학교</li>');
				if (d.BACHELOR) t.push('<li class="minorLabel bachelor">대학교</li>');
				if (d.MASTER) t.push('<li class="minorLabel master">석사</li>');
				if (d.DOCTER) t.push('<li class="minorLabel docter">박사</li>');
				if (d.INTERN) t.push('<li class="minorLabel intern">인턴</li>');
				if (d.CAREER) t.push('<li class="minorLabel career">직장</li>');
				t.push('</ul>');
			}
			t.push('</div>');

			return t.join(' ');
		},
		draw: function draw() {
			var t = [],
			    i = void 0,
			    d = void 0,
			    v = void 0,
			    year = void 0;
			v = viewData;

			t.push(fn.drawGuide());
			t.push('<div class="graph">');
			for (i = 0; i < data.length; i++) {
				d = data[i];
				t.push('<div class="block ' + d.cls + '" style="left:' + d.left + 'px;z-index:' + d.zIndex + ';width:' + d.width + 'px;border-top-width:' + d.height + 'px;border-top-color:' + d.color + ';" title="' + d.title + ', ' + D.date(d.startDate, Common.dateFormat(d.dateInputFormat).format) + ' ~ ' + D.date(d.endDate, Common.dateFormat(d.dateInputFormat).format) + '">');
				t.push('\t<span class="label" style="height:' + d.labelHeight + 'px;border-left-color:' + d.color + '"><span class="ellipsis">' + d.title + '</span></span>');
				t.push('</div>');
			}
			t.push('</div>');
			t.push('<div class="yearList clearfix">');
			for (i = v.startYear; i <= v.endYear; i++) {
				year = '\'' + i.toString().substring(2, 4); // 앞에 두 자리는 없앤다.
				t.push('<div class="year" style="width:' + (i < v.endYear ? v.width : v.lastWidth) + 'px">');
				t.push(year);
				t.push('</div>');
			}
			t.push('</div>');

			return t.join('');
		}
	};

	return {
		init: fn.init
	};
}();
//# sourceMappingURL=timeline.js.map