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
		"artist":"Joji",
		"info":{album:"Smithereens", size: "large"}
	},
	{
		"artist":"Playboi Carti",
		"info":{album:"Whole Lotta Red", size: "large"}
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
		<div style={{backgroundColor: "black", display: "flex", flexDirection: "row", height:"100vh"}}>
			<SideNav></SideNav>
			<ScrollingSection sectionHeader="Jump Back In" direction="up" carouselImages={carouselImages} animationDuration="10s" />
			<ScrollingSection sectionHeader="Today's Top Hits" direction="down" carouselImages={carouselImages} animationDuration="20s"/>
			<ScrollingSection sectionHeader="Friends' Favorites" direction="up" carouselImages={[]} animationDuration="15s"/>
		</div>
	)
}

export default Dashboard;
