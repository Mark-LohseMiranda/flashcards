import React, { useState, useEffect } from "react";
import { Modal, Ripple, initTE } from "tw-elements";
import { useNavigate } from "react-router-dom";
import { MdPublic, MdPublicOff } from "react-icons/md";
import { BsJournalPlus } from "react-icons/bs";
import API from "../../API/API";
import Tooltip from "../Tooltip/Tooltip";
import UpdateForm from "./UpdateForm";
import FORMAT from "../../Util/FORMAT";

export default function CardGroups({
  user,
  cardGroups,
  setCardGroups,
  setCards,
  setCardGroupId,
}) {
  const [selectedData, setSelectedData] = useState();
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    private: false,
  });
  const [add, setAdd] = useState(false);

  const navigate = useNavigate();

  const selectGroup = (cardGroupId, cards, target) => {
    setCards(cards);
    setCardGroupId(cardGroupId);
    localStorage.setItem("cardsData", JSON.stringify(cards));
    navigate(`/${target}?cgid=${cardGroupId}`);
  };

  const saveUpdate = async (cardGroupId) => {
    try {
      if (cardGroupId) {
        await API.updateCardGroup(formState, cardGroupId).then((res) => {
          setCardGroups(res.data);
          localStorage.setItem("flashcardData", JSON.stringify(res.data));
          setFormState({ name: "", description: "", private: "" });
        });
      } else {
        await API.createCardGroup(formState).then((res) => {
          setCardGroups(res.data);
          localStorage.setItem("flashcardData", JSON.stringify(res.data));
          setFormState({ name: "", description: "", private: "" });
          setAdd(false);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCardGroup = async (cardGroupId) => {
    try {
      await API.deleteCardGroup(cardGroupId).then((res) => {
        setCardGroups(res.data);
        localStorage.setItem("flashcardData", JSON.stringify(res.data));
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    initTE({ Modal, Ripple });
  });

  useEffect(() => {
    const storedInfo = JSON.parse(localStorage.getItem("flashcardData"));
    if (!storedInfo) {
      navigate("/");
    } else {
      setCardGroups(storedInfo);
    }
  }, [setCardGroups, navigate]);

  return (
    <div className="flex flex-wrap justify-center gap-5 m-5">
      {cardGroups?.map((item) => {
        return (
          <div
            key={item._id}
            className="relative items-center p-5 space-y-4 transition-all duration-100 ease-out bg-yellow-200 rounded-md shadow-md w-96 dark:bg-slate-400 dark:text-slate-100"
          >
            <div className="">
              <Tooltip message={"Public/Private"}>
                {!item.private ? (
                  <MdPublic size="1.5em" />
                ) : (
                  <MdPublicOff size="1.5em" />
                )}
              </Tooltip>
            </div>
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {item.name}
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {item.description}
            </p>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              # of Cards: {item.cards.length}
            </p>
            <button
              type="button"
              disabled={!item.cards.length}
              onClick={() => selectGroup(item._id, item.cards, "cards")}
              className={FORMAT.button()}
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Study
            </button>
            <button
              type="button"
              disabled={user._id !== item.owner}
              onClick={() => {
                setSelectedData(item);
                setFormState({
                  name: item.name,
                  description: item.description,
                  private: item.private,
                });
              }}
              data-te-toggle="modal"
              data-te-target="#staticBackdrop"
              className={FORMAT.button()}
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Edit Info
            </button>
            <button
              disabled={user._id !== item.owner}
              onClick={() => selectGroup(item._id, item.cards, "editcards")}
              className={FORMAT.button()}
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Edit Cards
            </button>
          </div>
        );
      })}
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
                  setFormState({ name: "", description: "", private: false });
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
              <UpdateForm
                formState={formState}
                setFormState={setFormState}
                selectedData={selectedData}
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
                    setFormState({ name: "", description: "", private: false });
                    deleteCardGroup(selectedData._id);
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
