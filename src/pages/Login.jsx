import { HelperText } from "@windmill/react-ui";
import ForgotPasswordModal from "components/ForgotPasswordModal";
import { useUser } from "context/UserContext";
import Layout from "layout/Layout";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Redirect, useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import authService from "services/auth.service";

const Login = () => {
  const { isLoggedIn, setUserState } = useUser();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { state } = useLocation();
  const { register, handleSubmit, errors } = useForm();

  const handleGoogleLogin = async (googleData) => {
    try {
      const data = await authService.googleLogin(googleData.tokenId);
      const link = await googleData.getBasicProfile();
      console.log(link?.getImageUrl());
      toast.success("Login successful 🔓", { style: { borderRadius: "0px" } });
      setTimeout(() => {
        setUserState(data);
        setRedirectToReferrer(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setError("");
      setIsLoading(true);
      const data = await authService.login(email, password);
      toast.success("Login successful 🔓", { style: { borderRadius: "0px" } });

      setTimeout(() => {
        setUserState(data);
        setRedirectToReferrer(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
    }
  };

  if (redirectToReferrer) {
    return <Redirect to={state?.from || "/"} />;
  }
  if (isLoggedIn) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <Layout title="Login">
      <div className="text-gray-700 bg-gray-100 mt-8 md:mt-16 lg-mt-16 mx-auto px-4 md:px-0 flex-grow h-full w-full">
        <div className="py-6 mb-3">
          <div className="flex bg-white shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}></div>
            <form className="flex flex-col w-full p-8 lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-semibold text-gray-700 text-center">Cake Store</h2>
              <p className="text-xl text-gray-600 text-center">Welcome back!</p>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none"
                  type="email"
                  name="email"
                  placeholder="Enter a valid email"
                  ref={register({
                    required: true,
                    // eslint-disable-next-line no-useless-escape
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                />
              </div>
              {errors.email && errors.email.type === "required" && (
                <HelperText className="mt-1 italic" valid={false}>
                  Email required
                </HelperText>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <HelperText className="mt-1 italic" valid={false}>
                  Invalid email
                </HelperText>
              )}
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                  <div className="text-xs text-gray-500"><ForgotPasswordModal /></div>
                </div>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none"
                  type="password"
                  name="password"
                  placeholder="Enter a password"
                  ref={register({ required: true })}
                />
              </div>
              {errors.password && errors.password.type === "required" && (
                <HelperText className="mt-1 italic" valid={false}>
                  Password required
                </HelperText>
              )}
              {error && (
                <HelperText className="mt-1 italic" valid={false}>
                  {error}
                </HelperText>
              )}
              <div className="mt-8">
                <button type="submit" className="bg-purple-600 text-white py-2 px-4 w-full hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color={"#0a138b"} size={10} loading={isLoading} />
                  ) : (
                    "Log Me In"
                  )}
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <p className="text-xs text-center text-gray-500 uppercase">or login with Google</p>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>
              <GoogleLogin
                className="my-4 flex justify-center"
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleLogin}
                cookiePolicy={"single_host_origin"}
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <Link to="/signup" className="text-xs text-gray-500 hover:text-gray-900 uppercase">or sign up</Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
