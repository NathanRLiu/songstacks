import { transform } from "typescript";
import { useState, useEffect } from "react";
import styles from '../Styles/ArtistDashboardPage.module.css';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import NavBar from "../Components/NavBar";
import logo from "../songstacks.png";
import axios from "axios";

function Dashboard() {
	const [artistSongs, setArtistSongs] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		let fetchData = async () => {
			const response = await axios.get(`/api/layer/getArtistLayers`, { withCredentials: true });
			if ("Error" in response.data) {
				return;
			}
			setArtistSongs(response.data.results);
		}
		fetchData();
	},[])
	return (
		<div className={styles["background"]}>
			<NavBar />
			<h1>Artist Dashboard</h1>
			
			<div className={styles["main-section"]}>
				<div className={styles["header"]}>
					<h1> Your Layers </h1>
					<div className={styles["search-bar"]}>
						<i><AiOutlineSearch /></i>
						<input
						type="text"
						placeholder="Search Layers"
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						/>
					</div>
				</div>
				<div className={styles["song-list"]}>
					<button className={styles["song-card"]} onClick={() => navigate("/song")}>
						<i><FaPlus size="100px" color="white"/></i>
						<h2 style={{color: "white"}}>Create New Layer</h2>
					</button>
					{artistSongs.filter((song) => song.Name.toLowerCase().indexOf(searchTerm.toLowerCase())>=0)
					.map((layer:any, id)=>(
						<div key={id} className={styles["song-card"]} >
							<div>
								<img src={`api/layer/getCover/?coverid=${layer["ID"]}`} />
								<h2>{layer["Name"]}</h2>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Dashboard;
