import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/main-page/ui/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/event/detail" element={<div>Детали события</div>} />
        <Route path="/event/my-events" element={<div>Мои события</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
