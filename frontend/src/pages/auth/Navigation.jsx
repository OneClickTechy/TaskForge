import { Link } from "react-router-dom";

const Navigation = () => {
  // const {data} = useGetmeQuery();
  return (
    <nav className="flex justify-between items-center p-2">
      <Link to={"/home"}>HOME</Link>
      <Link to={"/register"}>REGISTER</Link>
      <Link to={"/login"}>LOGIN</Link>
      <Link to={"/logout"}>LOGOUT</Link>
    </nav>
  );
};

export default Navigation;
