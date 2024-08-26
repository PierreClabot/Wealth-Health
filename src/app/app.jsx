import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./../pages/home/home.jsx"
import Employees from "./../pages/employees/employees.jsx"
import MyProvider from '../context/provider.jsx';

function App(){
    return(
        <MyProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route exact path="/employees" element={<Employees />}/>
                </Routes>
            </Router>
        </MyProvider>
    )
}

export default App