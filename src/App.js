import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import Todo from "./pages/Todo";
import Header from "./components/Header";
import Requests from "./pages/Requests";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<div>HOME</div>}></Route>
            <Route path="/to-do" element={<Todo />}></Route>
            <Route path="/request" element={<Requests />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
