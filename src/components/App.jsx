import Header from "./Header";
import Main from "./Body";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StarScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";

import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function App() {
  const { state, dispatch } = useQuiz();
  // console.log(state);
  const { status } = state;

  useEffect(() => {
    const getFetch = async () => {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: { data: data } });
      } catch (err) {
        dispatch({ type: "dataFailed", payload: { error: err } });
      }
    };
    getFetch();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
}

export default App;
