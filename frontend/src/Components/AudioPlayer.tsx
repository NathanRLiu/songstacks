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
	const [layers, setLayers] = useState([]);
	React.useEffect(() => {
		const getLayers = async () => {
			const response = await axios.get(`/api/layer/get/?layerid=${props.layerID}`, { withCredentials: true });
			console.log(response.data);
			setLayers(response.data.Layers);
		}
		getLayers();
	}, []);
	return (
		<>
			{layers.map((layer:Layer) => {
				return (
					<audio controls>
						<source src={`/api/layer/playSong/?songid=${layer.ID}`}></source>
					</audio>
				)
			})}
			
		</>
	)
	
}

export default AudioPlayer;
