import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
}

export default Layout;
