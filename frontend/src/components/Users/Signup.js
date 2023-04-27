import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FORMAT from "../../Util/FORMAT";
import API from "../../API/API";
import UserForm from "./UserForm";

export default function Signup({setUser, setCardGroups}) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      API.signup(formState).then((res)=>{
        setUser(res.data)
        localStorage.setItem("userData", JSON.stringify(res.data));
        API.cardGroup().then((res) => {
          setCardGroups(res.data);
          localStorage.setItem("flashcardData", JSON.stringify(res.data));
          navigate("/cardgroups")
        });
      })

    } catch (err) {
      console.log(err.message)
    }
  };
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="block max-w-sm rounded-lg bg-white p-6 dark:bg-neutral-700 shadow-lg shadow-yellow-500/30">
        <form onSubmit={formSubmit}>
          <UserForm
            type="Sign Up"
            formState={formState}
            handleFormChange={handleFormChange}
          />
          <button
            type="submit"
            className={FORMAT.button()}
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
