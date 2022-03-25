import "./sass/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guest from "./Pages/Guest";
import Login from "./Pages/Login";
import Manuscript from "./Pages/Manuscript";
import Landing from "./Pages/Landing";
function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="guest" element={<Guest />} />
          <Route path="manuscript" element={<Manuscript />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;