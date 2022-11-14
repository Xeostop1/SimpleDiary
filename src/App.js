import './App.css';
import DirayEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList=[
  {
    id:1,
    author:"작성자",
    content:"일기리스트 테스트중입니다1",
    emotion:2,
    created_date:new Date().getTime()  //현재시간을 생성하는 객체를 선언 
  },
  {
    id:2,
    author:"홍길동",
    content:"일기리스트 테스트중입니다2",
    emotion:3,
    created_date:new Date().getTime()  //현재시간을 생성하는 객체를 선언 
  },
  {
    id:3,
    author:"고길동",
    content:"일기리스트 테스트중입니다3",
    emotion:4,
    created_date:new Date().getTime()  //현재시간을 생성하는 객체를 선언 
  },
  {
    id:4,
    author:"둘리",
    content:"일기리스트 테스트중입니다4",
    emotion:5,
    created_date:new Date().getTime()  //현재시간을 생성하는 객체를 선언 
  },
];


function App() {
  return (
    <div className="App">
      <DirayEditor/>
      <DiaryList diaryList={dummyList}/>
    </div>
  );
}
//배열을 프롭으로 전달 

export default App;
