import React, { useRef, useReducer } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";

//====Components btn
//import MyButton from "./components/MyButton";
//import MyHeader from "./components/MyHeader";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};
//=========Context(Stats, dispatch)============
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

//=========dummyTestData=============
//제발 배열 선언좀 잘해줘 ㅠㅠㅠㅠ
//랜던도 메서드! 제발 ()을 쓰자

//=====for map 도 안된다 ㅠㅠ 안되네 왜지??? =======
// const map_dummy = [
//   {
//     id: 1,
//     emotion: Math.floor(Math.random() * 5) + 1,
//     content: `오늘의 일기 ${1}번`,
//     date: 167048424688,
//   },
// ];

// const dummyData = map_dummy.map(function (item, i) {
//   return [
//     {
//       id: i + 1,
//       emotion: Math.floor(Math.random() * 5) + 1,
//       content: `오늘의 일기 ${i + 1}번`,
//       date: 167048424688 + (i + 1),
//     },
//   ];
// });
// for (let i = 0; i < 5; i++) {
//   dummyData[i] = [
//     {
//       id: i + 1,
//       emotion: Math.floor(Math.random() * 5) + 1,
//       content: `오늘의 일기 ${i + 1}번`,
//       date: 167048424688 + (i + 1),
//     },
//   ];
// }
const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1670484246888,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1670484246889,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1670484246890,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1670484246891,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1670484246892,
  },
];

//=====App=========
function App() {
  //작동안될시
  // const env=process.env;
  // env.PUBLIC_URL=env.PUBLIC_URL ||"";
  //const [data, dispatch] = useReducer(reducer, []);
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataID = useRef(0);

  //=======create========
  const onCreate = (date, content, emotion) => {
    let getDate = new Date(date).getTime;
    dispatch({
      type: "CREATE",
      data: {
        id: dataID.current,
        date: getDate,
        content,
        emotion,
      },
    });
    dataID.current += 1;
  };
  //========remove========
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //========edit========
  const onEdit = (targetId, date, content, emotion) => {
    let getDate = new Date(date).getTime;
    dispatch({
      //스위치에서 case로 사용
      type: "EDIT",
      data: {
        id: targetId,
        date: getDate,
        content,
        emotion,
      },
    });
  };
  //useReducer의 data을 value로 사용
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new " element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

//경로에 따라서 맵핑함
//a태그는 외부 url 사용시에만 사용예정

//3가지 기능 사용 <함수사용>
//Path Variable useParams :id 이렇게 붙여서 서로 구분지을 수 있게 사용함

//Query String useSerchParms:  가장 간단한 방법 정말 쿼리를 이용함 "?" /edit?id=10&mode=dark
//쿼리스트링은 따로 매핑을 하지 않아도 잘 주소창에서 전달이 쉬움 → 페이지 라우팅에 영향을 주지 않는다

//Page Moving useNavigate:

//process.env.PUBLIC_URL : PUBLIC_URL경로를 픽스하겠다!
/*   <img src={process.env.PUBLIC_URL + `/assets/happy.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/smail.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/usual.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/boring.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/sad.png`} /> */

/*
 <MyHeader
          headText={"app"}
          leftChild={<MyButton text={"<<"} onClick={() => alert("Left")} />}
          rightChild={<MyButton text={">>"} onClick={() => alert("Right")} />}
        />
        <h2>확인 중입니다</h2>
        <h1>모과차</h1>
        <MyButton
          text={"버튼"}
          onClick={() => {
            alert("버튼 클릭");
          }}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => {
            alert("버튼 클릭");
          }}
          type={"negative"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => {
            alert("버튼 클릭");
          }}
        />
         */
