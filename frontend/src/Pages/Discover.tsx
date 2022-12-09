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
					<div style={{width:"70%", height:"100%",left:0, backgroundColor:"white"}} />
				</div>
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
					<AudioWave layerID="639195396a87541d9f68c848" width={250} isPlaying={isPlaying}/>
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
		"info":{album:"Graduation", size: "large"}
	},
	{
		"artist":"Joji",
		"info":{album:"Smithereens", size: "large"}
	},
	{
		"artist":"Drake",
		"info":{album:"Honestly, Nevermind", size: "large"}
	},
	{
		"artist":"J. Cole",
		"info":{album:"Born Sinner", size: "large"}
	},
	{
		"artist":"Pink Floyd",
		"info":{album:"The Dark Side of the Moon", size: "large"}
	},
	{
		"artist":"Clairo",
		"info":{album:"Hot Cheeto Puffs", size: "large"}
	},
	{
		"artist":"Kanye West",
		"info":{album:"Ye", size: "large"}
	},
	{
		"artist":"Joji",
		"info":{album:"Ballads", size: "large"}
	},

	{
		"artist":"Playboi Carti",
		"info":{album:"Whole Lotta Red", size: "large"}
	},
	{
		"artist":"Illenium",
		"info":{album:"Gold (Stupid Love)", size: "large"}
	},
]
const popular = [
	{
		"artist":"Taylor Swift",
		"info":{album:"Midnights", size: "large"}
	},
	{
		"artist":"Harry Styles",
		"info":{album:"As It Was", size: "large"}
	},
	{
		"artist":"Metro Boomin",
		"info":{album:"HEROES & VILLAINS", size: "large"}
	},
	{
		"artist":"Lil Nas X",
		"info":{album:"Star Walkin'", size: "large"}
	},
	{
		"artist":"The Kid LAROI",
		"info":{album:"STAY (with Justin Bieber)", size: "large"}
	},
	{
		"artist":"BLACKPINK",
		"info":{album:"Born Pink", size: "large"}
	},
	{
		"artist":"The Weeknd",
		"info":{album:"Starboy", size: "large"}
	},
	{
		"artist":"Mariah Carey",
		"info":{album:"Merry Christmas", size: "large"}
	},

	{
		"artist":"JVKE",
		"info":{album:"Golden Hour", size: "large"}
	},

]
const roadtrip = [
	{
		"artist":"Kid Cudi",
		"info":{album:"Man On The Moon II", size: "large"}
	},
	{
		"artist":"Miley Cyrus",
		"info":{album:"The Time of Our Lives", size: "large"}
	},
	{
		"artist":"Fuzzybrain",
		"info":{album:"Dayglow", size: "large"}
	},
]
const classics = [
	{
		"artist":"The Beatles",
		"info":{album:"Love", size: "large"}
	},
	{
		"artist":"Michael Jackson",
		"info":{album:"Dangerous", size: "large"}
	},
	{
		"artist":"Billy Joel",
		"info":{album:"Piano Man", size: "large"}
	},
	{
		"artist":"Queen",
		"info":{album:"Bohemian Rhapsody", size: "large"}
	},
	{
		"artist":"Eagles",
		"info":{album:"Hotel California", size: "large"}
	},
]
export default Dashboard;
