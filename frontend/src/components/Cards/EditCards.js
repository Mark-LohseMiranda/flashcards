import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsJournalPlus } from "react-icons/bs";
import { Modal, Ripple, initTE } from "tw-elements";
import FORMAT from "../../Util/FORMAT";
import CardForm from "./CardForm";
import API from "../../API/API";

export default function EditCards({ cards, setCards, cardGroupId }) {
  const [formState, setFormState] = useState({
    question: "",
    answer: "",
  });
  const [add, setAdd] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const deleteCard = (e) => {
    console.log("delete card func");
  };

  const saveUpdate = async (leftover) => {
    try {
      await API.createCard(formState, cardGroupId).then((res) => {
        setCards(res.data);
        localStorage.setItem("cardsData", JSON.stringify(res.data));
        setFormState({ question: "", answer: "" });
        setAdd(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const reloaded = JSON.parse(localStorage.getItem("cardsData"));
    if (!reloaded) {
      navigate("/cardgroups");
    }
    setCards(reloaded);
  }, [navigate, setCards]);

  useEffect(() => {
    initTE({ Modal, Ripple });
  });

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
        <button
          type="button"
          data-te-toggle="modal"
          data-te-target="#staticBackdrop"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={() => setAdd(true)}
        >
          <BsJournalPlus size="2.5em" />
        </button>
      </div>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="staticBackdrop"
        data-te-backdrop="static"
        data-te-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-end rounded-t-md mt-2 mr-2 dark:border-opacity-50">
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none text-red-500 hover:text-red-950"
                data-te-modal-dismiss
                aria-label="Close"
                onClick={() => {
                  setFormState({ question: "", answer: "" });
                  setAdd(false);
                }}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* <!--Modal body--> */}
            <div data-te-modal-body-ref className="relative p-2">
              <CardForm
                handleFormChange={handleFormChange}
              />
            </div>
            {/* <!--Modal footer--> */}
            <div className="flex flex-shrink-0 flex-wrap items-center justify-between rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                disabled={add}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this Card Group? It cannot be undone."
                    )
                  ) {
                    setFormState({ question: "", answer: "" });
                    deleteCard(selectedData._id);
                  }
                }}
                className="inline-block rounded bg-danger-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-danger-900 hover:text-white focus:outline-none focus:ring-0 active:bg-primary-accent-200 disabled:bg-gray-500"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Delete
              </button>
              <button
                type="button"
                className={FORMAT.button()}
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-modal-dismiss
                onClick={() => {
                  saveUpdate(selectedData?._id);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
