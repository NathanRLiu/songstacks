import { transform } from "typescript";
import { useState, useEffect } from "react";
import styles from '../Styles/ArtistDashboardPage.module.css';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


import albumArt from "album-art";

const requestArtistSongs = async () => {
	let res = [
		{
			"layerid":"fewofjfioejTHISISTHEIDjewoifjaioefj",
			"layerName":"My Layer",
			"layerImage":"https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
		},
		{
			"layerid":"fewofjfioejTHISISTHEIDjewoifjaioefj",
			"layerName":"My Layer",
			"layerImage":"https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
		},
		{
			"layerid":"fewofjfioejTHISISTHEIDjewoifjaioefj",
			"layerName":"My Layer",
			"layerImage":"https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
		},
		{
			"layerid":"fewofjfioejTHISISTHEIDjewoifjaioefj",
			"layerName":"My Layer",
			"layerImage":"https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
		},
		{
			"layerid":"fewofjfioejTHISISTHEIDjewoifjaioefj",
			"layerName":"My Layer",
			"layerImage":"https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9",
		},
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
	const navigate = useNavigate();
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
				</div>
				<div className={styles["song-list"]}>
					<button className={styles["song-card"]} onClick={() => navigate("/song")}>
						<i><FaPlus size="100px" color="white"/></i>
						<h2 style={{color: "white"}}>Create New Layer</h2>
					</button>
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
	)
}

export default Dashboard;
