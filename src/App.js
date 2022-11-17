import './App.css';
import DirayEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState } from 'react';
import { useRef } from 'react';

// const dummyList=[
//   {
//     id:1,
//     author:"작성자",
//     content:"일기리스트 테스트중입니다1",
//     emotion:2,
//     created_date:new Date().getTime()  //현재시간을 생성하는 객체를 선언 
//   },
//   {
//     id:2,
//     author:"홍길동",
//     content:"일기리스트 테스트중입니다2",
//     emotion:3,
//     created_date:new Date().getTime()  //현재시간을 생성하는 객체를 선언 
//   },
//   {
//     id:3,
//     author:"고길동",
//     content:"일기리스트 테스트중입니다3",
//     emotion:4,
//     created_date:new Date().getTime()  //현재시간을 생성하는 객체를 선언 
//   },
//   {
//     id:4,
//     author:"둘리",
//     content:"일기리스트 테스트중입니다4",
//     emotion:5,
//     created_date:new Date().getTime()  //현재시간을 생성하는 객체를 선언 
//   },
// ];


function App() {

  const[data, setData]=useState([]); 
  
  const dateId=useRef(0);
  
  const onCreate=(author,content,emotion)=>{
    const created_date=new Date().getTime();
    const newItem={
      author,
      content,
      emotion,
      created_date,
      id: dateId.current
    }
    dateId.current+=1;
    setData([newItem,...data]);
    //뉴아이템을 먼저 보여주고, 기존 데이터들을(useState에 사용한) 나중에 세팅
    //[나는 객체또는 배열사용하니까 꼭 []을 잊지말자@!@ 제발 ㅠㅠ]
  };

  return (
    <div className="App">
      <DirayEditor onCreate={onCreate}/>
      <DiaryList diaryList={data}/>
    </div>
  );
}
//배열을 프롭으로 전달 

export default App;
