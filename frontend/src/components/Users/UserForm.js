import React, { useEffect } from "react";
import { Input, initTE } from "tw-elements";
import FORMAT from "../../Util/FORMAT";

export default function UserForm({ type, handleFormChange }) {
  useEffect(() => {
    initTE({ Input });
  });
  return (
    <div>
      <div className="relative mb-4" data-te-input-wrapper-init>
        <input
          type="email"
          className={FORMAT.input()}
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={handleFormChange}
        />
        <label htmlFor="email" className={FORMAT.label()}>
          Email address
        </label>
      </div>
      {type === "Sign Up" && (
        <div className="relative mb-4" data-te-input-wrapper-init>
          <input
            type="text"
            className={FORMAT.input()}
            id="displayName"
            name="displayName"
            placeholder="Enter Name"
            onChange={handleFormChange}
          />
          <label htmlFor="displayName" className={FORMAT.label()}>
            Enter Name
          </label>
        </div>
      )}
      <div className="relative mb-4" data-te-input-wrapper-init>
        <input
          type="password"
          className={FORMAT.input()}
          id="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleFormChange}
        />
        <label htmlFor="password" className={FORMAT.label()}>
          Password
        </label>
      </div>
      {type === "Sign Up" && (
        <div className="relative mb-4" data-te-input-wrapper-init>
          <input
            type="password"
            className={FORMAT.input()}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleFormChange}
          />
          <label htmlFor="confirmPassword" className={FORMAT.label()}>
            Confirm Password
          </label>
        </div>
      )}
    </div>
  );
}
