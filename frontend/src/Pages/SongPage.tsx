import React from 'react';
import { BrowserRouter, Route, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../songstacks.png';
import { AiOutlineSearch } from 'react-icons/ai'

import styles from '../Styles/SongPage.module.css'

const searchedLayers = [
	{
		"Title":"Layer 1",
		"Type":"Beat",
		"Length":"3:33",
		"Cover":logo,
		"Artist":"Nathan"
	},
	{
		"Title":"Layer 1",
		"Type":"Beat",
		"Length":"3:33",
		"Cover":logo,
		"Artist":"Nathan"
	},
	{
		"Title":"Layer 1",
		"Type":"Beat",
		"Length":"3:33",
		"Cover":logo,
		"Artist":"Nathan"
	},
	{
		"Title":"Layer 1",
		"Type":"Beat",
		"Length":"3:33",
		"Cover":logo,
		"Artist":"Nathan"
	},
	{
		"Title":"Layer 1",
		"Type":"Beat",
		"Length":"3:33",
		"Cover":logo,
		"Artist":"Nathan"
	},
	{
		"Title":"Layer 1",
		"Type":"Beat",
		"Length":"3:33",
		"Cover":logo,
		"Artist":"Nathan"
	},
	{
		"Title":"Layer 1",
		"Type":"Beat",
		"Length":"3:33",
		"Cover":logo,
		"Artist":"Nathan"
	},
	{
		"Title":"Layer 1",
		"Type":"Beat",
		"Length":"3:33",
		"Cover":logo,
		"Artist":"Nathan"
	},
	{
		"Title":"Layer 1",
		"Type":"Beat",
		"Length":"3:33",
		"Cover":logo,
		"Artist":"Nathan"
	}
]

type SongCardProps = {
	"Title":string;
	"Type":string;
	"Length":string;
	"Cover":string;
	"Artist":string;
}
function SongCard({ Title, Type, Length, Cover, Artist }: SongCardProps) {
	return (
		<div className={styles["song-card"]}>
			<div className={styles["album-cover-container"]}>
				<img className={styles["album-cover"]} src={Cover} />
				<div className={styles["track-length"]}>{Length} </div>
				<div className={styles["track-title"]}>{Title}</div>
				<div className={styles["track-artist"]}>{Artist}</div>
				<div className={styles["track-type"]}>{Type}</div>
			</div>

		</div>
	)
}
function SongPage() {
	let navigate = useNavigate();
	return (
	<div className={ styles.background } >
		<div className={ styles.diffuser }>
                                <div className={ styles.glow1 + " " + styles.glow } />
                                <div className={ styles.glow2 + " " + styles.glow } />
                                <div className={ styles.glow3 + " " + styles.glow } />
                                <div className={ styles.glow4 + " " + styles.glow } />
                                <div className={ styles.glow5 + " " + styles.glow } />
                        </div>
		<div className={ styles["page-container"] } >
			<div className={ styles["detail-editor"] }>
			</div>
			<div className={ styles["editor-section"] } >
			</div>
			<div className={ styles["stack-view-container"] }>
				<div className={ styles["stack-view"] } >
				</div>
			</div>
			<div className={ styles["layer-finder-container"] } >
				<div className={ styles["layer-finder"] } >
					<div className={styles["header"]}>
						<h1>Public Layers</h1>
						<div className={styles["search-bar"]}>
							<i><AiOutlineSearch /></i>
							<input
							    type="text"
							    placeholder="Search..."
							/>
						</div>
					</div>
					<div className={styles["search-results"]}>
						{searchedLayers.map((layerInfo, i) => (
								<SongCard 
									key={i}
									Title={layerInfo.Title}
									Type={layerInfo.Type}
									Length={layerInfo.Length}
									Artist={layerInfo.Artist}
									Cover={layerInfo.Cover}
								/>
							))
						}
					</div>
				</div>
			</div>
		</div>
	</div>
	);
}

export default SongPage;
