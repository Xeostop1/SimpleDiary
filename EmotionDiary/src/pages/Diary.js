import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import { getStrDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  //use? HOOK에서 사용을 많이 함 사용자 정의 훅(커스텀 훅)
  //여기의 정보들을 객체로 가져옴
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targerDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      //console.log(targerDiary);
      if (targerDiary) {
        //일기 존재시
        setData(targerDiary);
      } else {
        //일기 미존재
        alert("It's an empty diary");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">Loding.....</div>;
  } else {
    const curEmotion = emotionList.find(
      (it) => parseInt(it.emotion_id) === data.emotion
    );
    console.log(curEmotion);

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStrDate(new Date(data.date))} 📝`}
          leftChild={<MyButton text={"<"} onClick={() => navigate(-1)} />}
          rightChild={
            <MyButton
              text={"Edit"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>Today is Emotion</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img className="img_size" src={curEmotion.emotion_img} />
              <div className="emotion_descript">
                {curEmotion.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>Today is Diary</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
//일기 상세페이지 데이터를 전달받아야하는 페이지
//구별할수 있는 primaryKey(Num OR ID)를 주소에 같이 보내줌
// /diary/1/item  이걸 Path Variable을 이용함 프롭스를 사용함
