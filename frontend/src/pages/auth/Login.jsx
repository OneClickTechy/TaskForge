import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";
import validator from "validator";
import {
  useLoginMutation,
  useVerifyMutation,
} from "../../app/services/userSlicer";
import Spinner from "../../components/Spinner";
import { FaXmark } from "react-icons/fa6";
import { FaCheck, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const InputField = ({
  icon: Icon,
  icon2: Icon2,
  name,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  onBlur,
  isVerify = false,
}) => {
  return (
    <div
      className="flex justify-start items-center p-2 gap-2  input-outbox"
      role="input"
    >
      <Icon />
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        className="grow"
      />
      {type === "email" && value && isVerify && <Spinner />}
      {value && <Icon2 />}
    </div>
  );
};
const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [verifyEmail, { isLoading: isVerify }] = useVerifyMutation();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = loginInfo;
  const [emailStatus, setEmailStatus] = useState(null);
  const handleChangeLoginInfo = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerifyEmail = async () => {
    if (email) {
      if (!validator.isEmail(email)) {
        setEmailStatus("Provide valid email");
        return;
      }
      try {
        const result = await verifyEmail(email).unwrap();
        setEmailStatus(
          result.exists ? "Email is found." : "Provided email is not found."
        );
      } catch (error) {
        console.error("Error:", error);
        setEmailStatus("Error verifying the email.");
      }
    }
  };

  const canLogin = Boolean(
    emailStatus === "Email is found." &&
      password &&
      password.length >= 6 &&
      password.length <= 20
  );
  const resetForm = () => {
    setLoginInfo({
      email: "",
      password: "",
    });
    setEmailStatus(null);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!canLogin) return;

    try {
      const res = await login({
        email,
        password,
      }).unwrap();
      resetForm();
      toast.success(res.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.data.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section className="p-2 flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-center">Welcome to TaskForge</h1>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <InputField
          icon={RiMailLine}
          icon2={emailStatus !== "Email is found." ? FaXmark : FaCheck}
          name={"email"}
          placeholder={"email"}
          type={"email"}
          value={email}
          onChange={handleChangeLoginInfo}
          onBlur={handleVerifyEmail}
          isVerify={isVerify}
          autoComplete={"email"}
        />

        <div
          className="flex justify-start items-center p-2 gap-2  input-outbox"
          role="input"
        >
          <label htmlFor="password" className="sr-only">
            password
          </label>
          <RiLockPasswordLine />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeLoginInfo}
            autoComplete="off"
            className="grow"
          />
          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <button
          type="submit"
          disabled={!canLogin || isLoading}
          className={`${
            !canLogin || isLoading ? "bg-black/50 cursor-not-allowed" : null
          }`}
        >
          {isLoading ? <Spinner /> : "Login"}
        </button>
          <Link to="/forgetPassword" className="text-right">forget password</Link>
        <p className="text-center">or</p>
        <p>
          Register <Link to="/register">here</Link>
        </p>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Login;
