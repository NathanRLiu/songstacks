import { transform } from "typescript";
import { useState, useEffect } from "react";
import ScrollingSection from "../Components/ScrollingSection";
import SideNav from "../Components/SideNav";
import styles from '../Styles/ArtistDashboardPage.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';

import albumArt from "album-art";

const requestArtistSongs = async () => {
	let res = [
		{
			"layerid":"fewofjfioejTHISISTHEIDjewoifjaioefj",
			"layerName":"My Layer",
			"layerImage":"https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
		}
	]
	return res
}

function Dashboard() {
	const [artistSongs, setArtistSongs] = useState<Object[]>([]);
	useEffect(() => {
		let res : Object[] = [];
		let fetchData = async () => {
			res = await requestArtistSongs();
		}
		fetchData().then( ()=> setArtistSongs(res) );
	},[])
	return (
		<div className={styles["background"]}>
			<h1>Artist Dashboard</h1>
			<div className={styles["main-section"]}>
				<div className={styles["header"]}>
					<h1> Your Layers </h1>
					<div className={styles["search-bar"]}>
						<i><AiOutlineSearch /></i>
						<input
						type="text"
						placeholder="Search Layers"
						/>
					</div>
					<div className={styles["song-list"]}>
						{artistSongs.map((layer:any, id)=>(
							<div key={id} className={styles["song-card"]} >
								<div>
									<img src={layer["layerImage"]} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard;
