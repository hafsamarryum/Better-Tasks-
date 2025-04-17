import "./index.css";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import AuthRoutes from "./routes/AuthRoutes";
// import Header from "./components/Header";

function App() {
  return (
    <>
      <ToastContainer />
      {/* <Header /> */}
      <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
