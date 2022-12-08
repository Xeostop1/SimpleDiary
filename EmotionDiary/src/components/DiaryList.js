// value=option value, onChange=바꾸는 동작, optionList=option
import { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최근" },
  { value: "oldest", name: "등록일" },
];

const filterOptionList = [
  { value: "all", name: "모두" },
  { value: "good", name: "긍정" },
  { value: "bad", name: "부정" },
];
//optionList는 위의 sortOptionList 객체 개별

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, i) => (
        <option key={i} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const negative = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDirayList = () => {
    //필터링 함수

    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    //비교 함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    //copyList 필터링 작업
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"New Diary"}
            onClick={() => negative("/new")}
          />
        </div>
      </div>

      {getProcessedDirayList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
