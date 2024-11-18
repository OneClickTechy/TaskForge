import React, { useState } from "react";
import { useForgetPasswordMutation } from "../../app/services/userSlicer";
import { toast } from "react-toastify";
import LoadingPage from "../../components/LoadingPage";
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
      console.error(error);
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
    <section className=" flex gap-8 flex-col p-2">
      <h1 className="text-2xl font-semibold text-center">Forget Password</h1>
      <h3 className={`${!success && 'hidden'} text-xl animate-fadeIn animate-infinite text-red-500`}>Check your email</h3>
      <form onSubmit={handleForgetPassword} className="flex flex-col gap-4">
        <label htmlFor="email" className="sr-only">
          email
        </label>
        <input
          type="email"
          className="border border-black"
          placeholder="enter your email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="email"
          required
        />
        <button type="submit">Forget Password</button>
      </form>
      
    </section>
  );
};

export default ForgetPassword;
