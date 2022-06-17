import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Games from "./pages/Games";
import Game from "./pages/Game";
import Test from "./pages/test.js";
import UserRecomm from "./pages/UserRecomm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        {/* <nav>
        <h1>Steam Game Recom</h1>
      </nav> */}

        <div>
          <Header />

          <Routes>
            <Route path="/" element={<Games />} />
            {/* <Route path="/games/:id" element={<Game />} /> */}
            <Route path="/game/:id" element={<Game />} />
            <Route path="/games/:id" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userrecomm" element={<UserRecomm />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
