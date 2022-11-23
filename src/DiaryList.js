import DiaryItem from "./DiaryItem";

const DiaryList=({onDelete,diaryList})=>{
    console.log(diaryList);
    return(
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h2>{diaryList.length}개의 일기가 있습니다</h2>
            <div>
                {diaryList.map((it)=>(
                    <DiaryItem key={it.id}{...it} onDelete={onDelete}/>
                ))}
            </div>
        </div>
    );
}
DiaryList.defaultProps={
    diaryList:[]//프롭스를 오류가 나도 빈배열을 바로 보여 줄 수 있도록 디폴트값을 빈배열로 설정 
}
export default DiaryList;

//key 세팅방법
//1.컴퍼넌트(반복되고 있는 부분)에 직접 세팅(대신 객체 자료에 primarykey가 될만한 것이 있어야함 )
//<div key={it.id}> 
//2. 맵에 idx을 이용하여 세팅(안에 primarykey가 될게 있다면 사용하지 않는 편이 효과적, 배열의 인덱스라서 변동폭이 너무 큼 )
//{diaryList.map((it, idx)=>(
    //<div key={idx}> 