// Login.js
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Login.css'
function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const handleLogin = async(event) => {
		event.preventDefault();
		try{
			const url = "http://localhost:8080/authService/users/login";
			const body = {
				username: username,
				password: password
		  	};
		  	const response = await fetch(url, {
				method: 'POST',
				headers: {
				   'Accept' : 'application/json',	
				   'Content-Type' : 'application/json'
				},
				body: JSON.stringify(body)
		  	});
			  
			if (!response.ok) {
				const errorText = await response.text();
            	setError(`Error: ${response.body} - ${response.statusText}. Details: ${errorText}`);
				console.log(error);
				console.log(data);	
				console.log(password + " " + username);
				alert('Error in connecting to server!');
			} else {
				const data = await response.text();
				if (data) {
				  console.log(data);	
				  setError(null);
				  localStorage.setItem('Token', data);
				  console.log(localStorage.getItem('Token'));	
				  alert('successful login!');  
				  navigate('/weather');
				  
				  
				} else {
				  setError('Server is not responding , please try again later.');
				  alert('Server is not responding , please try again later.')
				}
			}
		}catch(error){
			
			console.log(error.statusText);
			alert('Server is not responding , please try again later.')
		}
		
	};

	return (
		<>
		
		<div className="login">
		
			<h2>Login</h2>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
		
		</>
	);
}

export default Login;
