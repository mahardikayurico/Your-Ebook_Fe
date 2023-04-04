import "./index.css";
import {
  LandingPages,
  LoginPages,
  WelcomePages,
  HomePages,
  EbookCollection,
} from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/welcome" element={<WelcomePages />} />
        <Route path="/home/:id" element={<HomePages />} />
        <Route path="/myebook" element={<EbookCollection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
