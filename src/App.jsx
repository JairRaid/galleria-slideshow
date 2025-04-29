import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import DetailContextProvider from "./components/DetailContextProvider";

function App() {
  return (
    <>
      <DetailContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </DetailContextProvider>
    </>
  );
}

export default App;
