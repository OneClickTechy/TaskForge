import { useEffect } from "react";
import { useGetmeQuery, useLogoutMutation } from "../../app/services/userSlicer";
import LoadingPage from "../../components/LoadingPage";
import { useNavigate } from "react-router";

const Logout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const {data: user} = useGetmeQuery();
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
      Redirecting to Login page
    </div>
  );
};

export default Logout;
