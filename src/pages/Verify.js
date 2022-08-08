import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../globalStateManger/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ExclamationIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Spinner from "../components/Spinner";

const Verify = () => {
  //global state
  const { user, verify, error, loading, advertisment, success } = useStore();
  const schema = yup.object().shape({
    otp: yup.string().required(),
  });

  //handle form data
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = (values) => {
    verify({ ...user, ...values });
  };

  //style fields based on validation
  const validate = (key, border = false) => {
    if (formState.touchedFields[key]) {
      if (formState.errors[key]) {
        return !border ? (
          <span className="text-red-400 text-left flex items-center mb-2">
            <ExclamationIcon className="h-5 w-5 mx-2 " />
            {formState.errors[key].message}
          </span>
        ) : (
          "border-red-400 border-2 focus:outline-0"
        );
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    //check if user is already authenticated and redirect to home page
    if (!success) return navigate("/login");
    if (success && advertisment) return navigate("/");
  }, [success, navigate, advertisment]);
  return (
    <div className="flex justify-center items-center h-screen bg-indigo-200">
      <form
        className="bg-white w-full md:max-w-sm  max-w-xs flex flex-col border rounded-lg shadow-lg px-8 py-5 animate-fade"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold font-4xl text-blue-400 text-2xl text-left">
          verify
        </h1>
        {error && (
          <p className="text-red-400 mt-2 font-bold">{error.message}</p>
        )}
        <label
          htmlFor="username"
          className="text-left capitalize py-2 text-gray-700 font-bold"
        >
          write the code that was sent to you
        </label>
        <input
          type="text"
          id="otp"
          name="otp"
          placeholder="otp"
          autoComplete="off"
          className={`shadow border text-gray-700 rounded  
          py-2 px-3 mb-3 focus:outline-none focus:shadow-none
           focus:outline-offset-0  focus:outline-blue-500 ${validate(
             "otp",
             true
           )}`}
          {...register("otp")}
        />
        {validate("otp")}

        <button
          type="submit"
          disabled={!formState.isValid}
          className={`capitalize mt-3 relative rounded  mb-3 text-white font-bold py-2 px-4 ${
            !formState.isValid ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          verify
          <Spinner loading={loading} />
        </button>
      </form>
    </div>
  );
};

export default Verify;
