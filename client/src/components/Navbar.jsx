import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div>
        <div className="heading bg-slate-900 text-white font-bold flex ">
       <ul className="flex justify-around">
        <li className="px-4 py-6"><Link to="/">Home</Link></li>
        <li className="px-4 py-6"><Link to="/login">Login </Link></li>
        <li className="px-4 py-6"><Link to="/singin">Singin</Link></li>
       </ul>

        </div>
    </div>
  )
}

export default Navbar