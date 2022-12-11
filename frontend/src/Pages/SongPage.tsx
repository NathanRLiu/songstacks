import React, { useState, useRef, useEffect} from 'react';
import { BrowserRouter, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../songstacks.png';
import { AiOutlineSearch } from 'react-icons/ai'
import StackView from '../Components/StackView';
import NavBar from '../Components/NavBar';
import styles from '../Styles/SongPage.module.css'
import AudioWave from '../Components/AudioWave';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';

type SongCardProps = {
	"Title":string;
	"Type":string;
	"Length":string;
	"Cover":string;
	"Artist":string;
}
function SongCard({ Title, Cover}: SongCardProps) {
	return (
		<div className={styles["song-card"]}>
			<div className={styles["album-cover-container"]}>
				<div className={styles["hover-overlay"]} >
					<i><FaPlus /></i>
					<p>{Title}</p>
				</div>
				<img className={styles["album-cover"]} src={Cover} />
				
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
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isPlaying, setIsPlaying] = useState(false);
	const [trackLength, setTrackLength] = useState(1);
	const [timeSec, setTimeSec] = useState(0);
	const [ description, setDescription ] = useState("");
	const [ audioFile, setAudioFile ] = useState<null | Blob | string>();
	const [ songImage, setSongImage ] = useState(logo);
	const [activeLayer, setActiveLayer] = useState(0);
	const [layerStack, setLayerStack] = useState<any[]>([]);
	const [audioKey, setAudioKey] = useState(Date.now());

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
		  console.log(searchTerm)
		  // Send Axios request here
			const getUser = async () => {
				const response = await axios.get(`/api/layer/search/?search=${searchTerm}`, { withCredentials: true });
				console.log(response.data);
				if (response.data.searchResults==null) {
					setSearchResults([]);
					return;
				}
				setSearchResults(response.data.searchResults);
			}
			getUser();
		}, 2000)
	
		return () => clearTimeout(delayDebounceFn)
	}, [searchTerm])
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
				<div style={{"margin":20}}>
					<input
						type="file"
						key={audioKey}
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
					onClick={async ()=> {
						if (audioFile==null) return;
						const formData = new FormData();
						if (layerStack.length>0) {
							formData.append('parentid', layerStack[layerStack.length-1].layerID);
						}
						else formData.append('parentid', '');
						formData.append('description', description);
						formData.append('name', title);
						let cover = await fetch(songImage)
							.then(r => r.blob())
							.then(blobFile => new File([blobFile], "fileNameGoesHere", { type: "image/png" }));
						formData.append("audio", new File([audioFile], "fileName"));
						formData.append("cover", cover);
						publish(true);
						const result = await axios.post('/api/layer/create',formData,
						{
							headers: {
								'content-type': 'multipart/form-data'
							}
						});
						console.log(result);
						let newLayers = [...layerStack];
						newLayers.push({"Name": title, "Description": description, "layerID": result.data.layerID});
						setActiveLayer(newLayers.length-1);
						setLayerStack(newLayers);
						setTitle("");
						setDescription("");
						setGenre("");
						setAudioKey(Date.now());
						setSongImage(logo);
						if (imageInput.current!=null) {
							imageInput.current.value = "";
						}
					}}
				>
					{"Publish"}
				</button>
			</div> 
			<div className={ styles["editor-section"] } >
				{layerStack.length>0 ? 
				<div>
					<div className={styles["audio-waves"]}>
					<AudioWave
						layerID={"639636af27a70e2cffd1c045"}
						width={800}
						height={200}
						isPlaying={isPlaying} 
						setTotalTime={setTrackLength}
						setTime={setTimeSec}
						volumeStyle={{color:"white", textAlign: "center", margin: 0}}
					/>
					</div>
					<div className={styles["audio-control"]} >
						<div className={styles["prev-track"]}> <BiSkipPrevious /> </div>
						<div 
							className={styles.play}
							onClick={()=>{setIsPlaying(!isPlaying)}}
						>
							{!isPlaying && <FaPlayCircle />}
							{isPlaying && <FaPauseCircle />}
						</div>
						<div className={styles["next-track"]}> <BiSkipNext /> </div>
					</div>
				</div>: 
				<h1 style={{marginTop: "280px", textAlign:"center"}}>No Layers Added. . . </h1>}
				
			</div>
			<div className={ styles["stack-view-container"] }>
				<div className={ styles["stack-view"] } >
					<StackView layerStack={layerStack} activeLayer={activeLayer} setActiveLayer={setActiveLayer}/>
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
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
							/>
						</div>
					</div>
					<div className={styles["search-results"]}>
						{searchResults.map((layerInfo, i) => (
								<button 
									style={{all: "unset"}} 
									onClick={() => {
										let newLayers = [...layerStack];
										newLayers.push({"Name": layerInfo.name, "Description": layerInfo.description, "layerID": layerInfo["_id"]});
										setActiveLayer(newLayers.length-1);
										setLayerStack(newLayers);
									}}
								>
									<SongCard 
										key={i}
										Title={layerInfo.name}
										Type="Beat"
										Length="3:35"
										Artist="Artist Name"
										Cover={`/api/layer/getCover/?coverid=${layerInfo["_id"]}`}
									/>
								</button>
								
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
