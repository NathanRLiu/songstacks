import { transform } from "typescript";
import ScrollingSection from "../Components/ScrollingSection";
import SideNav from "../Components/SideNav";

function Dashboard() {
	return (
		<div style={{backgroundColor: "black", display: "flex", flexDirection: "row"}}>
			<SideNav></SideNav>
			<ScrollingSection sectionHeader="Jump Back In" direction="up"/>
			<ScrollingSection sectionHeader="Today's Top Hits" direction="down"/>
			<ScrollingSection sectionHeader="Friends' Favorites" direction="up"/>
		</div>
	)
}

export default Dashboard;