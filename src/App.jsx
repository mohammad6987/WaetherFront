import {React,useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';
import Login from './Login';
import WeatherApp from './WeatherApp';
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;


const App = () => {
	return (
            <Router>
                <Routes>
                    
                    <Route
                        path="/weather"
                        element={<WeatherApp />}
                    />

					<Route
                        path="/login"
                        element={<Login />}
                    />
            
                    <Route
                        path="*"
                        element={<Navigate to="/login" />}
                    />
                </Routes>
            </Router>
        
    );
};


export default App
