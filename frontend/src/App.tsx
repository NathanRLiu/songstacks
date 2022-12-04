import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import logo from './songstacks.png';

import LandingPage from './Pages/LandingPage';

function App() {
	return (
		<>
			{/*<div>
				<img src={logo} />
			</div> */}
			<BrowserRouter>
				<LandingPage />
			</BrowserRouter>
		</>
	);
}

export default App;
