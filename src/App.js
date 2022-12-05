import "./App.css";
import DirayEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useMemo ,useEffect, useState } from "react";
import { useRef } from "react";
// import Lifecycle from "./Lifecycle";

//더미데이타 api로 호출하기
//https://jsonplaceholder.typicode.com/comments

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
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  //더미json에서 데이터 추출
  //async?! 프로미스를 사용한다
  const getData = async () => {
    // 패치로 필요한 주소를 넣어준다
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    //슬라이스로 0~19인덱스 까지만 가져옴
    //이모션은 바로 콜백함수에서 랜덤화 시켜서 넣기
    const initData = res.slice(0, 20).map((it) => {
      let emotionNum = Math.floor(Math.random() * 5) + 1; //0부터 시작해서 +1 해줌
      let newDate = new Date().getTime();
      return {
        author: it.email,
        content: it.body,
        emotion: emotionNum,
        created_date: newDate,
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
    //뉴아이템을 먼저 보여주고, 기존 데이터들을(useState에 사용한) 나중에 세팅
    //[나는 객체또는 배열사용하니까 꼭 []을 잊지말자@!@ 제발 ㅠㅠ]
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제 `);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    //필터로 새로운 배열을 바로 만들어 주었음
    //위에서 받은 인자 타켓아이디가 id와 같지 않다면 배열을 새로 만들어줘
    //이걸 위에 셋함수에 어레이를 다시 보내줌
    setData(newDiaryList);
    //console.log(newDiaryList);
  };

  //여기에 매개변수를 쓰는 이유? 자식이 어떤 데이터를 보낼 지 모르니까(forgin_key 정도??)
  //맵을 통해 for처럼 순회하면서 새로운 배열을 만든다
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
      //id가 수정하는 타켓의 id와 같다면 수정→
      // it의 모든 배열을 다불러오고 content는 newContente로 변경
      //: 이걸 왜쓰는지 모르네~
      //id가 맞지 않는다면 원래 있던 걸로 대체하겠음
    );
  };

  const getDiaryAnalysis=useMemo(()=>{
    console.log("일기분석 시작");
    const totalData=data.length;
    const goodCount=data.filter((it)=>it.emotion>=3).length;
    const badCount=totalData-goodCount
    const goodRatio=(goodCount/totalData)*100;
    return{goodCount, badCount, goodRatio};
  },[data.length]
  );
  //데이터.length가 변화가 있을때만 함수의 변화가 있음 (리턴값이 변경)

  //함수의 리턴값을 객체(비구조화 할당)로 받음
  const {goodCount, badCount, goodRatio}=getDiaryAnalysis;

  //useMemo는 리턴값만을 가져오기 때문에 함수형으로 쓰면 안된다


  return (
    <div className="App">
      <DirayEditor onCreate={onCreate} />
      <div>📖: {data.length}개</div>
      <div>HAPPY DAY : {goodRatio}%</div>
      <div>😊 : {goodCount}개</div>
      <div>😑: {badCount}개</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}
//배열을 프롭으로 전달

export default App;
//useMemo로 값 만을 계속 보내줌 
