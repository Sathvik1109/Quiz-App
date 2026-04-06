import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

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

const sec_per_ques = 20;

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) return;

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { QuizProvider, useQuiz };
