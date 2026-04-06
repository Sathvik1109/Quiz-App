import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

const Question = () => {
  const { state } = useQuiz();
  const { questions, index } = state;
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options />
    </div>
  );
};

export default Question;
