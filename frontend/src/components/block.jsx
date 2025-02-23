import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BlockBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = (event) => {
      if (location.pathname === "/user/:id") {
        navigate("/");
      } else if (
        location.pathname === "/user/:id/ranking" ||
        location.pathname === "/user/:id/game/1" ||
        location.pathname === "/user/:id/game/2" ||
        location.pathname === "/user/:id/game/3" ||
        location.pathname === "/user/:id/game/3/play"
      ) {
        navigate("/user/:id");
      } else {
        navigate("/");
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = handlePopState;

    return () => {
      window.onpopstate = null;
    };
  }, [navigate, location]);

  return null;
};

export default BlockBackButton;
