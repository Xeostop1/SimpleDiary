import React, { useState, useRef, useEffect } from "react";

const DiaryItem = ({
  onEdit,
  onRemove,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  useEffect(() => {
    console.log(`${id}번쨰 아이템 랜더`);
  });
  
  const localContentInput = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  //원래의 데이터를 불러오고 싶다면 위에 프롭스에서 받은 값은
  //변경하고 싶은 데이터의 디폴트 값으로  세팅하자!! 럴수 럴수 이럴수
  //toggleIsEdit 함수를 실행하면 위의 isEdit의 갑이 변함(false → true)

  const handleQuitEdit = () => {
    //Quit 이라면 수정상태에서 나가버린다 그래서 위의 isEdit과 같은 false의 상태로 만들어 주고
    setIsEdit(false);
    //로컬컨텐츠의 값을 프록스인 컨텐츠로 변경함
    setLocalContent(content);
  };
  let time = new Date(created_date).toLocaleString();

  const handleRemove = () => {
    //console.log(id);
    if (window.confirm(`${id + 1}번째 일기를 정말 삭제??`)) {
      onRemove(id);
    }
  };

  const toggleIsEdit = () => {
    console.log(id);
    setIsEdit(!isEdit);
  };

  //다이어리 작성시 5글자 이상 적어야 하기 때문에 유효성 검사 실시
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id + 1}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      // 텍스트에어이어를 닫기 위해 토글함수 다시 사용
      toggleIsEdit();
    }
    // 이걸 실행해 줘야 app까지 데이터가 넘어갈수 있음
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정 : {emotion}{" "}
        </span>
        <br />
        <span className="date">{time}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
//toLocaleString() 데이트 안에있는 메서드! 꼭 ()을 사용해 주자

//수정의 경우 다시 데이터를 만지기 때문에 use을 만들어 준다
//데이터는 위에서 아래로 보내진다
//아래쪽에 수정이 필요하다면???→ 위쪽 APP에서 만들어서 이쪽까지 연결다리를 만들어 줘야함
