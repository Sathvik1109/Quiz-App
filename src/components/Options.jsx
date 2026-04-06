import { useQuiz } from "../contexts/QuizContext";

const Options = () => {
  const { state, dispatch } = useQuiz();
  const { questions, index, answer } = state;
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {questions[index].options.map((op, idx) => (
        <button
          className={`btn btn-option ${idx === answer ? "answer" : ""} ${hasAnswered ? (idx === questions[index].correctOption ? "correct" : "wrong") : ""}`}
          key={op}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: { answer: idx },
            })
          }
        >
          {op}
        </button>
      ))}
    </div>
  );
};

export default Options;
