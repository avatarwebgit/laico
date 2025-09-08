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

import "./App.css";
import DeleteModal from "./components/common/DeleteModal";
import ParallaxBackground from "./components/common/ParallaxBackground";
import TitleManager from "./utils/TitleManager";
import Authmiddleware from "./routes/authMiddleware";
import { ToastContainer } from "react-toastify";
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
      <DeleteModal />
      <CartDrawer />
      <FavoritesDrawer />
      <ParallaxBackground />
      <TitleManager />
      <ToastContainer />

      {shouldHideLayout && <Footer />}
    </Suspense>
  );
}

export default App;
