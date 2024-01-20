import Navbar from "./components/Navbar"
import {Routes,Route} from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Signin from "./components/Signin" 

const App = () => {
  return (
    <div>

    <Navbar/>


      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/singin" element={<Signin/>}/>
      </Routes>
      
    </div>
  )
}

export default App