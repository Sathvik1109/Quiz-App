import Header from "./Header";
import Main from "./Body";
import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  return state;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getFetch = async () => {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    getFetch();
  }, []);
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
