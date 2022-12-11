import React, { useState, useRef } from 'react';
import { BrowserRouter, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../songstacks.png';
import { AiOutlineSearch } from 'react-icons/ai'
import StackView from '../Components/StackView';
import NavBar from '../Components/NavBar';
import styles from '../Styles/SongPage.module.css'

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
	const imageInput = useRef<HTMLInputElement>(null);

	const [ title, setTitle ] = useState("");
	const [published, publish] = useState(false);
	const [ genre, setGenre ] = useState("");
	const [ searchedLayers, setSearchedLayers ] = useState<{ID:string;Name:string;ParentLayer:string;ChildLayers:Array<any>;LayerCut:number}[]>([]);
	const [parentLayer, setParentLayer] = useState("");

	const [ description, setDescription ] = useState("");
	const [ audioFile, setAudioFile ] = useState<null | Blob | string>();
	const [ songImage, setSongImage ] = useState(logo);
	return (
	<div className={ styles.background } >
		<NavBar />
		<div className={ styles.diffuser }>
			<div className={ styles.glow1 + " " + styles.glow } />
			<div className={ styles.glow2 + " " + styles.glow } />
			<div className={ styles.glow3 + " " + styles.glow } />
			<div className={ styles.glow4 + " " + styles.glow } />
			<div className={ styles.glow5 + " " + styles.glow } />
		</div>
		<div className={ styles["page-container"] } >
			<div className={ styles["detail-editor"] }>
				<h1> Publish Layer </h1>
				<div className={styles["detail-editor-flexc"]}>
					<div className={styles["image-upload"]}
						onClick={
							()=>{
								if (!imageInput.current) return
								imageInput.current.click()
							}
						}
					>
						<input 
							type="file"
							accept="image/*" 
							ref={imageInput}
							onChange={
								(event) => {
									if (!event.target.files) return;
									setSongImage(URL.createObjectURL(event.target.files[0]));
								}
							}
						>
						</input>
						<img src={songImage}/>
					</div>
						
					<div>
						<div className={styles["search-bar"]}>
							<input
								type="text"
								placeholder="Title"
								value={title}
								onChange={
									(event) => {setTitle(event.target.value)}
								}
							/>
						</div>
						<div className={styles["search-bar"]} style={{marginTop:40}}>
							<input
								type="text"
								placeholder="Genre"
								value={genre}
								onChange={
									(event)=>{setGenre(event.target.value)}
								}
							/>
						</div>

						<div className={styles["description"]}>
							<textarea
								placeholder="Description"
								value={description}
								onChange={
									(event) => {setDescription(event.target.value)}
								}
							/>
						</div>
					</div>
				</div>
				<div style={{"margin":30}}>
					<input
						type="file"
						onChange={
							(event) => {
								if (!event.target.files) return;
								setAudioFile(URL.createObjectURL(event.target.files[0]));
							}
						}
					/>
				</div>
				<button
					className={styles["publish-button"]}
					disabled = {published}
					onClick={async ()=> {
						const formData = new FormData();
						
						formData.append('description', description);
						formData.append('name', title);
						let cover = await fetch(songImage)
							.then(r => r.blob())
							.then(blobFile => new File([blobFile], "fileNameGoesHere", { type: "image/png" }))
						formData.append("cover", cover);
						publish(true);
						axios.post('/api/layer/create',formData,
						{
							headers: {
								'content-type': 'multipart/form-data'
							}
						});
					}}
				>
					{published?"Published!":"Publish"}
				</button>
			</div>
			<div className={ styles["editor-section"] } >
			</div>
			<div className={ styles["stack-view-container"] }>
				<div className={ styles["stack-view"] } >
					<StackView />
				</div>
			</div>
			<div className={ styles["layer-finder-container"] } >
				<div className={ styles["layer-finder"] } >
					<div className={styles["header"]}>
						<h1>Public Layers</h1>
						<div className={styles["search-bar"]}> <i><AiOutlineSearch /></i>
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
									Title={layerInfo.Name}
									Type="Beat"
									Length="3:35"
									Artist="Artist Name"
									Cover=""
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
