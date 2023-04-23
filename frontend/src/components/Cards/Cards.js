import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cards({ cards, setCards }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const navigate = useNavigate();

  const switchCards = (direction) => {
    if (direction === "previous") {
      if (currentCard === 0) {
        setCurrentCard(cards.length - 1);
      } else setCurrentCard(currentCard - 1);
    } else {
      if (currentCard === cards.length - 1) {
        setCurrentCard(0);
      } else setCurrentCard(currentCard + 1);
    }
  };

  useEffect(() => {
    const reloaded = JSON.parse(localStorage.getItem("cardsData"));
    if (!reloaded) {
      navigate("/cardgroups");
    }
    setCards(reloaded);
  },[navigate, setCards]);

  return (
    <div className="flex flex-wrap justify-center gap-5 m-5">
      <span
        onClick={() => switchCards("previous")}
        className="inline-block h-8 w-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </span>
      <div
        onClick={() => setShowAnswer(!showAnswer)}
        className="relative items-center p-5 space-y-4 transition-all duration-100 ease-out bg-yellow-200 rounded-md shadow-md w-96 dark:bg-slate-400 dark:text-slate-100"
        // className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
      >
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {showAnswer ? "Answer" : "Question"}
        </h5>
        {cards && <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {showAnswer
            ? cards[currentCard].answer
            : cards[currentCard].question}
        </p>}
        {/* <button
            type="button"
            onClick={() => selectGroup(item.cards)}
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Choose
          </button> */}
      </div>
      <span
        onClick={() => switchCards("next")}
        className="inline-block h-8 w-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
    </div>
  );
}
