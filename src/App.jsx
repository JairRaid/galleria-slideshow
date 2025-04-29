import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import DetailContextProvider from "./components/DetailContextProvider";

function App() {
  return (
    <>
      <DetailContextProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </HashRouter>
      </DetailContextProvider>
    </>
  );
}

export default App;
