import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteTest from "./components/RouteTest";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>확인 중입니다</h2>
        <h1>모과차</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new " element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;

//경로에 따라서 맵핑함
//a태그는 외부 url 사용시에만 사용예정
