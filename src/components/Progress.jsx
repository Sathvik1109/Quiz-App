const Progress = ({ i, numQuestions, points, totalPoints, answer }) => {
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
