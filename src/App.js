import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { useIsVertical } from "./hooks/useIsVertical";
import { authRoutes, publicRoutes } from "./routes/index";

import Loader from "./components/common/Loader";
import CartDrawer from "./components/layout/CartDrawer";
import FavoritesDrawer from "./components/layout/FavoritesDrawer";
import Footer from "./components/layout/HorizontalLayout/Footer";
import Header from "./components/layout/HorizontalLayout/Header";
import FixedNavigation from "./components/layout/VerticalLayout/FixedNavigation";
import MobileHeader from "./components/layout/VerticalLayout/Header";
import CompareBar from "./components/layout/CompareBar";

import { ToastContainer } from "react-toastify";
import "./App.css";
import InfoModal from "./components/common/InfoModal";
import ParallaxBackground from "./components/common/ParallaxBackground";
import Authmiddleware from "./routes/authMiddleware";
import TitleManager from "./utils/TitleManager";
function App() {
  const isVertical = useIsVertical();
  const location = useLocation();
  const currentPath = location.pathname;

  const hideHeadersOnDesktop = [
    "/login",
    "/register",
    "/otp",
    "/login-with-mobile",
  ];

  const shouldHideLayout = !(
    !isVertical && hideHeadersOnDesktop.includes(currentPath)
  );

  return (
    <Suspense fallback={<Loader />}>
      {shouldHideLayout && (isVertical ? <MobileHeader /> : <Header />)}
      {isVertical && <FixedNavigation />}

      <Routes className="App">
        {publicRoutes.map((route, id) => {
          return <Route path={route.path} element={route.element} key={id} />;
        })}

        {authRoutes.map((route, id) => {
          return (
            <Route
              path={route.path}
              element={<Authmiddleware>{route.element}</Authmiddleware>}
              key={id}
            />
          );
        })}
      </Routes>
      <InfoModal />
      <CartDrawer />
      <FavoritesDrawer />
      <CompareBar />
      <ParallaxBackground />
      <TitleManager />
      <ToastContainer position="top-left" />

      {shouldHideLayout && <Footer />}
    </Suspense>
  );
}

export default App;
