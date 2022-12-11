import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import image from '../logingraphic.png';
import logo from '../songstacks.png';

import styles from '../Styles/SongPage.module.css'

function StackView () {
return (
		<div>
			<h1 style={{"marginLeft": "20px", "marginTop": "10px"}}>Your Stack</h1>
			<div className={styles.stack}>
				<div className={styles.layerCard}>
					<h3 className={styles.stackText}>Layer 1: Instrumental</h3>
				</div>
				<div className={styles.layerCard}>
					<h3 className={styles.stackText}>Layer 2: Vocals</h3>
				</div>
				<div className={styles.layerCard}>
					<h3 className={styles.stackText}>Layer 3: Vocals</h3>
				</div>
			</div>
		</div>
	);
}

export default StackView;
