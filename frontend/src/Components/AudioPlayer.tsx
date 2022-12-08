import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
function AudioPlayer() {
	const [audio, setAudio] = useState('');
	React.useEffect(() => {
		const getUser = async () => {
			const response = await axios.get(`/api/layer/playSong/?songid=63903c52655d9e5074bdc619`);
			console.log(response.data);
			const base64String = Buffer.from(response.data).toString('base64');
			console.log(base64String);
			setAudio(base64String);
			// console.log(Buffer.from(response.data.chunk, 'base64'));
		}
		getUser();
	}, []);
	return (
		<>
			<ReactAudioPlayer controls src={`data:audio/mpeg;base64,${audio}`} />
		</>
	)
	
}

export default AudioPlayer;