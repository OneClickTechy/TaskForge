import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { RiLockPasswordLine, RiUser6Line, RiMailLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import {
  PasswordSameChecker,
  PasswordValidChecker,
} from "../../utils/password";
import validator from "validator";
import {
  useRegisterMutation,
  useVerifyMutation,
} from "../../app/services/userSlicer";
import Spinner from "../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router";

const InputField = ({
  icon: Icon,
  icon2: Icon2,
  name,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  onBlur = null,
  isVerify,
  status,
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
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        className="grow"
      />
      {value && (
        <Icon2
          className={`${
            (value && status === "Username is valid") ||
            status === "Email is available."
              ? "text-green-500"
              : "text-red-500"
          }`}
        />
      )}
      {/* {type === 'text' && status === "Username is valid" && <Icon2 />}
      {type === 'email' && status === "Email is available." && <Icon2 />} */}
      {type === "email" && value && isVerify && <Spinner />}
    </div>
  );
};
InputField.propTypes = {
  icon: PropTypes.elementType.isRequired,
  icon2: PropTypes.elementType,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  onBlur: PropTypes.func,
  isVerify: PropTypes.bool,
  status: PropTypes.string,
};

const PasswordInputField = ({
  icon: Icon,
  icon2: Icon2,
  name,
  type,
  placeholder,
  value,
  onChange,
  onClick = null,
  onBlur = null,
  isPasswordSame,
  isPasswordValid,
}) => {
  return (
    <div
      className="flex justify-start items-center p-2 gap-2  input-outbox"
      role="input"
      onClick={onClick}
      onBlur={onBlur}
    >
      <Icon />
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        className="grow"
        value={value}
        onChange={onChange}
      />
      {isPasswordSame && isPasswordValid && (
        <Icon2
          className={`${
            isPasswordSame && isPasswordValid
              ? "text-green-500"
              : "text-red-500"
          }`}
        />
      )}
    </div>
  );
};
PasswordInputField.propTypes = {
  icon: PropTypes.elementType.isRequired,
  icon2: PropTypes.elementType,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isPasswordSame: PropTypes.bool.isRequired,
  isPasswordValid: PropTypes.bool.isRequired,
};

const PasswordValidate = ({ password, showPasswordValidator }) => {
  const { hasUppercase, hasLowercase, hasNumber, hasSymbol, noRepeat } =
    PasswordValidChecker(password).passwordCheck;
  return (
    <div
      className={`${
        !showPasswordValidator && "hidden"
      } flex flex-col justify-center items-center`}
    >
      <p className="after:content-['*'] after:text-red-500">
        Please ensure your password is pass below rules.
      </p>
      <div className="flex flex-col">
        <small className="">
          Must have 1 Uppercase{" "}
          {hasUppercase && (
            <span className="text-green-600 text-xl font-semibold">
              &#x2713;
            </span>
          )}
        </small>
        <small className="">
          Must have 1 Lowercase{" "}
          {hasLowercase && (
            <span className="text-green-600 text-xl font-semibold">
              &#x2713;
            </span>
          )}
        </small>
        <small className="">
          Must have 1 Numbercase{" "}
          {hasNumber && (
            <span className="text-green-600 text-xl font-semibold">
              &#x2713;
            </span>
          )}
        </small>
        <small className="">
          Must have 1 Symbol{" "}
          {hasSymbol && (
            <span className="text-green-600 text-xl font-semibold">
              &#x2713;
            </span>
          )}
        </small>
        <small className="">
          Has no repeat{" "}
          {password.length > 0 && noRepeat && (
            <span className="text-green-600 text-xl font-semibold">
              &#x2713;
            </span>
          )}
        </small>
      </div>
    </div>
  );
};
PasswordValidate.propTypes = {
  password: PropTypes.string.isRequired,
};

const Register = () => {
  const [verifyEmail, { isLoading: isVerify }] = useVerifyMutation();
  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [showPasswordValidator, setShowPasswordValidator] = useState(false);

  const handleChangeRegisterInfo = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const { username, email, password, confirmPassword } = registerInfo;

  const handleVerifyUsername = useCallback(() => {
    if (!/^[a-zA-Z]/.test(username)) {
      setUsernameStatus("Username must start with an alphabet");
    } else if (username.length < 6) {
      setUsernameStatus("Minimum 6 characters required");
    } else if (username.length > 20) {
      setUsernameStatus("Maximum 20 characters allowed");
    } else {
      setUsernameStatus("Username is valid");
    }
  }, [username]); // Include dependencies here if needed

  useEffect(() => {
    handleVerifyUsername();
  }, [username, handleVerifyUsername]);

  const handleVerifyEmail = async () => {
    if (email) {
      if (!validator.isEmail(email)) {
        setEmailStatus("Provide valid email");
        return;
      }
      try {
        const result = await verifyEmail(email).unwrap();
        setEmailStatus(
          result.exists
            ? "This email is already in use."
            : "Email is available."
        );
      } catch (error) {
        console.error("Error:", error);
        setEmailStatus("Error verifying the email.");
      }
    }
  };

  const isPasswordSame = PasswordSameChecker(password, confirmPassword);
  const isPasswordValid = PasswordValidChecker(
    password,
    confirmPassword
  ).isValid;
  const handleShowPasswordValidator = () => {
    setShowPasswordValidator(!showPasswordValidator);
  };
  const canSave = Boolean(
    username &&
      email &&
      password &&
      confirmPassword &&
      usernameStatus === "Username is valid" &&
      emailStatus === "Email is available." &&
      isPasswordSame &&
      isPasswordValid
  );
  const resetForm = () => {
    setRegisterInfo({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setUsernameStatus(null);
    setEmailStatus(null);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!canSave) return;
    try {
      const res = await register({
        username,
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
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.log(error.data.error);
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
  useEffect(() => {
    console.log(showPasswordValidator);
  }, [showPasswordValidator]);
  return (
    <section className="flex flex-col gap-8 items-center justify-center p-2 w-full min-h-screen">
      <h1 className="text-2xl font-bold text-center">Welcome to TaskForge</h1>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={handleRegister}
      >
        <InputField
          icon={RiUser6Line}
          icon2={usernameStatus === "Username is valid" ? FaCheck : FaXmark}
          name={"username"}
          type={"text"}
          placeholder={"user name"}
          value={username}
          onChange={handleChangeRegisterInfo}
          onBlur={handleVerifyUsername}
          autoComplete={"username"}
          status={usernameStatus}
        />
        {username.length > 0 &&
          usernameStatus &&
          usernameStatus !== "Username is valid" && (
            <span className="text-red-500 px-2" aria-live="polite">
              {usernameStatus}
            </span>
          )}
        <InputField
          icon={RiMailLine}
          icon2={emailStatus === "Email is available." ? FaCheck : FaXmark}
          name={"email"}
          type={"email"}
          placeholder={"email"}
          value={email}
          onChange={handleChangeRegisterInfo}
          onBlur={handleVerifyEmail}
          autoComplete={"email"}
          isVerify={isVerify}
          status={emailStatus}
        />
        {email.length > 0 && emailStatus !== "Email is available." && (
          <span className="text-red-500 px-2" aria-live="polite">
            {emailStatus}
          </span>
        )}

        <PasswordInputField
          icon={RiLockPasswordLine}
          icon2={FaCheck}
          type={"password"}
          name={"password"}
          placeholder={"password"}
          value={password}
          onChange={handleChangeRegisterInfo}
          onClick={handleShowPasswordValidator}
          onBlur={handleShowPasswordValidator}
          isPasswordSame={isPasswordSame}
          isPasswordValid={isPasswordValid}
        />

        <PasswordInputField
          icon={RiLockPasswordLine}
          icon2={FaCheck}
          type={"password"}
          name={"confirmPassword"}
          placeholder={"confirm password"}
          value={confirmPassword}
          onChange={handleChangeRegisterInfo}
          isPasswordSame={isPasswordSame}
          isPasswordValid={isPasswordValid}
        />
        {password.length > 0 &&
          confirmPassword.length > 0 &&
          !isPasswordSame && (
            <div
              className="px-2 text-red-500 animate-shakeX"
              aria-live="polite"
            >
              Password didn&apos;t match
            </div>
          )}
        <button
          type="submit"
          disabled={!canSave || isLoading}
          className={`${
            !canSave || isLoading ? "bg-black/50 cursor-not-allowed" : null
          }`}
        >
          {isLoading ? <Spinner /> : "Register"}
        </button>
        <p className="text-center">or</p>
        <p>
          login <Link to="/login">here</Link>
        </p>
      </form>
      <PasswordValidate
        password={password}
        showPasswordValidator={showPasswordValidator}
      />
      <ToastContainer />
    </section>
  );
};

export default Register;
