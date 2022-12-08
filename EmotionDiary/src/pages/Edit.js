import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //배열을 반환함 쿼리가 가지고 있으니까
  //set은 쿼리를 바꿀 수 있는 기능을 가지고 있음

  //함수말고 데이터안에서 꺼내야지~
  const id = searchParams.get("id");
  console.log("id: ", id);

  const mode = searchParams.get("mode");
  console.log("mode: ", mode);

  const navigate = useNavigate();
  //useNavigate()을 함수표현식으로 사용함
  //주소를 인자로 넣어줌 함수값을 넣어줌

  //비구조화 할당: 배열이나 객체의 속성, 값을 해체! 그 값을 각각 담아 사용!!

  return (
    <div>
      <h1>Edit</h1>
      <p>Here is Edit </p>
      <button onClick={() => setSearchParams({ who: "xeo" })}>쿼리 변경</button>
      <br />
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Edit;
//함수에 객첼르 전달해야 쿼리에서 꺼내서 보여줄 수 있음
//오 싱기해!
//비로그인 사용자가 로그인페이지로 이동 시 강제로 회원가입이나 로그인페이지로 이동
//***링크를 클릭하지 않아도 개발자가 링크를 변경할 수 있다

//뒤로가기는 -1을 넣어주면 된데 전뎁스로 찾아 가면 되나봐
