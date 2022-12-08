import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';

interface Layer {
	ID: string,
	ParentLayer: string,
	ChildLayers: Array<string>,
	LayerCut: Number
}
function AudioPlayer(props:{layerID: string}) {

	function togglePlay() {
		layers.map((layer) => {
			if (layer.paused) layer.play();
			else layer.pause();
		})
			
	}
	function changeVolume(layerIndex: number, volume: number) {
		let newVolumes = [...volumes];
		newVolumes[layerIndex] = volume;
		layers[layerIndex].volume = volume/100;
		setVolumes(newVolumes);
	}
	const [layers, setLayers] = useState<HTMLAudioElement[]>([]);
	const [volumes, setVolumes] = useState([100, 100])
	React.useEffect(() => {
		const getLayers = async () => {
			const response = await axios.get(`/api/layer/get/?layerid=${props.layerID}`, { withCredentials: true });
			console.log(response.data);
			const layerAudios: HTMLAudioElement[] = [];
			for (const layer of response.data.Layers) {
				layerAudios.push(new Audio(`/api/layer/playSong/?songid=${layer.ID}`))
			}
			setLayers(layerAudios);
		}
		getLayers();
	}, []);
	return (
		<>
			<button onClick={()=>togglePlay()}>Play</button>
			
			{
				layers.map((layer, index) => {
					return <input type="range" min="0" max="100" value={volumes[index]} onChange={(event) => changeVolume(index, event.target.valueAsNumber)}/>
				})
			}
		</>
	)
	
}

export default AudioPlayer;
