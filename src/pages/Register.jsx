import { HelperText } from "@windmill/react-ui";
import API from "api/axios.config";
import { useUser } from "context/UserContext";
import Layout from "layout/Layout";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Redirect, useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const { isLoggedIn, setUserState } = useUser();
  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    const { password, password2, username, name, email } = data;
    setError("");
    if (password === password2) {
      setIsLoading(!isLoading);
      API.post("/auth/signup", {
        username,
        email,
        password,
        fullname: name,
      })
        .then(({ data }) => {
          setError("");
          toast.success("Account created successfully ✔️", { style: { borderRadius: "0px" } });
          setTimeout(() => {
            setUserState(data);
            setIsLoading(!isLoading);
          }, 1000);
        })
        .catch(({ response }) => {
          setIsLoading(false);
          setError(response.data.message);
        });
    } else {
      setError("Password doesn't match ");
    }
  };

  if (isLoggedIn) {
    return <Redirect to={state?.from || "/"} />;
  }
  return (
    <Layout title="Create account">
      <div className="text-gray-700 bg-gray-100 mt-8 md:mt-16 lg-mt-16 mx-auto px-4 md:px-0 flex-grow h-full w-full">
        <div className="py-6">
          <div className="flex bg-white shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}></div>
            <form className="flex flex-col w-full p-8 lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-semibold text-gray-700 text-center">Cake Store</h2>
              <p className="text-xl text-gray-600 text-center">Welcome to Cake Store🥳</p>

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none"
                  type="text"
                  name="username"
                  placeholder="Enter a username"
                  ref={
                    register({
                      minLength: {
                        value: 4,
                        message: "Username must be greater than 3 characters",
                      },
                      required: "Username is required",
                    })}
                />
              </div>
              {errors.username && errors.username.type === "required" && (
                <HelperText className="pt-2" valid={false}>
                  {errors.username.message}
                </HelperText>
              )}
              {errors.username && errors.username.type === "minLength" && (
                <HelperText className="pt-2" valid={false}>
                  {errors.username.message}
                </HelperText>
              )}

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none"
                  placeholder="Enter a full name"
                  type="text"
                  name="name"
                  ref={register({
                    required: "Name cannot be empty",
                    minLength: {
                      value: 6,
                      message: "Name must be greater than 5 characters",
                    },
                  })}
                />
              </div>
              {errors.name && errors.name.type === "required" && (
                <HelperText className="pt-2" valid={false}>
                  {errors.name.message}
                </HelperText>
              )}
              {errors.name && errors.name.type === "minLength" && (
                <HelperText className="pt-2" valid={false}>
                  {errors.name.message}
                </HelperText>
              )}

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none"
                  placeholder="Enter a valid email"
                  type="email"
                  name="email"
                  ref={register({
                    required: "Email required",
                    pattern: {
                      // eslint-disable-next-line no-useless-escape
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email not valid",
                    },
                  })}
                />
              </div>
              {error && (
                <HelperText className="pt-2" valid={false}>
                  {error}
                </HelperText>
              )}
              {errors.email && errors.email.type === "required" && (
                <HelperText className="pt-2" valid={false}>
                  {errors.email.message}
                </HelperText>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <HelperText className="pt-2" valid={false}>
                  {errors.email.message}
                </HelperText>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                </div>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none"
                  placeholder="Enter a password"
                  type="password"
                  name="password"
                  ref={register({
                    required: "Password required",
                    minLength: {
                      value: 6,
                      message: "Password must be greater than 5 characters",
                    },
                  })}
                />
              </div>
              {errors.password && errors.password.type === "required" && (
                <HelperText className="pt-2" valid={false}>
                  {errors.password.message}
                </HelperText>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <HelperText className="pt-2" valid={false}>
                  {errors.password.message}
                </HelperText>
              )}

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                </div>
                <input
                  className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none"
                  placeholder="Re enter a password"
                  type="password"
                  name="password2"
                  ref={register({
                    validate: (value) =>
                      value === password.current || "Passwords do not match",
                  })}
                />
              </div>
              {errors.password2 && (
                <HelperText className="pt-2" valid={false}>
                  {errors.password2.message}
                </HelperText>
              )}

              <div className="mt-6">
                <button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full hover:bg-gray-600" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color={"#0a138b"} size={10} loading={isLoading} />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <p className="text-xs text-gray-500 uppercase">Have an account?
                  <Link to="/login" className="font-bold"> sign in</Link>
                </p>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
