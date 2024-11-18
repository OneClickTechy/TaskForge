import { useEffect } from "react";
import { useLogoutMutation } from "../../app/services/userSlicer";
import LoadingPage from "../../components/LoadingPage";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router";
const Logout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res = await logout().unwrap();
        if(res.message){
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleLogout();
  }, []);

  if (isLoading) {
    return <LoadingPage content={"Logging out, please wait"} />;
  }
  return (
    <div className="min-h-screen w-full">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"light"}
      />
    </div>
  );
};

export default Logout;
