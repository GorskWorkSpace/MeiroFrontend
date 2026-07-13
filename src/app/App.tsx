import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { EventDetailPage } from "../pages/event-detail-page/ui/EventDetailPage";
import { MainPage } from "../pages/main-page/ui/MainPage";
import { SettingPage } from "../pages/setting-page/ui/SettingPage";
import { EventMyPage } from "../pages/EventMyPage";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { LoginMenu } from "../features/login-menu";

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <MainPage />
            </PageWrapper>
          }
        />
        <Route
          path="/event/:eventId"
          element={
            <PageWrapper>
              <EventDetailPage />
            </PageWrapper>
          }
        />
        <Route
          path="/settings"
          element={
            <PageWrapper>
              <SettingPage />
            </PageWrapper>
          }
        />
        <Route
          path="/event/my-events"
          element={
            <PageWrapper>
              <EventMyPage />
            </PageWrapper>
          }
        />
        <Route
          path="/sign_in"
          element={
            <PageWrapper>
              <LoginMenu />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
