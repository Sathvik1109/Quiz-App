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

import { useEffect, useReducer } from "react";

const sec_per_ques = 20;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload.data, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        timer: state.questions.length * sec_per_ques,
      };

    case "nextQuestion":
      return {
        ...state,
        index:
          state.index < state.questions.length - 1
            ? state.index + 1
            : state.index,
        answer: null,
      };

    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload.answer,
        points:
          action.payload.answer === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action is unknown");
  }
};

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished' states
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timer: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, answer, index, points, highscore, timer } = state;
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((curr, acc) => curr + acc.points, 0);
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
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              i={index}
              numQuestions={numQuestions}
              totalPoints={totalPoints}
              points={points}
              answer={answer}
            />
            <Question state={state} dispatch={dispatch} />
            <Footer>
              <Timer dispatch={dispatch} timer={timer} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
