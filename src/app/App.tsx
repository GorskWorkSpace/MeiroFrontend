import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { EventDetailPage } from "../pages/event-detail-page";
import { MainPage } from "../pages/main-page";
import { MyEventsPage } from "../pages/my-events-page";
import { SettingPage } from "../pages/setting-page";
import { ROUTES } from "../shared/config/routes";

const routes = [
  { path: ROUTES.main, element: <MainPage /> },
  { path: ROUTES.eventDetail, element: <EventDetailPage /> },
  { path: ROUTES.settings, element: <SettingPage /> },
  { path: ROUTES.myEvents, element: <MyEventsPage /> },
];

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
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PageWrapper>{element}</PageWrapper>}
          />
        ))}
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
