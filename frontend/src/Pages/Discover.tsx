import { transform } from "typescript";
import { useState, useEffect } from "react";
import ScrollingSection from "../Components/ScrollingSection";
import SideNav from "../Components/SideNav";
import styles from '../Styles/DiscoverPage.module.css';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import AudioWave from '../Components/AudioWave';
import JavasPlan from '../javasplan.png'

import albumArt from "album-art";


function LeftPanel(){
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
	return(
		<div className={styles["side-dashboard"]}>
			<div className={styles["now-playing"]}>
				<h1> Now Playing </h1>
				<div className={styles["current-track"]}>
					<img src={JavasPlan} />
				</div>
				<h2> {"Java's Plan"}</h2>
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
						layerID="639195396a87541d9f68c848"
						width={250}
						isPlaying={isPlaying} 
						setTotalTime={setTrackLength}
						setTime={setTimeSec}
					/>
				</div>
			</div>
		</div>
	)
}
function Dashboard() {
	const [images_recent, setCarouselImages] = useState<string[]>([]);
	const [images_popular, setPopularImages] = useState<string[]>([]);
	const [images_roadtrip, setRoadtripImages] = useState<string[]>([]);
	const [images_classic, setClassicImages] = useState<string[]>([]);
	useEffect(() => {
		let res : string[] = [];
		let fetchData = async () => {
			for (let cover of popular) {
				const album = await albumArt( cover["artist"], cover["info"] );
				res.push(album);
			}
			console.log("1");
		}
		fetchData().then( ()=> setPopularImages(res) );
		let res2 : string[] = [];
		fetchData = async () => {
			for (let cover of recentlyListened) {
				const album = await albumArt( cover["artist"], cover["info"] );
				res2.push(album);
			}
			console.log("1");
		}
		fetchData().then( ()=> setCarouselImages(res2) );
		let res3 : string[] = [];
		fetchData = async () => {
			for (let cover of roadtrip) {
				const album = await albumArt( cover["artist"], cover["info"] );
				res3.push(album);
			}
			console.log("1");
		}
		fetchData().then( ()=> setRoadtripImages(res3) );

		let res4 : string[] = [];
		fetchData = async () => {
			for (let cover of classics) {
				const album = await albumArt( cover["artist"], cover["info"] );
				res4.push(album);
			}
		}
		fetchData().then( ()=> setClassicImages(res4) );
	},[])
	return (
		<div className={styles["background"]}>
			<LeftPanel />	
			<div className={styles["right-tab"]}>
				<h1>Discover</h1>
				<div className={styles["discover"]}>
					<div className={styles["third-section"] + " " + styles["section"]}>
						<h1> Currently Trending </h1>
						<ScrollingSection isUp={false} carouselImages={images_popular} animationDuration="60s" width="15vw" marginBottom="1vw"/>
					</div>

					<div className={styles["first-section"] + " " + styles["section"]}>
						<h1>Resume Playing</h1>
						<ScrollingSection isUp={true} carouselImages={images_recent} animationDuration="50s" width="15vw" marginBottom="1vw"/>
					</div>

					<div className={styles["second-section"] + " " + styles["section"]}>
						<h1>Hit The Road</h1>
						<div className={styles["top-subsection"]}>
							<ScrollingSection isUp={true} carouselImages={images_roadtrip} animationDuration="85s" width="15vw" marginBottom="1vw"/>
						</div>
						<h1>Timeless Classics</h1>
						<div className={styles["bottom-subsection"]}>
							<ScrollingSection isUp={false} carouselImages={images_classic} animationDuration="95s" width="15vw" marginBottom="1vw"/>
						</div>
					</div>
					<div className={styles["fourth-section"] + " " + styles["section"]}>
						<h1>SongStacks' Featured</h1>
						<ScrollingSection isUp={true} carouselImages={images_recent} animationDuration="85s" width="15vw" marginBottom="1vw"/>
					</div>
					<div className={styles["fifth-section"] + " " + styles["section"]}>
						<h1>Last Year's Favorites</h1>
						<ScrollingSection isUp={true} carouselImages={images_recent} animationDuration="35s" width="15vw" marginBottom="1vw"/>
					</div>
				</div>
			</div>
		</div>
	)
}
const recentlyListened = [
	{
		"artist":"Kanye West",
		"info":{album:"Graduation", size: "medium"}
	},
	{
		"artist":"Joji",
		"info":{album:"Smithereens", size: "medium"}
	},
	{
		"artist":"Drake",
		"info":{album:"Honestly, Nevermind", size: "medium"}
	},
	{
		"artist":"J. Cole",
		"info":{album:"Born Sinner", size: "medium"}
	},
	{
		"artist":"Pink Floyd",
		"info":{album:"The Dark Side of the Moon", size: "medium"}
	},
	{
		"artist":"Clairo",
		"info":{album:"Hot Cheeto Puffs", size: "medium"}
	},
	{
		"artist":"Kanye West",
		"info":{album:"Ye", size: "medium"}
	},
	{
		"artist":"Joji",
		"info":{album:"Ballads", size: "medium"}
	},

	{
		"artist":"Playboi Carti",
		"info":{album:"Whole Lotta Red", size: "medium"}
	},
	{
		"artist":"Illenium",
		"info":{album:"Gold (Stupid Love)", size: "medium"}
	},
]
const popular = [
	{
		"artist":"Taylor Swift",
		"info":{album:"Midnights", size: "medium"}
	},
	{
		"artist":"Harry Styles",
		"info":{album:"As It Was", size: "medium"}
	},
	{
		"artist":"Metro Boomin",
		"info":{album:"HEROES & VILLAINS", size: "medium"}
	},
	{
		"artist":"Lil Nas X",
		"info":{album:"Star Walkin'", size: "medium"}
	},
	{
		"artist":"The Kid LAROI",
		"info":{album:"STAY (with Justin Bieber)", size: "medium"}
	},
	{
		"artist":"BLACKPINK",
		"info":{album:"Born Pink", size: "medium"}
	},
	{
		"artist":"The Weeknd",
		"info":{album:"Starboy", size: "medium"}
	},
	{
		"artist":"Mariah Carey",
		"info":{album:"Merry Christmas", size: "medium"}
	},

	{
		"artist":"JVKE",
		"info":{album:"Golden Hour", size: "medium"}
	},

]
const roadtrip = [
	{
		"artist":"Kid Cudi",
		"info":{album:"Man On The Moon II", size: "medium"}
	},
	{
		"artist":"Miley Cyrus",
		"info":{album:"The Time of Our Lives", size: "medium"}
	},
	{
		"artist":"Fuzzybrain",
		"info":{album:"Dayglow", size: "medium"}
	},
]
const classics = [
	{
		"artist":"The Beatles",
		"info":{album:"Love", size: "medium"}
	},
	{
		"artist":"Michael Jackson",
		"info":{album:"Dangerous", size: "medium"}
	},
	{
		"artist":"Billy Joel",
		"info":{album:"Piano Man", size: "medium"}
	},
	{
		"artist":"Queen",
		"info":{album:"Bohemian Rhapsody", size: "medium"}
	},
	{
		"artist":"Eagles",
		"info":{album:"Hotel California", size: "medium"}
	},
]
export default Dashboard;
