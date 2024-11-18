import { ToastContainer } from "react-toastify";
import Navigation from "./pages/auth/Navigation";
import { Outlet } from "react-router";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return <div>
    <Navigation />
    <ToastContainer />
    <Outlet />
  </div>;
};

export default App;
