import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to={"/diary"}>Diary</Link>
      <br />
      <Link to={"/edit"}>Edit</Link>
      <br />
      <Link to={"/new"}>New</Link>
    </>
  );
};

export default RouteTest;

//CSR 방식으로 이동하는 라우터테스트
//가 a태그와 같은 역할 href는 to에 써준다
//진짜 a 처럼 변했네
