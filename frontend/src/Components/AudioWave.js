import React, { useState, useEffect, useRef } from 'react';
import { Buffer } from 'buffer';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import WaveSurfer from 'wavesurfer.js';

import styles from '../Styles/AudioWaveStyles.module.css';

interface Layer {
	ID: string,
	ParentLayer: string,
	ChildLayers: Array<string>,
	LayerCut: Number
}
function AudioWave(props:{layerID: string, width:Number, isPlaying:Boolean}) {

	function togglePlay() {
		waves.map((layer) => {
			layer.playPause();
		})
			
	}
	React.useEffect(togglePlay,[props.isPlaying]) 
	function changeVolume(layerIndex: number, volume: number) {
		let newVolumes = [...volumes];
		newVolumes[layerIndex] = volume;
		waves[layerIndex].setVolume(volume/100);
		setVolumes(newVolumes);
	}

	const [layers, setLayers] = useState([]);
	const [waves, setWaves] = useState([]);
	const [gradient, setGradient] = useState();
	const [volumes, setVolumes] = useState([100, 100])
	const [badPractice, setBadPractice] = useState(false);
	const [longestDuration, setLongestDuration] = useState(0);
	
	const canvas = React.useRef();

	React.useEffect(() => {
		const getLayers = async () => {
			const ctx = canvas.current.getContext("2d");
			const gradient = ctx.createLinearGradient(20, 0, props.width, 200);
			gradient.addColorStop(0, '#ee0979');   
			gradient.addColorStop(0.5, '#ff6a00');
			gradient.addColorStop(1, "yellow");
			setGradient(gradient);

			const response = await axios.get(`/api/layer/get/?layerid=${props.layerID}`, { withCredentials: true });
			console.log(response.data);
			let layerAudios = [];
			let maxLen = 1;
			for (const layer of response.data.Layers) {
				let layerAudio = new Audio(`/api/layer/playSong/?songid=${layer.ID}`)
				let myLayer = {"layerID":layer.ID, "audio":layerAudio}
				layerAudios.push(myLayer)
				layerAudio.onloadedmetadata = () => {
					maxLen = Math.max(maxLen, layerAudio.duration) 
					setLongestDuration(maxLen)
				}
			}
			setLayers(layerAudios);
		}
		getLayers();
	}, []);
	React.useEffect(()=>{
		if (badPractice){
			return;
		}
		let waveArray = [];
		for (const layer of layers){
			setBadPractice(true);
			let waveform = WaveSurfer.create({
				barWidth: 3,
				cursorWidth: 1,
				container: '#waveform-'+layer.layerID,
				backend: 'WebAudio',
				height: 80,
				progressColor: '#B0B0B0',
				waveColor: gradient,
				cursorColor: 'transparent',
				partialRender:true,
				barRadius:2,
			});
			waveform.load(layer.audio)
			waveform.toggleInteraction();
			waveArray.push(waveform);
		}
		setWaves(waveArray);
	},[layers]);
	return (
		<>
			<canvas ref={canvas} style={{"position":"absolute", "pointerEvents":"none"}}/>
			
			{
				layers.map((layer, index) => {


				return (
					<div key={index} style={{"marginBottom":10, }}>
						<p style={{color:"white", "float":"left", marginLeft:20}}>Layer {index + 1}</p>
						<input 
							type="range"
							min="0"
							max="100"
							value={volumes[index]} 
							onChange={(event) => changeVolume(index, event.target.valueAsNumber)}
						/>
						<div className={styles["wave-container-container"]} >
							<div className={styles["wave-container"]} id={"waveform-" + layer.layerID} style={{
								overflow:"visible",
								width:props.width * (layer.audio.duration / longestDuration)
							}}/>
						</div>
					</div>
					)

				})
			}
		</>
	)
	
}

export default AudioWave;
