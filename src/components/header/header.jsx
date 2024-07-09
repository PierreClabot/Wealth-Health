
import logo from "./../../assets/logo.png"
import { NavLink } from "react-router-dom";
function Header(){
    return(
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="Logo Wealth Health" />
                <h1>Wealth Health</h1>
            </div>
            <div className="header-right">
                <ul>
                    <li><NavLink className="header-link" to="/">Create Employee</NavLink></li>
                    <li><NavLink className="header-link" to="/employees">Current Employees</NavLink></li>
                </ul>
            </div>
        </header>
    )
}
export default Header