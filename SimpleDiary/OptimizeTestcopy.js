import React, { useState, useEffect } from 'react';


const TextView=React.memo(({text})=>{
    useEffect(()=>{
        console.log(`'update Text: ${text}`);
    });
    return<div>{text}</div>
});

const CountView=React.memo(({count})=>{
    useEffect(()=>{
        console.log(`'update Count: ${count}`);
    });

    return<div>{count}</div>
});


const OptimizeTestcopy=()=>{
    const [count, setCount]=useState(1);
    const [text, setText]=useState("");

    return(
        <div style={{padding:50}}>
        <div>
            <h2>count</h2>
            <CountView count={count}/>
            <button onClick={()=>{setCount(count+1)}}>+</button>
        </div>
        <div>text</div>
        <TextView text={text}/>
        <input value={text} onChange={(e)=>{setText(e.target.value)}}/>
        </div>
    )
};
export default OptimizeTestcopy;