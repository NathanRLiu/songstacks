import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import logo from './songstacks.png';


import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SongPage from './Pages/SongPage';
import Dashboard from './Pages/Discover';
import AudioPlayer from './Components/AudioPlayer';

function App() {
	return (
		<>
			{/*<div>
				<img src={logo} />
			</div> */}
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<LandingPage />} />
						<Route path="login" element={<LoginPage />} />
						<Route path="song" element={<SongPage />} />
						<Route path="discover" element={<Dashboard />} />
						<Route path="playSong" element={<AudioPlayer />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
