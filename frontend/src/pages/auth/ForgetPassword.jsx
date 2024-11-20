import React, { useState } from "react";
import { useForgetPasswordMutation } from "../../app/services/userSlicer";
import { toast } from "react-toastify";
import LoadingPage from "../../components/LoadingPage";
import { RiMailLine } from "react-icons/ri";
const ForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await forgetPassword(email).unwrap();
      setSuccess(true);
      toast.success("reset link is send to your email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
        setSuccess(false)
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

  if (isLoading) return <LoadingPage content="Loading, Please wait...." />;

  return (
    <section className="w-full min-h-screen flex justify-center items-center gap-8 flex-col p-2">
      <h1 className="text-2xl font-semibold text-center">Forget Password</h1>
      <h3 className={`${!success && 'hidden'} text-xl animate-fadeIn animate-infinite text-red-500`}>Check your email</h3>
      <form onSubmit={handleForgetPassword} className="flex flex-col gap-4">
      <div
      className="flex justify-start items-center p-2 gap-2  input-outbox"
      role="input"
    >
        <label htmlFor="email" className="sr-only">
          email
        </label>
        <RiMailLine />
        <input
          type="email"
          className="grow"
          placeholder="enter your email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="email"
          required
        />
        </div>
        <button type="submit">Forget Password</button>
      </form>
      
    </section>
  );
};

export default ForgetPassword;
