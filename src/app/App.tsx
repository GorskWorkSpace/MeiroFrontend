import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EventDetailPage } from "../pages/event-detail-page/ui/EventDetailPage";
import { MainPage } from "../pages/main-page/ui/MainPage";
import { SettingPage } from "../pages/setting-page/ui/SettingPage";
import { EventMyPage } from "../pages/EventMyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/event/:eventId" element={<EventDetailPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/event/my-events" element={<EventMyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
