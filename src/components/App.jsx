import Header from "./Header";
import Main from "./Body";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StarScreen";
import Question from "./Question";
import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload.data, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "indexIncrease":
      return {
        ...state,
        index:
          state.index < state.questions.length - 1
            ? state.index + 1
            : state.index,
      };
    case "indexDecrease":
      return {
        ...state,
        index: state.index > 0 ? state.index - 1 : state.index,
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
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;
  const numQuestions = questions.length;
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
        {status === "active" && <Question state={state} dispatch={dispatch} />}
      </Main>
    </div>
  );
}

export default App;
