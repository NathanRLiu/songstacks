import { useState, useEffect } from "react";
import ScrollingSection from "../Components/ScrollingSection";
import ScrollingLayers from "../Components/ScrollingLayers";
import styles from '../Styles/DiscoverPage.module.css';
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import albumArt from "album-art";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../slice';
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

function DiscoverDisplay(props: {show:boolean}) {
	const [images_recent, setCarouselImages] = useState<string[]>([]);
	const [images_popular, setPopularImages] = useState<string[]>([]);
	const [images_roadtrip, setRoadtripImages] = useState<string[]>([]);
	const [images_classic, setClassicImages] = useState<string[]>([]);
	const [searchResults, setSearchResults] = useState<Layer[]>([]);

	const dispatch = useDispatch();
	const setSong = (newLayer:Layer) => {
		dispatch(actions.selectSong(newLayer))
	}
	useEffect(() => {
		const getUser = async () => {
			const response = await axios.get(`/api/layer/search?search=`, { withCredentials: true });
			if (response.data==null || response.data.searchResults == null) {
				setSearchResults([]);
				return;
			}
			setSearchResults(response.data.searchResults);
		}
		getUser();

	}, [])

	useEffect(() => {
		let res : string[] = [];
		let fetchData = async () => {
			for (let cover of popular) {
				const album = await albumArt( cover["artist"], cover["info"] );
				res.push(album);
			}
		}
		fetchData().then( ()=> setPopularImages(res) );
		let res2 : string[] = [];
		fetchData = async () => {
			for (let cover of recentlyListened) {
				const album = await albumArt( cover["artist"], cover["info"] );
				res2.push(album);
			}
		}
		fetchData().then( ()=> setCarouselImages(res2) );
		let res3 : string[] = [];
		fetchData = async () => {
			for (let cover of roadtrip) {
				const album = await albumArt( cover["artist"], cover["info"] );
				res3.push(album);
			}
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
		<div className={styles["discover"]} style={props.show?{}:{display:"none"}}>
			<div className={styles["third-section"] + " " + styles["section"]}>
				<h1> Currently Trending </h1>
				<ScrollingSection isUp={false} carouselImages={images_popular} animationDuration="60s" width="15vw" marginBottom="1vw"/>
			</div>

			<div className={styles["first-section"] + " " + styles["section"]}>
				<h1>Resume Playing</h1>
				<ScrollingSection isUp={true} carouselImages={images_recent} animationDuration="70s" width="15vw" marginBottom="1vw"/>
			</div>

			<div className={styles["second-section"] + " " + styles["section"]}>
				<h1>Hit The Road</h1>
					<div className={styles["top-subsection"]}>
						<ScrollingSection isUp={false} carouselImages={images_roadtrip} animationDuration="85s" width="15vw" marginBottom="1vw"/>
					</div>
				</div>
			<div className={styles["fourth-section"] + " " + styles["section"]}>
				<h1>SongStacks' Featured</h1>
				{searchResults.length > 0 ? <ScrollingLayers isUp={true} carouselLayers={searchResults} onClick={setSong} animationDuration="85s" width="15vw" marginBottom="1vw"/> : ""
				}
			</div>
			<div className={styles["fifth-section"] + " " + styles["section"]}>
				<h1>Timeless Classics</h1>
				<div className={styles["bottom-subsection"]}>
					<ScrollingSection isUp={false} carouselImages={images_classic} animationDuration="95s" width="15vw" marginBottom="1vw"/>
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
export default DiscoverDisplay;
