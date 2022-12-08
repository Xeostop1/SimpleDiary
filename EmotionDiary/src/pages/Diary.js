import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  //use? HOOK에서 사용을 많이 함 사용자 정의 훅(커스텀 훅)
  //여기의 정보들을 객체로 가져옴

  console.log(id);
  return (
    <div>
      <h1>Diary</h1>
      <p>Here is Diary page</p>
    </div>
  );
};

export default Diary;
//일기 상세페이지 데이터를 전달받아야하는 페이지
//구별할수 있는 primaryKey(Num OR ID)를 주소에 같이 보내줌
// /diary/1/item  이걸 Path Variable을 이용함 프롭스를 사용함
