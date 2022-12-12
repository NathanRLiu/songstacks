import { transform } from "typescript";
import { useState, useEffect } from "react";
import SideNav from "../Components/SideNav";
import styles from '../Styles/DiscoverPage.module.css';
import axios from "axios";
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import AudioWave from '../Components/AudioWave';
import logo from '../songstacks.png'
import { AiOutlineSearch } from "react-icons/ai";
import albumArt from "album-art";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import DiscoverDisplay from "../Components/DiscoverSection";
import { useDispatch, useSelector } from 'react-redux';
import {actions} from '../slice';
import store from '../store';

type RootState = ReturnType<typeof store.getState>;

interface searchResults {
	results: Array<Object>
}
interface Layer {
	_id: string;
	artist:string;
	childlayers:string[];
	description:string;
	name:string;
	parentlayer:string;
}
function LeftPanel() {
	const layer = useSelector((state: RootState) => state.songSelector.value);

	const [isPlaying, setPlaying] = useState(false);
	const [trackLength, setTrackLength] = useState(1);
	const [timeSec, setTimeSec] = useState(0);
	const timeFormat = (timeSeconds:number) => {
		const time = Math.ceil(timeSeconds);
		var minutes = Math.floor(time / 60);
		var seconds = time % 60;
		console.log(seconds);

		function str_pad_left(string:number,pad:any,length:number) {
			return (new Array(length+1).join(pad)+string).slice(-length);
		}

		var finalTime = minutes+':'+str_pad_left(seconds,'0',2);
		return finalTime;
	}
	if (layer._id == "0"){
		return(
			<div className={styles["side-dashboard"]}>
				<div className={styles["now-playing"]}>
					<h1> Now Playing </h1>
					<div> No song selected</div>
				</div>
			</div>
		)
	}
	return(
		<div className={styles["side-dashboard"]}>
			<div className={styles["now-playing"]}>
				<h1> Now Playing </h1>
				<div className={styles["current-track"]}>
					<img src={`/api/layer/getCover?coverid=${layer["_id"]}`} />
				</div>
				<h2> {layer["name"]}</h2>
				<h3> Samih R Liu</h3>

				<div className={styles["progress-bar"]}>
					<div style={{
						width:timeSec*100/trackLength + "%",
						height:"100%",
						left:0, 
						backgroundColor:"white",
						transition:"1s width linear",
					}} />
				</div>
				<p>{timeFormat(timeSec)}/{timeFormat(trackLength)}</p>
				<div className={styles["audio-control"]} >
					<div className={styles["prev-track"]}> <BiSkipPrevious /> </div>
					<div 
						className={styles.play}
						onClick={()=>{setPlaying(!isPlaying)}}
					>
						{!isPlaying && <FaPlayCircle />}
						{isPlaying && <FaPauseCircle />}
					</div>
					<div className={styles["next-track"]}> <BiSkipNext /> </div>
				</div>
				<div className={styles["audio-waves"]}>
					<AudioWave
						layerID={layer["_id"]}
						width={250}
						height={80}
						isPlaying={isPlaying} 
						setTotalTime={setTrackLength}
						setTime={setTimeSec}
						volumeStyle={{color:"white", "float":"left", marginLeft:20, margin: "auto", marginTop: "5px"}}
					/>
				</div>
			</div>
		</div>
	)
}

function SearchDisplay(props: {searchTerm: string, setDisplaySearch: Function}) {
	const dispatch = useDispatch();
        const setSong = (newLayer:Layer) => {
                dispatch(actions.selectSong(newLayer))
        }
	const [searchResults, setSearchResults] = useState<any[]>([]);
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
		  console.log(props.searchTerm)
		  // Send Axios request here
			if (props.searchTerm=='') {
				return;
			}
			const getUser = async () => {
				const response = await axios.get(`/api/layer/search/?search=${props.searchTerm}`, { withCredentials: true });
				console.log(response.data);
				if (response.data==null) {
					setSearchResults([]);
					return;
				}
				setSearchResults(response.data.searchResults);
			}
			getUser();
		}, 500)
	
		return () => clearTimeout(delayDebounceFn)
	}, [props.searchTerm])
	return (
		<div style={{display: "flex", flexDirection: "row", margin: "25px", flexWrap:"wrap"}}>
			{
				searchResults!=null ? searchResults.map((result, id) => {
					return (
						<div key={id} className={styles["song-card"]} onClick={() => setSong(result)} >
							<div>
								<img src={`/api/layer/getCover/?coverid=${result["_id"]}`} />
								<h2>{result.name}</h2>
							</div>
						</div>
					)
				}):
				<h3 className={styles.searchError}>Sorry, we couldn't find anything with that name.</h3>
			}
		</div>
	)
}
function Dashboard() {
	const navigate = useNavigate();
	const [displaySearch, setDisplaySearch] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className={styles["background"]}>
			<LeftPanel />	
			<div className={styles["right-tab"]}>
				<NavBar />
				<h1> Discover </h1>
				<div className={styles["searchBar"]}>
					<i><AiOutlineSearch /></i>
					<input
						type="text"
						placeholder="Search..."
						onChange={(event) => {
							setSearchTerm(event.target.value);
							if (event.target.value=="") setDisplaySearch(false);
							else setDisplaySearch(true);
						}}
					/>
				</div>
				{displaySearch ? <SearchDisplay searchTerm={searchTerm} setDisplaySearch={setDisplaySearch}/> : ""}
				<DiscoverDisplay show={!displaySearch}/>
			</div>
		</div>
	)
}

export default Dashboard;
