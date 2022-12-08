import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
function AudioPlayer() {
	const [audio, setAudio] = useState(new Audio());
	React.useEffect(() => {
		const getUser = async () => {
			setAudio(new Audio(`/api/layer/playSong/?songid=63903c52655d9e5074bdc619`));
		}
		getUser();
	}, []);
	return (
		<>
			{<div onClick={()=>{audio.play()}}style={{width:400,height:400, backgroundColor:"black"}} />

			}
		</>
	)
	
}

export default AudioPlayer;
