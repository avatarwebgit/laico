import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { logoutRequest } from "../redux/auth/authActions";
import { useEffect } from "react";

const LastSeen = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkInactivity = () => {
      if (isAuthenticated) {
        const lastActivity = localStorage.getItem("lastActivityTime");
        const timeTillLogout = 30 * 24 * 60 * 60 * 1000;

        if (lastActivity) {
          const lastActivityTime = parseInt(lastActivity, 10);
          if (Date.now() - lastActivityTime > timeTillLogout) {
            dispatch(logoutRequest());
            return;
          }
        }

        localStorage.setItem("lastActivityTime", Date.now().toString());
      } else {
        localStorage.removeItem("lastActivityTime");
      }
    };

    checkInactivity();
  }, [isAuthenticated, dispatch, location.pathname]);
  return null;
};

export default LastSeen;
