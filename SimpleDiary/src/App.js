import "./App.css";
import DirayEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

// import OptimizeTest from "./OptimizeTest";
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

//======Reducer=============
//reducer 상태변화를 핸들링하는 함수
//2개의 인자를 사용
const reducer = (state, action) => {
  //어떤 타입의 액션(동작)이 있는지 확인
  switch (action.type) {
    case "INIT": {
      return action.data; //위의 액션에서 꺼내온것! 새로운 state가 되는것
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    //수정을 하게 되면 매칭할 id와 안의 새로운 컨텐츠가 전달됨
    //기존 스테이트에서 맵함수를 사용하여 1. 타켓 id와 일치하는 요소를 찾고
    //2.그 요소의 값에서 컨텐츠→ 뉴컨텐츠로 수정하고 나머지 요소는 그대로 돌려주고(false일때 it)
    //새로 변경된 뉴 콘텐츠를 map함수때문에 배열로 보내주었음
    case "EDIT": {
      //3항연산
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
    //디폴트 상태에서는 상태변화가 없는 것으로 생각하여 변화 동작을 주지 않음
  }
};

//===========Provider Context(State, dispatch)==================
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

//==========App===============
function App() {
  //const [data, setData] = useState([]);
  //복잡한 상태변화를 로직에서 분리하기 위해 리듀서를 사용한다 그래서 app 컴퍼넌트 밖에다가 만듬
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  //===========Promise===============
  //더미json에서 데이터 추출
  //async?! 프로미스를 사용한다
  const getData = async () => {
    // 패치로 필요한 주소를 넣어준다
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    //===============INIT==============
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
    //셋데이터의 일을 디스패치의 init이 진행함
    dispatch({ type: "INIT", data: initData }); //객체로 인자를 넘져줌 case문에 맞는
    //setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  //===============Create==================
  //useCallback 의존배열이 변화가 있다면 안의 콜백함수가 변화한다
  //마운트(최초생성)되었을 때 1번만 만들고 그뒤로는 재사용할 수 있도록 세팅 (useCallback)
  const onCreate = useCallback((author, content, emotion) => {
    //setData부분에 함수형을 전달하여 사용
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };
    dataId.current += 1;
    //setData([newItem, ...data]);
    //뉴아이템을 먼저 보여주고, 기존 데이터들을(useState에 사용한) 나중에 세팅
    //[나는 객체또는 배열사용하니까 꼭 []을 잊지말자@!@ 제발 ㅠㅠ]
    // setData((data) => [newItem, ...data]);
  }, []);

  //===========Remove====================
  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
    console.log(`onRemove에서 ${targetId}가 삭제  `);
    //const newDiaryList = data.filter((it) => it.id !== targetId);
    //필터로 새로운 배열을 바로 만들어 주었음
    //위에서 받은 인자 타켓아이디가 id와 같지 않다면 배열을 새로 만들어줘
    //이걸 위에 셋함수에 어레이를 다시 보내줌

    //셋데이터함수 임자로 최신 스테이터스를 이용하기 위해서는 함수형 업데이트에 인자부분으 사용 리턴 부분을 사용함
    // setData((data) => data.filter((it) => it.id !== targetId));
    //console.log(newDiaryList);
  }, []);

  //===================Edit===================
  //여기에 매개변수를 쓰는 이유? 자식이 어떤 데이터를 보낼 지 모르니까(forgin_key 정도??)
  //맵을 통해 for처럼 순회하면서 새로운 배열을 만든다
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setData(
    //   (data) =>
    //     data.map((it) =>
    //       it.id === targetId ? { ...it, content: newContent } : it
    //     )
    //   //id가 수정하는 타켓의 id와 같다면 수정→
    // it의 모든 배열을 다불러오고 content는 newContente로 변경
    //: 이걸 왜쓰는지 모르네~
    //id가 맞지 않는다면 원래 있던 걸로 대체하겠음
    //);
  }, []);

  //==========MemoizedDispatch=============
  const MemoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);
  //재생성 되지 않게 빈 배열 전달

  //=================일기 수치화 분석===================
  //useMemo 1인자 콜백함수, 배열전달(의존성배열이 변화가 있다면 콜백함수에 영향을 미친다) 배열에 변화가 없다면 더이상 계산하지 않고 같은 값을 보여줌
  //그런데 useMemo를 사용한다면 더이상 getDiaryAnalysis더이상 함수의 기능을 잃게됨 memoization 되었기 때문에 리턴값도 고정 함수(동작)으로의 기능을 잃게됨
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount; //나는 똑같이 ㅠㅠ 필터 걸고 >=2 해줌 ㅠㅠ 천잰데??
    const goodRatio = (goodCount / data.length) * 100; //백분률
    return { goodCount, badCount, goodRatio }; //객체로 리턴
  }, [data.length]);

  //데이터.length가 변화가 있을때만 함수의 변화가 있음 (리턴값이 변경)

  //리턴값이 객체로 받아서 우리도 비구조화 할당으로 받았음
  // const { goodCount, badCount, goodRatio } = getDiaryAnalysis();
  //useMemo를 사용해서 더이상 함수로 작동하는게 아니라 리턴값을 이용하는것!
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  //useMemo는 리턴값만을 가져오기 때문에 함수형으로 쓰면 안된다
  //Provider을 꼭 써주자
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={MemoizedDispatches}>
        <div className="App">
          <DirayEditor />
          <div>📖: {data.length}개</div>
          <div>HAPPY DAY : {goodRatio}%</div>
          <div>😊 : {goodCount}개</div>
          <div>😑 : {badCount}개</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
export default App;
//</DiaryStateContext.Provider> 공급자 컴퍼넌트로 랩핑
//provider의 value는 언제 든지 사용가능한 값

/*memoization?? 연산의 최적화
이미 계산 해본 연산 결과를 기억해 두었다가
동일한 계산을 시키면 다시 연산하지않고 기억해 두었던 데이터를 반환 시키는방법
오답노트에서 문제가 그대로 나왔다?! 개꿀 */

/*
이럴때 같이 사용 되는데 다른 기능이 리랜더 되어도 영향을 받지 않는곳이 계속 사용하면 메모리를 많이 잡아 먹으니까 
값을 기억 시켜버림 useMemo사용
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount; //나는 똑같이 ㅠㅠ 필터 걸고 >=2 해줌 ㅠㅠ 천잰데??
    const goodRatio = (goodCount / data.length) * 100; //백분률
    return { goodCount, badCount, goodRatio }; //객체로 리턴
  };
*/
//useMemo로 값 만을 계속 보내줌 → 연산최적화
