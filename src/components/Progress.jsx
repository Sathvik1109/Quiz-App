import { useQuiz } from "../contexts/QuizContext";

const Progress = () => {
  const { state } = useQuiz();
  const { index: i, points, answer, questions } = state;
  const totalPoints = questions.reduce((curr, acc) => curr + acc.points, 0);

  const numQuestions = questions.length;
  return (
    <header className="progress">
      <progress max={numQuestions} value={i + Number(answer !== null)} />
      <p>
        Question <strong>{i + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
};

export default Progress;
