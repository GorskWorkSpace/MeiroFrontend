import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EventDetailPage } from "../pages/event-detail-page/ui/EventDetailPage";
import { MainPage } from "../pages/main-page/ui/MainPage";
import { SettingPage } from "../pages/setting-page/ui/SettingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
<<<<<<< HEAD
        <Route path="/event/:eventId" element={<EventDetailPage />} />
=======
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/event/detail" />
>>>>>>> d3125dc3d4bec1637935d8c9e562a5a5c21d9731
        <Route path="/event/my-events" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
