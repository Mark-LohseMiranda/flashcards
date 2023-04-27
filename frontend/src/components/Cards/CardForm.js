import React, { useEffect } from "react";
import { Input, initTE } from "tw-elements";
import FORMAT from "../../Util/FORMAT";

export default function CardForm({handleFormChange}) {
  useEffect(() => {
    initTE({ Input });
  });
  return (
    <div>
      <div className="relative mb-4" data-te-input-wrapper-init>
        <input
          type="text"
          className={FORMAT.input()}
          id="question"
          name="question"
          placeholder="Question"
          onChange={handleFormChange}
        />{" "}
        <label htmlFor="question" className={FORMAT.label()}>
          Question
        </label>
      </div>
      <div className="relative mb-4" data-te-input-wrapper-init>
        <input
          type="text"
          className={FORMAT.input()}
          id="answer"
          name="answer"
          placeholder="Answer"
          onChange={handleFormChange}
        />{" "}
        <label htmlFor="answer" className={FORMAT.label()}>
          Answer
        </label>
      </div>
    </div>
  );
}
