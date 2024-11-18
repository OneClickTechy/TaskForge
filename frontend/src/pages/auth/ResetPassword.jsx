import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import {
  PasswordSameChecker,
  PasswordValidChecker,
} from "../../utils/password";
import PropTypes from "prop-types";
import { useResetPasswordMutation } from "../../app/services/userSlicer";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  
  const [resetPassword, {isLoading}] = useResetPasswordMutation();

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordValidator, setShowPasswordValidator] = useState(false);
  const isPasswordSame = PasswordSameChecker(password, confirmPassword);
  const isPasswordValid = PasswordValidChecker(
    password,
    confirmPassword
  ).isValid;
  const handleShowPasswordValidator = () => {
    setShowPasswordValidator(!showPasswordValidator);
  };
  const canReset = Boolean(password && confirmPassword && isPasswordSame && isPasswordValid)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if(!canReset) return;

    try {
        const info = {
            token,
            password,
        }
        const res = await resetPassword(info).unwrap();
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
            navigate("/login");
          }, 3000);
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

  }
  return (
    <section>
      <form className="flex flex-col gap-4 p-2" onSubmit={handleResetPassword}>
        <PasswordInput
          icon={RiLockPasswordLine}
          icon2={FaCheck}
          type={"password"}
          name={"password"}
          placeholder={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={handleShowPasswordValidator}
          onBlur={handleShowPasswordValidator}
          isPasswordSame={isPasswordSame}
          isPasswordValid={isPasswordValid}
        />

        <PasswordInput
          icon={RiLockPasswordLine}
          icon2={FaCheck}
          type={"password"}
          name={"confirmPassword"}
          placeholder={"confirm password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        <button type="submit">Reset Password</button>
      </form>
      <PasswordValidate password={password} showPasswordValidator={showPasswordValidator}/>
    </section>
  );
};

function PasswordInput({
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
}) {
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
}
PasswordInput.propTypes = {
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
function PasswordValidate({ password, showPasswordValidator }) {
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
}
PasswordValidate.propTypes = {
  password: PropTypes.string.isRequired,
};

export default ResetPassword;
