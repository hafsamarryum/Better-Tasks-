import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from "react-toastify";

// import Header from "./components/Header";

function App() {
  return (
    <>
      <ToastContainer />
      {/* <Header /> */}
      <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
