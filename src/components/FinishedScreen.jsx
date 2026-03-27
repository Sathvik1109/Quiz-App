const FinishedScreen = ({ points, maxPoints }) => {
  const percentage = (points / maxPoints) * 100;
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPoints} (
      {Math.ceil(percentage)})%
    </p>
  );
};

export default FinishedScreen;
