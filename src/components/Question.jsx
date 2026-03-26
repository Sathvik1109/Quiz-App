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
    </div>
  );
};

export default Question;
