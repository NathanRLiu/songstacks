import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
function AudioPlayer() {
	const [audio, setAudio] = useState(new Audio());
	const [audio2, setAudio2] = useState(new Audio());
	React.useEffect(() => {
		const getUser = async () => {
			(async()=>{setAudio(new Audio(`/api/layer/playSong/?songid=6391418d0201cdeb851dd5d5`))})();
			(async()=>{setAudio2(new Audio(`/api/layer/playSong/?songid=6391418d0201cdeb851dd5d5`))})();
		}
		getUser();
	}, []);
	return (
		<>
			<audio controls>
				<source src="/api/layer/playSong/?songid=6391418d0201cdeb851dd5d5"></source>
			</audio>
		</>
	)
	
}

export default AudioPlayer;
