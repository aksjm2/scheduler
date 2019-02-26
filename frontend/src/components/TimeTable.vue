<template>
	<div style="width:800px; margin:0 auto">
		<h1>Time Tables</h1>
		<table class="table table-bordered small" id="searchTable">
			<tr>
				<th scope="col" class="table-primary align-middle">학교</th>
				<td scope="col" class="align-middle">
					<vue-bootstrap-typeahead :data="univ_names" @hit="selectUniv($event)"/>
				</td>
				<th scope="col" class="table-primary align-middle">학과</th>
				<td scope="col" class="align-middle">
					<vue-bootstrap-typeahead :data="dept_names" v-model="selectedDeptNm" @hit="selectDept($event)"/>
				</td>
				<td rowspan="2" class="align-middle">
					<button type="button" class="btn btn-primary" autocomplate="off" @click="addSubject">
						추가
					</button>
				</td>
			</tr>
			<tr>
				<th scope="col" class="table-primary align-middle">과목</th>
				<td scope="col" colspan="3" class="align-middle">
					<vue-bootstrap-typeahead :data="subject_names" v-model="selectedSubject" @hit="selectSubject($event)"/>
				</td>
			</tr>
		</table>
		<div style="padding-bottom:4px;">
			<ul class="nav nav-pills">
				<li class="nav-item" style="padding-bottom:2px;" v-for="subject in subjectArr">
					<button type="button" class="btn" :style="{backgroundColor:subjectColor(subject.subject_nm)}" autocomplate="off" @click="removeSubject(subject.subject_code)">
						{{subject.subject_nm}}<a class="close">×</a>
					</button>&nbsp;
				</li>
			</ul>
		</div>
		<div>
			<table class="table small table-bordered" id="infoTable">
				<tr>
					<th class="table-primary align-middle">총 학점</th>
					<td class="align-middle">{{totalGrade}}</td>
					<th class="table-primary align-middle">총 시간표</th>
					<td class="align-middle">{{timeTableArr.length}}</td>
					<th class="table-primary align-middle">현재 시간표</th>
					<td class="align-middle">{{currentTableIdx+1}}</td>
				</tr>
			</table>
			<div style="float:right;padding-bottom:4px;">
				<button type="button" class="btn btn-primary align-right" @click="timeTables('prev')">
					이전
				</button>
				<button type="button" class="btn btn-primary align-right" @click="timeTables('next')">
					다음
				</button>
			</div>
		</div>
		<table class="table table-bordered small" id="timeTables">
			<thead>
				<tr class="table-info">
					<th style="width:15%">교시/요일</th>
					<th style="width:15%">월</th>
					<th style="width:15%">화</th>
					<th style="width:15%">수</th>
					<th style="width:15%">목</th>
					<th style="width:15%">금</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1교시</td>
					<td :style="{backgroundColor: subjectColor(timetable[0])}"><strong>{{timetable[0]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[8])}"><strong>{{timetable[8]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[16])}"><strong>{{timetable[16]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[24])}"><strong>{{timetable[24]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[32])}"><strong>{{timetable[32]}}</strong></td>
				</tr>
				<tr>
					<td>2교시</td>
					<td :style="{backgroundColor: subjectColor(timetable[1])}"><strong>{{timetable[1]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[9])}"><strong>{{timetable[9]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[17])}"><strong>{{timetable[17]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[25])}"><strong>{{timetable[25]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[33])}"><strong>{{timetable[33]}}</strong></td>
				</tr>
				<tr>
					<td>3교시</td>
					<td :style="{backgroundColor: subjectColor(timetable[2])}"><strong>{{timetable[2]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[10])}"><strong>{{timetable[10]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[18])}"><strong>{{timetable[18]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[26])}"><strong>{{timetable[26]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[34])}"><strong>{{timetable[34]}}</strong></td>
				</tr>
				<tr>
					<td>4교시</td>
					<td :style="{backgroundColor: subjectColor(timetable[3])}"><strong>{{timetable[3]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[11])}"><strong>{{timetable[11]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[19])}"><strong>{{timetable[19]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[27])}"><strong>{{timetable[27]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[35])}"><strong>{{timetable[35]}}</strong></td>
				</tr>
				<tr>
					<td>5교시</td>
					<td :style="{backgroundColor: subjectColor(timetable[4])}"><strong>{{timetable[4]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[12])}"><strong>{{timetable[12]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[20])}"><strong>{{timetable[20]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[28])}"><strong>{{timetable[28]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[36])}"><strong>{{timetable[36]}}</strong></td>
				</tr>
				<tr>
					<td>6교시</td>
					<td :style="{backgroundColor: subjectColor(timetable[5])}"><strong>{{timetable[5]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[13])}"><strong>{{timetable[13]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[21])}"><strong>{{timetable[21]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[29])}"><strong>{{timetable[29]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[37])}"><strong>{{timetable[37]}}</strong></td>
				</tr>
				<tr>
					<td>7교시</td>
					<td :style="{backgroundColor: subjectColor(timetable[6])}"><strong>{{timetable[6]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[14])}"><strong>{{timetable[14]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[22])}"><strong>{{timetable[22]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[30])}"><strong>{{timetable[30]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[38])}"><strong>{{timetable[38]}}</strong></td>
				</tr>
				<tr>
					<td>8교시</td>
					<td :style="{backgroundColor: subjectColor(timetable[7])}"><strong>{{timetable[7]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[15])}"><strong>{{timetable[15]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[23])}"><strong>{{timetable[23]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[31])}"><strong>{{timetable[31]}}</strong></td>
					<td :style="{backgroundColor: subjectColor(timetable[39])}"><strong>{{timetable[39]}}</strong></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>


<script>
	export default{
		created () {
			/* 학교 정보 */
			this.$http.get('/api/univ')
			.then((response) => {
				var resData = response.data;
				var nameArr = [];
				var codeArr = [];

				resData.forEach(function(data){
					nameArr.push(data.univ_nm);
					codeArr.push(data.univ_code);
				})

				this.univ_names = nameArr;
				this.univ_codes = codeArr;
			});
		},
		data () {
			return {
				univ_names : [],
				univ_codes : [],
				dept_names : [],
				dept_codes : [],
				subject_names : [],
				subject_codes : [],
				grades : [],
				times : [],
				timetable : new Array(40),
				selectedUniv : "",
				selectedDept : "",
				selectedSubject : "",
				subjectArr : new Array(),
				totalGrade : 0,
				timeTableArr : new Array(),
				currentTableIdx : 0,
				colors: ['#DD4132', '#FE840E', '#00539C', '#E8B5CE', '#D2C29D', '#BD3D3A', '#F1EA7F', '#006E6D', '#BE9EC9', '#485167']
			}
		},
		methods: {
			validateGrade(vue, grade){
				/*총 학점 점검. 21학점 이하인 경우에만 허용.*/
				return new Promise(function (resolve, reject){
					vue.totalGrade += grade;
					if(vue.totalGrade > 21){
						vue.totalGrade -= grade;
						alert("21학점을 초과하여 추가할 수 없습니다.");
						reject();
					}else{
						resolve();
					}
				})
			},
			duplicateCheck(vue, subject_code, grade){
				/*과목 중복 체크*/
				return new Promise(function (resolve, reject){
					vue.subjectArr.forEach(function(data){
						if(data.subject_code == subject_code){
							vue.totalGrade -= grade;
							alert("과목을 중복하여 추가할 수 없습니다.");
							reject();
						}
					})
					resolve();
				})
			},
			addSubject(event){
				if(!this.selectedSubject){
					alert("과목을 선택해야 합니다.")
					return;
				}
				var vue = this;
				var selectedGrade = parseInt(this.selectedSubject.grade, 10);
				var selectedCode = vue.selectedSubject.subject_code;
				this.validateGrade(vue, selectedGrade)
				.then(
					vue.duplicateCheck(vue, selectedCode, selectedGrade)
					.then(function(){
						vue.subjectArr.push(vue.selectedSubject);
					})
					.then(function(){
						if(vue.timeTableArr.length == 0){
							vue.makeTimeTable(0);
						}else{
							var tempArr = vue.timeTableArr.slice();
							vue.timeTableArr = new Array();
							vue.makeTimeTable(0);
							
							if(vue.timeTableArr.length == 0){
								alert("기존 시간표에 중복되어 추가할 수 없습니다.");
								vue.totalGrade -= selectedGrade;
								vue.subjectArr.splice(vue.subjectArr.indexOf(vue.selectedSubject),1);
								vue.timeTableArr = tempArr.slice();
							}	
						}
						
						vue.timetable = vue.timeTableArr[vue.currentTableIdx];
						vue.$forceUpdate();
					})
				);
			},
			selectUniv(event){
				/* 학과 정보 */
				var id = this.univ_codes[this.univ_names.indexOf(event)];
				this.selectedUniv = id;

				this.$http.get(`/api/dept/${id}`)
				.then((response) => {
					var resData = response.data;
					var nameArr = [];
					var codeArr = [];

					resData.forEach(function(data){
						nameArr.push(data.dept_nm);
						codeArr.push(data.dept_code);
					})

					this.dept_names = nameArr;
					this.dept_codes = codeArr;
				})
				this.resetTimeTable();
			},
			selectDept(event){
				/*과목 정보*/
				var dept_code = this.dept_codes[this.dept_names.indexOf(event)];
				this.selectedDept = dept_code;

				this.$http.get(`/api/subject/${this.selectedUniv}/${this.selectedDept}`)
				.then((response) => {
					var resData = response.data;
					var nameArr = [];
					var codeArr = [];
					var gradeArr = [];
					var timeArr = [];

					resData.forEach(function(data){
						nameArr.push(data.subject_nm);
						codeArr.push(data.subject_code);
						gradeArr.push(data.grade);
						timeArr.push(data.subject_time);
					});

					this.subject_names = nameArr;
					this.subject_codes = codeArr;
					this.grades = gradeArr;
					this.times = timeArr;
				})
			},
			selectSubject(event){
				this.selectedSubject = null;
				/*과목 선택정보*/
				var idx = this.subject_names.indexOf(event)
				var subject_nm = event;
				var subject_code = this.subject_codes[idx];
				var subject_time = this.times[idx];
				var grade = this.grades[idx];

				this.selectedSubject = { 
											"subject_nm" : subject_nm,
											"subject_code" : subject_code,
											"subject_time" : subject_time,
											"grade" : grade
										}
			},
			makeTimeTable(idx, timetable){
				var vue = this;
				if(idx > this.subjectArr.length-1){
					vue.timeTableArr.push(timetable);
					return;
				}else{
					if(!timetable){
						timetable = new Array(40);
					}
					var subject = this.subjectArr[idx];
					subject.subject_time.forEach(function(time){
						var ttable = timetable.slice();
						
						var insertFlag = true;
						
						time.forEach(function(data){
							if(ttable[data-1]){
								insertFlag = false;
							}
						})

						if(insertFlag){
							time.forEach(function(data){
								ttable[data-1] = subject.subject_nm;
							})
							vue.makeTimeTable(idx+1, ttable);
							return;
						}
					})
				}
			},
			timeTables(flag){
				if(flag === 'next'){
					this.currentTableIdx++;
					if(this.currentTableIdx > this.timeTableArr.length){
						alert('마지막 시간표 입니다.');
						this.currentTableIdx--;
						return;
					}else{
						this.timetable = this.timeTableArr[this.currentTableIdx];
						return;
					}
				}else if(flag === 'prev'){
					this.currentTableIdx--;
					if(this.currentTableIdx < 0){
						alert('첫 시간표 입니다.');
						this.currentTableIdx++;
						return;
					}else{
						this.timetable = this.timeTableArr[this.currentTableIdx];
						return;
					}
				}
			},
			removeSubject(subjectCode){
				if(this.subjectArr.length == 1){
					alert("최소 한 개 이상의 과목이 존재해야 합니다.");
					return;
				}
				var vue = this;
				var subject;
				this.subjectArr.forEach(function(data){
					if(data.subject_code === subjectCode){
						vue.subjectArr.splice(vue.subjectArr.indexOf(data),1);
						subject = data;
						return;
					}
				});
				this.timeTableArr = new Array();
				this.currentTableIdx = 0;
				this.totalGrade -= subject.grade;
				this.makeTimeTable(0);

				if(this.timeTableArr.length == 0){
					this.timetable = new Array(40);
				}else{
					this.timetable = this.timeTableArr[this.currentTableIdx];
				}

				this.$forceUpdate();
			},
			subjectColor(subjectNm){
				if(this.subjectArr.length > 0){
					var idx;
					this.subjectArr.forEach(function(data, index){
						if(data.subject_nm == subjectNm) idx = index;
					})
					var color = this.colors[idx];
					return color;
				}else{
					return -1;
				}
			},
			resetTimeTable(){
				this.dept_names = new Array();
				this.dept_codes = new Array();
				this.subject_names = new Array();
				this.subject_codes = new Array();
				this.grades = new Array();
				this.times = new Array();
				this.timetable = new Array(40);
				this.selectedDept = "";
				this.selectedDeptNm = "";
				this.selectedSubject = "";
				this.subjectArr = new Array();
				this.totalGrade = 0;
				this.timeTableArr = new Array();
				this.currentTableIdx = 0;
				$("td").css("backgroundColor", "");
			}
		}
	}
</script>