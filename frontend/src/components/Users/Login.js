import React, { useState } from "react";
import API from "../../API/API";
import { useNavigate } from "react-router-dom";
import FORMAT from "../../Util/FORMAT";
import UserForm from "./UserForm";

export default function Login({ setUser, setCardGroups }) {
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await API.login(formState)
      .then(async (res) => {
        setFormState({ email: "", password: "" });
        setErrorMsg("");
        setUser(res.data);
        localStorage.setItem("userData", JSON.stringify(res.data));
        await API.cardGroup().then((res) => {
          setCardGroups(res.data);
          localStorage.setItem("flashcardData", JSON.stringify(res.data));
        });
        navigate("/cardgroups");
      })
      .catch((err) => {
        setErrorMsg("Wrong email and/or password");
      });
  };

  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <div className="block max-w-sm rounded-lg bg-white p-6 dark:bg-neutral-700 shadow-lg shadow-yellow-500/30">
          <form onSubmit={handleLoginSubmit}>
            <UserForm type="Login" handleFormChange={handleFormChange} />
            <button
              type="submit"
              className={FORMAT.button()}
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Login
            </button>
          </form>
          <div>
            {errorMsg}
          </div>
        </div>
      </div>
    </>
  );
}
