import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import SignUp from "./pages/SignUp";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
