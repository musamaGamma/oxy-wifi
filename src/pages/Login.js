import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckIcon,
  ExclamationIcon,
  EyeIcon,
  EyeOffIcon,
} from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useStore from "../globalStateManger/store";
import Spinner from "../components/Spinner";

const Login = () => {
  const { success, signup, error, loading } = useStore();
  //yup form values validation
  const schema = yup.object().shape({
    username: yup.string().required("your name is required"),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10)
      .max(12),
  });

  //handle form data
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = (values) => {
    signup(values);
  };

  //style fields based on validation
  function validate(key, border = false) {
    if (formState.touchedFields[key]) {
      if (formState.errors[key]) {
        return !border ? (
          <span className="text-red-400 flex items-center mb-2">
            <ExclamationIcon className="h-5 w-5 mx-2 " />
            {formState.errors[key].message}
          </span>
        ) : (
          "border-red-400 border-2 focus:outline-0"
        );
      } else {
        return !border ? (
          <span className="text-green-400 flex items-center mb-2">
            <CheckIcon className="h-5 w-5 mx-2 " />
            looks good
          </span>
        ) : (
          "border-green-400 border-2 focus:outline-0"
        );
      }
    }
  }

  //once the component loads
  useEffect(() => {
    //check if user is already authenticated and redirect to home page
    if (success) navigate("/verify");
  }, [success, navigate]);
  return (
    <div className="flex justify-center items-center min-h-screen md:h-screen bg-indigo-200">
      <form
        className="bg-white w-full md:max-w-sm  max-w-xs flex flex-col border rounded-lg shadow-lg px-8 py-5 animate-fade"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="text-blue-400 font-bold text-left text-2xl">Login</h1>
        {error && (
          <p className="text-red-400 mt-2 font-bold">{error.message}</p>
        )}
        <label
          htmlFor="username"
          className="text-left capitalize py-2 text-gray-700 font-bold"
        >
          Customer name
        </label>
        <input
          type="text"
          id="username"
          name="username"
          {...register("username")}
          placeholder="username"
          autoComplete="off"
          className={`shadow border text-gray-700 rounded  py-2 px-3 mb-3 focus:outline-none focus:shadow-none focus:outline-offset-0  focus:outline-blue-500 ${validate(
            "username",
            true
          )} `}
          required
        />
        {validate("username")}
        <label
          htmlFor="phone"
          className="text-left capitalize py-2 text-gray-700 font-bold"
        >
          phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone")}
          name="phone"
          placeholder="+249xxxxxxxxx"
          autoComplete="off"
          className={`shadow border text-gray-700 rounded 
           py-2 px-3 mb-3 focus:outline-none focus:shadow-none
           focus:outline-offset-0  focus:outline-blue-500 ${validate(
             "phone",
             true
           )}`}
          required
        />
        {validate("phone")}
        <label
          htmlFor="email"
          className="text-left capitalize py-2 text-gray-700 font-bold"
        >
          email
        </label>

        <input
          type="email"
          id="email"
          {...register("email")}
          name="email"
          placeholder="email"
          autoComplete="off"
          className={`shadow border text-gray-700 rounded 
           py-2 px-3 mb-3 focus:outline-none focus:shadow
           -none focus:outline-offset-0  focus:outline-blue-500 ${validate(
             "email",
             true
           )}`}
          required
        />
        {validate("email")}

        <button
          type="submit"
          disabled={!formState.isValid}
          className={`capitalize mt-3 relative rounded  mb-3 text-white font-bold py-2 px-4 ${
            !formState.isValid ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          login
          {/* show a spinner while request is pending */}
          <Spinner loading={loading} />
        </button>
      </form>
    </div>
  );
};

export default Login;
