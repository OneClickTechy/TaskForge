import React from "react";
import Navigation from "./pages/auth/Navigation";
import { Outlet } from "react-router";

const App = () => {
  return <div>
    <Navigation />
    <Outlet />
  </div>;
};

export default App;
