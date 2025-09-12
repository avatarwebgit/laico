import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { useIsVertical } from "./hooks/useIsVertical";
import { authRoutes, publicRoutes } from "./routes/index";

import Loader from "./components/common/Loader";
import CartDrawer from "./components/layout/CartDrawer";
import CompareBar from "./components/layout/CompareBar";
import FavoritesDrawer from "./components/layout/FavoritesDrawer";
import Footer from "./components/layout/HorizontalLayout/Footer";
import Header from "./components/layout/HorizontalLayout/Header";
import FixedNavigation from "./components/layout/VerticalLayout/FixedNavigation";
import MobileHeader from "./components/layout/VerticalLayout/Header";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";
import InfoModal from "./components/common/InfoModal";
import ParallaxBackground from "./components/common/ParallaxBackground";
import { fetchCartRequest } from "./redux/cart/cartActions";
import { fetchFavoritesRequest } from "./redux/favorites/favoritesActions";
import Authmiddleware from "./routes/authMiddleware";
import LastSeen from "./utils/LastSeen";
import PersistSync from "./utils/PersistSync";
import TitleManager from "./utils/TitleManager";
import InstallmentCartDrawer from "./components/layout/InstallmentCartDrawer";
import { fetchInstallmentCartRequest } from "./redux/installmentCart/installmentCartActions";
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isVertical = useIsVertical();
  const location = useLocation();
  const currentPath = location.pathname;

  const dispatch = useDispatch();

  const hideHeadersOnDesktop = [
    "/login",
    "/register",
    "/otp",
    "/login-with-mobile",
  ];

  const hideCompareBar = [
    "/login",
    "/register",
    "/otp",
    "/login-with-mobile",
    "/compare",
  ];

  const shouldHideElement = (hiddenPath) =>
    !(!isVertical && hiddenPath.includes(currentPath));

  if (isAuthenticated) {
    dispatch(fetchCartRequest());
    dispatch(fetchFavoritesRequest());
    dispatch(fetchInstallmentCartRequest());
  }

  return (
    <Suspense fallback={<Loader />}>
      {shouldHideElement(hideHeadersOnDesktop) &&
        (isVertical ? <MobileHeader /> : <Header />)}
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
      <InstallmentCartDrawer />
      <FavoritesDrawer />
      <ParallaxBackground />
      <LastSeen />
      <TitleManager />
      <ToastContainer position="top-left" />
      <PersistSync />

      {shouldHideElement(hideCompareBar) && <CompareBar />}
      {shouldHideElement(hideHeadersOnDesktop) && <Footer />}
    </Suspense>
  );
}

export default App;
