import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotion, date, content }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleString();

  //====Detail navigate=======
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  //====Edit navigate=======
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/square${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div onClick={goEdit} className="btn_wrapper">
        <MyButton text={"수정하기"} />
      </div>
    </div>
  );
};
export default DiaryItem;
//<img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}/>
//빨리해야 되는데 ㅠㅠ 