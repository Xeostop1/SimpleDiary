import React, { useEffect, useState } from "react";

const Lifecycle = () => {
  const [conut, setCount] = useState(0);
  const [text, setText] = useState("");

  //Lifecycle에 따른 제어
  //마운트, 초기화 작업
  useEffect(() => {
    console.log("Mount!");
  }, []);
  //빈 배열 전달→ 업데이트시에만 사용 이때 useEffect에 사용

  //   2.변화 업데이트 관련 똑같이 useEffect을 사용하는데 **빈배열을 전달하지 않은채 사용**
  //언제 사용하는가??? 업데이트 되는 순간 뭔가를 체크하거나 할때 사용 할 수 있음
  useEffect(() => {
    console.log("update!");
  });

  //의존성배열에 값을 넣으면 카운트의 배열에 변화가 있을때, 콜백함수가 호출됨
  useEffect(() => {
    console.log(`count is update: ${conut}`);
    if (conut > 5) {
      alert(
        ` 숫자가 ${conut}되었습니다. 5 이상은 선택할 수 없습니다. 1로 초기화 됩니다`
      );
      setCount(1);
    }
  }, [conut]);

  useEffect(() => {
    console.log(`update text message: ${text}`);
  }, [text]);

  //내가 변화를 감지해야 할 때 리스너 처럼 그순간에 필요한 콜백함수를
  //사용할수 있게됨
  return (
    <div style={{ padding: 20 }}>
      <div>
        {conut}
        <button onClick={() => setCount(conut + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};
export default Lifecycle;
