import { transform } from "typescript";
import { useState, useEffect } from "react";
import ScrollingSection from "../Components/ScrollingSection";
import SideNav from "../Components/SideNav";

import albumArt from "album-art";

const albumCovers = [
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
		"info":{album:"Villuminati", size: "large"}
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

function Dashboard() {
	const [carouselImages, setCarouselImages] = useState<string[]>([]);
	useEffect(() => {
		let res : string[] = [];
		const fetchData = async () => {
			for (let cover of albumCovers) {
				const album = await albumArt( cover["artist"], cover["info"] );
				res.push(album);
			}
			console.log("1");
		}
		fetchData().then( ()=> setCarouselImages(res) );
	},[])
	return (
		<div style={{backgroundColor: "#202020", display: "flex", flexDirection: "row", height:"100vh", paddingLeft:"3vw"}}>
			<ScrollingSection isUp={true} carouselImages={carouselImages} animationDuration="60s" />
			<ScrollingSection isUp={false} carouselImages={carouselImages} animationDuration="50s"/>
			<ScrollingSection isUp={true} carouselImages={carouselImages} animationDuration="85s"/>
		</div>
	)
}

export default Dashboard;
