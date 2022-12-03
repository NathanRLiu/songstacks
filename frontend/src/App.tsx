import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import LandingPage from './Pages/LandingPage';

function App() {
	return (
		<BrowserRouter>
			<LandingPage />
		</BrowserRouter>
	);
}

export default App;
