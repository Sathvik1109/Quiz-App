import Options from "./Options";

const Question = ({ state, dispatch }) => {
  const { questions, index, answer } = state;
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options
        questions={questions}
        index={index}
        answer={answer}
        dispatch={dispatch}
      />

      {/* Btns */}
      <button
        className="btn"
        disabled={index === 0}
        onClick={() => {
          dispatch({ type: "indexDecrease" });
        }}
      >
        prev
      </button>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "indexIncrease" });
        }}
        disabled={index === questions.length - 1}
      >
        next
      </button>
    </div>
  );
};

export default Question;
