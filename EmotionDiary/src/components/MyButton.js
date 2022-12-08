const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
MyButton.defaultProps = {
  type: "default",
};
//클래스 네임에 배열로 넣어서 타입을 설정함
//join을 통해서 띄어쓰기기를 포함하여 배열을 합침
export default MyButton;
//타입이 전달되지 않으면 디폴트로 사용
