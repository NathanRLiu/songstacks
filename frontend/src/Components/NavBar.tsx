import { useNavigate } from "react-router-dom";
import styles from "../Styles/NavBar.module.css";
import logo from "../songstacks.png";

function NavBar() {
	const navigate = useNavigate();
	return (
		<div className={styles["discover-nav-bar"]}>
			<button className={styles["create-nav-bar"]} onClick={()=> navigate("/dashboard")}>
				<h2>
					Dashboard
				</h2>
			</button>
			<button className={styles["dashboard-nav-bar"]} onClick={()=> navigate("/discover")}>
				<h2>
					Listen
				</h2>
			</button>
			<button className={styles["create-nav-bar"]} onClick={()=> navigate("/song")}>
				<h2>
					Create
				</h2>
			</button>

			<div className={styles["nav-logo"]}>
				<img src={logo} />
			</div>
		</div>
	)
}

export default NavBar;