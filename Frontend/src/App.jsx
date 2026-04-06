import { Routes, Route, Navigate, useLocation } from "react-router";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { checkAuth } from "./authSlice";
import AdminPanel from "./pages/AdminPanel";
import Createproblem from "./pages/Createproblem";
import Deleteproblem from "./pages/Deleteproblem";
import Updateproblem from "./pages/Updateproblem";
import ProblemPage from "./pages/ProblemPage";
import Explore from "./pages/Navbar/Explore";
import Discuss from "./pages/Navbar/Discuss";
import Contest from "./pages/Navbar/Contest";
import LeaderBoard from "./pages/Navbar/LeaderBoard";
import Problems from "./pages/Navbar/Problems";


function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();
  const didCheckAuth = useRef(false);
  const [bootstrapped, setBootstrapped] = useState(false);
  const isAdmin = user?.role && typeof user.role === "string" ? user.role.toLowerCase() === "admin" : false;

  useEffect(() => {
    if (didCheckAuth.current) return;
    didCheckAuth.current = true;
    dispatch(checkAuth()).finally(() => setBootstrapped(true));
  }, [dispatch]);
  
  if (!bootstrapped || loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <Routes>

      {/* Public Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Authenticated home (former landing target) */}
      <Route
        path="/home"
        element={
          isAuthenticated
            ? (isAdmin ? <Navigate to="/admin" /> : <Homepage />)
            : <Navigate to="/login" />
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          !isAuthenticated
            ? <Login />
            : isAdmin
              ? <Navigate to="/admin" />
              : <Navigate to="/home" />
        }
      />

      {/* Signup */}
      <Route
        path="/signup"
        element={
          !isAuthenticated
            ? <Signup />
            : <Navigate to="/home" />
        }
      />

      {/* Admin Routes */}
      <Route path="/admin"         element={isAuthenticated && isAdmin ? <AdminPanel />     : <Navigate to="/login" />} />
      <Route path="/admin/create"  element={isAuthenticated && isAdmin ? <Createproblem />  : <Navigate to="/login" />} />
      <Route path="/admin/delete"  element={isAuthenticated && isAdmin ? <Deleteproblem />  : <Navigate to="/login" />} />
      <Route path="/admin/update"  element={isAuthenticated && isAdmin ? <Updateproblem />  : <Navigate to="/login" />} />

      {/* User Routes */}
      <Route path="/problem/:id" element={isAuthenticated ? <ProblemPage /> : <Navigate to="/login" />} />

      {/* Navbar routes are here but not implemented yet */}
      <Route path="/explore" element={<Explore />} />
      <Route path="/discuss" element={<Discuss />} />
      <Route path="/contest" element={<Contest />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/problems" element={<Problems />} />  


    </Routes>
  );
}

export default App;


// import { Router, Route } from "react-router"
// import {Homepage} from "./pages/Homepage"
// import {Login} from "./pages/Login"
// import {Signup} from "./pages/Signup"

// function App()
// {
//   return(
//     <Router>
//       <Route path="./" element={<Homepage></Homepage>}></Route>
//       <Route path="./Login" element={<Login></Login>}></Route>   
//       <Route path="./Signup" element={<Signup></Signup>}></Route>           
//     </Router>
//   )
// }

// export default App
