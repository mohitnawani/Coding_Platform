import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
