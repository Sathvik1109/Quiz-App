import { useQuiz } from "../contexts/QuizContext";

const NextButton = () => {
  const { state, dispatch } = useQuiz();
  const { questions, answer, index } = state;
  const numQuestions = questions.length;
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "nextQuestion" });
          }}
        >
          Next
        </button>
      </div>
    );

  if (index === numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "finish" });
          }}
        >
          Finish
        </button>
      </div>
    );
};

export default NextButton;
