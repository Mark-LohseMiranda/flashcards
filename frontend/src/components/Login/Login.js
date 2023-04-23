import React, { useState } from "react";
import API from "../../API/API";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser, setCardGroups }) {
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await API.login(loginFormState)
      .then(async (res) => {
        setLoginFormState({ email: "", password: "" });
        setErrorMsg("");
        setUser(res.data);
        localStorage.setItem("userData", JSON.stringify(res.data));
        await API.cardGroup().then((res) => {
          setCardGroups(res.data);
          localStorage.setItem("flashcardData", JSON.stringify(res.data));
        });
      })
      .catch((err) => {
        setErrorMsg("Wrong email and/or password");
      });
    navigate("/cardgroups");
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <form
          className="p-2 rounded-lg shadow-xl bg-slate-200/50"
          id="login-form"
          onSubmit={handleLoginSubmit}
        >
          <h4>Login</h4>

          <div className="mb-3 form-floating xl:w-96">
            <input
              type="email"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={loginFormState.email}
              name="email"
              onChange={handleLoginChange}
              id="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
            <label
              htmlFor="email"
              className="text-gray-700 dark:text-slate-300"
            >
              Email address
            </label>
          </div>
          <div className="mb-3 form-floating xl:w-96">
            <input
              type="password"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 dark:text-slate-200 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="floatingPassword"
              value={loginFormState.password}
              name="password"
              onChange={handleLoginChange}
              placeholder="Password"
              autoComplete="current-password"
            />
            <label
              htmlFor="floatingPassword"
              className="text-gray-700 dark:text-slate-300"
            >
              Password
            </label>
          </div>

          <p>{errorMsg}</p>
          <button
            disabled={!loginFormState.email || !loginFormState.password}
            className="p-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:text-white bg-sky-300 dark:bg-blue-700 drop-shadow-xl"
            id="submit-login"
          >
            Submit
          </button>
        </form>
        {/* <div>
          Need an account <Link to="/signup">Sign up</Link>
        </div> */}
      </div>
    </>
  );
}
