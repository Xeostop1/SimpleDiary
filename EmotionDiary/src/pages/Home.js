import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import Myheader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  //배열로 요일 구하기
  const getDayKorea = (cur) => {
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    return week[cur];
  };
  const headText = `${curDate.getFullYear()}년 ${
    curDate.getMonth() + 1
  }월 ${curDate.getDate()}일 (${getDayKorea(curDate.getDay())})`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        //1일 세팅한 이유는 모든 월의 1일부터 시작하기 위해
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      );
      //비교연산자 사용 &&
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(
        curDate.getFullYear(),
        //1달씩 다음달로 이동
        curDate.getMonth() + 1,
        curDate.getDate()
        // 요일은 새로 넣어 주지 않아도 되네! 왜지??
      )
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };
  return (
    <div>
      <Myheader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};
export default Home;
