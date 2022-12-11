import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import image from '../logingraphic.png';
import logo from '../songstacks.png';

import styles from '../Styles/SongPage.module.css'

interface Layer {
	Name: string,
	Description: string,
	layerID: string
}
function StackView (props: {"layerStack": Layer[], "activeLayer": number, "setActiveLayer": Function}) {
return (
		<div>
			<h1 style={{"marginLeft": "20px", "marginTop": "10px"}}>Your Stack</h1>
			<div className={styles.stack}>
				{
					props.layerStack.map((layer, index) => {
						const style = (index==props.activeLayer) ? {"backgroundColor": "#932fa7"}: {};
						return (
							<button className={styles.layerCard} style={style} onClick={()=>props.setActiveLayer(index)}>
								<h3 className={styles.stackText}>{`Layer ${index+1}: ${layer.Name}`}</h3>
							</button>
						)
					})
				}
			</div>
		</div>
	);
}

export default StackView;
