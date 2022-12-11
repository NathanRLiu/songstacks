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
				<img className={styles["album-cover"]} src={Cover} />
				<p>{Title}</p>
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
						if (audioFile==null) return;
						const formData = new FormData();
						formData.append('parentid', '');
						formData.append('description', description);
						formData.append('name', title);
						let cover = await fetch(songImage)
							.then(r => r.blob())
							.then(blobFile => new File([blobFile], "fileNameGoesHere", { type: "image/png" }));
						formData.append("audio", new File([audioFile], "fileName"));
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
				
				<div className={styles["audio-waves"]}>
					<AudioWave
						layerID="63952cdcba8f09e5ba64c58a"
						width={800}
						height={200}
						isPlaying={isPlaying} 
						setTotalTime={setTrackLength}
						setTime={setTimeSec}
						volumeStyle={{color:"white", textAlign: "center"}}
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
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
							/>
						</div>
					</div>
					<div className={styles["search-results"]}>
						{searchResults.map((layerInfo, i) => (
								<SongCard 
									key={i}
									Title={layerInfo.name}
									Type="Beat"
									Length="3:35"
									Artist="Artist Name"
									Cover={`/api/layer/getCover/?coverid=${layerInfo["_id"]}`}
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
