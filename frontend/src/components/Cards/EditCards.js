import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsJournalPlus } from "react-icons/bs";

export default function EditCards({ cards, setCards }) {
  const navigate = useNavigate();

  useEffect(() => {
    const reloaded = JSON.parse(localStorage.getItem("cardsData"));
    if (!reloaded) {
      navigate("/cardgroups");
    }
    setCards(reloaded);
  }, [navigate, setCards]);

  return (
    <div>
      <div className="hidden md:block overflow-auto rounded-lg shadow w-5/6 mx-auto mt-4">
        <table className="">
          <thead className="border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Question
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Answer
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                <p className="invisible">Stuff</p>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400">
            {cards &&
              cards.map((item, i) => {
                return (
                  <tr
                    onClick={() => console.log(i)}
                    className={`${(i + 1) % 2 === 0 && "bg-gray-50"}`}
                    key={item._id}
                  >
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td>Edit</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-center max-w-6xl gap-5 p-5 pb-64 mx-auto md:hidden">
        {cards &&
          cards.map((item) => {
            return (
              <div
                key={item._id}
                className="relative items-center p-5 space-y-4 transition-all duration-100 ease-out bg-yellow-200 rounded-md shadow-md hover:scale-105 dark:bg-slate-400 dark:text-slate-100"
              >
                <div>{item.question}</div>
                <div>{item.answer}</div>
              </div>
            );
          })}
      </div>
      <div className="group fixed bottom-10 right-10 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 uppercase leading-normal text-white">
        <button type="button" data-te-ripple-init data-te-ripple-color="light">
          <BsJournalPlus size="2.5em" />
        </button>
      </div>
    </div>
  );
}
