import Header from "./Header";
import Main from "./Body";
import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload.data, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Action is unknown");
  }
};

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished' states
  status: "loading",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getFetch = async () => {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: { data: data } });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };
    getFetch();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}

export default App;
