import { ToastContainer } from "react-toastify";
import Navigation from "./pages/auth/Navigation";
import { Outlet } from "react-router";
import 'react-toastify/dist/ReactToastify.css'
import ThemeToggler from "./components/ThemeToggler";

const App = () => {
return <div className="bg-background text-text">
    <ThemeToggler />
    <ToastContainer />
    <Outlet />
  </div>;
};

export default App;
