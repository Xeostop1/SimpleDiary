import React, { useState, useEffect } from 'react';

const CountA=React.memo(({count})=>{
    useEffect(()=>{
        console.log(`A: ${count}`);
    });
    return <div>{count}</div>
});

const CountB=({obj})=>{
    useEffect(()=>{
        console.log(`B: ${obj.count}`);
    });
    return <div>{obj.count}</div>
};

const areEqual=(prevProps, nextProps)=>{
    //true 프리브와 넥스트의 프롭스가 같다!!→ 리랜더링이 미발생
    //false 두 인자값이 다르다?? 리랜더링 발생!
    let prev=prevProps.obj.count;
    let next=nextProps.obj.count;
    if(prev===next){
        return true;
    }
    return false;
    // return prev===next; 이렇게만 리턴해도 된데~~ 
};

const MemoizedCounterB=React.memo(CountB,areEqual);

const OptimizeTest=()=>{
    const [count, setCount]=useState(1);
    const [obj, setObj]=useState({count:1});    //객체를 카운터로 사용

    return(
        <div style={{padding:50}}>
        <div>
            <h2>Count AAAA</h2>
            <CountA count={count}/>
            <button onClick={()=>setCount(count)}>AAAA</button>
        </div>
        <div>
            <h2>Count BBBB</h2>
            <MemoizedCounterB obj={obj}/>
            <button onClick={()=>setObj({count:obj.count})}>BBBB</button>
        </div>
        </div>
    )
};
export default OptimizeTest;
//객체를 비교할 때는 얕은 비교를 한다??
// 객체를 비교할때는 주소값을 가지고 하기 때문에 같을 수가 없다아~ 알고있잖아 주소값은 서로 다르다는걸~ 