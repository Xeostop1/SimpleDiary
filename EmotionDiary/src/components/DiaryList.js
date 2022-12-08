// value=option value, onChange=바꾸는 동작, optionList=option
import { useState } from 'react';
const sortOptionList=[
  {value:"latest",name:"최근"},
  {value:"oldest", name:"등록일"}
];
//optionList는 위의 sortOptionList 객체 개별
const ControlMenu=({value, onChange, optionList})=>{
  return (
  <select 
  value={value} 
  onChange={(e)=>onChange(e.target.value)}>
    {optionList.map((it,i)=>(
      <option key={i} value={it.value}>
        {it.name}
        </option>))}
  </select>
  );
}

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType]=useState("latest");
  const getProcessedDirayList =()=>{
    
    //비교 함수
    const compare=(a,b)=>{
      if(sortType==='latest'){
        return parseInt(b.date)-parseInt(a.date);
      }else{
        return parseInt(a.date)-parseInt(b.date);
      }
    };

    const copyList=JSON.parse(JSON.stringify(diaryList));
    const sortedList=copyList.sort(compare);
    return sortedList;
    
  }


  return (
    <div>
    <ControlMenu 
    value={sortType} 
    onChange={setSortType} 
    optionList={sortOptionList}/>

      {getProcessedDirayList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
