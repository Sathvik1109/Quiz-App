import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

const Timer = () => {
  const { state, dispatch } = useQuiz();
  const { timer } = state;
  const mins = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
