import ContainerMain from "./components/Container";
import Home from "./components/Home";
import Game from "./components/Game";
import Result from "./components/Result";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ContainerMain>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </ContainerMain>
  );
}

export default App;

{
  /* <button onClick={()=>dispatch(fetchWords({dif,amount}))}>
Click to fetch
      </button>
      <div>{JSON.stringify(fetchedWords.wordsList)}</div> */
}
