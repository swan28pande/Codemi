import { BrowserRouter , Routes , Route } from "react-router-dom";

import HomePage from "./Components/HomePage/HomePage"
import AllProblems from "./Components/AllProblems/AllProblems";

import Navbar from "./Constants/Navbar/Navbar"
import ProblemsPage from "./Components/ProblemsPage/ProblemsPage";
import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login"
import "./App.css"

/*
 * Temporary problems array schema
 */



function App() {

    /* Add routing here, routes look like -
       /login - Login page
       /signup - Signup page
       /problemset/all/ - All problems (see problems array above)
       /problems/:problem_slug - A single problem page
     */

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/problemset/all/" element={<AllProblems />} />
                <Route path="/problems/:pid/" element={<ProblemsPage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </BrowserRouter>
    // <div>
    //     Finish the assignment! Look at the comments in App.jsx as a starting point
    // </div>
  )
}

export default App
