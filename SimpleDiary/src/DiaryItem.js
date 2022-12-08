import React, { useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ author, content, created_date, emotion, id }) => {
  // useEffect(() => {
  //   console.log(`${id}번쨰 아이템 랜더`);
  // });

  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

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

//페이지+"라우팅"
//라우팅: 네트워크 내에서 통신 데이터를 보낼 경로를 선택하는 일련의 과정 
//→→ 라우팅은 경로를 정해주는 행위 자체와 그런 과정들을 모두 포함
//통신의 경로(라우트)를 정해주는 장치 → 라우터 : 데이터들이 어디로 가야 할지 알려주는 길잡이의 역할 

//페이지: 경로에 맞게 페이지에 정보를 선택하고 클라이언트에게 반환해주는것 
//MPA: MultiPage Application 멀티페이지 어플리케이션 (n개 이상의 페이지를 가지고 있음 대부분의 사이트는)

//====그런데! 리액트는 싱글페이지어플리케이션(SPA) ex) 상세페이지를 열어도 사진페이지를 열어도 모두 index로 모이게 됨
//페이지 이동이 안될것인가?? NO! 리액트 만의 방식으로 옮겨 다닐 수 있음
//페이지이동이 매우 빠르다!! 리스폰스와 리퀘스트를 안하니까 
//서버에게 얻어오는것이 아니고 리액트 안에서 이동할 수 있게 변경함
//서버 대기시간 없이 리액트 안에서 업데이트가 가능함 페이지 전환이 빠름
//데이터가 필요한 경우 json으로 서버한테 한번 받고 그것을 통해 리랜더링 함

//이러한 방식을 clientSideRendering CSR 클라이언트사이드랜더링 방식 페이지를 랜덜이 한다.





