import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/main-page/ui/MainPage";
import { SettingPage } from "../pages/setting-page/ui/SettingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/event/detail" />
        <Route path="/event/my-events" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
