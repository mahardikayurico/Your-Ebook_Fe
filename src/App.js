import "./index.css";
import { LandingPages, LoginPages, WelcomePages } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/welcome" element={<WelcomePages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
