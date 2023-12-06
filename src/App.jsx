import { Route, Routes } from "react-router-dom";
import "./App.css";
import  Home  from "./Pages/Home";
import About from "./Pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
