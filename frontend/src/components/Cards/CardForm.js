import { useState, useEffect } from "react";
import { Input, initTE } from "tw-elements";
import FORMAT from "../../Util/FORMAT";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { useSearchParams } from "react-router-dom";
import API from "../../API/API";

export default function CardForm({setCardGroups}) {
  const [questionForm, setQuestionForm] = useState("");
  const [answerForm, setAnswerForm] = useState("");
  const [urlCardGroupId, setUrlCardGroupId] = useSearchParams();

  const saveCard = async () =>{
    console.log(urlCardGroupId.get("cgid"))
    try {
      const formData = {question: questionForm, answer: answerForm}
      await API.createCard(formData, urlCardGroupId.get("cgid")).then((res) => {
        console.log(res.data)
        setCardGroups(res.data);
        localStorage.setItem("flashcardData", JSON.stringify(res.data));
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    initTE({ Input });
  });
  return (
    <div>
      <div>
        Question:
        <ReactQuill theme="snow" value={questionForm} onChange={setQuestionForm} />
      </div>
      <div>
        Answer:
        <ReactQuill theme="snow" value={answerForm} onChange={setAnswerForm} />
      </div>
      <button disabled={!questionForm && !answerForm} data-te-modal-dismiss onClick={saveCard}>
        Save
      </button>
    </div>
  );
}
