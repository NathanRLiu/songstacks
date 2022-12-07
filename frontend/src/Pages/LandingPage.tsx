import React from 'react';
import { BrowserRouter, Route, useNavigate } from 'react-router-dom';
import { GiMicrophone } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi2';
import { ImHeadphones } from 'react-icons/im';
import {Button} from 'react-bootstrap';
import logo from '../songstacks.png';

import styles from '../Styles/LandingPage.module.css'

function LandingPage() {
		let navigate = useNavigate();
		return (
		<div className={ styles.background }>
			<div className={ styles.diffuser }>
				<div className={ styles.glow1 + " " + styles.glow } />
			</div>
			<div className={ styles["above-diffuser"] }>
				<div className={ styles["header"] } >
					<div className={styles.brand}>
						<img src={logo} />
						<h1> SongStacks</h1>
					</div>
					{/*<div className={styles.contact}>
						<Button variant="outline-primary"> Contact Us </Button>
					</div>*/}
				</div>
				<div className={ styles["title-text"] }>
					<h1>Introducing SongStacks.</h1>
				</div>
				<p className={styles["description-text"]}> Let's redefine the music industry.</p>
				<div className={ styles.section2 }>
					<div className={ styles.card }>
						<i className={ styles.icon }><GiMicrophone /></i>
						<p className={ styles.description }>
							Create new music and start making money off it right away
						</p>
					</div>
					<div className={ styles.card }>
						<i className={ styles.icon }> <HiUserGroup /> </i>
						<p className={ styles.description }>
							Connect with a community of users ready to make new sounds
						</p>
					</div>
					<div className={ styles.card }>
						<i className={ styles.icon }> <ImHeadphones /> </i>	
						<p className={ styles.description }>
							Discover new music from the genres you love
						</p>
					</div>
				</div>
				<div className={ styles.section3 }>
					<h2> Ready to get started? </h2>
					<div className={ styles.buttons }>
						<button onClick={
							() => {navigate("/login")}
						}> Start Creating </button>
						<button> Start Listening </button>
					</div>
				</div>
			</div>
		</div>
        );
}

export default LandingPage;
