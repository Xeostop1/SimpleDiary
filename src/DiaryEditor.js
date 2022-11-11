import { useState } from "react";
import App from './App';

//author: 작가 어써
const DirayEditor=()=>{
    //글쓴이의 값을 스테이터스로 활용하기 위해 useState 사용
    
    //아래의 2개를 한개로 합쳐서 사용
    const [state, setState]=useState({
        author:"",
        content:"",
        emotion:1,
    });
    
    //const [author, setAuthor]=useState("");
    //const [content, setContent]=useState("");

    //인풋의 입력값이 들어오면 auttor의 값이 변경되게 사용
    //자동으로 상태를 변경하고 싶다?? 그러면 함수를 사용해야 한다→ 안드러면 기본 useState의 디폴트 값이 들어가게됨 

    //자동으로 랜더링 하기위해 인풋이 온체인지 할때마다(js함수를 걸어줌) 매개변수를 가지고 있는 콜백함수를 사용
    //랜더링된 값을 보고싶으면 타켓안에서 살펴보자
    //변화된 값이 같이 벨류에 넣어지기는 한다! 디폴트+온체인지e 매개변수
    //변경??은 뭐다?? 함수로(set 배열)
    //벨류를 변경하면 뭐다?? 다른것도 가능함 name도 사용할 수 있음

    //set콜백 함수를 통해 위의 content값들을 계속 변화시킴

    //👩‍🏭 그런데! 우리는 같은 동작을 계속적으로 수행하고 있네(무려자료형도 똑같다!)? ▶
    // 동작과 자료형이 같아서 useState을 1개로 사용하자▶ 기본값 넣는 곳에 객체타입(변화가 필요한 변수를)으로 넣자 

    //한곳으로 뭉친 후에는? 함수도 똑같이 객체값으로 인자를 넣어주자
    //그리고 사용 않하는 객체의 값은 원래의 세팅값으로 넣어주자(state.content 객체이름을 넣어줌)

    //👩‍🏭 동작(함수)도 같이 사용하자!

    const handleChangeState=(e)=>{
        console.log(e.target.name);
        console.log(e.target.value);
       setState({
        ...state,
        [e.target.name]: e.target.value,
       });
    };


    const handleSubmit=(e)=>{
        console.log(e.target.value);
        console.log(state);
        alert("저장성공");
    }
    return(
        <div className="DiaryEditor">
           <h2>오늘의 일기</h2> 
           <div>
                <input 
                    name="author"
                    value={state.author} 
                    onChange={
                        handleChangeState
                    }
                />
           </div>
           <div> 
            <textarea
                name="content"
                value={state.content} 
                onChange={
                    handleChangeState
                }
            
            />
           </div>
           <div>
                <select
                    name="emotion"
                    value={state.emotion} 
                    onChange={
                        handleChangeState
                    }
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
           </div>
           <div>
            <button 
                onClick={
                    handleSubmit
                }
            >
                일기저장하기 
            </button>
           </div>
        </div> 
    );
     
}
//그래서 우리가 쉽게 사용하려고 변수를 객체로 묶었다 그러나 
//내가 변화하고 싶은값만 손대고 싶지 아닌것은 계속 위와같이 써야하니불편
// 이럴때 사용하는것이 스프레드(...)(배열, 객체을 모두 펼쳐보쳐서 보여주는것 )로 보여주기 
//내가 굳이 안써도 알아서 js가 수정하지 않은 부분은 객체로 읽고 넘어감
//넣는 순서에도 상관이 있음. 업데이트 값이 위에있으면 변경되고 2번째 랜더링 때 원래 ...으로 보여준채로 랜더링 될수 있음 
//그래서 먼저 스프레드를 펼쳐서 보여주고 → 변경값을 다음으로 세팅해줘야 한다

//함수화 처리(handleChangeState) 전에 있던 코드
/*onChange={(e)=>{
    // console.log(e.target.name);
    // console.log(e.target.value);
    setState({
        ...state,
        content:e.target.value,
    });
*/


export default DirayEditor;