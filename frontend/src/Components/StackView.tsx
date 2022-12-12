import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import image from '../logingraphic.png';
import logo from '../songstacks.png';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import {FiDelete} from 'react-icons/fi';
import styles from '../Styles/SongPage.module.css'

interface Layer {
	Name: string,
	Description: string,
	layerID: string
}
function StackView (props: {"layerStack": Layer[], "setLayerStack": Function, "activeLayer": number, "setActiveLayer": Function, "setActiveLayerID": Function}) {
return (
		<div>
			<h1 style={{"marginLeft": "20px", "marginTop": "10px"}}>Your Stack</h1>
			<div className={styles.stack}>
				{
					props.layerStack.map((layer, index) => {
						const style = (index==props.activeLayer) ? {"backgroundColor": "#932fa7"}: {};
						return (
							<button 
								className={styles.layerCard} style={style} 
								onClick={()=>{
									props.setActiveLayer(index);
									props.setActiveLayerID(layer.layerID);
								}}
							>
								<h3 className={styles.stackText}>{`Layer ${index+1}: ${layer.Name}`}</h3>
								<button 
									className={styles.threeDots}
									onClick={() => {
										let newLayers = [...props.layerStack];
										newLayers.splice(index, 1);
										props.setLayerStack(newLayers);
									}}
								>
									<i><FiDelete /></i>
								</button>
							</button>
						)
					})
				}
			</div>
		</div>
	);
}

export default StackView;
