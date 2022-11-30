import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(()=>{
    console.log("monut!");

    //리턴되는 함수는 unmount되는 시점에 실행됨
    return ()=>{
      console.log("nuMonut**");
    }
  },[]);
  return <div>unmount Testing component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible)};
  
    return (
    <div style={{ padding: 20 }}>
      <div>
        <button onClick={toggle}>on/OFF</button>
        {isVisible && <UnmountTest/>}
      </div>
    </div>
  );
};
export default Lifecycle;
// 단락회로평가:
// 표현식을 평가하는 도중에
//평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.
//또한, 논리 연산자의 표현식의 결과는 Boolean값이 아닐 수도 있다.
