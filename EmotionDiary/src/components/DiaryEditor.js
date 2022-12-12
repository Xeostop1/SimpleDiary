import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "../App";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStrDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

/*const getDayKorea = (curDay) => {
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[curDay];
};*/
//=======현재날짜 받아오기===========
/*export const getStrDate = (date) => {
  //날짜의 객체의 값을 String하여서 불러오고 slice0~9자리까지 str로 리턴함
  //return date.toISOString().slice(0, 10);

  //toISOString 문제때문에 변경
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  //let houre = date.getHours();
  //let min = date.getMinutes();
  //let ss = date.getSeconds();

  //let KoDay = date.getDay();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  // console.log(`${year}-${month}-${day}(${getDayKorea(KoDay)})`);
  // return `${year}-${month}-${day}(${getDayKorea(KoDay)})`;
  // return `${year}-${month}-${day} ${houre}:${min}:${ss}`;
  return `${year}-${month}-${day}`;
};*/

//=======***DiaryEditor Main***===========
const DiaryEditor = (isEdit, originData) => {
  const navigate = useNavigate();
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  //console.log(getStrDate(new Date())); //현재날짜를 인자로 넣음날짜확인 가능
  const [date, setDate] = useState(getStrDate(new Date()));

  //===========일기 작성완료============
  //App에서 추척하고 있는 아이템 가져오기
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  //===========emotionClickEvent==========
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm(isEdit ? "Edit Diary?" : "New Diary?")) {
      if (!isEdit) {
        //위에서 받아온 onCreate함수를 실행
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    //네비게이터의 옵션값 주기 한번 작성된 곳에는 못 돌아오게 replace true 설정
    navigate("/", { replace: true });
  };

  //======edit 상세페이지 original데이터 받기======
  useEffect(() => {
    if (isEdit) {
      //1. 날짜 가지고 오기 :오류나서 프롭전달부터 확인중
      //********* 1-1 new Date()로 현재 날짜는 잘 전달 됨**********[오류수정]
      //1-2 앞에서 프롭스가 전달이 안되는것 같음 날짜 외의 이모션, 컨텐츠 값도 못들고옴
      // console.log(getStrDate(new Date(originData.date)));
      // console.log(new Date(originData.date).toLocaleString());
      setDate(getStrDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      console.log(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div>
      <MyHeader
        headText={isEdit ? "Edit Diary" : "New Diary"}
        leftChild={<MyButton text={"<<"} onClick={() => navigate(-1)} />}
      />
      <div className="DiaryEditor">
        <section>
          <h4>When is it Today?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>Today is emotion</h4>
          <div className="emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                isSelected={it.emotion_id === emotion}
                onClick={handleClickEmote}
                key={it.emotion_id}
                {...it}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>Today is Diary</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="Tell me about your TODAY?"
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"cancel"} onClick={() => navigate(-1)} />
            <MyButton
              text={"completion"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
