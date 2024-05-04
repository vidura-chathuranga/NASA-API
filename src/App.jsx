import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Layouts/main.layout";
import Home from "./pages/Home";

import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import RoverPage from "./pages/RoverPage";
import APOD from "./pages/APOD";
import SearchPage from "./pages/SearchPage";
import ContentCard from "./components/ContentCard";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/marsphotos" element={<RoverPage />} />
          <Route path="/apod" element={<APOD />} />
          <Route path="/card" element={<ContentCard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
