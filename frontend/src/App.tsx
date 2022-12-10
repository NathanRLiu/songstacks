import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import logo from './songstacks.png';


import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SongPage from './Pages/SongPage';
import Discover from './Pages/Discover';
import AudioPlayer from './Components/AudioPlayer';
import AudioWave from './Components/AudioWave';
import ArtistDashboard from './Pages/ArtistDashboard';

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
						<Route path="discover" element={<Discover />} />
						<Route path="playSong" element={<AudioPlayer layerID="639195396a87541d9f68c848"/>} />
						<Route path="dashboard" element={<ArtistDashboard />} />
						<Route path="wave"  element={<AudioWave layerID="639195396a87541d9f68c848" width={920} isPlaying={false} setTime={()=>{}} setTotalTime={()=>{}}/>}  />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
