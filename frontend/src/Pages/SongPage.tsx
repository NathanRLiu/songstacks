import React from 'react';
import { BrowserRouter, Route, useNavigate } from 'react-router-dom';
import { GiMicrophone } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi2';
import { ImHeadphones } from 'react-icons/im';
import logo from '../songstacks.png';

import styles from '../Styles/SongPage.module.css'

function SongPage() {
		let navigate = useNavigate();
		return (
		<div className={ styles.background }>
			<div className={ styles["page-container"] }>
				<div className={ styles["top-section"] }>
					<div className={ styles["left-column"] }>
					</div>
					<div className={ styles["editor-section"] }>
					</div>
				</div>
				<div className={ styles["bottom-section"] }>
					<div className={ styles["stack-view"] }>
							
					</div>
					<div className={ styles["layer-finder"] }>
					</div>
				</div>
			</div>
		</div>
		);
}

export default SongPage;
