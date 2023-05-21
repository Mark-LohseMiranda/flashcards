import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import parse from 'html-react-parser';
import "./Cards.css";

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

  const handlers = useSwipeable({
    onSwipedLeft: () => switchCards("next"),
    onSwipedRight: () => switchCards("previous"),
    swipDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const reloaded = JSON.parse(localStorage.getItem("cardsData"));
    if (!reloaded) {
      navigate("/cardgroups");
    }
    setCards(reloaded);
  }, [navigate, setCards]);

  return (
    <div className="flex items-center justify-center gap-5 m-5">
      <span
        onClick={() => switchCards("previous")}
        className="inline-block w-8 h-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </span>
      <div {...handlers}>
        <div
          id="cardFlip"
          className="flip-card sm:w-96 w-72 h-80"
          onClick={() => {
            document
              .getElementById("cardFlip")
              .classList.toggle("flip-the-card");
          }}
        >
          <div className="shadow-2xl flip-card-inner">
            <div className="cardTop"></div>
            <div className="flex items-center justify-center pb-8 flip-card-front">
              {cards && parse(cards[currentCard].question)}
            </div>
            <div className="pt-8 text-left flip-card-back">
              {cards && parse(cards[currentCard].answer)}
            </div>
          </div>
        </div>
      </div>
      <span
        onClick={() => switchCards("next")}
        className="inline-block w-8 h-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
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
