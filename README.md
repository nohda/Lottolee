###  electron 에서 파일시스템 작성 시 
```javascript
var test = 'file system example!!'; 
var fs = window.require('fs'); // react에서 해당 기능을 쓸 수 없지만 electron에서 작성하게끔 해줌

// string 파일 쓸 시 
fs.writeFile('./text1.txt', test, 'utf8', function(error){ console.log('write end') });

// json 파일 쓸 시
fs.writeFile('./text1.txt', JSON.stringify(data), 'utf8', function(error){ console.log('write end') });
```

###  // 스크롤은 메뉴,footer는 막기
// 바디만 활성화
// 참고소스
https://code-study.tistory.com/14
https://jaweb.tistory.com/entry/%ED%8A%B9%EC%A0%95%EC%98%81%EC%97%AD%EB%A7%8C-%EC%84%B8%EB%A1%9C%EB%A1%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4%EB%90%98%EA%B2%8C-%ED%95%98%EB%8A%94-%EC%86%8C%EC%8A%A4



### 같은 결과임(옵션이므로)
db.each(sql,(err,row)=>{...}
db.each(sql,[],(err,row)=>{...}



### npm root -g
글로벌 옵션 붙일때 어디 폴더에 설치되어있는지 확인 명령어


### javascript에서 '' 은 한줄짜리에서
``은 두줄이상


### 오타 항상 주의
```javascript
export default function AlarmHistoryTab(props) {
<AlarmTable datas={props.datas}></AlarmTable> 
// 요기서 {props.datas}를 해야되는걸 {props.data}로 한참 오류났었음
}

function Alarm(){
    return (
      <AlarmHistoryTab datas={DATAS}></AlarmHistoryTab>
    );
}
```

###  해결 이슈 (sqlite3 문제)-------------------------------------------------
1. npm i -g windows-build-tools : 윈도우 다른 언어 지원 라이브러리

2. npm i -g node-pre-gyp 

3. Rebuild (https://stackoverflow.com/questions/32504307/how-to-use-sqlite3-module-with-electron)

"scripts": {
   "postinstall": "install-app-deps"
   ...
}

npm install --save-dev electron-builder
npm install --save sqlite3
npm run postinstall


4. 코드 수정 (react의 경우에서만 쓰이는듯함) 
전 : const sqlite3 = require('sqlite3').verbose();
후 : const sqlite3 = window.require('sqlite3');

-------------------------------------------------------------------------

### 다른 js 파일 가져올때 해야될것

[좋은 예시 socket.js, websocketHeartbeatJS.js] 경우 

1. 기본 생성자에 export default를 해준다
전 : function WebsocketHeartbeatJs({ ......... })
후 : export default function WebsocketHeartbeatJs({ ......... })


2. import를 해주자 (생성자에 맞게끔) 
:new WebsocketHeartbeatJs 로 쓰기 때문에 import WebsocketHeartbeatJs 로 해준것이다
 ```javascript
import WebsocketHeartbeatJs from './websocketHeartbeatJs'
let websocketHeartbeatJS = new WebsocketHeartbeatJs({url: 'ws://10.101.33.63:7681'});
```


- 명심하자 electron은 client side와 web side를 다 가진 녀석이다




### 노드에서 json 접근 방식
import edis from '../edis.json'; 
edis["DCUconfig"][0]["SensorSetting"][0] 이런식으로 접근하면 됨


 client side js에서는
 ```javascript
readData("edis.json",createDBTable);
```

```javascript
function readData(file, myFunction){
  console.log("readData() start...");
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET",file,true);
  rawFile.onreadystatechange = function(){
    if(rawFile.readyState == 4){
      if(rawFile.status == 200 || rawFile.status == 0){
        myFunction(rawFile);
      }
    }
  };
  rawFile.send(null);
}
```


### 팝업창 열시 
window.open("./intro.html",'_blank');


### 배포 시에는 public/electron.js도 변경

개발 :  logoWindow.loadURL(`file://${__dirname}/../public/intro.html`);
배포 :  logoWindow.loadURL(`file://${__dirname}/intro.html`);


### chart.js 에서 chart 크기 변경 시 
// css 를 설정안하더라도 Bar에 클래스 이름을 정하는게 아닌 div로 씌워줘야된다


전 : (크기 변경 불가능)
```javascript 
      <Bar className="DeviationBarGraph" height={400} data={data} options={{ maintainAspectRatio: false }}></Bar>
```

후 : (크기 변경 가능)
```javascript
    <div className="DeviationBarGraph" >
      <Bar  height={400} data={data} options={{ maintainAspectRatio: false }}></Bar>
    </div>
```


### material UI css 적용법

```javascript
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
});


<Dialog classes={{ paper: classes.dialogPaper }} > </Dialog>

```

### child에게 array 넘겨주고 출력시키는 예시 ###

```javascript
import React from 'react';
import { View, Radio } from 'react-desktop/windows';
import { element } from 'prop-types';

export default class extends React.Component {
	static defaultProps = {
		color: '#292838',
		theme: 'light',
	  };
	  render(){
		const selections = this.props.selections;
		let radioGroup = [];
		for (let index = 0; index < selections.length; index++) {
			radioGroup.push(<Radio
				color={this.props.color}
				label={selections[index]}
				name="radio1"
				// onChange={(e) => console.log(e.target.value)}
				defaultValue={selections[index]}
				defaultChecked
				style={this.props.style}
				theme={this.props.theme}
			  />
			);
    }
    // index가 마땅한게 없을 시 이렇게 함
		const listItems = radioGroup.map((radio,index)=>
		<li key={index}>{radio}</li>
		);
		return (
			<div>
				<ul>{listItems}</ul>
			</div>

		);
	  }
}

```


### JSX에 JS 주입하기

```javascript
defaultChecked={index===0 ? true : false}
```


### 이벤트 핸들러에 인자 전달하기

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```


### array 값 변경 시 참고 (추가,수정,제거)

https://scriptverse.academy/tutorials/reactjs-update-array-state.html


### State 끌어 올리기

* 주의 사항 : 자식은 부모한테 받은대로 그대로 복사하는건 맞지만 <strong>props."name" <strong>을 전달해줘야 된다


```javascript

//부모
handleUnitChange(index) {
	................
}
<Setting onSettingUnitChange={this.handleUnitChange}></Setting>

// 자식 
<DisplaySetting onSettingUnitChange={this.props.onSettingUnitChange} ></DisplaySetting>

// 손자
<Button onClick={(e)=>props.onSettingUnitChange(0)}></Button>

```

이렇게 하면 손자의 버튼 클릭으로 인자가 부모까지 올라가게 된다



### object 내에서 변수로 접근 시
ex) 

```javascript

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${ this.props.graphColors[this.props.index]}`,
        },
      },
	});
```


### class에서는 훅이 안됨

const classes = useStyles() 는 function 내에서만 가능하다
고로, class는 const classes = this.props 로 해야된다


### 배열 테이블을 만들어 출력하는 모범 예시

```javascript
const rows = ['apple','banana','melon','graph','camon']

        <TableBody>
          {rows.map((row,index) => (
            <TableRow key={index} >
              <TableCell component="th" scope="row" >
                {row}
              </TableCell>
              {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
```


### const 함수 만드는 방법

```javascript
  const handleSelectListClick = () => {
    setOpen(true);
  };
```

### class 내 함수는 무조건 bind 하기


```javascript
this.handleOverviewSensorChange = this.handleOverviewSensorChange.bind(this);

handleOverviewSensorChange(position,sensor){....}
``` 
둘은 쌍둥이처럼 늘 붙어다녀야 됨 !!! 꼭 (이것땜에 삽질 1시간이나 했음)


### import export

default 없이 export 도 가능함. 대신 import 시 아래의 형태로 가져와야 됨 {} 가 없으면 default를 가져오는 것
(https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import)

```javascript

export function getDCUnumber(){
	return edis["DCUnumber"];
}

import {getDCUnumber} from '../data/edis'; 
``` 


### css js로 처리할때

style={{display: this.state.showStore ? 'block' : 'none' }}



### function state hook 만드는법

const [open, setOpen] = React.useState(false);
//     변수   set변수                   초기값

setOpen(true);
// state 변경 시

끝 !


### js 로 style 지정하기



```javascript


  const styles={
    color:'#292838',
    DCUStatus:{
      display:'grid',
      gridTemplateColumn:'auto auto auto'
    },
    Button:{
      width:'100px',
      cursor:'pointer',
      padding:'10px',
      margin:'10px'
    }
    
  }


   rows.push(<Button style={styles.Button} key={i} color={styles.color} >DCU{i+1}</Button>)

``` 


### string 스타일 넣기

```javascript
const tooltipTitle = <span style={{fontSize:'13px'}}>Alarm High : <span style={{color:'red'}}>{row.RangeHigh}</span> Alarm Low : <span style={{color:'red'}}>{row.RangeLow}</span></span>
``` 

### state 변경 이벤트는 계속 돌고있는 구문에 넣어서 테스트 하면 안됨

```javascript


// 이렇게 될시 계속 반복적으로 실행하게 되서 오류가 남

handleClearClick(){
  this.setState({
    .............
  })
}

render() {
  this.handleClearClick() 
  return(

)


// 개선안 : 버튼에 넣고 테스트

handleClearClick(){
  this.setState({
    .............
  })
}

render() {
  return(
    <Button onClick={this.handleClearClick}>테스트버튼</Button>
)


``` 


### console.log string과 object, array 등을 같이 쓸때

```javascript
console.log("test : " + object) // X 이러면 object 내용이 가려져서 나옴
console.log("test : " , object) // 0 

``` 

### console.log 는 참조를 로깅하기 때문에 객체같이 변할 수 있는 것은 실시간으로 업데이트 된다

고로 깊은 복사 또는 객체가 아닌값으로 로깅

```javascript
    // 이런식으로 하면 실시간으로 바뀌기 때문에 전과 후의 값을 비교할 수 없다
		console.log("before : " , checkedAlarmList);
		checkedAlarmList[0][0]['Alarm']['Low']=1;
    console.log("after : " , checkedAlarmList);


    // 이런식으로 객체가 아닌 값을 로깅
    console.log("before : " , checkedAlarmList[0][0]['Alarm']['Low']);
		checkedAlarmList[0][0]['Alarm']['Low']=1;
    console.log("after : " , checkedAlarmList[0][0]['Alarm']['Low']);

``` 


### callback 함수 사용 시

```javascript
const arr = [1,2,3,4,3,2,11,3,24,52,2];
// filter는 array 내의 각 element 에 조건을 주어, true 값을 return 한 element 만 모아서 새로운 array 를 만드는 것
arr.filter(value,key) => console.log(value); // 이렇게도 사용가능하지만 
arr.filter(function(value,key){ //긴 문장에서는 이렇게도 사용가능하다
  console.log(value);
  console.log(key);
})

``` 


### import 'chartjs-plugin-datalabels'; 후에는 모든 그래프가 적용되기 때문에 필요없는건 꼭 false !!!!


```javascript
const options = {
  scales: {
    xAxes: [
      {
        
    ]
  },
    plugins: {
    datalabels: {
      display: false,
    }
  }
``` 


### chart.js의 Line의 경우 data의 기본 배치가 있어야한다

```javascript
const dataTemplate =  makeLineData(selectedSensor, sensorDataBoard);

function makeLineData(sensors, sensorDataBoard) {
  	const data = {
		datasets : [
			{
				label: "Cyl.1 C.F.W. Outlet Temp",
				borderColor: "rgba(255, 99, 132, 1)",
				// backgroundColor: "rgba(255, 99, 132, 0.5)",
				lineTension: 0,
				// f: [8, 4],
				data: [],
				fill: false
			}
		]
	}
	return data;
}
<Line width={500} height={200} config={config} data={dataTemplate} options={optionTemplate} />
// 이렇게 하면 그래프에 표시 되지 않는다




let data = {
  datasets: [
    		label: "Cyl.1 C.F.W. Outlet Temp",
				borderColor: "rgba(255, 99, 132, 1)",
				// backgroundColor: "rgba(255, 99, 132, 0.5)",
				lineTension: 0,
				// f: [8, 4],
				data: [],
				fill: false
  ]
}


<Line width={500} height={200} config={config} data={data} options={optionTemplate} />
// 위에 처럼 해야 그래프로 표시
```



### 함수는 무조건 대문자로 시작 

대문자로 시작안하면 오류가 나는데 어쩔때는 친절하게 대문자로 해라고 나오지만 
React.useState가 섞이면 아래 처럼 오류가 나서 잡기가 쉽지않다 . 고로 함수의 시작은 꼭 대문자로 !

React Hook "React.useState" is called in function "sensorSelectTab" which is neither a React function component or a custom React Hook function  react-hooks/rules-of-hooks



### String -> Object / Object -> String (삽질 엄청함 중요 !!!!)

```javascript

const date = new Date();
console.log(date); 
// 위의 식처럼 하면 date가 Date Object가 생성된다. 출력 결과는 2020-05-27T02:18:52.390Z 이런식으로

// 그런데 요기서 DB에 sql 문을 사용하려고 하면 string 과 결합을 해야되는데 요기서 문제가 발생한다

const sql = `INSERT INTO history(Time,Mcu,Channel,Type,Status)
  VALUES (datetime(${date}),1,3,'High','Occured')`
console.log(sql);

/* 출력결과는

INSERT INTO history(Time,Mcu,Channel,Type,Status)
  VALUES (datetime(Wed May 27 2020 11:22:31 GMT+0900 (GMT+09:00)),1,3,'High','Occured')

아래처럼 나오게 된다

내가 필요한 것은 아래의 형태이다 (왜냐하면 sqlite에서는 아래처럼해야 datetime("2020-05-27T02:23:43.169Z") -> 	2020-05-27 02:16:15 형태로 변환되기 때문이다)

INSERT INTO history(Time,Mcu,Channel,Type,Status)
  VALUES (datetime("2020-05-27T02:23:43.169Z"),1,3,'High','Occured')

*/


//Object Type 을 String Type 으로 변환
var jsonStr = JSON.stringify(obj);

//String Type 을 Object Type 으로 변환
var objData = JSON.parse(str);



// 아래처럼 하면 정상적으로 작동한다 . 
// 이유는 date가 string과 결합이되면 Date.toString() 함수가 불러지기 때문에 Tue Aug 19 1975 23:15:30 GMT+0200 (CEST) 이런형태로 변환이된다
// 그러기전에 현재의 date object를 string으로 변환시켜서 넣어주면 원하는 결과대로 된다 . !!!!
 
  const sql = `INSERT INTO history(Time,Mcu,Channel,Type,Status)
  VALUES (datetime(${JSON.stringify(date)}),1,3,'High','Occured')`;

```



